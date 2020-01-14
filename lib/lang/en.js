"use strict";

function join_with_shared_prefix(a, b, joiner) {
  let m = a;
  let i = 0;

  // HACK: This gets around "today through on Tuesday" or cases like it, which
  // are incorrect in English.
  if(m === "today" || m === "tomorrow") {
    m = "on " + m;
  }

  // Skip the prefix of b that is shared with a.
  while(
    i !== m.length &&
    i !== b.length &&
    m.charCodeAt(i) === b.charCodeAt(i)
  ) {
    ++i;
  }

  // ...except whitespace! We need that whitespace!
  while(i && b.charCodeAt(i - 1) !== 32) {
    --i;
  }

  return a + joiner + b.slice(i);
}

function strip_prefix(period) {
  return period.startsWith("overnight")? period.slice(4):
    period.startsWith("in the ")? period.slice(7):
      period;
}

function capitalize(str) {
  // Do not capitalize articles, very short words, or units.
  if(
    str === "a" ||
    str === "and" ||
    str === "cm" ||
    str === "in" ||
    str === "of" ||
    str === "with"
  ) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
}

module.exports = {
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
  "possible-thunderstorm": "possible thunderstorms",
  "thunderstorm": "thunderstorms",
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
  "next-sunday": "next Sunday",
  "next-monday": "next Monday",
  "next-tuesday": "next Tuesday",
  "next-wednesday": "next Wednesday",
  "next-thursday": "next Thursday",
  "next-friday": "next Friday",
  "next-saturday": "next Saturday",
  "minutes": "$1 min.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "< $1",
  "and": function(a, b) {
    return join_with_shared_prefix(a, b, a.includes(",")? ", and ": " and ");
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " through ");
  },
  "with": "$1, with $2",
  "range": "$1\u2013$2",
  "parenthetical": function(a, b) {
    // In the case of mixed precipitation, we want to clarify that the
    // snow accumulation in the parenthetical is snow. In the case that it's
    // of an unknown type or rain or sleet, we want to clarify that while snow
    // isn't expected, it has a chance of occurring. The below checks do this.

    // HACK: These are not the best ways to determine the precipitation type...
    if(!a.endsWith("flurries") && !a.endsWith("snow")) {
      if(!a.startsWith("mixed")) {
        b = "with a chance of " + b;
      }
      b += " of snow";
    }

    return a + " (" + b + ")";
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
    return condition + " starting " + a + ", continuing until " + strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 throughout the week",
  "over-weekend": "$1 over the weekend",
  "temperatures-peaking": "high temperatures peaking at $1 $2",
  "temperatures-rising": "high temperatures rising to $1 $2",
  "temperatures-valleying": "high temperatures bottoming out at $1 $2",
  "temperatures-falling": "high temperatures falling to $1 $2",
  // Capitalize the first letter of every word except "and", "or", and units.
  // (This is a very crude bastardization of proper English titling rules, but
  // it is adequate for the purposes of this module.)
  "title": function(str) {
    return str.replace(/\w+/g, capitalize);
  },
  // Capitalize the first word of the sentence and end with a period.
  "sentence": function(str) {
    // Capitalize.
    str = capitalize(str);

    // Add a period if there isn't already one.
    if(!str.endsWith(".")) {
      str += ".";
    }

    return str;
  },
  "next-hour-forecast-status": "next hour forecasts are $1 due to $2",
  "unavailable": "unavailable",
  "temporarily-unavailable": "temporarily unavailable",
  "partially-unavailable": "partially unavailable",
  "station-offline": "all nearby radar stations being offline",
  "station-incomplete": "gaps in coverage from nearby radar stations",
};
