require "benchmark"
require "./src/datapack"

filenames = Dir["./spec/data/*"]

Datapack.add("./spec/data/random.txt")
Datapack.add("./spec/data/random.txt.gz")

Benchmark.ips do |ips|
  ips.report("File Reads") {foo = File.read(filenames[rand(filenames.size)])}
  ips.report("Builtin Reads") {foo = Datapack::Data[filenames[rand(filenames.size)]]}
end