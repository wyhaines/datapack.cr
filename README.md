[![Datapack.cr CI](https://github.com/wyhaines/datapack.cr/actions/workflows/build_docs.yml/badge.svg)](https://github.com/wyhaines/datapack.cr/actions/workflows/build_docs.yml)
[![Datapack.cr Build Docs](https://github.com/wyhaines/datapack.cr/actions/workflows/ci.yml/badge.svg)](https://github.com/wyhaines/datapack.cr/actions/workflows/ci.yml)
[![GitHub release](https://img.shields.io/github/release/wyhaines/datapack.cr.svg?style=for-the-badge)](https://github.com/wyhaines/datapack.cr/releases)
![GitHub commits since latest release (by SemVer)](https://img.shields.io/github/commits-since/wyhaines/datapack.cr/latest?style=for-the-badge)

# [datapack](https://wyhaines.github.io/datapack.cr/)

While hanging out the other day in Discord, I saw these words in a message:

```
would be cool
everything in one assembly
a single executable to do everything
actually i dont think crystal can pack images and files into the result executable
```

The little bird in my brain said, "Oh, Crystal absolutely can do that, with the help of macros!"

This shard provides a simple way to pack files into your executable, sorted by namespaces, should you so choose, and to find and access them as needed.

It is not a full [baked-filesystem](https://github.com/schovi/baked_file_system), but instead seeks to keep things simple, fast, and easy to use. Accordingly, it also doesn't even attempt to compress any data. It stores every file exactly as it is, so if you want to compress something, you'll have to do that yourself.

## Installation

1. Add the dependency to your `shard.yml`:

   ```yaml
   dependencies:
     datapack:
       github: wyhaines/datapack.cr
   ```

2. Run `shards install`

## Usage

```crystal
require "datapack"
```

There are two macros provided for packing data into your executable. The first

```crystal
Datapack.add "./assets/icon.png"
Datapack.add "./assets/styles.css", namespace: "layout"
Datapack.add "./stuff/fidget.ts", namespace: "extras", mimetype: "text/qttranslation+xml"
```

The `#add` macro takes a path to a file, and optionally a namespace and a mimetype, and adds it to the datapack. If no namespace is provided, it defaults to the "default" namespace. If no mimetype is provided, the macro will make a modest attempt to apply a correct mimetype, but the macro supports only a very small set of mime-types.

The current set of extensions and mime types applied:

| Extension |            Mime Type            |
|-----------|---------------------------------|
|    bz2    | application/bzip2               |
|    cr     | text/crystal                    |
|    css    | text/css; charset=utf-8         |
|    csv    | text/csv; charset=utf-8         |
|    eot    | application/vnd.ms-fontobject   |
|    gif    | image/gif                       |
|    gz     | application/gzip                |
|    htm    | text/html; charset=utf-8        |
|    html   | text/html; charset=utf-8        |
|    ico    | image/x-icon                    |
|    jpg    | image/jpeg                      |
|    jpeg   | image/jpeg                      |
|    js     | text/javascript; charset=utf-8  |
|    json   | application/json                |
|    map    | application/json                |
|    otf    | application/font-sfnt           |
|    pdf    | application/pdf                 |
|    png    | image/png                       |
|    rb     | text/ruby                       |
|    svg    | image/svg+xml                   |
|    tar    | application/tar                 |
|    ttf    | application/font-sfnt           |
|    txt    | text/plain; charset=utf-8       |
|    xml    | text/xml; charset=utf-8         |
|    wasm   | application/wasm                |
|    webp   | image/webp                      |
|    woff   | application/font-woff           |
|    woff2  | application/font-woff2          |
|    yml    | text/yaml                       |
|    yaml   | text/yaml                       |
|    zip    | application/zip                 |

The other macro, `#add_path`, takes a path to a directory, one or more file machers, and an option namespace, and adds all files under the directory that match any of the file matchers. If no namespace is provided, it defaults to the "default" namespace.

```crystal
Datapack.add_path("./src", "**/*.cr")
Datapack.add_path("./spec", "**/*.cr", namespace: "spec")
Datapack.add_path("./assets", "**/*.{png,jpg,gif}", namespace: "images")
```

Adding whole directory trees of files is done with the help of an external utility, written into the [find.cr](https://github.com/wyhaines/datapack.cr/blob/master/src/find.cr) file. It makes compilation somewhat slower, since Crystal will compile the find utility first, in order to run it. The find utility, in turn, returns file names, and mime types for those files, according to the file match globs that it was given.

The other half of this shard is the set of methods to use to access the files that are compiled into the executable.

All data is stored in a nominally Hash-like data store at `Datapack::Data`. New entries can be inserted at runtime using `#[]=`, and they can be retrieved using `#[]`. Keys are of type `String` or `Path`, and are all treated as `Path`s. They can be prefixed with a namespace: `namespace:/this/is/a/relative/path` and `otherspace://this/is/an/absolute/path`. If no namespace is provided, `default` is assumed.

If one wants to search the stored data in a more fuzzy way, one can any of a set of class methods on `Datapack::Data`.

```crystal
Datapack::Data.find("./spec/data/random.txt")
Datapack::Data.find_all(Path["assets:/images"])
Datapack::Data.find_key?(Path["data:/prices/nav.csv"])
```

The `find`, `find?`, and `find_all` methods return instances of `Resource`, which are structures containing the file `path`, `mimetype`, `namespace`, and `data`.

## Development

Fork the repository, and work from branches in your fork. When you have a PR ready, submit a PR request. Also, [open an issue](https://github.com/wyhaines/datapack.cr/issues/new/choose) to share what the problem is that your PR will address, and link your PR with the issue.

## Contributing

1. Fork it (<https://github.com/wyhaines/datapack.cr/fork>)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Contributors

- [Kirk Haines](https://github.com/wyhaines) - creator and maintainer

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/wyhaines/datapack.cr?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/wyhaines/datapack.cr?style=for-the-badge)
