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

  it "can find a specific file" do
    Datapack::Data["./src/find.cr"].path.basename.should eq "find.cr"
    Datapack::Data["spec:/./spec/datapack_spec.cr"].path.basename.should eq "datapack_spec.cr"
    Datapack::Data["spec:/./spec/datapack_spec.cr"].mimetype.should eq "text/crystal"
  end

  it "can find everything in a complex, partial path" do
    data_files = Datapack::Data.find_all("default:/spec/data")
    data_files.size.should eq 2
    data_files.includes?(Path["./spec/data/random.txt"]).should be_true
    data_files.includes?(Path["./spec/data/random.txt.gz"]).should be_true
  end

  it "find? works with a Path" do
    if path = Datapack::Data.find?(Path["./spec/data/random.txt"])
      path.should be_a Datapack::Resource
      path.path.basename.should eq "random.txt"
    end
    Datapack::Data.find?(Path["./this/is/not/here"]).should be_nil
  end

  it "find? works with a String" do
    if path = Datapack::Data.find?("./spec/data/random.txt")
      path.should be_a Datapack::Resource
      path.path.basename.should eq "random.txt"
    end
    Datapack::Data.find?("./this/is/not/here").should be_nil
  end
end
