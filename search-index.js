crystal_doc_search_index_callback({"repository_name":"datapack","body":"![Datapack CI](https://img.shields.io/github/workflow/status/wyhaines/datapack.cr/Datapack%20CI?style=for-the-badge&logo=GitHub)\n[![GitHub release](https://img.shields.io/github/release/wyhaines/datapack.cr.svg?style=for-the-badge)](https://github.com/wyhaines/datapack.cr/releases)\n![GitHub commits since latest release (by SemVer)](https://img.shields.io/github/commits-since/wyhaines/datapack.cr/latest?style=for-the-badge)\n\n# datapack\n\nWhile hanging out the other day in Discord, I saw these words in a message:\n\n```\nwould be cool\neverything in one assembly\na single executable to do everything\nactually i dont think crystal can pack images and files into the result executable\n```\n\nThe little bird in my brain said, \"Oh, Crystal absolutely can do that, with the help of macros!\"\n\nThis shard provides a simple way to pack files into your executable, sorted by namespaces, should you so choose, and to find and access them as needed.\n\nIt is not a full [baked-filesystem](https://github.com/schovi/baked_file_system), but instead seeks to keep things simple, fast, and easy to use. Accordingly, it also doesn't even attempt to compress any data. It stores every file exactly as it is, so if you want to compress something, you'll have to do that yourself.\n\n## Installation\n\n1. Add the dependency to your `shard.yml`:\n\n   ```yaml\n   dependencies:\n     datapack:\n       github: your-github-user/datapack\n   ```\n\n2. Run `shards install`\n\n## Usage\n\n```crystal\nrequire \"datapack\"\n```\n\nThere are two macros provided for packing data into your executable. The first\n\n```crystal\nDatapack.add \"./assets/icon.png\"\nDatapack.add \"./assets/styles.css\", namespace: \"layout\"\nDatapack.add \"./stuff/fidget.ts\", namespace: \"extras\", mimetype: \"text/qttranslation+xml\"\n```\n\nThe `#add` macro takes a path to a file, and optionally a namespace and a mimetype, and adds it to the datapack. If no namespace is provided, it defaults to the \"default\" namespace. If no mimetype is provided, the macro will make a modest attempt to apply a correct mimetype, but the macro supports only a very small set of mime-types.\n\nThe current set of extensions and mime types applied:\n\n| Extension |            Mime Type            |\n|-----------|---------------------------------|\n|    bz2    | application/bzip2               |\n|    cr     | text/crystal                    |\n|    css    | text/css; charset=utf-8         |\n|    csv    | text/csv; charset=utf-8         |\n|    eot    | application/vnd.ms-fontobject   |\n|    gif    | image/gif                       |\n|    gz     | application/gzip                |\n|    htm    | text/html; charset=utf-8        |\n|    html   | text/html; charset=utf-8        |\n|    ico    | image/x-icon                    |\n|    jpg    | image/jpeg                      |\n|    jpeg   | image/jpeg                      |\n|    js     | text/javascript; charset=utf-8  |\n|    json   | application/json                |\n|    map    | application/json                |\n|    otf    | application/font-sfnt           |\n|    pdf    | application/pdf                 |\n|    png    | image/png                       |\n|    rb     | text/ruby                       |\n|    svg    | image/svg+xml                   |\n|    tar    | application/tar                 |\n|    ttf    | application/font-sfnt           |\n|    txt    | text/plain; charset=utf-8       |\n|    xml    | text/xml; charset=utf-8         |\n|    wasm   | application/wasm                |\n|    webp   | image/webp                      |\n|    woff   | application/font-woff           |\n|    woff2  | application/font-woff2          |\n|    yml    | text/yaml                       |\n|    yaml   | text/yaml                       |\n|    zip    | application/zip                 |\n\nThe other macro, `#add_path`, takes a path to a directory, one or more file machers, and an option namespace, and adds all files under the directory that match any of the file matchers. If no namespace is provided, it defaults to the \"default\" namespace.\n\n```crystal\nDatapack.add_path(\"./src\", \"**/*.cr\")\nDatapack.add_path(\"./spec\", \"**/*.cr\", namespace: \"spec\")\nDatapack.add_path(\"./assets\", \"**/*.{png,jpg,gif}\", namespace: \"images\")\n```\n\nAdding whole directory trees of files is done with the help of an external utility, written into the [find.cr](https://github.com/wyhaines/datapack.cr/blob/master/src/find.cr) file. It makes compilation somewhat slower, since Crystal will compile the find utility first, in order to run it. The find utility, in turn, returns file names, and mime types for those files, according to the file match globs that it was given.\n\nThe other half of this shard is the set of methods to use to access the files that are compiled into the executable.\n\nAll data is stored in a nominally Hash-like data store at `Datapack::Data`. New entries can be inserted at runtime using `#[]=`, and they can be retrieved using `#[]`. Keys are of type `String` or `Path`, and are all treated as `Path`s. They can be prefixed with a namespace: `namespace:/this/is/a/relative/path` and `otherspace://this/is/an/absolute/path`. If no namespace is provided, `default` is assumed.\n\nIf one wants to search the stored data in a more fuzzy way, one can any of a set of class methods on `Datapack::Data`.\n\n```crystal\nDatapack::Data.find(\"./spec/data/random.txt\")\nDatapack::Data.find_all(Path[\"assets:/images\"])\nDatapack::Data.find_key?(Path[\"data:/prices/nav.csv\"])\n```\n\nThe `find`, `find?`, and `find_all` methods return instances of `Resource`, which are structures containing the file `path`, `mimetype`, `namespace`, and `data`.\n\n## Development\n\nFork the repository, and work from branches in your fork. When you have a PR ready, submit a PR request. Also, [open an issue](https://github.com/wyhaines/datapack.cr/issues/new/choose) to share what the problem is that your PR will address, and link your PR with the issue.\n\n## Contributing\n\n1. Fork it (<https://github.com/wyhaines/datapack/fork>)\n2. Create your feature branch (`git checkout -b my-new-feature`)\n3. Commit your changes (`git commit -am 'Add some feature'`)\n4. Push to the branch (`git push origin my-new-feature`)\n5. Create a new Pull Request\n\n## Contributors\n\n- [Kirk Haines](https://github.com/wyhaines) - creator and maintainer\n\n![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/wyhaines/datapack.cr?style=for-the-badge)\n![GitHub issues](https://img.shields.io/github/issues/wyhaines/datapack.cr?style=for-the-badge)","program":{"html_id":"datapack/toplevel","path":"toplevel.html","kind":"module","full_name":"Top Level Namespace","name":"Top Level Namespace","abstract":false,"superclass":null,"ancestors":[],"locations":[],"repository_name":"datapack","program":true,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[{"html_id":"datapack/Datapack","path":"Datapack.html","kind":"module","full_name":"Datapack","name":"Datapack","abstract":false,"superclass":null,"ancestors":[],"locations":[{"filename":"src/datapack.cr","line_number":3,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L3"}],"repository_name":"datapack","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[{"id":"Data","name":"Data","value":"Store.new","doc":null,"summary":null},{"id":"VERSION","name":"VERSION","value":"\"0.1.0\"","doc":null,"summary":null}],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":null,"summary":null,"class_methods":[{"html_id":"get(path)-class-method","name":"get","doc":null,"summary":null,"abstract":false,"args":[{"name":"path","doc":null,"default_value":"","external_name":"path","restriction":""}],"args_string":"(path)","args_html":"(path)","location":{"filename":"src/datapack.cr","line_number":284,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L284"},"def":{"name":"get","args":[{"name":"path","doc":null,"default_value":"","external_name":"path","restriction":""}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"Datapack::Data[Path.new(path)]"}}],"constructors":[],"instance_methods":[],"macros":[{"html_id":"add(path,namespace=\"default\",mimetype=nil)-macro","name":"add","doc":"The `#add` macro takes a path to a file, and optionally a namespace and a mimetype, and\nadds it to the datapack. If no namespace is provided, it defaults to the \"default\"\nnamespace. If no mimetype is provided, the macro will make a modest attempt to apply a\ncorrect mimetype, but the macro supports only a very small set of mime-types.\n\nThe current set of extensions and mime types applied:\n\n| Extension |            Mime Type            |\n|-----------|---------------------------------|\n|    bz2    | application/bzip2               |\n|    cr     | text/crystal                    |\n|    css    | text/css; charset=utf-8         |\n|    csv    | text/csv; charset=utf-8         |\n|    eot    | application/vnd.ms-fontobject   |\n|    gif    | image/gif                       |\n|    gz     | application/gzip                |\n|    htm    | text/html; charset=utf-8        |\n|    html   | text/html; charset=utf-8        |\n|    ico    | image/x-icon                    |\n|    jpg    | image/jpeg                      |\n|    jpeg   | image/jpeg                      |\n|    js     | text/javascript; charset=utf-8  |\n|    json   | application/json                |\n|    map    | application/json                |\n|    otf    | application/font-sfnt           |\n|    pdf    | application/pdf                 |\n|    png    | image/png                       |\n|    rb     | text/ruby                       |\n|    svg    | image/svg+xml                   |\n|    tar    | application/tar                 |\n|    ttf    | application/font-sfnt           |\n|    txt    | text/plain; charset=utf-8       |\n|    xml    | text/xml; charset=utf-8         |\n|    wasm   | application/wasm                |\n|    webp   | image/webp                      |\n|    woff   | application/font-woff           |\n|    woff2  | application/font-woff2          |\n|    yml    | text/yaml                       |\n|    yaml   | text/yaml                       |\n|    zip    | application/zip                 |\n","summary":"<p>The <code><a href=\"Datapack.html#add%28path%2Cnamespace%3D%22default%22%2Cmimetype%3Dnil%29-macro\">#add</a></code> macro takes a path to a file, and optionally a namespace and a mimetype, and adds it to the datapack.</p>","abstract":false,"args":[{"name":"path","doc":null,"default_value":"","external_name":"path","restriction":""},{"name":"namespace","doc":null,"default_value":"\"default\"","external_name":"namespace","restriction":""},{"name":"mimetype","doc":null,"default_value":"nil","external_name":"mimetype","restriction":""}],"args_string":"(path, namespace = \"default\", mimetype = nil)","args_html":"(path, namespace = <span class=\"s\">&quot;default&quot;</span>, mimetype = <span class=\"n\">nil</span>)","location":{"filename":"src/datapack.cr","line_number":216,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L216"},"def":{"name":"add","args":[{"name":"path","doc":null,"default_value":"","external_name":"path","restriction":""},{"name":"namespace","doc":null,"default_value":"\"default\"","external_name":"namespace","restriction":""},{"name":"mimetype","doc":null,"default_value":"nil","external_name":"mimetype","restriction":""}],"double_splat":null,"splat_index":null,"block_arg":null,"visibility":"Public","body":"    \n{% if file_exists?(path) %}\n      {% unless mimetype\n  mimemap = {\"bz2\" => \"application/bzip2\", \"cr\" => \"text/crystal\", \"css\" => \"text/css; charset=utf-8\", \"csv\" => \"text/csv; charset=utf-8\", \"eot\" => \"application/vnd.ms-fontobject\", \"gif\" => \"image/gif\", \"gz\" => \"application/gzip\", \"htm\" => \"text/html; charset=utf-8\", \"html\" => \"text/html; charset=utf-8\", \"ico\" => \"image/x-icon\", \"jpg\" => \"image/jpeg\", \"jpeg\" => \"image/jpeg\", \"js\" => \"text/javascript; charset=utf-8\", \"json\" => \"application/json\", \"map\" => \"application/json\", \"otf\" => \"application/font-sfnt\", \"pdf\" => \"application/pdf\", \"png\" => \"image/png\", \"rb\" => \"text/ruby\", \"svg\" => \"image/svg+xml\", \"tar\" => \"application/tar\", \"ttf\" => \"application/font-sfnt\", \"txt\" => \"text/plain; charset=utf-8\", \"xml\" => \"text/xml; charset=utf-8\", \"wasm\" => \"application/wasm\", \"webp\" => \"image/webp\", \"woff\" => \"application/font-woff\", \"woff2\" => \"application/font-woff2\", \"yml\" => \"text/yaml\", \"yaml\" => \"text/yaml\", \"zip\" => \"application/zip\"}\n  extension = (path.id.split(\".\")).last.downcase\n  mimetype = mimemap[extension] || \"application/octet-stream\"\nend %}\n\n      Datapack::Data[Path.new({{ \"#{namespace.id}:/#{path.id}\" }})] = Datapack::Resource.new(\n        path: {{ path }},\n        data: {{ read_file(path) }},\n        mimetype: {{ mimetype }})\n      {% if flag?(:DEBUG)\n  debug\nend %}\n    {% end %}\n\n  \n"}},{"html_id":"add_path(path,*globs,**options)-macro","name":"add_path","doc":null,"summary":null,"abstract":false,"args":[{"name":"path","doc":null,"default_value":"","external_name":"path","restriction":""},{"name":"globs","doc":null,"default_value":"","external_name":"globs","restriction":""}],"args_string":"(path, *globs, **options)","args_html":"(path, *globs, **options)","location":{"filename":"src/datapack.cr","line_number":267,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L267"},"def":{"name":"add_path","args":[{"name":"path","doc":null,"default_value":"","external_name":"path","restriction":""},{"name":"globs","doc":null,"default_value":"","external_name":"globs","restriction":""}],"double_splat":{"name":"options","doc":null,"default_value":"","external_name":"options","restriction":""},"splat_index":1,"block_arg":null,"visibility":"Public","body":"    \n{% namespace = options[:namespace] || \"default\"\nlines = (run(\"../src/find\", path)).split(\"\\n\")\nfiles = lines.map(&.split(\"\\t\"))\n %}\n\n    \n{% for file in files %}\n      {% if file[0] == \"\" %}{% else %}\n        Datapack::Data[Path.new({{ \"#{namespace.id}:/#{file[0].id}\" }})] = Datapack::Resource.new(\n          path: {{ file[0] }},\n          data: {{ read_file(file[0]) }},\n          mimetype: {{ file[1] }})\n      {% end %}\n    {% end %}\n\n    \n{% if flag?(:DEBUG)\n  debug\nend %}\n\n  \n"}}],"types":[{"html_id":"datapack/Datapack/Resource","path":"Datapack/Resource.html","kind":"struct","full_name":"Datapack::Resource","name":"Resource","abstract":false,"superclass":{"html_id":"datapack/Struct","kind":"struct","full_name":"Struct","name":"Struct"},"ancestors":[{"html_id":"datapack/Struct","kind":"struct","full_name":"Struct","name":"Struct"},{"html_id":"datapack/Value","kind":"struct","full_name":"Value","name":"Value"},{"html_id":"datapack/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/datapack.cr","line_number":7,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L7"}],"repository_name":"datapack","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"datapack/Datapack","kind":"module","full_name":"Datapack","name":"Datapack"},"doc":"A `Resource` represents a single file. It is a simple structure, composed of four fields.","summary":"<p>A <code><a href=\"../Datapack/Resource.html\">Resource</a></code> represents a single file.</p>","class_methods":[],"constructors":[{"html_id":"new(path,data,mimetype=nil)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"path","doc":null,"default_value":"","external_name":"path","restriction":""},{"name":"data","doc":null,"default_value":"","external_name":"data","restriction":""},{"name":"mimetype","doc":null,"default_value":"nil","external_name":"mimetype","restriction":""}],"args_string":"(path, data, mimetype = nil)","args_html":"(path, data, mimetype = <span class=\"n\">nil</span>)","location":{"filename":"src/datapack.cr","line_number":13,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L13"},"def":{"name":"new","args":[{"name":"path","doc":null,"default_value":"","external_name":"path","restriction":""},{"name":"data","doc":null,"default_value":"","external_name":"data","restriction":""},{"name":"mimetype","doc":null,"default_value":"nil","external_name":"mimetype","restriction":""}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(path, data, mimetype)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"html_id":"data:String-instance-method","name":"data","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : String","args_html":" : String","location":{"filename":"src/datapack.cr","line_number":10,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L10"},"def":{"name":"data","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"@data"}},{"html_id":"mimetype:String-instance-method","name":"mimetype","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : String","args_html":" : String","location":{"filename":"src/datapack.cr","line_number":9,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L9"},"def":{"name":"mimetype","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"@mimetype"}},{"html_id":"namespace:String-instance-method","name":"namespace","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : String","args_html":" : String","location":{"filename":"src/datapack.cr","line_number":8,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L8"},"def":{"name":"namespace","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"@namespace"}},{"html_id":"path:Path-instance-method","name":"path","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : Path","args_html":" : Path","location":{"filename":"src/datapack.cr","line_number":11,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L11"},"def":{"name":"path","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Path","visibility":"Public","body":"@path"}}],"macros":[],"types":[]},{"html_id":"datapack/Datapack/Store","path":"Datapack/Store.html","kind":"class","full_name":"Datapack::Store","name":"Store","abstract":false,"superclass":{"html_id":"datapack/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"datapack/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"datapack/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/datapack.cr","line_number":18,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L18"}],"repository_name":"datapack","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"datapack/Datapack","kind":"module","full_name":"Datapack","name":"Datapack"},"doc":null,"summary":null,"class_methods":[],"constructors":[{"html_id":"new-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/datapack.cr","line_number":26,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L26"},"def":{"name":"new","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"html_id":"[](key:Path)-instance-method","name":"[]","doc":"Get a value indexed by the given path in the datapack. If the path is prefixed with a\nnamespace:\n\n```\nnamespace:/path/to/file.txt\n```\n\nThe path will be searched for within that namespace. Otherwise, it will be searched\nfor within the `default` namespace.","summary":"<p>Get a value indexed by the given path in the datapack.</p>","abstract":false,"args":[{"name":"key","doc":null,"default_value":"","external_name":"key","restriction":"Path"}],"args_string":"(key : Path)","args_html":"(key : Path)","location":{"filename":"src/datapack.cr","line_number":41,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L41"},"def":{"name":"[]","args":[{"name":"key","doc":null,"default_value":"","external_name":"key","restriction":"Path"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"if key.parts.first =~ (/:$/)\n  namespace = key.parts.first.rstrip(':')\n  actual_key = Path[key.parts[1..-1]]\nelse\n  namespace = \"default\"\n  actual_key = key\nend\n@data[namespace][actual_key]\n"}},{"html_id":"[](key:String)-instance-method","name":"[]","doc":null,"summary":null,"abstract":false,"args":[{"name":"key","doc":null,"default_value":"","external_name":"key","restriction":"String"}],"args_string":"(key : String)","args_html":"(key : String)","location":{"filename":"src/datapack.cr","line_number":52,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L52"},"def":{"name":"[]","args":[{"name":"key","doc":null,"default_value":"","external_name":"key","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"self[Path.new(key)]"}},{"html_id":"[]=(key:Path,value)-instance-method","name":"[]=","doc":"Set a value within the the datapack. As with getting a value, the path can be prefixed\nwith a namespace, and if no namespace is provided, `default` will be used. The value to be\nstored must be an instance of `Resource`.","summary":"<p>Set a value within the the datapack.</p>","abstract":false,"args":[{"name":"key","doc":null,"default_value":"","external_name":"key","restriction":"Path"},{"name":"value","doc":null,"default_value":"","external_name":"value","restriction":""}],"args_string":"(key : Path, value)","args_html":"(key : Path, value)","location":{"filename":"src/datapack.cr","line_number":59,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L59"},"def":{"name":"[]=","args":[{"name":"key","doc":null,"default_value":"","external_name":"key","restriction":"Path"},{"name":"value","doc":null,"default_value":"","external_name":"value","restriction":""}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"if key.parts.first =~ (/:$/)\n  namespace = key.parts.first.rstrip(':')\n  actual_key = Path[key.parts[1..-1]]\nelse\n  namespace = \"default\"\n  actual_key = key\nend\n@data[namespace][actual_key] = value\nadd_to_index(namespace, actual_key)\n"}},{"html_id":"[]=(key:String,value)-instance-method","name":"[]=","doc":null,"summary":null,"abstract":false,"args":[{"name":"key","doc":null,"default_value":"","external_name":"key","restriction":"String"},{"name":"value","doc":null,"default_value":"","external_name":"value","restriction":""}],"args_string":"(key : String, value)","args_html":"(key : String, value)","location":{"filename":"src/datapack.cr","line_number":73,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L73"},"def":{"name":"[]=","args":[{"name":"key","doc":null,"default_value":"","external_name":"key","restriction":"String"},{"name":"value","doc":null,"default_value":"","external_name":"value","restriction":""}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"self[Path.new(key)] = value"}},{"html_id":"find(key_fragment:Path)-instance-method","name":"find","doc":"Return the `Resource` value for the first key which matches all of the elements of the\nkey fragment. An exception will be raised if no key is found.","summary":"<p>Return the <code><a href=\"../Datapack/Resource.html\">Resource</a></code> value for the first key which matches all of the elements of the key fragment.</p>","abstract":false,"args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"Path"}],"args_string":"(key_fragment : Path)","args_html":"(key_fragment : Path)","location":{"filename":"src/datapack.cr","line_number":142,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L142"},"def":{"name":"find","args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"Path"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"if key_fragment.parts.first =~ (/:$/)\n  namespace = key_fragment.parts.first.rstrip(':')\nelse\n  namespace = \"default\"\nend\n@data[namespace][find_key(key_fragment)]\n"}},{"html_id":"find(key_fragment:String)-instance-method","name":"find","doc":null,"summary":null,"abstract":false,"args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"String"}],"args_string":"(key_fragment : String)","args_html":"(key_fragment : String)","location":{"filename":"src/datapack.cr","line_number":151,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L151"},"def":{"name":"find","args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"find(Path.new(key_fragment))"}},{"html_id":"find?(key_fragment:Path)-instance-method","name":"find?","doc":"Return the `Resource` value for the first key which matches all of the elements of the\nkey fragment. A `nil` will be returned if no key is found.","summary":"<p>Return the <code><a href=\"../Datapack/Resource.html\">Resource</a></code> value for the first key which matches all of the elements of the key fragment.</p>","abstract":false,"args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"Path"}],"args_string":"(key_fragment : Path)","args_html":"(key_fragment : Path)","location":{"filename":"src/datapack.cr","line_number":157,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L157"},"def":{"name":"find?","args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"Path"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"if key_fragment.parts.first =~ (/:$/)\n  namespace = key_fragment.parts.first.rstrip(':')\nelse\n  namespace = \"default\"\nend\npossible_key = find_key?(key_fragment)\npossible_key.nil? ? nil : @data[namespace][possible_key]\n"}},{"html_id":"find?(key_fragment:String)-instance-method","name":"find?","doc":null,"summary":null,"abstract":false,"args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"String"}],"args_string":"(key_fragment : String)","args_html":"(key_fragment : String)","location":{"filename":"src/datapack.cr","line_number":168,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L168"},"def":{"name":"find?","args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"find?(Path.new(key_fragment))"}},{"html_id":"find_all(key_fragment:Path)-instance-method","name":"find_all","doc":"Return all of the `Resource` values for all keys which match all of the elements of the\nkey fragment.","summary":"<p>Return all of the <code><a href=\"../Datapack/Resource.html\">Resource</a></code> values for all keys which match all of the elements of the key fragment.</p>","abstract":false,"args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"Path"}],"args_string":"(key_fragment : Path)","args_html":"(key_fragment : Path)","location":{"filename":"src/datapack.cr","line_number":132,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L132"},"def":{"name":"find_all","args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"Path"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"(find_all_keys(key_fragment)).map do |k|\n  @data[k]\nend"}},{"html_id":"find_all(key_fragment:String)-instance-method","name":"find_all","doc":null,"summary":null,"abstract":false,"args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"String"}],"args_string":"(key_fragment : String)","args_html":"(key_fragment : String)","location":{"filename":"src/datapack.cr","line_number":136,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L136"},"def":{"name":"find_all","args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"find_all_keys(Path.new(key_fragment))"}},{"html_id":"find_all_keys(key_fragment:Path)-instance-method","name":"find_all_keys","doc":"Find and return an array of all keys which match the key fragment provided as an argument.\nA key fragment is expressed as a path. Each of the elements of the path will be matched\nagainst an index of fragments, and all keys which contain all elements of the key fragment\nwill be returned.","summary":"<p>Find and return an array of all keys which match the key fragment provided as an argument.</p>","abstract":false,"args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"Path"}],"args_string":"(key_fragment : Path)","args_html":"(key_fragment : Path)","location":{"filename":"src/datapack.cr","line_number":87,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L87"},"def":{"name":"find_all_keys","args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"Path"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"parts = key_fragment.parts\nif parts.first =~ (/:$/)\n  namespace = parts.first.rstrip(':')\n  actual_parts = parts[1..-1]\nelse\n  namespace = \"default\"\n  actual_parts = parts\nend\nfirst = actual_parts.first\nrest = actual_parts[1..-1]?\nr = @index[namespace][first]\nif rest\n  rest.each do |part|\n    r = r & @index[namespace][part]\n  end\nend\nr\n"}},{"html_id":"find_all_keys(key_fragment:String)-instance-method","name":"find_all_keys","doc":null,"summary":null,"abstract":false,"args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"String"}],"args_string":"(key_fragment : String)","args_html":"(key_fragment : String)","location":{"filename":"src/datapack.cr","line_number":105,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L105"},"def":{"name":"find_all_keys","args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"find_all(Path.new(key_fragment))"}},{"html_id":"find_key(key_fragment:Path)-instance-method","name":"find_key","doc":"Find the first key which matches all of the elements of a key fragment.\nAn exception will be raised if no key is found.","summary":"<p>Find the first key which matches all of the elements of a key fragment.</p>","abstract":false,"args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"Path"}],"args_string":"(key_fragment : Path)","args_html":"(key_fragment : Path)","location":{"filename":"src/datapack.cr","line_number":111,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L111"},"def":{"name":"find_key","args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"Path"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"(find_all_keys(key_fragment)).first"}},{"html_id":"find_key(key_fragment:String)-instance-method","name":"find_key","doc":null,"summary":null,"abstract":false,"args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"String"}],"args_string":"(key_fragment : String)","args_html":"(key_fragment : String)","location":{"filename":"src/datapack.cr","line_number":115,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L115"},"def":{"name":"find_key","args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"find_key(Path.new(key_fragment))"}},{"html_id":"find_key?(key_fragment:Path)-instance-method","name":"find_key?","doc":"Find the first key which matches all of the elements of a key fragment.\nA `nil` will be returned if no key is found.","summary":"<p>Find the first key which matches all of the elements of a key fragment.</p>","abstract":false,"args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"Path"}],"args_string":"(key_fragment : Path)","args_html":"(key_fragment : Path)","location":{"filename":"src/datapack.cr","line_number":121,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L121"},"def":{"name":"find_key?","args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"Path"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"possible_keys = find_all_keys(key_fragment)\npossible_keys.empty? ? nil : possible_keys.first\n"}},{"html_id":"find_key?(key_fragment:String)-instance-method","name":"find_key?","doc":null,"summary":null,"abstract":false,"args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"String"}],"args_string":"(key_fragment : String)","args_html":"(key_fragment : String)","location":{"filename":"src/datapack.cr","line_number":126,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L126"},"def":{"name":"find_key?","args":[{"name":"key_fragment","doc":null,"default_value":"","external_name":"key_fragment","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"find_key?(Path.new(key_fragment))"}},{"html_id":"index:SplayTreeMap(String,SplayTreeMap(String,Array(Path)))-instance-method","name":"index","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : SplayTreeMap(String, SplayTreeMap(String, Array(Path)))","args_html":" : SplayTreeMap(String, SplayTreeMap(String, Array(Path)))","location":{"filename":"src/datapack.cr","line_number":19,"url":"https://github.com/wyhaines/datapack.cr/blob/bfe2067541f800a9c7ef4829c328a7ba9d1b9be8/src/datapack.cr#L19"},"def":{"name":"index","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@index"}}],"macros":[],"types":[]}]}]}})