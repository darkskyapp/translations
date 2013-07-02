DarkSky.language("en", {
  "condition": function(word) {
    switch(word) {
      case                    "clear": return "clear";

      case         "no-precipitation": return "no precipitation";
      case      "mixed-precipitation": return "mixed precipitation";
      case "very-light-precipitation": return "light precipitation";
      case      "light-precipitation": return "light precipitation";
      case     "medium-precipitation": return "precipitation";
      case      "heavy-precipitation": return "heavy precipitation";

      case          "very-light-rain": return "drizzle";
      case               "light-rain": return "light rain";
      case              "medium-rain": return "rain";
      case               "heavy-rain": return "heavy rain";

      case         "very-light-sleet": return "light sleet";
      case              "light-sleet": return "light sleet";
      case             "medium-sleet": return "sleet";
      case              "heavy-sleet": return "heavy sleet";

      case          "very-light-snow": return "flurries";
      case               "light-snow": return "light snow";
      case              "medium-snow": return "snow";
      case               "heavy-snow": return "heavy snow";

      case               "light-wind": return "breezy";
      case              "medium-wind": return "windy";
      case               "heavy-wind": return "dangerously windy";
      case          "very-heavy-wind": return "violently windy";

      case             "low-humidity": return "dry";
      case            "high-humidity": return "humid";

      case                      "fog": return "foggy";

      case             "light-clouds": return "partly cloudy";
      case            "medium-clouds": return "mostly cloudy";
      case             "heavy-clouds": return "overcast";
    }
  },
  "day": function(word) {
    switch(word) {
      case     "today": return "today";
      case  "tomorrow": return "tomorrow";

      case    "sunday": return "Sunday";
      case    "monday": return "Monday";
      case   "tuesday": return "Tuesday";
      case "wednesday": return "Wednesday";
      case  "thursday": return "Thursday";
      case    "friday": return "Friday";
      case  "saturday": return "Saturday";
    }
  },
  "quantity": function(unit, count) {
    switch(unit) {
      case     "minute": return count + " min.";

      case       "inch": return count + " in.";
      case "centimeter": return count + " cm.";

      case "fahrenheit": return count + "°F";
      case    "celsius": return count + "°C";
    }
  },
  "qualify": function(phrase, qualifier) {
    return phrase + " (" + qualifier + ")";
  },
  "and": function() {
    switch(arguments.length) {
      case  1: return arguments[0];
      case  2: return arguments[0] + " and " + arguments[1];
      default: return Array.prototype.slice.call(arguments, 0, -1).join(", ") +
        ", and " + arguments[arguments.length - 1];
    }
  },
  "clause": function() {
    var separator = ", ",
        i;

    for(i = arguments.length; i--; )
      if(arguments[i].indexOf(",") !== -1) {
        separator = "; ";
        break;
      }

    return Array.prototype.join.call(arguments, separator);
  },
  "range": function(start, end) {
    return start + " through " + end;
  },
  "for-hour": function(condition, duration) {
    return condition + " for the hour";
  },
  "for-week": function(condition, duration) {
    return condition + " throughout the week";
  },
  "starting": function(condition, duration) {
    return condition + " starting in " + duration;
  },
  "stopping": function(condition, duration) {
    return condition + " stopping in " + duration;
  },
  "starting-later": function(duration) {
    return "starting again " + duration + " later";
  },
  "stopping-later": function(duration) {
    return "stopping " + duration + " later";
  },
  "temperatures-peaking": function(max, day) {
    "temperatures peaking at " + max + " on " + day;
  },
  "temperatures-rising": function(max, day) {
    "temperatures rising to " + max + " on " + day;
  },
  "temperatures-valleying": function(min, day) {
    "temperatures bottoming out at " + min + " on " + day;
  },
  "temperatures-falling": function(min, day) {
    "temperatures falling to " + min + " on " + day;
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
