"use strict";
const fs   = require("fs"),
      path = require("path");

fs.readdirSync(path.join(__dirname, "lib/lang")).forEach(pathname => {
  const match = /^([^\.].*)\.js$/.exec(pathname);

  if(match) {
    exports[match[1]] = require("./lib/lang/" + pathname);
  }
});
