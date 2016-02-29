function join_with_shared_prefix(a, b, joiner) {
  var m = a,
      i = 0,
      j;

  if(m === "امروز" || m === "فردا")
    m = "در " + m;

  while(i !== m.length &&
        i !== b.length &&
        m.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && m.charCodeAt(i - 1) !== 32)
    --i;

  return a + joiner + b.slice(i);
}

function strip_prefix(period) {
  return period.slice(0, 9) === "شبانه" ? period.slice(4) :
         period.slice(0, 7) ===   "در " ? period.slice(7) :
                                              period;
}

module.exports = require("../template")({
  "clear": "صاف",
  "no-precipitation": "بدون بارش",
  "mixed-precipitation": "بارش ترکیبی",
  "possible-very-light-precipitation": "احتمال بارش کم",
  "very-light-precipitation": "بارش کم",
  "possible-light-precipitation": "احتمال بارش کم",
  "light-precipitation": "بارش کم",
  "medium-precipitation": "بارش",
  "heavy-precipitation": "بارش سنگین",
  "possible-very-light-rain": "احتمال بارش کم",
  "very-light-rain": "بارش کم",
  "possible-light-rain": "بارندگی کم باران",
  "light-rain": "نم نم باران",
  "medium-rain": "باران",
  "heavy-rain": "باران سنگین",
  "possible-very-light-sleet": "احتمال بارش اندک برف و باران",
  "very-light-sleet": "بارش اندک برف و باران",
  "possible-light-sleet": "احتمال بارش اندک برف و باران",
  "light-sleet": "بارش اندک برف و باران",
  "medium-sleet": "برف و باران",
  "heavy-sleet": "برف و باران سنگین",
  "possible-very-light-snow": "احتمال رگبار",
  "very-light-snow": "احتمال رگبار",
  "possible-light-snow": "احتمال بارش برف",
  "light-snow": "بارش کم برف",
  "medium-snow": "برف",
  "heavy-snow": "برف سنگین",
  "light-wind": "خنک",
  "medium-wind": "پر باد",
  "heavy-wind": "باد سنگین",
  "low-humidity": "نم ناک",
  "high-humidity": "مرطوب",
  "fog": "مه آلود",
  "light-clouds": "تا قسمتی ابری",
  "medium-clouds": "اکثرا ابری",
  "heavy-clouds": "تماما ابری",
  "today-morning": "این صبح",
  "later-today-morning": "بعد از صبح",
  "today-afternoon": "امروز بعد از ظهر",
  "later-today-afternoon": "بعد از امروز بعد از ظهر",
  "today-evening": "امشب",
  "later-today-evening": "بعد از امشب",
  "today-night": "امشب",
  "later-today-night": "بعد از امشب",
  "tomorrow-morning": "فردا صبح",
  "tomorrow-afternoon": "فردا بعد از ظهر",
  "tomorrow-evening": "فردا عصر",
  "tomorrow-night": "فردا شب",
  "morning": "در صبح",
  "afternoon": "در بعد از ظهر",
  "evening": "در عصر",
  "night": "شبانه",
  "today": "امروز",
  "tomorrow": "فردا",
  "sunday": "در یکشنبه",
  "monday": "در دوشنبه",
  "tuesday": "در سه شنبه",
  "wednesday": "در چهارشنبه",
  "thursday": "در پنج شنبه",
  "friday": "در جمعه",
  "saturday": "در شنبه",
  "minutes": "$1 دقیقه.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "کمتر از $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", و " : " و "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " از ");
  },
  "with": "$1, با $2",
  "range": "$1\u2013$2",
  "parenthetical": function(a, b) {
    return a + " (" + b + (a === "بارش مخلوط" ? " از برف)" : ")");
  },
  "for-hour": "$1 برای این ساعت",
  "starting-in": "$1 شروع در $2",
  "stopping-in": "$1 اتمام در $2",
  "starting-then-stopping-later": "$1 شروع در $2, اتمام در $3",
  "stopping-then-starting-later": "$1 اتمام در $2, شروع دوباره در $3",
  "for-day": "$1 در طول روز",
  "starting": "$1 شروع در $2",
  "until": function(condition, period) {
    return condition + " تا " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " تا " + strip_prefix(a) + ", شروع دوباره در " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " شروع در " + a + ", ادامه تا " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 در طی هفته",
  "over-weekend": "$1 در آخر هفته",
  "temperatures-peaking": "اوج دما در $1 $2",
  "temperatures-rising": "افزایش دما در $1 $2",
  "temperatures-valleying": "دمای پایین در $1 $2",
  "temperatures-falling": "کاهش دما در $1 $2",
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