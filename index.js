"use strict";
const fs = require("fs");
const path = require("path");
const Translation = require("./lib/translation");

for(const pathname of fs.readdirSync(path.join(__dirname, "lib/lang"))) {
  const match = /^([^.].*)\.js$/.exec(pathname);

  if(match) {
    const template = require("./lib/lang/" + pathname);
    Object.freeze(template);
    exports[match[1]] = new Translation(template);
  }
}
