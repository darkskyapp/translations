var expect      = require("chai").expect,
    fs          = require("fs"),
    path        = require("path"),
    translation = require("./"),
    util        = require("util");

describe("translation", function() {
  fs.readdirSync(path.join(__dirname, "test-cases")).forEach(function(lang) {
    if(lang.charAt(0) === ".")
      return;

    var name      = path.basename(lang, ".json"),
        translate = translation[name];

    describe(name, function() {
      var cases = JSON.parse(
            fs.readFileSync(path.join(__dirname, "test-cases", lang))
          );
          
      Object.keys(cases).forEach(function(summary) {
        var source = cases[summary];

        it(
          util.format("should translate %j to \"%s\"", source, summary),
          function() {
            expect(translate(source)).to.equal(summary);
          }
        );
      });
    });
  });
});
