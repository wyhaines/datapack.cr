module Datapack
  VERSION = "0.1.0"

  struct Resource
    getter type : String
    getter data : String
    getter path : Path

    def initialize(path, @data)
      @path = Path.new(path)
      @type = File.extname(path).delete(".")
    end
  end

  Data = Hash(Path, Resource).new

  macro add(path, namespace = nil, mimetype = nil)
    mimemap = {
      "css" => "text/css; charset=utf-8",
      "gif" => "image/gif",
      "htm" => "text/html; charset=utf-8",
      "html" => "text/html; charset=utf-8",
      "jpg" => "image/jpeg",
      "jpeg" => "image/jpeg",
      "js" => "text/javascript; charset=utf-8",
      "json" => "application/json",
      "pdf" => "application/pdf",
      "png" => "image/png",
      "svg" => "image/svg+xml",
      "txt" => "text/plain; charset=utf-8",
      "xml" => "text/xml; charset=utf-8",
      "wasm" => "application/wasm",
      "webp" => "image/webp",
      "yml" => "text/yaml",
      "yaml" => "text/yaml",
      "ico" => "image/x-icon",
      "svg" => "image/svg+xml",
      "eot" => "application/vnd.ms-fontobject",
      "ttf" => "application/font-sfnt",
      "woff" => "application/font-woff",
      "woff2" => "application/font-woff2",
      "otf" => "application/font-sfnt",
      "zip" => "application/zip",
      "map" => "application/json"
    }
    Datapack::Data[Path.new({{ path }})] = Datapack::Resource.new({{ path }},
      {{ read_file(path) }})
  end

  def self.get(path)
    Datapack::Data[Path.new(path)]
  end
end
