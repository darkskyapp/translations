var expect      = require("chai").expect,
    fs          = require("fs"),
    path        = require("path"),
    template    = require("./lib/template"),
    translation = require("./"),
    util        = require("util");

describe("translation", function() {
  describe("template", function() {
    var convert = template({
          "foo": "bar",
          "bar": "meeple $2",
          "baz": function(a, b) { return "meeple " + b; }
        });

    it("should return a number in string form", function() {
      expect(convert(42)).to.equal("42");
    });

    it("should throw an error given an unrecognized string", function() {
      expect(function() { convert("42"); }).to.throw();
    });

    it("should apply an expected value conversion", function() {
      expect(convert("foo")).to.equal("bar");
    });

    it("should throw an error given a value that's expected to be a string template", function() {
      expect(function() { convert("bar"); }).to.throw();
    });

    it("should throw an error given a value that's expected to be a function template", function() {
      expect(function() { convert("baz"); }).to.throw();
    });

    it("should throw an error given an empty array", function() {
      expect(function() { convert([]); }).to.throw();
    });

    it("should apply a string template", function() {
      expect(convert(["bar", 10, 20])).to.equal("meeple 20");
    });

    it("should apply a function template", function() {
      expect(convert(["baz", 10, 20])).to.equal("meeple 20");
    });

    it("should recursively apply function templates", function() {
      /* Actually, a "meeple meeple bar" sounds like it'd be a pretty tasty
       * candy treat. */
      expect(convert(["bar", 10, ["baz", 20, "foo"]])).to.equal("meeple meeple bar");
    });

    it("should throw an error given undefined", function() {
      expect(function() { convert(undefined); }).to.throw();
    });

    it("should throw an error given null", function() {
      expect(function() { convert(null); }).to.throw();
    });

    it("should throw an error given an object", function() {
      expect(function() { convert({}); }).to.throw();
    });
  });

  describe("language", function() {
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
});
