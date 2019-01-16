"use strict";

function make_plural(a) {
  /* add "j" to words ending in "o" (nouns) or "a" (adjective agreement, but not "la") */
  return a.split(" ").map(function (w) {
    if (w.slice(-1) === "o" || (w.slice(-1) === "a" && w !== "la")) {
      return w + "j";
    }
    return w;
  }).join(" ");
}

function make_accusative(a) {
  /* add "n" to words ending in "o" (nouns) or "a" (adjective agreement, not "la"), or "j" (plural) */
  return a.split(" ").map(function (w) {
    if (w.slice(-1) === "j" || w.slice(-1) === "o" || (w.slice(-1) === "a" && w !== "la")) {
      return w + "n";
    }
    return w;
  }).join(" ");
}

function join_with_shared_prefix(a, b, joiner) {
  let i = 0;

  while(i !== a.length &&
    i !== b.length &&
    a.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && a.charCodeAt(i - 1) !== 32)
    --i;

  return a + joiner + b.slice(i);
}

module.exports = {
  "clear": "klara ĉielo",
  "no-precipitation": "neniu precipitaĵo",
  "mixed-precipitation": "miksita precipitaĵo",
  "possible-very-light-precipitation": "malforta precipitaĵo eblas",
  "very-light-precipitation": "malforta precipitaĵo",
  "possible-light-precipitation": "malforta precipitaĵo eblas",
  "light-precipitation": "malforta precipitaĵo",
  "medium-precipitation": "precipitaĵo",
  "heavy-precipitation": "forta precipitaĵo",
  "possible-very-light-rain": "drizlo eblas",
  "very-light-rain": "drizlo",
  "possible-light-rain": "malforta pluvo eblas",
  "light-rain": "malforta pluvo",
  "medium-rain": "pluvo",
  "heavy-rain": "forta pluvo",
  "possible-very-light-sleet": "malforta glaciumo eblas",
  "very-light-sleet": "malforta glaciumo",
  "possible-light-sleet": "malforta glaciumo eblas",
  "light-sleet": "malforta glaciumo",
  "medium-sleet": "glaciumo",
  "heavy-sleet": "forta glaciumo",
  "possible-very-light-snow": "malforta neĝo eblas",
  "very-light-snow": "malforta neĝo",
  "possible-light-snow": "malforta neĝo eblas",
  "light-snow": "malforta neĝo",
  "medium-snow": "neĝo",
  "heavy-snow": "forta neĝo",
  "possible-thunderstorm": "fulmotondroj eblas",
  "thunderstorm": "fulmotondroj",
  "light-wind": "malforta vento",
  "medium-wind": "vento",
  "heavy-wind": "forta vento",
  "low-humidity": "seka humideco",
  "high-humidity": "alta humideco",
  "fog": "nebulo",
  "light-clouds": "malmultaj nuboj",
  "medium-clouds": "nuboj",
  "heavy-clouds": "multaj nuboj",
  "today-morning": "la mateno",
  "later-today-morning": "la malfrua mateno",
  "today-afternoon": "la tagmezo",
  "later-today-afternoon": "la malfrua tagmezo",
  "today-evening": "la vespero",
  "later-today-evening": "la malfrua vespero",
  "today-night": "la nokto",
  "later-today-night": "la malfrua nokto",
  "tomorrow-morning": "morgaŭ mateno",
  "tomorrow-afternoon": "morgaŭ tagmezo",
  "tomorrow-evening": "morgaŭ vespero",
  "tomorrow-night": "morgaŭ nokto",
  "morning": "la mateno",
  "afternoon": "la tagmezo",
  "evening": "la vespero",
  "night": "la nokto",
  "today": "hodiaŭ",
  "tomorrow": "morgaŭ",
  "sunday": "dimanĉo",
  "monday": "lundo",
  "tuesday": "mardo",
  "wednesday": "mekredo",
  "thursday": "ĵaŭdo",
  "friday": "vendredo",
  "saturday": "sabato",
  "next-sunday": "la venonta dimanĉo",
  "next-monday": "la venonta lundo",
  "next-tuesday": "la venonta mardo",
  "next-wednesday": "la venonta mekredo",
  "next-thursday": "la venonta ĵaŭdo",
  "next-friday": "la venonta vendredo",
  "next-saturday": "la venonta dimanĉo",
  "minutes": function (a) {
    if (a === "1") {
      return a + " minuto";
    }
    return a + make_plural(" minuto");
  },
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "malpli ol $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", kaj " : " kaj "
    );
  },
  "through": "$1 ĝis $2",
  "with": "$1, kaj $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 por unu horo",
  "starting-in": "$1 komenciĝos post $2",
  "stopping-in": "$1 ĉesiĝos post $2",
  "starting-then-stopping-later": "$1 komenciĝos post $2 kaj ĉesiĝos $3 poste",
  "stopping-then-starting-later": "$1 ĉesiĝos post $2 kaj rekomenciĝos $3 poste",
  "for-day": "$1 dum la tago",
  "starting": "$1 komenciĝos je $2",
  "until": "$1 ĝis $2",
  "until-starting-again": "$1 ĝis $2, rekomenciĝos je $3",
  "starting-continuing-until": "$1 komenciĝos je $2, daŭros ĝis $3",
  "during": "$1 dum $2",
  "for-week": "$1 dum la semajno",
  "over-weekend": "$1 dum la semajnfino",
  "temperatures-rising": function (a, b) { return "la temperaturo plialtiĝos ĝis " + a + " " + make_accusative(b); },
  "temperatures-peaking": function (a, b) { return "la temperaturo atingos sian maksimon je " + a + " " + make_accusative(b); },
  "temperatures-valleying": function (a, b) { return "la temperaturo atingos sian minimumon je " + a + " " + make_accusative(b); },
  "temperatures-falling": function (a, b) { return "la temperaturo malplialtiĝos ĝis " + a + " " + make_accusative(b); },
  "title": function(str) {
    return str.replace(/\S+/g, function(word) {
      /* indexOf(".") handles "cm." and "in." */
      if (word.indexOf(".") !== -1 ||
          word === "dum" || word === "ĝis" || word === "je" || word === "kaj" || word === "la" ||
          word === "malpli" || word === "ol" || word === "pli" || word === "por") {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  },
  /* Capitalize the first word of the sentence and end with a period. */
  "sentence": function(str) {
    /* Capitalize. */
    str = str.charAt(0).toUpperCase() + str.slice(1);

    /* Add a period if there isn't already one. */
    if(str.charAt(str.length - 1) !== ".")
      str += ".";

    return str;
  },
};
