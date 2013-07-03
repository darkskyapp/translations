var DarkSkyEnglish = {
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
      "today": "today",
      "tomorrow": "tomorrow",
      "sunday": "Sunday",
      "monday": "Monday",
      "tuesday": "Tuesday",
      "wednesday": "Wednesday",
      "thursday": "Thursday",
      "friday": "Friday",
      "saturday": "Saturday",
      "minutes": "$1 min.",
      "fahrenheit": "$1\u00B0F",
      "celsius": "$1\u00B0C",
      "and": "$1 and $2",
      "clauses": function(one, two) {
        return one +
          (one.indexOf(",") === -1 && two.indexOf(",") === -1 ? ", " : "; ") +
          two;
      },
      "range": "$1 through $2",
      "for-hour": "$1 for the hour",
      "starting": "$1 starting in $2",
      "stopping": "$1 stopping in $2",
      "starting-later": "starting again $1 later",
      "stopping-later": "stopping $1 later",
      "for-week": "$1 throughout the week",
      "over-weekend": "$1 over the weekend",
      "temperatures-peaking": "temperatures peaking at $1",
      "temperatures-rising": "temperatures rising to $1",
      "temperatures-valleying": "temperatures bottoming out at $1",
      "temperatures-falling": "temperatures falling to $1",
      "on": function(condition, day) {
        return condition +
          (day === "today" || day === "tomorrow" ? " " : " on ") +
          day;
      },
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
    };
