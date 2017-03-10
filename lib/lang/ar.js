
function join(a, b, joiner) {
	return (a.slice(0, 4) === "يوم " && b.slice(0, 4) === "يوم " && joiner === " و ")
			? "يومي " + a.slice(4) + joiner + b.slice(4)
			: a + joiner + b;
}

function strip_prefix(period) {
  return period.slice(0, 10) === "خلال الليل" ? period.slice(5) : 
         period.slice(0, 3) ===   "في " ? period.slice(3) :
                                              period;
}

module.exports = require("../template")({
	"clear": "صافِ",
  "no-precipitation": "لا أمطار",
  "mixed-precipitation": "هطول أمطار وثلوج",
  "possible-very-light-precipitation": "إحتمالية هطول أمطار خفيفة",
  "very-light-precipitation": "أمطار خفيفة",
  "possible-light-precipitation": "إحتمالية هطول أمطار خفيفة",
  "light-precipitation": "أمطار خفيفة",
  "medium-precipitation": "أمطار متوسطة",
  "heavy-precipitation": "أمطار غزيرة",
  "possible-very-light-rain": "إحتمالية هطول أمطار خفيفة",
  "very-light-rain": "أمطار خفيفة",
  "possible-light-rain": "إحتمالية أمطار خفيفة",
  "light-rain": "أمطار خفيفة",
  "medium-rain": "أمطار متوسطة",
  "heavy-rain": "أمطار غزيرة",
  "possible-very-light-sleet": "إحتمالية موجة صقيع خفيفة",
  "very-light-sleet": "موجة صقيع خفيفة",
  "possible-light-sleet": "إحتمالية موجة صقيع خفيفة",
  "light-sleet": "موجة صقيع خفيفة",
  "medium-sleet": "صقيع",
  "heavy-sleet": "موجة صقيع شديدة",
  "possible-very-light-snow": "احتمالية تساقط ثلوج خفيفة",
  "very-light-snow": "رياح خفيفة",
  "possible-light-snow": "احتمالية تساقط ثلوج خفيفة",
  "light-snow": "ثلوج خفيفة",
  "medium-snow": "ثلوج",
  "heavy-snow": "ثلوج كثيفة",
  "light-wind": "رياح خفيفة",
  "medium-wind": "رياح متوسطة",
  "heavy-wind": "عواصف",
  "low-humidity": "اجواء جافة",
  "high-humidity": "اجواء رطبة",
  "fog": "اجواء غائمة",
  "light-clouds": "غائم جزئياً",
  "medium-clouds": "اجواء غائمة",
  "heavy-clouds": "اجواء غائمة",
  "today-morning": "هذا الصباح",
  "later-today-morning": "لاحقاً هذا الصباح",
  "today-afternoon": "بعد الظهر",
  "later-today-afternoon": "لاحقاً بعد الظهر",
  "today-evening": "هذا المساء",
  "later-today-evening": "لاحقاً هذا المساء",
  "today-night": "الليلة",
  "later-today-night": "لاحقاً الليلة",
  "tomorrow-morning": "الغد صباحاً",
  "tomorrow-afternoon": "غداً بعد الظهر",
  "tomorrow-evening": "الغد مساءً",
  "tomorrow-night": "الغد ليلاً",
  "morning": "في الصباح",
  "afternoon": "بعد الظهيرة",
  "evening": "في المساء",
  "night": "خلال الليل",
  "today": "اليوم",
  "tomorrow": "غداً",
  "sunday": "يوم الأحد",
  "monday": "يوم الإثنين",
  "tuesday": "يوم الثلاثاء",
  "wednesday": "يوم الأربعاء",
  "thursday": "يوم الخميس",
  "friday": "يوم الجمعة",
  "saturday": "يوم السبت",
  "minutes": "$1 دقيقة",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 انش",
  "centimeters": "$1 سم",
  "less-than": "أقل من $1",
  "and": function(a, b) {
    return join( a, b, " و " );
  },
  "through": function(a, b) {
    return join(a, b, " حتى ");
  },
  "with": "$1 مع $2",
  "range": "$1\u2013$2",
  "parenthetical": function(a, b) {
    return a + " (" + b + (a === "هطول أمطار وثلوج" ? " من الثلج)" : ")" );//a + " (" + b + ")";
  },
  "for-hour": "$1 لهذه الساعة",
  "starting-in": "$1 تبدأ خلال $2",
  "stopping-in": "$1 تتوقف خلال $2",
  "starting-then-stopping-later": "$1 تبدأ خلال $2 وتتوقف لاحقاً خلال $3",
  "stopping-then-starting-later": "$1 تتوقف خلال $2 وتبدأ لاحقاً خلال $3",
  "for-day": "$1 خلال اليوم",
  "starting": "$1 تبدأ $2",
  "until": function(condition, period) {
    return condition + " حتى " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " حتى " + strip_prefix(a) + " وتبدأ مجدداً في " + strip_prefix(b);
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " تبدأ في " + strip_prefix(a) + " وتستمر حتى " + strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 خلال الأسبوع",
  "over-weekend": "$1 خلال نهاية الأسبوع",
  "temperatures-peaking": "درجات حرارة تبلغ ذروتها عند $1 $2",
  "temperatures-rising": "درجات حرارة ترتفع حتى $1 $2",
  "temperatures-valleying": "انخفاض درجات الحرارة لأدنى مستوى لها عند $1 $2",
  "temperatures-falling": "درجات حرارة تنخفض حتى $1 $2",
  "title": function(str) {
    return str;
  },
  "sentence": function(str) {
    return str;
  }
  
});