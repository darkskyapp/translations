var fs   = require("fs"),
    path = require("path");

fs.readdirSync(path.join(__dirname, "lib/lang")).forEach(function(pathname) {
  var match = /^([^\.].*)\.js$/.exec(pathname);

  if(match)
    exports[match[1]] = require("./lib/lang/" + pathname);
});
