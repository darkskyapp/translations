var fs    = require("fs"),
    path  = require("path"),
    regex = /^(.+)\.js$/;

fs.readdirSync(path.join(__dirname, "lib/lang")).forEach(function(pathname) {
  var match = regex.exec(pathname);

  if(match)
    exports[match[1]] = require("./lib/lang/" + pathname);
});
