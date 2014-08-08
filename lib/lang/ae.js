function join_with_shared_prefix(a, b, joiner) {
  var m = a,
      i = 0,
      j;

  /* HACK: This gets around "today through on Tuesday" or cases like it, which
   * are incorrect in English. */
  if(m === "اليوم" || m === "غدا")
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
  return period.slice(0, 9) === "بين عشية وضحاها" ? period.slice(4) :
         period.slice(0, 7) ===   "في" ? period.slice(7) :
                                              period;
}

module.exports = require("../template")({
  "clear": "صافٍ",
  "no-precipitation": "لا أمطار",
  "mixed-precipitation":  "هطول أمطار مختلطة",
  "possible-very-light-precipitation": "احتمال هطول خفيف للأمطار",
  "very-light-precipitation": "هطول خفيف للأمطار",
  "possible-light-precipitation": "احتمال هطول خفيف للأمطار",
  "light-precipitation": "هطول خفيف للأمطار",
  "medium-precipitation": "هطول للأمطار",
  "heavy-precipitation": "هطول كثيف للأمطار",
  "possible-very-light-rain": "رذاذ محتمل",
  "very-light-rain": "رذاذ",
  "possible-light-rain": "احتمال أمطار خفيفة",
  "light-rain": "أمطار خفيفة",
  "medium-rain": "مطر",
  "heavy-rain": "أمطار كثيفة",
  "possible-very-light-sleet": "احتمال صقيع خفيف",
  "very-light-sleet": "صقيع خفيف",
  "possible-light-sleet": "احتمال صقيع خفيف",
  "light-sleet": "صقيع خفيف",
  "medium-sleet": "صقيع",
  "heavy-sleet": "صقيع شديد",
  "possible-very-light-snow": "احتمالية لهبوب الرياح",
  "very-light-snow": "رياح",
  "possible-light-snow": "احتمالية لتساقط الثلوج الخفيفة",
  "light-snow": "ثلوج خفيفة",
  "medium-snow": "ثلج",
  "heavy-snow": "ثلوج كثيفة",
  "light-wind": "نسيم",
  "medium-wind": "عاصف",
  "heavy-wind": "عاصف بشدة",
  "low-humidity": "جاف",
  "high-humidity": "رطب",
  "fog": "غائم",
  "light-clouds": "غائم جزئياً",
  "medium-clouds": "غائم",
  "heavy-clouds": "معتم",
  "today-morning": "هذا الصباح",
  "later-today-morning":  "لاحقاً هذا الصباح",
  "today-afternoon": "بعد الظهر",
  "later-today-afternoon": "لاحقأ بعد الظهر",
  "today-evening": "هذا المساء",
  "later-today-evening": "لاحقاً هذا المساء",
  "today-night": "الليلة",
  "later-today-night": "لاحقاً الليلة",
  "tomorrow-morning": "غداً صباحاً",
  "tomorrow-afternoon": "غداً بعد الظهر",
  "tomorrow-evening":  "غداً مساءً",
  "tomorrow-night": "ليلة الغد",
  "morning": "في الصباح",
  "afternoon": "بعد الظهر",
  "evening": "في المساء",
  "night": "خلال الليل",
  "today": "اليوم",
  "tomorrow": "الغد",
  "sunday": "يوم الأحد",
  "monday": "يوم الإثنين",
  "tuesday": "يوم الثلاثاء",
  "wednesday": "يوم الأربعاء",
  "thursday": "يوم الخميس",
  "friday": "يوم الجمعة",
  "saturday": "يوم السبت",
  "minutes": "$1 دقيفة",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 بوصة",
  "centimeters": "$1 سم",
  "less-than": "تحت $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", و " : " و "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " من خلال ");
  },
  "with":  "$1 مع $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 للساعة",
  "starting-in": "$1 يبدأ خلال $2",
  "stopping-in": "$1 يتوقف خلال $2",
  "starting-then-stopping-later": "$1 يبدأ خلال $2، ويتوقف $3 لاحقاً",
  "stopping-then-starting-later": "$1 يتوقف خلال $2، ويبدأ مجدداً $3 لاحقاً",
  "for-day": "$1 خلال اليوم",
  "starting": "$1 يبدأ $2",
  "until": function(condition, period) {
    return condition + " حتى " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " حتى " + strip_prefix(a) + ", تبدأ مرة أخرى " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " شروع " + a + ", استمرار حتى " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 خلال الأسبوع",
  "over-weekend": "$1 في نهاية الأسبوع",
  "temperatures-peaking": "تقترب درجة الحرارة من $1 $2",
  "temperatures-rising": "ترتفع درجة الحرارة حتى $1 $2",
  "temperatures-valleying": "تنخفض درجة الحرارة حتى $1 $2",
  "temperatures-falling": "تنخقض دراجة الحرارة حتى $1 $2",
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
});
