function join_with_shared_prefix(a, b, joiner) {
  var m = a,
      i = 0,
      j;

  while(i !== m.length &&
        i !== b.length &&
        m.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && m.charCodeAt(i - 1) !== 32)
    --i;

  return a + joiner + b.slice(i);
}

function strip_prefix(period) {
  return period.slice(0, 12) === "över natten" ? period.slice(5) :
         period.slice(0, 6)  === "under "      ? period.slice(6) :
                                                 period;
}

function grammar(str) {
  return str.replace(/på /gi, "under ")
            .replace(/(ån|is|ns|rs|re|ör|ön)(dag)/gi, "$1dagen");
}

module.exports = require("../template")({
  "clear": "klart",
  "no-precipitation": "ingen mätbar nederbörd",
  "mixed-precipitation": "blandad nederbörd",
  "possible-very-light-precipitation": "möjligtvis mycket lätt nederbörd",
  "very-light-precipitation": "mycket lätt nederbörd",
  "possible-light-precipitation": "möjligtvis lätt nederbörd",
  "light-precipitation": "lätt nederbörd",
  "medium-precipitation": "nederbörd",
  "heavy-precipitation": "kraftigt nederbörd",
  "possible-very-light-rain": "möjligtvis lite duggregn",
  "very-light-rain": "duggregn",
  "possible-light-rain": "möjligtvis lätta regnskurar",
  "light-rain": "regnskurar",
  "medium-rain": "regn",
  "heavy-rain": "skyfall",
  "possible-very-light-sleet": "möjligtvis mycket lätt snöblandat regn",
  "very-light-sleet": "mycket lätt snöblandat regn",
  "possible-light-sleet": "möjligtvis lätt snöblandat regn",
  "light-sleet": "lätt snöblandat regn",
  "medium-sleet": "snöblandat regn",
  "heavy-sleet": "tungt snöblandat regn",
  "possible-very-light-snow": "möjligtvis lätt snöby",
  "very-light-snow": "lätt snöby",
  "possible-light-snow": "möjligtvis lätt snöfall",
  "light-snow": "lätt snöfall",
  "medium-snow": "snöby",
  "heavy-snow": "rikligt med snö",
  "possible-thunderstorm": "risk för åska",
  "thunderstorm": "åska",
  "light-wind": "måttlig vind",
  "medium-wind": "hård vind",
  "heavy-wind": "storm",
  "low-humidity": "torka",
  "high-humidity": "fuktigt",
  "fog": "dimma",
  "light-clouds": "lätt molnighet",
  "medium-clouds": "molnigt",
  "heavy-clouds": "mulet",
  "today-morning": "under morgonen",
  "later-today-morning": "senare under morgonen",
  "today-afternoon": "på eftermiddagen",
  "later-today-afternoon": "senare under eftermiddagen",
  "today-evening": "under kvällen",
  "later-today-evening": "senare under kvällen",
  "today-night": "ikväll",
  "later-today-night": "senare ikväll",
  "tomorrow-morning": "imorgon bitti",
  "tomorrow-afternoon": "imorgon eftermiddag",
  "tomorrow-evening": "imorgon kväll",
  "tomorrow-night": "imorgon natt",
  "morning": "på morgonen",
  "afternoon": "under eftermiddagen",
  "evening": "under kvällen",
  "night": "över natten",
  "today": "idag",
  "tomorrow": "imorgon",
  "sunday": "på söndag",
  "monday": "på måndag",
  "tuesday": "på tisdag",
  "wednesday": "på onsdag",
  "thursday": "på torsdag",
  "friday": "på fredag",
  "saturday": "på lördag",
  "next-sunday": "nästa söndag", 
  "next-monday": "nästa måndag", 
  "next-tuesday": "nästa tisdag", 
  "next-wednesday": "nästa onsdag", 
  "next-thursday": "nästa torsdag", 
  "next-friday": "nästa fredag", 
  "next-saturday": "nästa lördag", 
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
      a.indexOf(",") !== -1 ? " och " : " och "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " fram till ");
  },
  "with": "$1, med $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 under närmaste timme",
  "starting-in": "$1 som startar om $2",
  "stopping-in": "$1 som avtar om $2",
  "starting-then-stopping-later": "$1 som startar om $2, avtar $3 senare",
  "stopping-then-starting-later": "$1 avtar om $2, startar igen $3 senare",
  "for-day": "$1 under dagen",
  "starting": "$1 som startar $2",
  "until": function(condition, period) {
    return condition + " fram till " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " fram till " + strip_prefix(a) +
           ", som startar igen " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " som startar " + a + ", fortsätter fram till " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 under veckan",
  "over-weekend": "$1 över helgen",
  "temperatures-peaking": function(a, b) {
    return "temperaturer upp till " + a + " " + grammar(b);
  },
  "temperatures-rising": function(a, b) {
    return "temperaturer som stiger till " + a + " " + grammar(b);
  },
  "temperatures-valleying": function(a, b) {
    return "temperaturer som stannar på " + a + " " + grammar(b);
  },
  "temperatures-falling": function(a, b) {
    return "temperaturer som sjunker till " + a + " " + grammar(b);
  },
  /* Capitalize the first character in the word.
   * We never titleize nor camelcase words in an sentence in Swedish. */
  "title": function(str) {
    /* Capitalize. */
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
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
