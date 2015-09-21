function join_with_shared_prefix(a, b, joiner) {
  var i = 0;

  while(i !== a.length &&
  i !== b.length &&
  a.charCodeAt(i) === a.charCodeAt(i))
    ++i;

  while(i && a.charCodeAt(i - 1) !== 32)
    --i;

  return a + joiner + b.slice(i);
}

module.exports = require("../template")({
  "clear": "晴朗",
  "no-precipitation": "無降水",
  "mixed-precipitation": "多雲轉雨",
  "possible-very-light-precipitation": "可能有少量降水",
  "very-light-precipitation": "少量降水",
  "possible-light-precipitation": "可能有少量降水",
  "light-precipitation": "少量降水",
  "medium-precipitation": "中度降水",
  "heavy-precipitation": "大量降水",
  "possible-very-light-rain": "可能有毛毛雨",
  "very-light-rain": "毛毛雨",
  "possible-light-rain": "可能有小雨",
  "light-rain": "小雨",
  "medium-rain": "降雨",
  "heavy-rain": "傾盆大雨",
  "possible-very-light-sleet": "可能有較小的雨夾雪",
  "very-light-sleet": "輕微的雨夾雪",
  "possible-light-sleet": "可能有輕微雨夾雪",
  "light-sleet": "輕微的雨夾雪",
  "medium-sleet": "雨夾雪",
  "heavy-sleet": "較強的雨夾雪",
  "possible-very-light-snow": "可能有輕微降雪",
  "very-light-snow": "輕微降雪",
  "possible-light-snow": "可能有小雪",
  "light-snow": "小雪",
  "medium-snow": "降雪",
  "heavy-snow": "鵝毛大雪",
  "light-wind": "微風",
  "medium-wind": "有風",
  "heavy-wind": "推人大風",
  "low-humidity": "干燥",
  "high-humidity": "潮濕",
  "fog": "有霧",
  "light-clouds": "局部多雲",
  "medium-clouds": "多雲",
  "heavy-clouds": "多雲轉陰",
  "today-morning": "今天早上",
  "later-today-morning": "今天上午晚些時候",
  "today-afternoon": "今天下午",
  "later-today-afternoon": "午後",
  "today-evening": "今晚",
  "later-today-evening": "今天夜裡",
  "today-night": "明晚",
  "later-today-night": "今天夜裡",
  "tomorrow-morning": "明天上午",
  "tomorrow-afternoon": "明天下午",
  "tomorrow-evening": "明晚",
  "tomorrow-night": "明晚",
  "morning": "早上",
  "afternoon": "下午",
  "evening": "晚上",
  "night": "當晚",
  "today": "今天",
  "tomorrow": "明天",
  "sunday": "周日",
  "monday": "周一",
  "tuesday": "周二",
  "wednesday": "周三",
  "thursday": "周四",
  "friday": "周五",
  "saturday": "周六",
  "minutes": "$1分鐘",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1英寸",
  "centimeters": "$1釐米",
  "less-than": "低於$1",
  "and": function(a, b) {
    return join_with_shared_prefix(a, b, a.indexOf("。") === -1 ? "，" : "");
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, "直至");
  },
  "with": "$1，且$2",
  "range": "$1\u2013$2",
  "parenthetical": function(a, b) {
    return a + "(" + b + (a === "mixed precipitation" ? "的雪)" : ")");
  },
  "for-hour": "在接下來一個小時內$1。",
  "starting-in": "$1將於$2後開始。",
  "stopping-in": "$1將於$2後結束。",
  "starting-then-stopping-later": "$1將於$2後開始，並在之後的$3結束。",
  "stopping-then-starting-later": "$1將於$2後結束，而在之後的$3又將繼續。",
  "for-day": "$1將持續一整天。",
  "starting": "$1開始於$2。",
  "until": function(condition, period) {
    return condition + "將持續至" + period;
  },
  "until-starting-again": function(condition, a, b) {
    return condition + "直到" + a + "，將於" + b + "再次出現";
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + "開始於" + a + "，將持續至" + b;
  },
  "during": "$1持續至$2",
  "for-week": "$1持續一整周",
  "over-weekend": "$1持續一整周",
  "temperatures-peaking": "$2溫度劇增到$1",
  "temperatures-rising": "$2升溫到$1",
  "temperatures-valleying": "$2溫度驟降到$1",
  "temperatures-falling": "$2溫度下降到$1",
  "title": function(str) {
    return str;
  },
  "sentence": function(str) {
    if(str.charAt(str.length - 1) !== "。")
      str += "。";
    return str;
  }
});
