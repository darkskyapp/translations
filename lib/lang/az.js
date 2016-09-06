"use strict";

module.exports = require("../template")({
  "clear": "buludsuz",
  "no-precipitation": "yağmursuz",
  "mixed-precipitation": "qarışıq yağış",
  "possible-very-light-precipitation": "yüngül yağış ehtimalı",
  "very-light-precipitation": "yüngül yağış",
  "possible-light-precipitation": "yüngül yağış ehtimalı",
  "light-precipitation": "yüngül yağış",
  "medium-precipitation": "yağış",
  "heavy-precipitation": "güclü yağış",
  "possible-very-light-rain": "çiskin yağış ehtimalı",
  "very-light-rain": "çiskin",
  "possible-light-rain": "yüngül yağış ehtimalı",
  "light-rain": "yüngül yağış",
  "medium-rain": "yağış",
  "heavy-rain": "güclü yağış",
  "possible-very-light-sleet": "yüngül sulu qar ehtimalı",
  "very-light-sleet": "yüngül sulu qar",
  "possible-light-sleet": "yüngül sulu qar ehtimalı",
  "light-sleet": "yüngül sulu qar",
  "medium-sleet": "sulu qar",
  "heavy-sleet": "güclü sulu qar",
  "possible-very-light-snow": "sulu qar ehtimalı",
  "very-light-snow": "sulu qar",
  "possible-light-snow": "yüngül qar ehtimalı",
  "light-snow": "yüngül qar",
  "medium-snow": "qar",
  "heavy-snow": "güclü qar",
  "light-wind": "sərin",
  "medium-wind": "külək",
  "heavy-wind": "güclü külək",
  "low-humidity": "rütubətsiz",
  "high-humidity": "rütubətli",
  "fog": "dumanlı",
  "light-clouds": "qismən buludlu",
  "medium-clouds": "əsasən buludlu",
  "heavy-clouds": "tutqun hava",
  "today-morning": "bu gün səhər",
  "later-today-morning": "bu gün səhərdən sonra",
  "today-afternoon": "bu gün günortadan sonra",
  "later-today-afternoon": "bu gün günortadan sonra",
  "today-evening": "bu gün axşam",
  "later-today-evening": "bu gün axşam",
  "today-night": "bu gün gecə",
  "later-today-night": "bu gün gecə",
  "tomorrow-morning": "sabah səhər",
  "tomorrow-afternoon": "sabah günortadan sonra",
  "tomorrow-evening": "sabah axşam",
  "tomorrow-night": "sabah gecə",
  "morning": "səhər",
  "afternoon": "günortadan sonra",
  "evening": "axşam",
  "night": "gecə",
  "today": "bu gün",
  "tomorrow": "sabah",
  "sunday": "bazar günü",
  "monday": "bazar ertəsi",
  "tuesday": "çərşənbə axşamı",
  "wednesday": "çərşənbə günü",
  "thursday": "cümə axşamı",
  "friday": "cümə günü",
  "saturday": "şənbə günü",
  "minutes": "$1 dəq.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 düym",
  "centimeters": "$1 sm.",
  "less-than": "$1-dən aşağı",
  "and": function(a, b) { return a + " və " + b; },
  "through": function(a, b) { return a + " ilə " + b + " arası"; },
  "with": "$1, $2",
  "range": "$1\u2013$2",
  "parenthetical": function(a, b) { return a + " (" + b + (a === "qarışıq yağış" ? " qar)" : ")"); },
  "for-hour": "1 saat boyunca $1 olacaq",
  "starting-in": "$2 sonra $1 başlayacaq",
  "stopping-in": "$1 $2 sonra dayanacaq",
  "starting-then-stopping-later": "$1 $2 sonra başlayacaq, $3 davam edib dayanacaq",
  "stopping-then-starting-later": "$1 $2 sonra dayanacaq, $3 sonra yenidən başlayacaq",
  "for-day": "gün boyu $1 olacaq",
  "starting": "$2 $1 başlayacaq",
  "until": function(condition, period) { return condition + " " + period + " dayanacaq"; },
  "until-starting-again": function(condition, a, b) { return condition + " " + a + " dayanıb, " + b + " yenidən başlayacaq"; },
  "starting-continuing-until": function(condition, a, b) { return a + " " + condition + " başlayıb, " + b + " dayanacaq"; },
  "during": "$2 $1 olacaq",
  "for-week": "həftə boyunca $1 olacaq",
  "over-weekend": "həftə sonu $1 olacaq",
  "temperatures-peaking": "$2 hava kəskin istiləşəcək və temperatur $1-yə qalxacaq",
  "temperatures-rising": "$2 temperatur $1-yə qalxacaq",
  "temperatures-valleying": "$2 hava kəskin soyuyacaq və temperatur $1-yə düşəcək",
  "temperatures-falling": "$2 temperatur $1-yə düşəcək",
  
  /* Capitalize the first letter of every word, except if that word is
   * "and". (This is a very crude bastardization of proper English titling
   * rules, but it is adequate for the purposes of this module.) */
  "title": str => str.replace(
    /([a-zA-ZÇçŞşIıƏəÖöĞğÜü.]+)/g, 
    txt => (txt === "və" || txt === "düym" || txt === "sm.")?
      txt:
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  ),
  /* Capitalize the first word of the sentence and end with a period. */
  "sentence": str => {
    /* Capitalize. */
    str = str.charAt(0).toUpperCase() + str.slice(1);

    /* Add a period if there isn't already one. */
    if(str.charAt(str.length - 1) !== ".") {
      str += ".";
    }

    return str;
  },
});
