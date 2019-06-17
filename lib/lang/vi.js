"use strict";

function join_with_shared_prefix(a, b, joiner) {
  let i = 0;

  while(i !== a.length &&
        i !== b.length &&
        a.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && a.charCodeAt(i - 1) !== 32)
    --i;

  return a.slice(0, i) + a.slice(i) + joiner + b.slice(i);
}


module.exports = {
  "clear": "quang mây",
  "no-precipitation": "không mưa",
  "mixed-precipitation": "mưa rải rác",
  "possible-very-light-precipitation": "có thể có mưa nhỏ",
  "very-light-precipitation": "mưa nhỏ",
  "possible-light-precipitation": "có thể có mưa nhẹ",
  "light-precipitation": "lượng mưa nhỏ",
  "medium-precipitation": "lượng mưa trung bình",
  "heavy-precipitation": "lượng mưa lớn",
  "possible-very-light-rain": "có thể có mưa phùn",
  "very-light-rain": "mưa phùn",
  "possible-light-rain": "có thể có mưa nhỏ",
  "light-rain": "mưa nhỏ",
  "medium-rain": "mưa vừa",
  "heavy-rain": "mưa to",
  "possible-very-light-sleet": "có thể tuyết rơi nhỏ",
  "very-light-sleet": "mưa tuyết nhỏ",
  "possible-light-sleet": "có thể có mưa tuyết nhỏ",
  "light-sleet": "mưa tuyết nhỏ",
  "medium-sleet": "mưa tuyết vừa",
  "heavy-sleet": "mưa tuyết to",
  "possible-very-light-snow": "có thể có tuyết rơi nhỏ",
  "very-light-snow": "tuyết rơi rất nhỏ",
  "possible-light-snow": "có thể có tuyết rơi nhỏ",
  "light-snow": "tuyết rơi nhỏ",
  "medium-snow": "tuyết rơi",
  "heavy-snow": "tuyết rơi nhiều",
  "possible-thunderstorm": "có thể có dông",
  "thunderstorm": "có dông",
  "light-wind": "gió nhẹ",
  "medium-wind": "có gió",
  "heavy-wind": "gió to",
  "low-humidity": "trời hanh khô",
  "high-humidity": "độ ẩm cao",
  "fog": "có sương mù",
  "light-clouds": "ít mây",
  "medium-clouds": "có mây",
  "heavy-clouds": "trời âm u",
  "today-morning": "sáng nay",
  "later-today-morning": "cuối buổi sáng",
  "today-afternoon": "trưa nay",
  "later-today-afternoon": "chiều hôm nay",
  "today-evening": "chiều tối nay",
  "later-today-evening": "tối hôm nay",
  "today-night": "đêm nay",
  "later-today-night": "nửa đêm",
  "tomorrow-morning": "sáng mai",
  "tomorrow-afternoon": "trưa mai",
  "tomorrow-evening": "chiều tối mai",
  "tomorrow-night": "tối mai",
  "morning": "buổi sáng",
  "afternoon": "buổi chiều",
  "evening": "buổi tối",
  "night": "đêm",
  "today": "hôm nay",
  "tomorrow": "ngày mai",
  "sunday": "chủ nhật",
  "monday": "thứ hai",
  "tuesday": "thứ ba",
  "wednesday": "thứ tư",
  "thursday": "thứ năm",
  "friday": "thứ sáu",
  "saturday": "thứ bảy",
  "next-sunday": "chủ nhật tuần sau",
  "next-monday": "thứ hai tuần sau",
  "next-tuesday": "thứ ba tuần sau",
  "next-wednesday": "thứ tư tuần sau",
  "next-thursday": "thứ năm tuần sau",
  "next-friday": "thứ sáu tuần sau",
  "next-saturday": "thứ bảy tuần sau",
  "minutes": "$1 phút",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in",
  "centimeters": "$1 cm",
  "less-than": "dưới $1",
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
    return a + " (" + b + (a === "mưa rải rác" ? " tuyết)" : ")");
  },
  "for-hour": "$1 trong một giờ",
  "starting-in": "$1 bắt đầu sau $2",
  "stopping-in": "$1 dừng sau $2",
  "starting-then-stopping-later": "$1 bắt đầu sau $2, dừng lại $3 sau",
  "stopping-then-starting-later": "$1 dừng sau $2, tiếp tục $3 sau",
  "for-day": "$1 suốt cả ngày",
  "starting": "$1 bắt đầu lúc $2",
  "until": "$1 cho đến $2",
  "until-starting-again": "$1 cho đến $2, bắt đầu lại $3",
  "starting-continuing-until": "$1 bắt đầu lúc $2, tiếp tục tới $3",
  "during": "$1 vào $2",
  "for-week": "$1 cả tuần",
  "over-weekend": "$1 suốt cuốt tuần",
  "temperatures-peaking": "nhiệt độ đỉnh điểm $1 vào $2",
  "temperatures-rising": "nhiệt độ tăng tới $1 vào $2",
  "temperatures-valleying": "nhiệt độ thấp nhất $1 vào $2",
  "temperatures-falling": "nhiệt độ giảm tới $1 vào $2",
  "title": "$1",
  // Capitalize the first word of the sentence and end with a period.
  "sentence": function(str) {
    // Capitalize.
    str = str.charAt(0).toUpperCase() + str.slice(1);

    // Add a period if there isn't already one.
    if(str.charAt(str.length - 1) !== ".")
      str += ".";

    return str;
  },
};
