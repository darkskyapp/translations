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
  "no-precipitation": "无降水",
  "mixed-precipitation": "多云转雨",
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
  "heavy-rain": "倾盆大雨",
  "possible-very-light-sleet": "可能有较小的雨夹雪",
  "very-light-sleet": "轻微的雨夹雪",
  "possible-light-sleet": "可能有轻微雨夹雪",
  "light-sleet": "轻微的雨夹雪",
  "medium-sleet": "雨夹雪",
  "heavy-sleet": "较强的雨夹雪",
  "possible-very-light-snow": "可能有轻微降雪",
  "very-light-snow": "轻微降雪",
  "possible-light-snow": "可能有小雪",
  "light-snow": "小雪",
  "medium-snow": "降雪",
  "heavy-snow": "鹅毛大雪",
  "light-wind": "微风",
  "medium-wind": "有风",
  "heavy-wind": "推人大风",
  "low-humidity": "干燥",
  "high-humidity": "潮湿",
  "fog": "有雾",
  "light-clouds": "局部多云",
  "medium-clouds": "多云",
  "heavy-clouds": "多云转阴",
  "today-morning": "今天早上",
  "later-today-morning": "今天上午晚些时候",
  "today-afternoon": "今天下午",
  "later-today-afternoon": "午后",
  "today-evening": "今晚",
  "later-today-evening": "今天夜里",
  "today-night": "明晚",
  "later-today-night": "今天夜里",
  "tomorrow-morning": "明天上午",
  "tomorrow-afternoon": "明天下午",
  "tomorrow-evening": "明晚",
  "tomorrow-night": "明晚",
  "morning": "早上",
  "afternoon": "下午",
  "evening": "晚上",
  "night": "当晚",
  "today": "今天",
  "tomorrow": "明天",
  "sunday": "周日",
  "monday": "周一",
  "tuesday": "周二",
  "wednesday": "周三",
  "thursday": "周四",
  "friday": "周五",
  "saturday": "周六",
  "minutes": "$1分钟",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1英寸",
  "centimeters": "$1厘米",
  "less-than": "低于$1",
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
  "for-hour": "在接下来一个小时内$1。",
  "starting-in": "$1将于$2后开始。",
  "stopping-in": "$1将于$2后结束。",
  "starting-then-stopping-later": "$1将于$2后开始，并在之后的$3结束。",
  "stopping-then-starting-later": "$1将于$2后结束，而在之后的$3又将继续。",
  "for-day": "$1将持续一整天。",
  "starting": "$1开始于$2。",
  "until": function(condition, period) {
    return condition + "将持续至" + period;
  },
  "until-starting-again": function(condition, a, b) {
    return condition + "直到" + a + "，将于" + b + "再次出现";
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + "开始于" + a + "，将持续至" + b;
  },
  "during": "$1持续至$2",
  "for-week": "$1持续一整周",
  "over-weekend": "$1持续一整周",
  "temperatures-peaking": "$2温度剧增到$1",
  "temperatures-rising": "$2升温到$1",
  "temperatures-valleying": "$2温度骤降到$1",
  "temperatures-falling": "$2温度下降到$1",
  "title": function(str) {
    return str;
  },
  "sentence": function(str) {
    if(str.charAt(str.length - 1) !== "。")
      str += "。";
    return str;
  }
});
