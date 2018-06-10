function join_with_shared_prefix(a, b, joiner) {
  var m = a,
      i = 0,
      j;

  /* HACK: This gets around "today through on Tuesday" or cases like it, which
   * are incorrect in English. */
  if(m === "today" || m === "tomorrow")
    m = "on " + m;

  while(i !== m.length &&
        i !== b.length &&
        m.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && m.charCodeAt(i - 1) !== 32)
    --i;

  return a + joiner + b.slice(i);
}

function strip_prefix(period) {
  return period.slice(0, 9) === "overnight" ? period.slice(4) :
         period.slice(0, 7) ===   "in the " ? period.slice(7) :
                                              period;
}

module.exports = require("../template")({
  "clear": "صاف",
  "no-precipitation": "بدون بارش",
  "mixed-precipitation": "بارش برف و باران",
  "possible-very-light-precipitation": "احتمال بارش  خیلی کم",
  "very-light-precipitation": "بارش کم",
  "possible-light-precipitation": "احتمال بارش کم",
  "light-precipitation": "بارش کم",
  "medium-precipitation": "بارش",
  "heavy-precipitation": "بارش سنگین",
  "possible-very-light-rain": "احتمال باران",
  "very-light-rain": "باران ریز",
  "possible-light-rain": "احتمال باران",
  "light-rain": "باران سبک",
  "medium-rain": "باران",
  "heavy-rain": "باران سنگین",
  "possible-very-light-sleet": "احتمال بارش باران و برف",
  "very-light-sleet": "برف خیلی کم",
  "possible-light-sleet": "احتمال بارش برف",
  "light-sleet": "برف و باران سبک",
  "medium-sleet": " برف و باران",
  "heavy-sleet": "برف و باران سنگین",
  "possible-very-light-snow": "احتمال برف ناگهانی",
  "very-light-snow": "برف ناگهانی",
  "possible-light-snow": "احتمال برف آرام",
  "light-snow": "برف سبک",
  "medium-snow": "برف",
  "heavy-snow": "برف سنگین",
  "possible-thunderstorm": "احتمال رعد و برق",
  "thunderstorm": "رعد و برق",
  "light-wind": "باد آرام",
  "medium-wind": "باد متوسط",
  "heavy-wind": "طوفان",
  "low-humidity": "خشک",
  "high-humidity": "رطوبت",
  "fog": "مه آلود",
  "light-clouds": "نیمه ابری",
  "medium-clouds": "اغلب ابری",
  "heavy-clouds": "ابری",
  "today-morning": "امروز صبح",
  "later-today-morning": "امروز بعد از صبح",
  "today-afternoon": "بعد از ظهر",
  "later-today-afternoon": "بعد از ظهر",
  "today-evening": "عصر",
  "later-today-evening": "later this evening",
  "today-night": "امشب",
  "later-today-night": "نیمه شب",
  "tomorrow-morning": "فردا صبح",
  "tomorrow-afternoon": "فردا بعد از ظهر",
  "tomorrow-evening": "فردا عصر",
  "tomorrow-night": "فردا شب",
  "morning": "صبح",
  "afternoon": "بعد از ظهر",
  "evening": "عصر",
  "night": "شب",
  "today": "امروز",
  "tomorrow": "فردا",
  "sunday": "یکشنبه",
  "monday": "دوشنبه",
  "tuesday": "سه شنبه",
  "wednesday": "چهارشنبه",
  "thursday": "پنج شنبه",
  "friday": "جمعه",
  "saturday": "شنبه",
  "next-sunday": "یکشنبه بعدی",
  "next-monday": "دوشنبه بعدی",
  "next-tuesday": "سه شنبه بعدی",
  "next-wednesday": "چهارشنبه بعدی",
  "next-thursday": "پنج شنبه بعدی",
  "next-friday": "جمعه بعدی",
  "next-saturday": "شنبه بعدی",
  "minutes": "$1 دقیقه.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "< $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", and " : " and "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " through ");
  },
  "with": "$1, با $2",
  "range": "$1\u2013$2",
  "parenthetical": function(a, b) {
    return a + " (" + b + (a === "mixed precipitation" ? " of snow)" : ")");
  },
  "for-hour": "$1 for the hour",
  "starting-in": "$1 شروع $2",
  "stopping-in": "$1 توقف $2",
  "starting-then-stopping-later": "$1 شروع $2, توقف $3 بعد",
  "stopping-then-starting-later": "$1 توقف $2, شروع دوباره $3 بعد",
  "for-day": "$1 در طول روز",
  "starting": "$1 شروع $2",
  "until": function(condition, period) {
    return condition + " until " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " until " + strip_prefix(a) + ", starting again " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " starting " + a + ", continuing until " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 در طول هفته",
  "over-weekend": "$1 آخر هفته",
  "temperatures-peaking": "حداکثر دما $1 $2",
  "temperatures-rising": "دما در حال رسیدن به $1 $2",
  "temperatures-valleying": "حداقل دما $1 $2",
  "temperatures-falling": "دما در حال رسیدن به $1 $2",
  /* Capitalize the first letter of every word, except if that word is
   * "and". (This is a very crude bastardization of proper English titling
   * rules, but it is adequate for the purposes of this module.) */
  "title": function(str) {
    return str.replace(
      /\b(?:a(?!nd\b)|c(?!m\.)|i(?!n\.)|[^\Waci])/g,
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
