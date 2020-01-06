"use strict";

// strip prefixes (dros/yn/ar)
function strip_prefix(a) {
  return a === "dros nos" ? "y nos" : a.replace(/^(?:yn|ar) /, "");
}

module.exports = {
  "clear": "clir",
  "no-precipitation": "dim gwlybaniaeth",
  "mixed-precipitation": "gwlybaniaeth cymysg",
  "possible-very-light-precipitation": "gwlybaniaeth ysgafn yn bosib",
  "very-light-precipitation": "gwlybaniaeth ysgafn",
  "possible-light-precipitation": "gwlybaniaeth ysgafn yn bosib",
  "light-precipitation": "gwlybaniaeth ysgafn",
  "medium-precipitation": "gwlybaniaeth",
  "heavy-precipitation": "gwlybaniaeth trwm",
  "possible-very-light-rain": "glaw mân yn bosib",
  "very-light-rain": "glaw mân",
  "possible-light-rain": "glaw ysgafn yn bosib",
  "light-rain": "glaw ysgafn",
  "medium-rain": "glaw",
  "heavy-rain": "glaw trwm",
  "possible-very-light-sleet": "eirlaw ysgafn yn bosib",
  "very-light-sleet": "eirlaw ysgafn",
  "possible-light-sleet": "eirlaw ysgafn yn bosib",
  "light-sleet": "eirlaw ysgafn",
  "medium-sleet": "eirlaw",
  "heavy-sleet": "eirlaw trwm",
  "possible-very-light-snow": "eira ysgafn yn bosib",
  "very-light-snow": "eira ysgafn",
  "possible-light-snow": "eira ysgafn yn bosib",
  "light-snow": "eira ysgafn",
  "medium-snow": "eira",
  "heavy-snow": "eira trwm",
  "possible-thunderstorm": "mellt a tharannau yn bosib",
  "thunderstorm": "mellt a tharannau",
  "light-wind": "gwyntoedd ysgafn",
  "medium-wind": "gwyntog",
  "heavy-wind": "gwyntoedd cryfion",
  "low-humidity": "sych",
  "high-humidity": "clòs",
  "fog": "niwlog",
  "light-clouds": "rhannol gymylog",
  "medium-clouds": "cymylog",
  "heavy-clouds": "cymylau trwchus",
  "today-morning": "y bore yma",
  "later-today-morning": "yn hwyrach bore yma",
  "today-afternoon": "y prynhawn yma",
  "later-today-afternoon": "yn hwyrach prynhawn yma",
  "today-evening": "fin nos heno",
  "later-today-evening": "yn hwyrach fin nos heno",
  "today-night": "heno",
  "later-today-night": "yn hwyrach heno",
  "tomorrow-morning": "bore yfory",
  "tomorrow-afternoon": "prynhawn yfory",
  "tomorrow-evening": "fin nos yfory",
  "tomorrow-night": "nos yfory",
  "morning": "yn y bore",
  "afternoon": "yn y prynhawn",
  "evening": "fin nos",
  "night": "dros nos",
  "today": "heddiw",
  "tomorrow": "yfory",
  "sunday": "ar ddydd Sul",
  "monday": "ar ddydd Llun",
  "tuesday": "ar ddydd Mawrth",
  "wednesday": "ar ddydd Mercher",
  "thursday": "ar ddydd Iau",
  "friday": "ar ddydd Gwener",
  "saturday": "ar ddydd Sadwrn",
  "next-sunday": "ddydd Sul nesaf",
  "next-monday": "ddydd Llun nesaf",
  "next-tuesday": "ddydd Mawrth nesaf",
  "next-wednesday": "ddydd Mercher nesaf",
  "next-thursday": "ddydd Iau nesaf",
  "next-friday": "ddydd Gwener nesaf",
  "next-saturday": "ddydd Sadwrn nesaf",
  "minutes": function(a) {
    // 1 funud, 2 funud, X munud
    return a + (a === 1 || a === 2 ? " funud" : " munud");
  },
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 modfedd",
  "centimeters": "$1cm",
  "less-than": function(a) {
    // llai nag 1, llai na 2, …
    return "llai na" + (/^(1|8|11|16)[\D\b]/.test(a) ? "g " : " ") + a;
  },
  "and": function(a, b) {
    // don't repeat 'ar'
    if (a.slice(0,9) === "ar ddydd " && b.slice(0,9) === "ar ddydd ") b = b.slice(4);
    return a
      // include comma if a list
      + (a.indexOf(",") !== -1 ? "," : "")
      // ac not a if second phrase starts with vowel
      + (/^[aeiouwy]/.test(b) ? " ac " : " a ")
      // p, t, c -> ph, th, ch mutation
      + b.replace(/^([ptc])(?!h)/,"$1h");
  },
  "through": function(a, b) {
    return "o " + strip_prefix(a) + " hyd at " + strip_prefix(b);
  },
  "with": "$1, gyda\u2019r $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 am yr awr",
  "starting-in": "$1 yn cychwyn mewn $2",
  "stopping-in": "$1 yn dod i ben mewn $2",
  "starting-then-stopping-later": "$1 yn cychwyn mewn $2, ac yn dod i ben $3 wedyn",
  "stopping-then-starting-later": "$1 yn dod i ben mewn $2, gan gychwyn eto $3 wedyn",
  "for-day": "$1 drwy\u2019r dydd",
  "starting": "$1 yn cychwyn $2", // o?
  "until": function(condition, period) {
    return condition + " hyd at " + strip_prefix(period); // TR
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " hyd at " + strip_prefix(a) + ", gan gychwyn eto " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " yn cychwyn " + a + ", gan barhau hyd at " + strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 drwy’r wythnos",
  "over-weekend": "$1 dros y penwythnos",
  "temperatures-peaking": "tymheredd ar ei uchaf yn $1 $2",
  "temperatures-rising": "tymheredd yn codi i $1 $2",
  "temperatures-valleying": "tymheredd ar ei isaf yn $1 $2",
  "temperatures-falling": "tymheredd yn gostwng i $1 $2",
  // Capitalize the first word.
  "title": function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  // Capitalize the first word of the sentence and end with a period.
  "sentence": function(str) {
    // Capitalize.
    str = str.charAt(0).toUpperCase() + str.slice(1);
    // Add a period if there isn't already one.
    if (str.charAt(str.length - 1) !== ".")
      str += ".";
    return str;
  },
};
