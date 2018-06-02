function join_with_shared_prefix(a, b, joiner) {
  var m = a,
      i = 0,
      j;

  /* HACK: This gets around "today through on Tuesday" or cases like it, which
   * are incorrect in English. */
  if(m === "hôm nay" || m === "ngày mai")
    m = "vào " + m;

  while(i !== m.length &&
        i !== b.length &&
        m.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && m.charCodeAt(i - 1) !== 32)
    --i;

  return a + joiner + b.slice(i);
}

function strip_prefix(period) {
  return period.slice(0, 9) === "suốt đêm" ? period.slice(4) :
         period.slice(0, 7) ===   "trong " ? period.slice(7) :
                                              period;
}

module.exports = {
  "clear": "quang mây",
  "no-precipitation": "không mưa",
  "mixed-precipitation": "mixed precipitation",
  "possible-very-light-precipitation": "có thể có mưa nhẹ",
  "very-light-precipitation": "mưa nhẹ",
  "possible-light-precipitation": "có thể có mưa nhẹ",
  "light-precipitation": "mưa nhẹ",
  "medium-precipitation": "mưa",
  "heavy-precipitation": "mưa to",
  "possible-very-light-rain": "có thể có mưa phùn",
  "very-light-rain": "mưa phùn",
  "possible-light-rain": "có thể có mưa nhẹ",
  "light-rain": "mưa nhẹ",
  "medium-rain": "mưa",
  "heavy-rain": "mưa to",
  "possible-very-light-sleet": "có thể có mưa tuyết nhẹ",
  "very-light-sleet": "mưa tuyết nhẹ",
  "possible-light-sleet": "có thể có mưa tuyết nhẹ",
  "light-sleet": "mưa tuyết nhẹ",
  "medium-sleet": "mưa tuyết",
  "heavy-sleet": "mưa tuyết nặng",
  "possible-very-light-snow": "tuyết rơi nhẹ",
  "very-light-snow": "tuyết rơi nhẹ",
  "possible-light-snow": "có thể tuyết rơi nhẹ",
  "light-snow": "tuyết rơi nhẹ",
  "medium-snow": "tuyết rơi",
  "heavy-snow": "tuyết rơi nhẹ nặng",
  "possible-thunderstorm": "có thể có dông",
  "thunderstorm": "có dông",
  "light-wind": "gió nhẹ",
  "medium-wind": "có gió",
  "heavy-wind": "gió to",
  "low-humidity": "trời hanh khô",
  "high-humidity": "trời nồm",
  "fog": "foggy",
  "light-clouds": "ít mây",
  "medium-clouds": "có mây",
  "heavy-clouds": "âm u nhiều mâu",
  "today-morning": "sáng nay",
  "later-today-morning": "sau sáng nay",
  "today-afternoon": "trưa nay",
  "later-today-afternoon": "chiều nay",
  "today-evening": "chiều nay",
  "later-today-evening": "chiều tối nay",
  "today-night": "đêm nay",
  "later-today-night": "nửa đêm",
  "tomorrow-morning": "sáng mai",
  "tomorrow-afternoon": "trưa mai mai",
  "tomorrow-evening": "chiều mai",
  "tomorrow-night": "tối mai",
  "morning": "vào buổi sáng",
  "afternoon": "vào buổi trưa",
  "evening": "vào buổi tối",
  "night": "đêm",
  "today": "hôm nay",
  "tomorrow": "ngày mai",
  "sunday": "vào chủ nhật",
  "monday": "vào thứ hai",
  "tuesday": "vào thứ ba",
  "wednesday": "vào thứ tư",
  "thursday": "vào thứ năm",
  "friday": "vào thứ sáu",
  "saturday": "vào thứ bảy",
  "next-sunday": "chủ nhật tuần sau",
  "next-monday": "thứ hai tuần sau",
  "next-tuesday": "thứ ba tuần sau",
  "next-wednesday": "thứ tư tuần sau",
  "next-thursday": "thứ năm tuần sau",
  "next-friday": "thứ sáu tuần sau",
  "next-saturday": "thứ bảy tuần sau",
  "minutes": "$1 phút.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "under $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", và " : " và "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " cho tới ");
  },
  "with": "$1, với $2",
  "range": "$1\u2013$2",
  "parenthetical": function(a, b) {
    return a + " (" + b + (a === "mixed precipitation" ? " of snow)" : ")");
  },
  "for-hour": "$1 trong một giờ",
  "starting-in": "$1 bắt đầu lúc $2",
  "stopping-in": "$1 dừng lúc $2",
  "starting-then-stopping-later": "$1 bắt đầu lúc $2, dừng lại $3 sau",
  "stopping-then-starting-later": "$1 dừng lúc $2, tiếp tục $3 sau",
  "for-day": "$1 cả ngày",
  "starting": "$1 bắt đầu lúc $2",
  "until": function(condition, period) {
    return condition + " until " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " cho đến khi " + strip_prefix(a) + ", bắt đầu lại " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " bắt đầu lúc " + a + ", tiếp tục tới khi " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 cả tuần",
  "over-weekend": "$1 suốt cuốt tuần",
  "temperatures-peaking": "nhiệt độ đỉnh điểm lúc $1 $2",
  "temperatures-rising": "nhiệt độ tăng tới $1 $2",
  "temperatures-valleying": "nhiệt độ thấp nhất lúc $1 $2",
  "temperatures-falling": "nhiệt độ giảm tới $1 $2",
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
};
