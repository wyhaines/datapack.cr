require "splay_tree_map"

module Datapack
  VERSION = "0.1.0"

  struct Resource
    getter namespace : String = "default"
    getter mimetype : String
    getter data : String
    getter path : Path

    def initialize(path, @data, @mimetype = nil)
      @path = Path.new(path)
    end
  end

  class Store
    getter index
    @index = SplayTreeMap(String, SplayTreeMap(String, Array(Path))).new do |s1, k1|
      s1[k1] = SplayTreeMap(String, Array(Path)).new do |s2, k2|
        s2[k2] = [] of Path
      end
    end

    def initialize
      @data = SplayTreeMap(String, SplayTreeMap(Path, Resource)).new do |s, k|
        s[k] = SplayTreeMap(Path, Resource).new
      end
    end

    def [](key : Path)
      if key.parts.first =~ /:$/
        namespace = key.parts.first.rstrip(':')
        actual_key = Path[key.parts[1..-1]]
      else
        namespace = "default"
        actual_key = key
      end
      @data[namespace][actual_key]
    end

    def [](key : String)
      self[Path.new(key)]
    end

    def []=(key : Path, value)
      if key.parts.first =~ /:$/
        namespace = key.parts.first.rstrip(':')
        actual_key = Path[key.parts[1..-1]]
      else
        namespace = "default"
        actual_key = key
      end

      @data[namespace][actual_key] = value

      add_to_index(namespace, actual_key)
    end

    def []=(key : String, value)
      self[Path.new(key)] = value
    end

    private def add_to_index(namespace, key)
      key.each_part do |part|
        @index[namespace][part] << key
      end
    end

    def find_all_keys(key_fragment : String)
      find_all(Path.new(key_fragment))
    end

    def find_all_keys(key_fragment : Path)
      parts = key_fragment.parts
      if parts.first =~ /:$/
        namespace = parts.first.rstrip(':')
        actual_parts = parts[1..-1]
      else
        namespace = "default"
        actual_parts = parts
      end
      first = actual_parts.first
      rest = actual_parts[1..-1]?
      r = @index[namespace][first]
      if rest
        rest.each { |part| r = r & @index[namespace][part] }
      end
      r
    end

    def find_key(key_fragment : String)
      find_key(Path.new(key_fragment))
    end

    def find_key(key_fragment : Path)
      find_all_keys(key_fragment).first
    end

    def find_key?(key_fragment : String)
      find_key?(Path.new(key_fragment))
    end

    def find_key?(key_fragment : Path)
      possible_keys = find_all_keys(key_fragment)
      possible_keys.empty? ? nil : possible_keys.first
    end

    def find_all(key_fragment : String)
      find_all_keys(Path.new(key_fragment))
    end

    def find_all(key_fragment : Path)
      find_all_keys(key_fragment).map { |k| @data[k] }
    end

    def find(key_fragment : String)
      find(Path.new(key_fragment))
    end

    def find(key_fragment : Path)
      if key_fragment.parts.first =~ /:$/
        namespace = key_fragment.parts.first.rstrip(':')
      else
        namespace = "default"
      end
      @data[namespace][find_key(key_fragment)]
    end

    def find?(key_fragment : String)
      find?(Path.new(key_fragment))
    end

    def find?(key_fragment : Path)
      if key_fragment.parts.first =~ /:$/
        namespace = key_fragment.parts.first.rstrip(':')
      else
        namespace = "default"
      end

      possible_key = find_key?(key_fragment)
      possible_key.nil? ? nil : @data[namespace][possible_key]
    end
  end

  Data = Store.new

  macro add(path, namespace = "default", mimetype = nil)
    {% if file_exists? path %}
      {%
        unless mimetype
          mimemap = {
            "bz2"   => "application/bzip2",
            "cr"    => "text/crystal",
            "css"   => "text/css; charset=utf-8",
            "csv"   => "text/csv; charset=utf-8",
            "eot"   => "application/vnd.ms-fontobject",
            "gif"   => "image/gif",
            "gz"    => "application/gzip",
            "htm"   => "text/html; charset=utf-8",
            "html"  => "text/html; charset=utf-8",
            "ico"   => "image/x-icon",
            "jpg"   => "image/jpeg",
            "jpeg"  => "image/jpeg",
            "js"    => "text/javascript; charset=utf-8",
            "json"  => "application/json",
            "map"   => "application/json",
            "otf"   => "application/font-sfnt",
            "pdf"   => "application/pdf",
            "png"   => "image/png",
            "rb"    => "text/ruby",
            "svg"   => "image/svg+xml",
            "tar"   => "application/tar",
            "ttf"   => "application/font-sfnt",
            "txt"   => "text/plain; charset=utf-8",
            "xml"   => "text/xml; charset=utf-8",
            "wasm"  => "application/wasm",
            "webp"  => "image/webp",
            "woff"  => "application/font-woff",
            "woff2" => "application/font-woff2",
            "yml"   => "text/yaml",
            "yaml"  => "text/yaml",
            "zip"   => "application/zip",
          }

          extension = path.id.split(".").last.downcase
          mimetype = mimemap[extension] || "application/octet-stream"
        end
      %}

      Datapack::Data[Path.new({{ "#{namespace.id}:/#{path.id}" }})] = Datapack::Resource.new(
        path: {{ path }},
        data: {{ read_file(path) }},
        mimetype: {{ mimetype }})
      {% debug if flag?(:DEBUG) %}
    {% end %}
  end

  macro add_path(path, *globs, **options)
    {%
      namespace = options[:namespace] || "default"
      lines = run("../src/find", path).split("\n")
      files = lines.map(&.split("\t"))
    %}
    {% for file in files %}
      {% unless file[0] == "" %}
        Datapack::Data[Path.new({{ "#{namespace.id}:/#{file[0].id}" }})] = Datapack::Resource.new(
          path: {{ file[0] }},
          data: {{ read_file(file[0]) }},
          mimetype: {{ file[1] }})
      {% end %}
    {% end %}
    {% debug if flag?(:DEBUG) %}
  end

  def self.get(path)
    Datapack::Data[Path.new(path)]
  end
end
