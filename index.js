"use strict";
const fs = require("fs");
const path = require("path");
const Translation = require("./lib/translation");

for(const pathname of fs.readdirSync(path.join(__dirname, "lib/lang"))) {
  const match = /^([^\.].*)\.js$/.exec(pathname);

  if(match) {
    exports[match[1]] = new Translation(Object.freeze(require("./lib/lang/" + pathname)));
  }
}
