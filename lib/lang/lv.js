"use strict";

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

const grammar = {
  "no rīta":           ["rīta", "rītam"],
  "vēlāk no rīta":     ["rīta", "rītam"],
  "pēcpusdienā":       ["pēcpusdienas", "pēcpusdienai"],
  "vēlāk pēcpusdienā": ["pēcpusdienas", "pēcpusdienai"],
  "vakarā":            ["vakara", "vakaram"],
  "vēlāk vakarā":      ["vakara", "vakaram"],
  "naktī":             ["nakts", "naktij"],
  "vēlāk naktī":       ["nakts", "naktij"],
  "rīt no rīta":       ["rītdienas rīta", "rītdienas rītam"],
  "rīt pēcpusdienā":   ["rītdienas pēcpusdienas", "rītdienas pēcpusdienai"],
  "rītvakar":          ["rītvakara", "rītvakaram"],
  "rīt naktī":         ["rītdienas nakts", "rītdienas naktij"],
  "šodien":            ["šodienas", "šodienai"],
  "rīt":               ["rītdienas", "rītdienai"],
  "svētdien":          ["svētdienas", "svētdienai"],
  "pirmdien":          ["pirmdienas", "pirmdienai"],
  "otrdien":           ["otrdienas", "otrdienai"],
  "trešdien":          ["trešdienas", "trešdienai"],
  "ceturtdien":        ["ceturtdienas", "ceturtdienai"],
  "piektdien":         ["piektdienas", "piektdienai"],
  "sestdien":          ["sestdienas", "sestdienai"],
  "nākamsvētdien":     ["nākamās svētdienas", "nākamai svētdienai"],
  "nākampirmdien":     ["nākamās pirmdienas", "nākamai pirmdienai"],
  "nākamotrdien":      ["nākamās otrdienas", "nākamai otrdienai"],
  "nākamtrešdien":     ["nākamās trešdienas", "nākamai trešdienai"],
  "nākamceturtdien":   ["nākamās ceturtdienas", "nākamai ceturtdienai"],
  "nākampiektdien":    ["nākamās piektdienas", "nākamai piektdienai"],
  "nākamsestdien":     ["nākamās sestdienas", "nākamai sestdienai"],
};

function accusativus(word) {
  return grammar.hasOwnProperty(word) ? grammar[word][0] : word;
}

function dativus(word){
  return grammar.hasOwnProperty(word) ? grammar[word][1] : word;
}

module.exports = {
  "clear": "skaidrs",
  "no-precipitation": "bez nokrišņiem",
  "mixed-precipitation": "jaukti nokrišņi",
  "possible-very-light-precipitation": "iespējami nelieli nokrišņi",
  "very-light-precipitation": "nelieli nokrišņi",
  "possible-light-precipitation": "iespējami nelieli nokrišņi",
  "light-precipitation": "nelieli nokrišņi",
  "medium-precipitation": "nokrišņi",
  "heavy-precipitation": "stipri nokrišņi",
  "possible-very-light-rain": "iespējams smidzinošs lietus",
  "very-light-rain": "smidzinošs lietus",
  "possible-light-rain": "iespējams neliels lietus",
  "light-rain": "neliels lietus",
  "medium-rain": "lietus",
  "heavy-rain": "stiprs lietus",
  "possible-very-light-sleet": "iespējams neliels slapjš sniegs",
  "very-light-sleet": "neliels slapjš sniegs",
  "possible-light-sleet": "iespējams neliels slapjš sniegs",
  "light-sleet": "neliels slapjš sniegs",
  "medium-sleet": "slapjš sniegs",
  "heavy-sleet": "stiprs slapjš sniegs",
  "possible-very-light-snow": "iespējams neliels sniegs",
  "very-light-snow": "neliels sniegs",
  "possible-light-snow": "iespējams neliels sniegs",
  "light-snow": "neliels sniegs",
  "medium-snow": "sniegs",
  "heavy-snow": "stiprs sniegs",
  "possible-thunderstorm": "iespējams negaiss",
  "thunderstorm": "negaiss",
  "light-wind": "lēns vējš",
  "medium-wind": "vējš",
  "heavy-wind": "stiprs vējš",
  "low-humidity": "sauss",
  "high-humidity": "mitrs",
  "fog": "migla",
  "light-clouds": "daļēji mākoņains",
  "medium-clouds": "pārsvarā mākoņains",
  "heavy-clouds": "apmācies",
  "today-morning": "no rīta",
  "later-today-morning": "vēlāk no rīta",
  "today-afternoon": "pēcpusdienā",
  "later-today-afternoon": "vēlāk pēcpusdienā",
  "today-evening": "vakarā",
  "later-today-evening": "vēlāk vakarā",
  "today-night": "naktī",
  "later-today-night": "vēlāk naktī",
  "tomorrow-morning": "rīt no rīta",
  "tomorrow-afternoon": "rīt pēcpusdienā",
  "tomorrow-evening": "rītvakar",
  "tomorrow-night": "rīt naktī",
  "morning": "no rīta",
  "afternoon": "pēcpusdienā",
  "evening": "vakarā",
  "night": "naktī",
  "today": "šodien",
  "tomorrow": "rīt",
  "sunday": "svētdien",
  "monday": "pirmdien",
  "tuesday": "otrdien",
  "wednesday": "trešdien",
  "thursday": "ceturtdien",
  "friday": "piektdien",
  "saturday": "sestdien",
  "next-sunday": "nākamsvētdien",
  "next-monday": "nākampirmdien",
  "next-tuesday": "nākamotrdien",
  "next-wednesday": "nākamtrešdien",
  "next-thursday": "nākamceturtdien",
  "next-friday": "nākampiektdien",
  "next-saturday": "nākamsestdien",
  "minutes": "$1 min.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 collas",
  "centimeters": "$1 cm.",
  "less-than": "< $1",
  "and": function(a, b) {
    return join_with_shared_prefix(a, b, " un ");
  },
  "through": function(a, b) {
    return "no " + accusativus(a) + " līdz " + dativus(b);
  },
  "with": "$1, $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "nākamo stundu $1",
  "starting-in": "$1 sāksies nākamo $2 laikā",
  "stopping-in": "$1 beigsies nākamo $2 laikā",
  "starting-then-stopping-later": "$1 sāksies $2 laikā, beigsies $3 vēlāk",
  "stopping-then-starting-later": "$1 beigsies $2 laikā, atsāksies $3 vēlāk",
  "for-day": "visu dienu $1",
  "starting": function(a, b) {
    if(a === "daļēji mākoņains" || a === "pārsvarā mākoņains" || a === "apmācies")
      return b + " būs " + a;

    return b + " sāksies " + a;
  },
  "until": function(condition, period) {
    return condition + " līdz " + dativus(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " līdz " + dativus(a) + ", atsāksies " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return "no " + accusativus(a) + " līdz " + dativus(b) + " " + condition;
  },
  "during": "$2 $1",
  "for-week": "šonedēļ $1",
  "over-weekend": "nedēļas nogalē $1",
  "temperatures-peaking": "ar augstāko temperatūru $1 $2",
  "temperatures-rising": "temperatūrai sasniedzot $1 $2",
  "temperatures-valleying": "ar zemāko temperatūru $1 $2",
  "temperatures-falling": "temperatūrai nokrītoties līdz $1 $2",
  /* Capitalize the first character in the sentence. */
  "title": function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
