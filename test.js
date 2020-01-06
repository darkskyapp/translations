"use strict";
const assert = require("assert");
const Translation = require("./lib/translation");
const translations = require("./");

describe("translations", () => {
  describe("Translation", () => {
    const test = new Translation({
      "foo": "bar",
      "bar": "meeple $2",
      "baz": (a, b) => "meeple " + b,
      "quux": () => "glorple",
    });

    it("should return a number in string form", () => {
      assert.strictEqual(test.translate(42), "42");
    });

    it("should throw an error given an unrecognized string", () => {
      assert.throws(() => { test.translate("42"); });
    });

    it("should apply an expected value conversion", () => {
      assert.strictEqual(test.translate("foo"), "bar");
    });

    it("should throw an error given a value expected to be a string", () => {
      assert.throws(() => { test.translate("bar"); });
    });

    it("should throw an error given a value expected to be a function", () => {
      assert.throws(() => { test.translate("baz"); });
    });

    it("should throw an error given an empty array", () => {
      assert.throws(() => { test.translate([]); });
    });

    it("should apply a string template", () => {
      assert.strictEqual(test.translate(["bar", 10, 20]), "meeple 20");
    });

    it("should fail to apply a function with the wrong arity", () => {
      assert.throws(() => { test.translate(["baz", 10, 20, 30]); });
    });

    it("should apply a function template", () => {
      assert.strictEqual(test.translate(["baz", 10, 20]), "meeple 20");
    });

    it("should recursively apply function templates", () => {
      // Actually, a "meeple meeple bar" sounds like it'd be a pretty tasty
      // candy treat.
      assert.strictEqual(
        test.translate(["bar", 10, ["baz", 20, "foo"]]),
        "meeple meeple bar"
      );
    });

    it("should throw an error given undefined", () => {
      assert.throws(() => { test.translate(undefined); });
    });

    it("should throw an error given null", () => {
      assert.throws(() => { test.translate(null); });
    });

    it("should throw an error given an object", () => {
      assert.throws(() => { test.translate({}); });
    });

    it("should apply a zero-argument function", () => {
      assert.strictEqual(test.translate("quux"), "glorple");
    });

    it("should fail to apply a zero-argument function given arguments", () => {
      assert.throws(() => { test.translate(["quux"]); });
    });

    it("should fail to apply a function template given a value", () => {
      assert.throws(() => { test.translate("baz"); });
    });

    it("should provide context to functions", () => {
      const test = new Translation({
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
        },
      });

      test.translate(["foo", "bar", ["baz", "quux"], ["neem", ["glorp", 42]]]);
    });
  });

  describe("languages", () => {
    for(const lang in translations) {
      describe(lang, () => {
        const translation = translations[lang];
        const cases = require("./test_cases/" + lang);

        for(const summary in cases) {
          const source = cases[summary];

          it(
            "should translate " + JSON.stringify(source) +
              " to " + JSON.stringify(summary),
            () => assert.strictEqual(translation.translate(source), summary)
          );
        }
      });
    }
  });
});
