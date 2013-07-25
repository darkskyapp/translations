function join_with_shared_prefix(a, b, joiner) {
  var i = 0;

  while(i !== a.length &&
        i !== b.length &&
        a.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  return a.slice(0, i) + a.slice(i) + joiner + b.slice(i);
}

function strip_prefix(period) {
  return period.slice(0, 9) === "overnight" ? period.slice(4) :
         period.slice(0, 7) ===   "in the " ? period.slice(7) :
         period.slice(0, 3) ===       "on " ? period.slice(3) :
                                              period;
}

module.exports = require("../template")({
  "clear": "clear",
  "no-precipitation": "no precipitation",
  "mixed-precipitation": "mixed precipitation",
  "very-light-precipitation": "light precipitation",
  "light-precipitation": "light precipitation",
  "medium-precipitation": "precipitation",
  "heavy-precipitation": "heavy precipitation",
  "very-light-rain": "drizzle",
  "light-rain": "light rain",
  "medium-rain": "rain",
  "heavy-rain": "heavy rain",
  "very-light-sleet": "light sleet",
  "light-sleet": "light sleet",
  "medium-sleet": "sleet",
  "heavy-sleet": "heavy sleet",
  "very-light-snow": "flurries",
  "light-snow": "light snow",
  "medium-snow": "snow",
  "heavy-snow": "heavy snow",
  "light-wind": "breezy",
  "medium-wind": "windy",
  "heavy-wind": "dangerously windy",
  "very-heavy-wind": "violently windy",
  "low-humidity": "dry",
  "high-humidity": "humid",
  "fog": "foggy",
  "light-clouds": "partly cloudy",
  "medium-clouds": "mostly cloudy",
  "heavy-clouds": "overcast",
  "today-morning": "this morning",
  "later-today-morning": "later this morning",
  "today-afternoon": "this afternoon",
  "later-today-afternoon": "later this afternoon",
  "today-evening": "this evening",
  "later-today-evening": "later this evening",
  "today-night": "tonight",
  "later-today-night": "later tonight",
  "tomorrow-morning": "tomorrow morning",
  "tomorrow-afternoon": "tomorrow afternoon",
  "tomorrow-evening": "tomorrow evening",
  "tomorrow-night": "tomorrow night",
  "morning": "in the morning",
  "afternoon": "in the afternoon",
  "evening": "in the evening",
  "night": "overnight",
  "today": "today",
  "tomorrow": "tomorrow",
  "sunday": "on Sunday",
  "monday": "on Monday",
  "tuesday": "on Tuesday",
  "wednesday": "on Wednesday",
  "thursday": "on Thursday",
  "friday": "on Friday",
  "saturday": "on Saturday",
  "minutes": "$1 min.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", and " : " and "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " through ");
  },
  "with": "$1, with $2",
  "for-hour": "$1 for the hour",
  "starting-in": "$1 starting in $2",
  "stopping-in": "$1 stopping in $2",
  "starting-then-stopping-later": "$1 starting in $2, stopping $3 later",
  "stopping-then-starting-later": "$1 stopping in $2, starting again $3 later",
  "for-day": "$1 throughout the day",
  "starting": "$1 starting $2",
  "until": function(condition, period) {
    return condition + " until " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " until " + strip_prefix(a) + ", starting again " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " starting " + a + ", continuing until " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 throughout the week",
  "over-weekend": "$1 over the weekend",
  "temperatures-peaking": "temperatures peaking at $1 $2",
  "temperatures-rising": "temperatures rising to $1 $2",
  "temperatures-valleying": "temperatures bottoming out at $1 $2",
  "temperatures-falling": "temperatures falling to $1 $2",
  /* Capitalize the first letter of every word, except if that word is
   * "and". (This is a very crude bastardization of proper English titling
   * rules, but it is adequate for the purposes of this module.) */
  "title": function(str) {
    return str.replace(
      /\b(?:a(?!nd\b)|[^\Wa])/g,
      function(letter) {
        return letter.toUpperCase();
      }
    );
  },
  /* Capitalize the first word of the sentence and end with a period. */
  "sentence": function(str) {
    /* Capitalize. */
    str = str.charAt(0).toUpperCase() + str.slice(1);

    /* Add a period if there isn't already one. */
    if(str.charAt(str.length - 1) !== ".")
      str += ".";

    return str;
  }
});
