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

  macro add_file(path, namespace = nil, mimetype = nil)
    Datapack::Data[Path.new({{ path }})] = Datapack::Resource.new({{ path }},
      {{ read_file(path) }})
  end

  def self.get(path)
    Datapack::Data[Path.new(path)]
  end
end
