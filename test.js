var assert      = require("assert"),
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
          "baz": function(a, b) { return "meeple " + b; },
          "quux": function() { return "glorple"; }
        });

    it("should return a number in string form", function() {
      assert.strictEqual(convert(42), "42");
    });

    it("should throw an error given an unrecognized string", function() {
      assert.throws(function() { convert("42"); });
    });

    it("should apply an expected value conversion", function() {
      assert.strictEqual(convert("foo"), "bar");
    });

    it("should throw an error given a value that's expected to be a string template", function() {
      assert.throws(function() { convert("bar"); });
    });

    it("should throw an error given a value that's expected to be a function template", function() {
      assert.throws(function() { convert("baz"); });
    });

    it("should throw an error given an empty array", function() {
      assert.throws(function() { convert([]); });
    });

    it("should apply a string template", function() {
      assert.strictEqual(convert(["bar", 10, 20]), "meeple 20");
    });

    it("should fail to apply a function template given the wrong number of arguments", function() {
      assert.throws(function() { convert(["baz", 10, 20, 30]); });
    });

    it("should apply a function template", function() {
      assert.strictEqual(convert(["baz", 10, 20]), "meeple 20");
    });

    it("should recursively apply function templates", function() {
      /* Actually, a "meeple meeple bar" sounds like it'd be a pretty tasty
       * candy treat. */
      assert.strictEqual(convert(["bar", 10, ["baz", 20, "foo"]]), "meeple meeple bar");
    });

    it("should throw an error given undefined", function() {
      assert.throws(function() { convert(undefined); });
    });

    it("should throw an error given null", function() {
      assert.throws(function() { convert(null); });
    });

    it("should throw an error given an object", function() {
      assert.throws(function() { convert({}); });
    });

    it("should apply an expected value conversion given a zero-argument function", function() {
      assert.strictEqual(convert("quux"), "glorple");
    });

    it("should fail to apply a zero-argument function given arguments", function() {
      assert.throws(function() { convert(["quux"]); });
    });

    it("should fail to apply a function template given a value", function() {
      assert.throws(function() { convert("baz"); });
    });

    it("should provide context to functions", function() {
      var convert = template({
            "foo": function(a, b, c) {
              assert.deepEqual(this, ["foo"]);
              return "Moop.";
            },
            "bar": function() {
              assert.deepEqual(this, ["foo", "bar"]);
              return "Boop.";
            },
            "baz": function(a) {
              assert.deepEqual(this, ["foo", "baz"]);
              return "Soup.";
            },
            "quux": function() {
              assert.deepEqual(this, ["foo", "baz", "quux"]);
              return "Floop.";
            },
            "neem": function(a) {
              assert.deepEqual(this, ["foo", "neem"]);
              return "Bloop.";
            },
            "glorp": function(a) {
              assert.deepEqual(this, ["foo", "neem", "glorp"]);
              return "Rope?";
            }
          });

      convert(["foo", "bar", ["baz", "quux"], ["neem", ["glorp", 42]]]);
    });
  });

  describe("language", function() {
    fs.readdirSync(path.join(__dirname, "test_cases")).forEach(function(lang) {
      if(lang.charAt(0) === ".")
        return;

      var name      = path.basename(lang, ".json"),
          translate = translation[name];

      describe(name, function() {
        var cases = JSON.parse(
              fs.readFileSync(path.join(__dirname, "test_cases", lang), "utf8")
            );
            
        Object.keys(cases).forEach(function(summary) {
          var source = cases[summary];

          it(
            util.format("should translate %j to \"%s\"", source, summary),
            function() {
              assert.strictEqual(translate(source), summary);
            }
          );
        });
      });
    });
  });
});
