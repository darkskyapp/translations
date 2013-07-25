function join_with_shared_prefix(joiner) {
  return function(a, b) {
    var i = 0;

    while(i !== a.length &&
          i !== b.length &&
          a.charCodeAt(i) === b.charCodeAt(i))
      ++i;

    return a.slice(0, i) + a.slice(i) + joiner + b.slice(i);
  };
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
  "temperatures": "temperatures",
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
  "and": join_with_shared_prefix(" and "),
  "range": join_with_shared_prefix(" through "),
  "then": "$1, then $2",
  "clauses": function(one, two) {
    return one +
      (one.indexOf(",") === -1 && two.indexOf(",") === -1 ? ", " : "; ") +
      two;
  },
  "during": "$1 $2",
  "for-hour": "$1 for the hour",
  "for-day": "$1 throughout the day",
  "for-week": "$1 throughout the week",
  "over-weekend": "$1 over the weekend",
  "continuing": "continuing $1",
  "starting-again": "starting again $1",
  "starting-again-later": "starting again $1 later",
  "stopping-later": "stopping $1 later",
  "starting": "$1 starting $2",
  "starting-in": "$1 starting in $2",
  "stopping-in": "$1 stopping in $2",
  "until": "$1 until $2",
  "peaking": "$1 peaking at $2",
  "rising": "$1 rising to $2",
  "valleying": "$1 bottoming out at $2",
  "falling": "$1 falling to $2",
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
