function join_with_shared_prefix(a, b, joiner) {
  var m = a,
      i = 0,
      j;

  /* HACK: This gets around "today through on Tuesday" or cases like it, which
   * are incorrect in English. */
  if(m === "today" || m === "tomorrow")
    m = "on " + m;

  while(i !== m.length &&
        i !== b.length &&
        m.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && m.charCodeAt(i - 1) !== 32)
    --i;

  return a + joiner + b.slice(i);
}

function strip_prefix(period) {
  return period.slice(0, 9) === "overnight" ? period.slice(4) :
         period.slice(0, 7) ===   "in the " ? period.slice(7) :
                                              period;
}

module.exports = require("../template")({
  "clear": "clear",
  "no-precipitation": "no precipitation",
  "mixed-precipitation": "mixed precipitation",
  "possible-very-light-precipitation": "possible light precipitation",
  "very-light-precipitation": "light precipitation",
  "possible-light-precipitation": "possible light precipitation",
  "light-precipitation": "light precipitation",
  "medium-precipitation": "precipitation",
  "heavy-precipitation": "heavy precipitation",
  "possible-very-light-rain": "possible drizzle",
  "very-light-rain": "drizzle",
  "possible-light-rain": "possible light rain",
  "light-rain": "light rain",
  "medium-rain": "rain",
  "heavy-rain": "heavy rain",
  "possible-very-light-sleet": "possible light sleet",
  "very-light-sleet": "light sleet",
  "possible-light-sleet": "possible light sleet",
  "light-sleet": "light sleet",
  "medium-sleet": "sleet",
  "heavy-sleet": "heavy sleet",
  "possible-very-light-snow": "possible flurries",
  "very-light-snow": "flurries",
  "possible-light-snow": "possible light snow",
  "light-snow": "light snow",
  "medium-snow": "snow",
  "heavy-snow": "heavy snow",
  "light-wind": "breezy",
  "medium-wind": "windy",
  "heavy-wind": "dangerously windy",
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
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "under $1",
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
  "range": "$1\u2013$2",
  "parenthetical": function(a, b) {
    return a + " (" + b + (a === "mixed precipitation" ? " of snow)" : ")");
  },
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
      /\b(?:a(?!nd\b)|c(?!m\.)|i(?!n\.)|[^\Waci])/g,
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
