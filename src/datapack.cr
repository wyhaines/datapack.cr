require "splay_tree_map"

module Datapack
  VERSION = "0.1.0"

  struct Resource
    getter mimetype : String
    getter data : String
    getter path : Path

    def initialize(path, @data, @mimetype = nil)
      @path = Path.new(path)
    end
  end

  class Store
    @index = SplayTreeMap(String, Array(Path)).new {|s, k| s[k] = [] of Path}

    def initialize
      @data = SplayTreeMap(Path, Resource).new
    end

    def [](key)
      @data[key]
    end

    def []=(key, value)
      @data[key] = value

      add_to_index(key, value)
    end

    private def add_to_index(key, value)

    end

    def find(key_fragment)
      
    end
  end

  Data = Store.new

  macro add(path, namespace = nil, mimetype = nil)
    {%
    unless mimetype
      mimemap = {
        "bz2" => "application/bzip2",
        "css" => "text/css; charset=utf-8",
        "eot" => "application/vnd.ms-fontobject",
        "gif" => "image/gif",
        "gz" => "application/gzip",
        "htm" => "text/html; charset=utf-8",
        "html" => "text/html; charset=utf-8",
        "ico" => "image/x-icon",
        "jpg" => "image/jpeg",
        "jpeg" => "image/jpeg",
        "js" => "text/javascript; charset=utf-8",
        "json" => "application/json",
        "map" => "application/json",
        "otf" => "application/font-sfnt",
        "pdf" => "application/pdf",
        "png" => "image/png",
        "svg" => "image/svg+xml",
        "tar" => "application/tar",
        "ttf" => "application/font-sfnt",
        "txt" => "text/plain; charset=utf-8",
        "xml" => "text/xml; charset=utf-8",
        "wasm" => "application/wasm",
        "webp" => "image/webp",
        "woff" => "application/font-woff",
        "woff2" => "application/font-woff2",
        "yml" => "text/yaml",
        "yaml" => "text/yaml",
        "zip" => "application/zip",
      }

      extension = path.id.split(".").last.downcase
      mimetype = mimemap[extension]
    end
    %}

    Datapack::Data[Path.new({{ path }})] = Datapack::Resource.new(
      path: {{ path }},
      data: {{ read_file(path) }},
      mimetype: {{ mimetype }})
  end

  def self.get(path)
    Datapack::Data[Path.new(path)]
  end
end
