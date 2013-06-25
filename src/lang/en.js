DarkSky.language("en", {
  condition: function(word) {
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
  and: function() {
    switch(arguments.length) {
      case  1: return arguments[0];
      case  2: return arguments[0] + " and " + arguments[1];
      default: return Array.prototype.slice.call(arguments, 0, -1).join(", ") +
        ", and " + arguments[arguments.length - 1];
    }
  },
  /* Capitalize the first letter of every word, except if that word is "and".
   * (This is a very crude bastardization of proper English titling rules, but
   * it is adequate for the purposes of this module.) */
  title: function(str) {
    return str.replace(
      /\b(?:a(?!nd\b)|[^\Wa])/g,
      function(letter) {
        return letter.toUpperCase();
      }
    );
  },
  /* Capitalize the first word of the sentence and end with a period. */
  sentence: function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1) + ".";
  }
});
