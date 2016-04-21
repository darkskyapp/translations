function join(a, b, joiner) {
	return  a + joiner + b;
}

module.exports = require("../template")({
  "clear": "صاف",
  "no-precipitation": "عدم بارش",
  "mixed-precipitation": "بارش برف و باران",
  "possible-very-light-precipitation": "احتمال بارش بسیار ملایم",
  "very-light-precipitation": "بارش بسیار ملایم",
  "possible-light-precipitation": "احتمال بارش ملایم",
  "light-precipitation": "بارش ملایم",
  "medium-precipitation": "بارش",
  "heavy-precipitation": "بارش سنگین",
  "possible-very-light-rain": "احتمال بارش بسیار ملایم باران",
  "very-light-rain": "باران بسیار ملایم",
  "possible-light-rain": "احتمال بارش ملایم باران",
  "light-rain": "باران ملایم",
  "medium-rain": "باران",
  "heavy-rain": "باران شدید",
  "possible-very-light-sleet": "احتمال بارش بسیار ملایم برف و باران",
  "very-light-sleet": "بارش بسیار ملایم برف و باران",
  "possible-light-sleet": "احتمال بارش ملایم برف و باران",
  "light-sleet": "برف و باران ملایم",
  "medium-sleet": "برف و باران",
  "heavy-sleet": "برف و باران سنگین",
  "possible-very-light-snow": "احتمال بارش بسیار خفیف برف",
  "very-light-snow": "بارش بسیار خفیف برف",
  "possible-light-snow": "احتمال بارش خفیف برف",
  "light-snow": "بارش خفیف برف",
  "medium-snow": "بارش برف",
  "heavy-snow": "برف سنگین",
  "light-wind": "باد ملایم",
  "medium-wind": "باد",
  "heavy-wind": "باد شدید",
  "low-humidity": "رطوبت کم",
  "high-humidity": "رطوبت زیاد",
  "fog": "مه‌آلود",
  "light-clouds": "کمی ابری",
  "medium-clouds": "نیمه ابری",
  "heavy-clouds": "تمام ابری",
  "today-morning": "امروز صبح",
  "later-today-morning": "بعد از صبح امروز",
  "today-afternoon": "بعدازظهر امروز",
  "later-today-afternoon": "بعد از بعدازظهر امروز",
  "today-evening": "غروب امروز",
  "later-today-evening": "بعد از غروب امروز",
  "today-night": "امشب",
  "later-today-night": "بعد از امشب",
  "tomorrow-morning": "فردا صبح",
  "tomorrow-afternoon": "فردا بعدازظهر",
  "tomorrow-evening": "فردا غروب",
  "tomorrow-night": "فردا شب",
  "morning": "صبح",
  "afternoon": "بعدازظهر",
  "evening": "غروب",
  "night": "شب",
  "today": "امروز",
  "tomorrow": "فردا",
  "sunday": "یکشنبه",
  "monday": "دوشنبه",
  "tuesday": "سه‌شنبه",
  "wednesday": "چهارشنبه",
  "thursday": "پنج‌شنبه",
  "friday": "جمعه",
  "saturday": "شنبه",
  "minutes": "$1 دقیقه",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 اینچ",
  "centimeters": "$1 سانتی‌متر",
  "less-than": "کمتر از $1",
  "and": function(a, b) {
    return join( a, b, " و " );
  },
  "through": function(a, b) {
    return join(a, b, " تا ");
  },
  "with": "$1 با $2",
  "range": "$1\u2013$2",
  "parenthetical": function(a, b) {
    return  a + " (" + b + ")";
  },
  "for-hour": "$1 برای ساعت",
  "starting-in": "$1 شروع در $2",
  "stopping-in": "$1 توقف در $2",
  "starting-then-stopping-later": "$1 شروع در $2 و توقف در $3",
  "stopping-then-starting-later": "$1 توقف در $2 و شروع دوباره در $3",
  "for-day": "$1 برای روز",
  "starting": "$1 شروع $2",
  "until": function(condition, period) {
    return condition + " تا " + period;
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " تا " + a + " و دوباره از " + b + "شروع می‌شود";
  },
  "starting-continuing-until": function(condition, a, b) {
    return  condition + " از " + a + " شروع و تا " + b + "ادامه دارد";
  },
  "during": "$1 $2",
  "for-week": "$1 در طول هفته",
  "over-weekend": "$1 انتهای هفته",
  "temperatures-peaking": "اوج دما $1 $2",
  "temperatures-rising": "افزایش دما تا $1 $2",
  "temperatures-valleying": "کاهش دما در پایین‌ترین سطح $1 $2",
  "temperatures-falling": "کاهش دما تا $1 $2",
  "title": function(str) {
    return str;
  },
  "sentence": function(str) {
    return str;
  }
  
});
