Dark Sky API Translation Module
===============================

Introduction
------------

The [Dark Sky API][1] has, since the very beginning, included a [module for
producing textual weather summaries][2] from its weather data.  These summaries
have always been in English (since that's the only language we know) and have
always been procedurally generated (since there are so many possible weather
conditions). Procedural generation makes translating these summaries into other
languages especially difficult, because the naive approach—using a table
lookup to replace an English sentence with one of a different language—becomes
impractical, requiring a *very* large table to support!

[1]: https://darksky.net/dev/
[2]: http://www.kickstarter.com/projects/jackadam/dark-sky-hyperlocal-weather-prediction-and-visuali/posts/141049

This software module was developed in order to work around these issues. We are
modifying the Dark Sky API text summary code to generate a machine-readable
format (described below) rather than it's usual English; summaries in this new
format are then handed off to this module for translation into the desired
language. Since this module is open-source, anyone may contribute additional
language components to it, so that the desired language can be used in the
Dark Sky API.

The API (and therefore this module as well) is written in JavaScript, and meant
to be used as a [Node.JS][3] [module][4]. Knowledge of that environment is
required in order to contribute to this software, but this document will do its
best to provide a crash-course for developers that are not familiar with Node.

[3]: http://nodejs.org/
[4]: http://nodejs.org/api/modules.html

Getting Started
---------------

### Install Node

You will need to have [Node.JS][3] installed. You can check to see whether it
is installed by running:

    $ node -v
    v0.10.26

If the command gives an error message (or a version below 0.10), you should
install Node from the Node.JS website and try again.

### Install Dependencies

While this package requires no dependencies to run in production, if you want
to develop against it you will need the testing library [Mocha][5]. Installing
it is simple:

    $ cd /path/to/forecast-io-translations
    $ npm install

[NPM][6] is the Node Package Manager, and is part of the Node software
distribution. The above command will create the directory `node_modules` which
will contain the testing library. After this, you can verify that everything is
working by running the tests:

    $ npm test
    
    > forecast-io-translations@1.8.1 test /Users/jason/src/forecast-io-translations
    > mocha --reporter dot --check-leaks
      
      ․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․
      ․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․
      ․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․
      ․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․
      ․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․
      ․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․
      ․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․
      ․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․
      ․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․
      ․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․․
      ․․․․․․․․․․․․․․․

      615 passing (343ms)

[5]: http://visionmedia.github.io/mocha/
[6]: https://npmjs.org/

Input Format
------------

The data passed from the Dark Sky API to this translation module is a simple,
structured format reminiscent of [s-expressions][7], consisting only of
numbers, strings, and arrays. Some examples produced by the API are below:

*   `"heavy-rain"`
*   `["and", "light-wind", "light-clouds"]`
*   `["starting-in", "very-light-rain", ["minutes", 15]]`

Each of these expressions corresponds to a text summary in English:

*   "heavy rain"
*   "breezy and partly cloudy"
*   "drizzle starting in 15 minutes"

Generally speaking, numbers and strings represent specific terms, while arrays
represent templates dependent upon some number of arguments (with the first
element in that array representing the form of the template). For example, in
the sentence above, `"light-wind"` represents the English term "breezy",
`"light-clouds"` represents the English term "partly cloudy", and the array
`["and", X, Y]` represents the English phrase "X and Y".

In this way, the meaning (in English) of any given (machine-readable)
expression is intended to be fairly intuitive. However, a complete description
of the input format is given below in Appendix A anyway.

[7]: https://en.wikipedia.org/wiki/S-expression

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

4.  The function will look at the expression `15`. Being a number, it will
    simply return it verbatim.

5.  Having it's single argument collected, `["minutes", 15]` is now replaced
    with the expression `"15 minutes"`, as per the code of the function for
    `"minutes"`.

6.  Finally, with the two arguments of `["starting-in", X, Y]` collected, they
    are substituted into the function and a final expression is returned:
    `"drizzle starting in 15 minutes"`.

Any arbitrary JavaScript code may be used in a function, but in many templating
scenarios, only simple string concatenation is necessary. In these cases, a
shortcut syntax is also allowed:

    {
      "very-light-rain": "drizzle",
      "minutes": "$1 minutes",
      "starting-in": "$1 starting in $2"
    }

The [sigiled][8] expressions are replaced with the numbered argument to the
function (`$1` with the first argument, `$2` with the second, and so on).

Finally, if you need the extra power, each function's `this` parameter is set
to an array representing the called function's position in the expression tree.
For example, in the example above, the `"minutes"` function is passed `this`
with a value of `["starting-in", "minutes"]` since `"minutes"` is a child of
the `"starting-in"` template. (This is handy for languages like Dutch or German
where, I hear, that the ordering of words are important.)

Making use of this library is straightforward: simply call it with an
associative array, and it will return your submodule function for you:

    module.exports = require("../template")(/* INSERT ASSOC. ARRAY HERE */);

Please see `/lib/lang/en.js` for an example of this in action.

[8]: http://en.wikipedia.org/wiki/Sigil_(computer_programming)

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
tests will not be accepted. Please make every effort to ensure that your tests
provide as full code coverage as possible.

General Considerations
----------------------

When translating text summaries, please keep the following in mind:

*   Text summaries are often used by API consumers in headings: **be as brief
    as possible,** and use abbreviations where appropriate.
*   It is simpler to maintain one version of a language than two: **avoid
    dialectal or regional variations** if at all possible. (For example, we try
    to maintain one version of English, despite the several major, distinct
    English variants—American English, British English, etc. We have had to
    alter terminology a few times to avoid generating insulting summaries!)
*   **Try to keep the text as natural as possible,** so that it is easily
    intelligible to an average reader. (Yes, we know this conflicts with
    brevity, but try your best!)

Appendix A: Dark Sky Summary Format
-----------------------------------

Below is a listing of every possible machine-readable summary produced by
Dark Sky. The listing is recursive so as to better describe how the various
structural components interact.

### Moment Summaries

When the API is producing a text summary for a single moment in time (that is,
`currently.summary` and `hourly.data[N].summary`), summaries of the following
structure are produced:

*   `["title", WEATHER_CONDITION]`
*   `["title", ["and", WEATHER_CONDITION, WEATHER_CONDITION]]`

The `"title"` component is never used in any other situation, and signifies
that (in English, anyway) these conditions represent phrases rather than
complete sentences; as such, they are capitalized like a *title* (that is, each
word is capitalized and there is no punctuation). For all below cases, the
`"summary"` component wraps the construction (signifying that the summary
represents a full, English sentence, meaning that only the first word is
capitalized, and the sentence is to end with a period).

`"and"` is used all over the place. Sorry.

### Hour Summaries

For text summaries for the next hour (that is, `minutely.summary`), summaries
of the following formats are produced:

*   `["sentence", ["for-hour", WEATHER_CONDITION]]`
*   `["sentence", ["starting-in", PRECIPITATION_TYPE, ["minutes", NUMBER]]]`
*   `["sentence", ["stopping-in", PRECIPITATION_TYPE, ["minutes", NUMBER]]]`
*   `["sentence", ["starting-then-stopping-later", PRECIPITATION_TYPE, ["minutes", NUMBER], ["minutes", NUMBER]]]`
*   `["sentence", ["stopping-then-starting-later", PRECIPITATION_TYPE, ["minutes", NUMBER], ["minutes", NUMBER]]]`

Except for the first case, each such summary only takes precipitation into
account, and tells how the intensity of precipitation will vary over the next
hour or so.

`"for-hour"`, `"starting-in"`, `"stopping-in"`,
`"starting-then-stopping-later"`, `"stopping-then-starting-later"`, and
`"minutes"` are only used as above.

### Day Summaries

Day summaries are produced by the API when a duration of 24 hours is under
consideration (that is, `hourly.summary` and `daily.data[N].summary`). They are
the most complex summaries in the API, owing to the number of possible
combinations of the various terms. They are of the following formats:

*   `["sentence", DAY_CONDITION_SUMMARY]`
*   `["sentence", ["and", DAY_CONDITION_SUMMARY, DAY_CONDITION_SUMMARY]]`

#### Day Condition Summaries

A "day condition" represents a specific weather condition at a specific time of
day. (Or a larger period of the day, as the case may be.)

*   `["for-day", WEATHER_CONDITION]`
*   `["during", WEATHER_CONDITION, TIME_OF_DAY]`
*   `["during", WEATHER_CONDITION, ["and", TIME_OF_DAY, TIME_OF_DAY]]`
*   `["starting", WEATHER_CONDITION, TIME_OF_DAY]`
*   `["until", WEATHER_CONDITION, TIME_OF_DAY]`
*   `["starting-continuing-until", WEATHER_CONDITION, TIME_OF_DAY, TIME_OF_DAY]`
*   `["until-starting-again", WEATHER_CONDITION, TIME_OF_DAY, TIME_OF_DAY]`

`"for-day"`, `"starting"`, `"until"`, `"starting-continuing-until"`, and
`"until-starting-again"` are only used in the above manner, and may be
considered analagous to the five similar cases in hourly summaries. `"during"`
is used both here and in weekly summaries, below.

#### Times of Day

Daily summaries covering a specific day use the following time periods:

*   `"morning"`
*   `"afternoon"`
*   `"evening"`
*   `"night"`

Daily summaries covering the next 24 hours (as in a forecast) use the following
time periods instead:

*   `"today-morning"`
*   `"today-afternoon"`
*   `"today-evening"`
*   `"today-night"`
*   `"later-today-morning"`
*   `"later-today-afternoon"`
*   `"later-today-evening"`
*   `"later-today-night"`
*   `"tomorrow-morning"`
*   `"tomorrow-afternoon"`
*   `"tomorrow-evening"`
*   `"tomorrow-night"`

In general, the most specific case is used. (For example, if it is currently
afternoon and a weather condition would occur later in the afternoon,
`"later-today-afternoon"` would be used. If it was any other time of day,
`"today-afternoon"` would be used.)

The exact times that each duration begins or ends is not intended to be
critical, and nonprecise terminology should be used if possible. However, for
aid in translation, the time periods currently correspond to the following:

*   **morning:**   04:00  (4am) to 12:00 (12pm)
*   **afternoon:** 12:00 (12pm) to 17:00  (5pm)
*   **evening:**   17:00  (5pm) to 22:00 (10pm)
*   **night:**     22:00 (10pm) to 04:00  (4am)

### Week Summaries

For summaries spanning an entire week (`daily.summary`), the following format
is used:

*   `["sentence", ["with", WEEKLY_PRECIPITATION_SUMMARY, WEEKLY_TEMPERATURE_SUMMARY]]`

Since an entire week is a very broad span of time, we concern ourselves only
with the most broadly applicable information: which days will have rain, and
how the temperatures will fluctuate. The sentence is broken into two parts,
which each comprise one of the above.

`"with"` is not used in any other way.

#### Weekly Precipitation Summary

A "weekly precipitation summary" is used to describe which days of the week are
expected to have rain, as compactly as possible.

*   `["for-week", PRECIPITATION_TYPE]`
*   `["over-weekend", PRECIPITATION_TYPE]`
*   `["during", PRECIPITATION_TYPE, DAY_OF_WEEK]`
*   `["during", PRECIPITATION_TYPE, ["and", DAY_OF_WEEK, DAY_OF_WEEK]]`
*   `["during", PRECIPITATION_TYPE, ["through", DAY_OF_WEEK, DAY_OF_WEEK]]`

`"for-week"`, `"over-weekend"`, and `"through"` are both only used as above.
`"during"` is used both here and in daily summaries.

#### Weekly Temperature Summary

A "weekly temperature summary" describes the general pattern of temperatures
over the course of the next week: whether they'll get hotter, colder,
hotter-then-colder, or colder-then-hotter.

*   `["temperatures-rising", TEMPERATURE, DAY_OF_WEEK]`
*   `["temperatures-falling", TEMPERATURE, DAY_OF_WEEK]`
*   `["temperatures-peaking", TEMPERATURE, DAY_OF_WEEK]`
*   `["temperatures-valleying", TEMPERATURE, DAY_OF_WEEK]`

`"temperatures-peaking"`, `"temperatures-valleying"`, `"temperatures-rising"`,
and `"temperatures-falling"` are all only used as above.

#### Temperatures

*   `["fahrenheit", NUMBER]`
*   `["celsius", NUMBER]`

Every language should support both temperature units, as the choice of language
and units are separate options in the API (and can be mixed-and-matched as
desired).

#### Days of the Week

*   `"today"`
*   `"tomorrow"`
*   `"sunday"`
*   `"monday"`
*   `"tuesday"`
*   `"wednesday"`
*   `"thursday"`
*   `"friday"`
*   `"saturday"`
*   `"next-sunday"`
*   `"next-monday"`
*   `"next-tuesday"`
*   `"next-wednesday"`
*   `"next-thursday"`
*   `"next-friday"`
*   `"next-saturday"`

`"today"` and `"tomorrow"` are used in preference to the other cases. The
`"next-*"` cases are used when the day in question is a week from today (e.g.
if today is Wednesday, and we expect rain a week from today, then the summary
would be `["during", "rain", "next-wednesday"]`.

### Weather Conditions

#### Precipitation Types

*   `"no-precipitation"`: Represents no precipitation. Only used in "weekly
    precipitation summary" blocks. (This condition is in contrast to `"clear"`,
    which represents no significant weather of any kind.)
*   `"mixed-precipitation"`: Represents multiple types of precipitation, such
    as both rain and snow. Only used in "weekly precipitation summary" blocks;
    in all other cases, the predominate type of precipitation is used.
*   `GENERIC_TYPE`
*   `RAIN_TYPE`
*   `SLEET_TYPE`
*   `SNOW_TYPE`
*   `["parenthetical", SNOW_TYPE, SNOW_ACCUMULATION]`: For daily or weekly
    summaries, if a significant amount of snow is expected, we will qualify it
    with the amount of expected snow accumulation on the ground. (For example,
    "snow (3-4 in.) throughout the day".)

In each of the below precipitation types, the intensity of precipitation is
(very approximately) as follows:

*   `"very-light-X"`: 0–0.4 mm/hr
*   `"light-X"`: 0.4–2.5 mm/hr
*   `"medium-X"`: 2.5–10 mm/hr
*   `"heavy-X"`: 10 mm/hr

Snow intensities are (also very approximately) one-third of these. (That is,
`"heavy-snow"` is more like 3 mm/hr.) However, these are only intended as a
rough guide, as these values change over time as we fine-tune our system.

##### Generic Types

Generic precipitation forms are used when we don't have information regarding
the exact type of precipitation expected. (This is a rare occurance.)

*   `"possible-very-light-precipitation"`
*   `"very-light-precipitation"`
*   `"possible-light-precipitation"`
*   `"light-precipitation"`
*   `"medium-precipitation"`
*   `"heavy-precipitation"`

##### Rain Types

Rain precipitation forms represent liquid precipitation.

*   `"possible-very-light-rain"`
*   `"very-light-rain"`
*   `"possible-light-rain"`
*   `"light-rain"`
*   `"medium-rain"`
*   `"heavy-rain"`

##### Sleet Types

Sleet precipitation forms represent sleet, freezing rain, or ice pellets, of
the sort that generally occur in winter when temperatures are around freezing.

*   `"possible-very-light-sleet"`
*   `"very-light-sleet"`
*   `"possible-light-sleet"`
*   `"light-sleet"`
*   `"medium-sleet"`
*   `"heavy-sleet"`

##### Snow Types

Snow precipitation forms represent solid precipitation in the form of
snowflakes.

*   `"possible-very-light-snow"`
*   `"very-light-snow"`
*   `"possible-light-snow"`
*   `"light-snow"`
*   `"medium-snow"`
*   `"heavy-snow"`

##### Snow Accumulation

Represents a distance measurement indicating the amount of snow accumulation is
expected. These take the form of "N inches", "under N inches", or "M-N inches"
in English, respectively.

*   `["inches", NUMBER]`
*   `["less-than", ["inches", 1]]`
*   `["inches", ["range", NUMBER, NUMBER]]`
*   `["centimeters", NUMBER]`
*   `["less-than", ["centimeters", 1]]`
*   `["centimeters", ["range", NUMBER, NUMBER]]`

#### Other Weather Conditions

*   `"clear"`: Represents the lack of *any* significant weather occurring.
*   `"possible-thunderstorm"`: Represents a chance of thunderstorms occurring.
*   `"thunderstorm"`: Represents thunderstorms occurring.
*   `"light-wind"`: Represents light wind at a location. (3 or 4 on the
    [Beaufort scale][9], but only when this is historically unusual.)
*   `"medium-wind"`: Represents moderate wind at a location. (5, 6, or 7 on the
    [Beaufort scale][9], but only when this is historically unusual.)
*   `"heavy-wind"`: Represents strong wind at a location. (8+ on the
    [Beaufort scale][9].)
*   `"low-humidity"`: Represents when the air is unusually dry.
*   `"high-humidity"`: Represents when the air is unusually humid.
*   `"fog"`: Represents when there is less than 1 mile (1.6 kilometers) of
    visibility.
*   `"light-clouds"`: Represents when clouds cover less than half of the sky.
    (Usually called "partly cloudy" in English.)
*   `"medium-clouds"`: Represents when clouds cover more than half (but not
    all) of the sky. (Usually called "mostly cloudy" in English.)
*   `"heavy-clouds"`: Represents complete (or nearly-complete) cloud cover.
    (Usually called "overcast" in English.)

[9]: https://en.wikipedia.org/wiki/Beaufort_scale
