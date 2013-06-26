DarkSky.language("en", {
  "condition": function(word) {
    switch(word) {
      case            "clear": return "clear";

      case  "very-light-rain": return "drizzle";
      case       "light-rain": return "light rain";
      case      "medium-rain": return "rain";
      case       "heavy-rain": return "heavy rain";

      case "very-light-sleet": return "light sleet";
      case      "light-sleet": return "light sleet";
      case     "medium-sleet": return "sleet";
      case      "heavy-sleet": return "heavy sleet";

      case  "very-light-snow": return "flurries";
      case       "light-snow": return "light snow";
      case      "medium-snow": return "snow";
      case       "heavy-snow": return "heavy snow";

      case       "light-wind": return "breezy";
      case      "medium-wind": return "windy";
      case       "heavy-wind": return "dangerously windy";
      case  "very-heavy-wind": return "violently windy";

      case     "low-humidity": return "dry";
      case    "high-humidity": return "humid";

      case              "fog": return "foggy";

      case     "light-clouds": return "partly cloudy";
      case    "medium-clouds": return "mostly cloudy";
      case     "heavy-clouds": return "overcast";
    }
  },
  "quantity": function(unit, count) {
    switch(unit) {
      case "minute": return count + " min.";
    }
  },
  "and": function() {
    switch(arguments.length) {
      case  1: return arguments[0];
      case  2: return arguments[0] + " and " + arguments[1];
      default: return Array.prototype.slice.call(arguments, 0, -1).join(", ") +
        ", and " + arguments[arguments.length - 1];
    }
  },
  "for-hour": function(condition, duration) {
    return condition + " for the hour";
  },
  "starting": function(condition, duration) {
    return condition + " in " + duration;
  },
  "stopping": function(condition, duration) {
    return condition + " for " + duration;
  },
  "starting-then-stopping": function(condition, duration1, duration2) {
    return condition + " starting in " + duration1 + ", stopping " + duration2 + " later";
  },
  "stopping-then-starting": function(condition, duration1, duration2) {
    return condition + " stopping in " + duration1 + ", starting again " + duration2 + " later";
  },
  /* Capitalize the first letter of every word, except if that word is "and".
   * (This is a very crude bastardization of proper English titling rules, but
   * it is adequate for the purposes of this module.) */
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
