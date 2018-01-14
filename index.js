"use strict";
const fs = require("fs");
const path = require("path");

for(const pathname of fs.readdirSync(path.join(__dirname, "lib/lang"))) {
  const match = /^([^\.].*)\.js$/.exec(pathname);

  if(match) {
    exports[match[1]] = require("./lib/lang/" + pathname);
  }
}
