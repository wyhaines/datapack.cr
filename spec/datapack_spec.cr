require "./spec_helper"
require "compress/gzip"

describe Datapack do
  it "can add a single text-type file to the data store" do
    Datapack.add("./spec/data/random.txt")
    Datapack::Data["./spec/data/random.txt"].data.should eq File.read("./spec/data/random.txt")
    Datapack::Data["./spec/data/random.txt"].mimetype.should eq "text/plain; charset=utf-8"
  end

  it "can add a binary file to the data store" do
    Datapack.add("./spec/data/random.txt.gz")
    Datapack::Data["./spec/data/random.txt.gz"].data.should eq File.read("./spec/data/random.txt.gz")
    Datapack::Data["./spec/data/random.txt.gz"].mimetype.should eq "application/gzip"
    uncompressed = Compress::Gzip::Reader.open(
      IO::Memory.new(Datapack::Data["./spec/data/random.txt.gz"].data)) { |gzip| gzip.gets_to_end }
    uncompressed.chomp.should match(/Sed ut perspiciatis unde omnis iste natus/)
  end

  it "can add a full directory structure to the data store" do
    Datapack.add_path("./src", "**/*.cr")
    Datapack::Data.find_key("find.cr").should eq Path.new("./src/find.cr")
    data = Datapack::Data.find("find.cr")
    data.mimetype.should eq "text/crystal"
  end

  it "can add files to different namespaces in the data store" do
    Datapack.add_path("./spec", "**/*.cr", namespace: "spec")
    Datapack::Data.find_key("spec:/spec_helper.cr").should eq Path.new("./spec/spec_helper.cr")
  end

  it "can fetch data from an http source" do
  end
end
