"use strict";
const assert      = require("assert"),
      fs          = require("fs"),
      path        = require("path"),
      template    = require("./lib/template"),
      translation = require("./"),
      util        = require("util");

describe("translation", () => {
  describe("template", () => {
    const convert = template({
            "foo": "bar",
            "bar": "meeple $2",
            "baz": (a, b) => "meeple " + b,
            "quux": () => "glorple",
          });

    it("should return a number in string form", () => {
      assert.strictEqual(convert(42), "42");
    });

    it("should throw an error given an unrecognized string", () => {
      assert.throws(() => { convert("42"); });
    });

    it("should apply an expected value conversion", () => {
      assert.strictEqual(convert("foo"), "bar");
    });

    it("should throw an error given a value expected to be a string", () => {
      assert.throws(() => { convert("bar"); });
    });

    it("should throw an error given a value expected to be a function", () => {
      assert.throws(() => { convert("baz"); });
    });

    it("should throw an error given an empty array", () => {
      assert.throws(() => { convert([]); });
    });

    it("should apply a string template", () => {
      assert.strictEqual(convert(["bar", 10, 20]), "meeple 20");
    });

    it("should fail to apply a function with the wrong arity", () => {
      assert.throws(() => { convert(["baz", 10, 20, 30]); });
    });

    it("should apply a function template", () => {
      assert.strictEqual(convert(["baz", 10, 20]), "meeple 20");
    });

    it("should recursively apply function templates", () => {
      /* Actually, a "meeple meeple bar" sounds like it'd be a pretty tasty
       * candy treat. */
      assert.strictEqual(
        convert(["bar", 10, ["baz", 20, "foo"]]),
        "meeple meeple bar"
      );
    });

    it("should throw an error given undefined", () => {
      assert.throws(() => { convert(undefined); });
    });

    it("should throw an error given null", () => {
      assert.throws(() => { convert(null); });
    });

    it("should throw an error given an object", () => {
      assert.throws(() => { convert({}); });
    });

    it("should apply a zero-argument function", () => {
      assert.strictEqual(convert("quux"), "glorple");
    });

    it("should fail to apply a zero-argument function given arguments", () => {
      assert.throws(() => { convert(["quux"]); });
    });

    it("should fail to apply a function template given a value", () => {
      assert.throws(() => { convert("baz"); });
    });

    it("should provide context to functions", () => {
      const convert = template({
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

  describe("language", () => {
    fs.readdirSync(path.join(__dirname, "test_cases")).forEach(lang => {
      if(lang.charAt(0) === ".") {
        return;
      }

      const name      = path.basename(lang, ".json"),
            translate = translation[name];

      describe(name, () => {
        const cases = JSON.parse(
                fs.readFileSync(
                  path.join(__dirname, "test_cases", lang),
                  "utf8"
                )
            );
            
        Object.keys(cases).forEach(summary => {
          const source = cases[summary];

          it(
            util.format("should translate %j to \"%s\"", source, summary),
            () => {
              assert.strictEqual(translate(source), summary);
            }
          );
        });
      });
    });
  });
});
