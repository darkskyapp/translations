Forecast API Translation Module
===============================

Introduction
------------

The [Forecast API][1] has, since the very beginning, included a [module for
producing textual weather summaries][2] from its weather data.  These summaries
have always been in English (since that's the only language we know) and have
always been procedurally generated (since there are so many possible weather
conditions). Procedural generation makes translating these summaries into other
languages especially difficult, because the naive approach--using a table
lookup to replace an English sentence with one of a different language--becomes
impractical, requiring a *very* large table to support!

[1]: https://developer.forecast.io/
[2]: http://www.kickstarter.com/projects/jackadam/dark-sky-hyperlocal-weather-prediction-and-visuali/posts/141049

This software module was developed in order to work around these issues. We are
modifying the Forecast API text summary code to generate a machine-readable
format rather than English; summaries of this format are then handed off to
this module for translation into the desired language. Since this module is
open-source, anyone may contribute additional language components to it, so
that the desired language can be used in the Forecast API.

The API (and therefore this module as well) is written in JavaScript, and meant
to be used as a [Node.JS][3] [module][4]. Knowledge of that environment is
required in order to contribute to this software, but this document will do its
best to provide a crash-course for developers that are not familiar with Node.

[3]: http://nodejs.org/
[4]: http://nodejs.org/api/modules.html

Getting Started
---------------

### Install Node

You will need to have [Node.JS][3] installed. You can check to see whether you
its installed by running:

    $ node -v
    v0.10.13

If it gives an error message (or a version below 0.10), you should install it
from its website and try again.

### Install Dependencies

While this package requires no dependencies to run, if you want to develop
against it you will need the test libraries [Mocha][5] and [Chai][6].
Installing them is simple:

    $ cd /path/to/forecast-api-translations
    $ npm install

[NPM][7] is the Node Package Manager, and is part of the Node software
distribution. The above command will create the directory `node_modules` which
will contain the two libraries used for development. After this, you can
verify that everything is working by running the tests:

    $ ./node_modules/.bin/mocha
    
      ․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․
    
      36 passing (30 ms)

[5]: http://visionmedia.github.io/mocha/
[6]: http://chaijs.com/
[7]: https://npmjs.org/

Input Format
------------

The data passed from the Forecast API to this translation module is a simple,
structured format reminiscent of [s-expressions][8], consisting only of
numbers, strings, and arrays. Some examples produced by the API are below:

*   `"heavy-rain"`
*   `["and", "light-wind", "light-clouds"]`
*   `["starting-in", "very-light-rain", ["minutes", 15]]`

Each of these expressions corresponds to a text summary in English:

*   "heavy rain"
*   "breezy and partly cloudy"
*   "drizzle starting in 15 minutes"

Generally speaking, numbers and strings represent specific terms, while arrays
represent structure compositions of those terms (with the first element in that
array representing the *type* of composition). For example, in the sentence
above, `"light-wind"` represents the English term "breezy", `"light-clouds"`
represents the English term "partly cloudy", and the array `["and", X, Y]`
represents the English phrase "X and Y".

In this way, the meaning (in English) of any given (machine-readable)
expression is intended to be fairly intuitive. However, a full list of terms
and structural compositions is given below in Appendix A anyway.

[8]: https://en.wikipedia.org/wiki/S-expression

Adding a Translation
--------------------

### Translation Submodules

There is one translation submodule per language, all found in the `/lib/lang`
directory. Each submodule is a single JavaScript function, taking a single
argument (the expression described in the previous section) and returning a
string representing that expression translated into the desired expression.

    module.exports = function(expression) {
      var translation;

      /* ... do magic here ... */

      return translation;
    }

Any JavaScript source files in the `/lib/lang` directory are automatically
loaded by the library at run-time, so nothing further needs to be done once
that file is created.

### The Template Helper Library

There is a small library sitting in `/lib/template.js` that can simplify the
process of creating a translation submodule. If given an associative array of
*translation templates* and an expression (as described above), it will look up
the relevant template in the array and apply it to the expression, recursively
as necessary.

For example, suppose we have the following associative array:

    {
      "very-light-rain": "drizzle",
      "minutes": function(n) {
        return n + " minutes";
      },
      "starting-in": function(rain, time) {
        return rain + " starting in " + time;
      }
    }

And the expression noted above:

    ["starting-in", "very-light-rain", ["minutes", 15]]

The following algorithm will be applied:

1.  The function will first look at the expression `["starting-in", X, Y]` and
    find that there is a corresponding function in the associative array with
    two arguments. It will then recursively apply the procedure on these two
    arguments.

2.  The function will then look at the expression `"very-light-rain"`. There is
    also a match in the associative array, so this expression will be replaced
    with `"drizzle"`.

3.  The function will then look at the expression `["minutes", 15]`. There is
    once again a match in the associative array, for a function with a single
    argument. The function will once again recursively apply the procedure on
    the argument.

4.  The function will look at the expression `15`. Being a simple number, it
    will simply return it verbatim.

5.  Having it's single argument collected, `["minutes", 15]` is now replaced
    with the expression `"15 minutes"`.

6.  Finally, with the two arguments of `["starting-in", X, Y]` collected, they
    are substituted in and a final expression is returned: `"drizzle starting
    in 15 minutes"`.

Any arbitrary JavaScript code may be used in a function, but in many templating
scenarios, only simple string concatenation is necessary. In these cases, a
shortcut syntax is also allowed:

    {
      "very-light-rain": "drizzle",
      "minutes": "$1 minutes",
      "starting-in": "$1 starting in $2"
    }

The sigiled expressions are replaced with the numbered argument to the function
(`$1` with the first argument, `$2` with the second, and so on).

Making use of this library is straightforward: simply call it with an
associative array, and it will return your submodule function for you:

    module.exports = require("../template")(/* INSERT ASSOC. ARRAY HERE */);

Finally, see `/lib/lang/english.js` for an example of this in action.

### Writing Tests

Once a new translation module has been created, it is advisable to write tests
for it to ensure its correctness. (In fact, it may be advisable to write the
tests beforehand!) Much of the work of this has been done for you; simply
create the file `/test-cases/<language>.json`. This file should contain an
associative array of translated sentences to the expression used to generate
them:

    {
      "drizzle starting in 15 minutes":
        ["starting-in", "very-light-rain", ["minutes", 15]]
    }

The English test cases (`/test-cases/english.json`) may be used as an example
and starting place. As noted above, you can verify your tests by running
`./node_modules/.bin/mocha`. Pull requests without a full suite of passing
tests will not be accepted.

Appendix A: Forecast Summary Format
-----------------------------------

### Terms

#### Weather Conditions

*   `"clear"` (Eng. "clear"): no significant weather of any kind.
*   `"no-precipitation"` (Eng. "no precipitation"): no precipitation (though
    other weather conditions may or may not be occuring). Used in weekly
    summaries where "clear" is not appropriate.
*   `"mixed-precipitation"` (Eng. "mixed precipitation"): multiple types of
    precipitation (e.g. rain *and* snow). Used in weekly summaries where more
    than one type of precipitation is expected.
*   `"very-light-precipitation"` (Eng. "light precipitation"): very light
    precipitation of an unknown type. Used when the intensity, but not the
    type, of precipitation is known. (This is a rare occurrance.)
*   `"light-precipitation"` (Eng. "light precipitation"): light precipitation
    of an unknown type. Used when the intensity, but not the type, of
    precipitation is known. (This is a rare occurrance.)
*   `"medium-precipitation"` (Eng. "precipitation"): moderate precipitation of
    an unknown type. Used when the intensity, but not the type, of
    precipitation is known. (This is a rare occurrance.)
*   `"heavy-precipitation"` (Eng. "heavy precipitation"): heavy precipitation
    of an unknown type. Used when the intensity, but not the type, of
    precipitation is known. (This is a rare occurrance.)
*   `"very-light-rain"` (Eng. "drizzle"): very light liquid rain, of occasional
    small droplets.
*   `"light-rain"`
*   `"medium-rain"`
*   `"heavy-rain"`
*   `"very-light-sleet"`
*   `"light-sleet"`
*   `"medium-sleet"`
*   `"heavy-sleet"`
*   `"very-light-snow"` (Eng. "flurries"): very light solid rain in the form of
    occasional, small snowflakes.
*   `"light-snow"`
*   `"medium-snow"`
*   `"heavy-snow"`
*   `"light-wind"`
*   `"medium-wind"`
*   `"heavy-wind"`
*   `"very-heavy-wind"`
*   `"low-humidity"`
*   `"high-humidity"`
*   `"fog"` (Eng. "foggy"): airborne water particles causing visibility of less
    than a kilometer or so.
*   `"light-clouds"`
*   `"medium-clouds"`
*   `"heavy-clouds"`

#### Times of Day

*   `"morning"`
*   `"afternoon"`
*   `"evening"`
*   `"night"`
*   `"today-morning"`
*   `"later-today-morning"`
*   `"today-afternoon"`
*   `"later-today-afternoon"`
*   `"today-evening"`
*   `"later-today-evening"`
*   `"today-night"`
*   `"later-today-night"`
*   `"tomorrow-morning"`
*   `"tomorrow-afternoon"`
*   `"tomorrow-evening"`
*   `"tomorrow-night"`

#### Days of Week

*   `"today"`
*   `"tomorrow"`
*   `"sunday"`
*   `"monday"`
*   `"tuesday"`
*   `"wednesday"`
*   `"thursday"`
*   `"friday"`
*   `"saturday"`

### Structural Compositions

All compositions listed below are followed by a slash and the number of
arguments they take. (There are no cases when a composition can have a variable
number of arguments.)

#### Structural

*   `"title"`/1
*   `"sentence"`/1

#### Units

*   `"minutes"`/1
*   `"fahrenheit"`/1
*   `"celsius"`/1

#### Conjunctions

*   `"and"`/2
*   `"through"`/2
*   `"with"`/2

#### Clauses

*   `"for-hour"`/1 (Eng. "X for the hour"): used for next-hour summaries. X is
    always either `"clear"` or a type of precipitation.
*   `"for-day"`/1
*   `"for-week"`/1
*   `"over-weekend"`/1
*   `"during"`/2
*   `"starting-in"`/2 (Eng. "X starting in Y"): used for next-hour summaries. X
    is always a type of precipitation, and Y is always a time in minutes.
*   `"stopping-in"`/2 (Eng. "X stopping in Y"): used for next-hour summaries. X
    is always a type of precipitation, and Y is always a time in minutes.
*   `"starting-then-stopping-later"`/3
*   `"stopping-then-starting-later"`/3
*   `"starting"`/2 (Eng. "X starting Y"): as `"starting-in"` but used for
    next-24-hour summaries. X is a weather condition (or two weather conditions
    combined with `"and"`) and Y is a time of day.
*   `"until"`/2 (Eng. "X until Y"): as `"stopping-in"` but used for
    next-24-hour summaries. X is a weather condition (or two weather conditions
    combined with `"and"`) and Y is a time of day.
*   `"starting-continuing-until"`/3
*   `"until-starting-again"`/3
*   `"temperatures-peaking"`/2 (Eng. "temperatures peaking at X on Y"): used
    for next-week summaries, is used to convey which day will be hottest in the
    next week. X is always a temperature in Fahrenheit or Celsius, and Y is a
    day of the week.
*   `"temperatures-rising"`/2 (Eng. "temperatures rising to X on Y"): used for
    next-week summaries, is used to convey that temperatures gradually rise for
    the entire week. X is always a temperature in Fahrenheit or Celsius, and Y
    is a day of the week.
*   `"temperatures-valleying"`/2 (Eng. "temperatures bottoming out at X on Y"):
    used for next-week summaries, is used to convey which day will be coldest
    in the next week. X is always a temperature in Fahrenheit or Celsius, and Y
    is a day of the week.
*   `"temperatures-falling"`/2 (Eng. "temperatures falling to X on Y"): used
    for next-week summaries, is used to convey that temperatures gradually fall
    for the entire week. X is always a temperature in Fahrenheit or Celsius,
    and Y is a day of the week.
