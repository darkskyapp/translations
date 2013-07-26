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

    "heavy-rain"
    ["and", "light-wind", "light-clouds"]
    ["starting-in", "very-light-rain", ["minutes", 15]]

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

Writing a Translation Submodule
-------------------------------

FIXME

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

#### Structural

*   `"title"`
*   `"sentence"`

#### Units

*   `"minutes"`
*   `"fahrenheit"`
*   `"celsius"`

#### Conjunctions

*   `"and"`
*   `"through"`
*   `"with"`

#### Clauses

*   `"for-hour"`
*   `"for-day"`
*   `"for-week"`
*   `"over-weekend"`
*   `"during"`
*   `"starting-in"`
*   `"stopping-in"`
*   `"starting-then-stopping-later"`
*   `"stopping-then-starting-later"`
*   `"starting"`
*   `"until"`
*   `"starting-continuing-until"`
*   `"until-starting-again"`
*   `"temperatures-peaking"`
*   `"temperatures-rising"`
*   `"temperatures-valleying"`
*   `"temperatures-falling"`
