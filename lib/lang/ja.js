function join_with_shared_prefix(a, b, joiner) {
  var i = 0;

  while(i !== a.length &&
        i !== b.length &&
        a.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && a.charCodeAt(i - 1) !== 32)
    --i;

  return a.slice(0, i) + a.slice(i) + joiner + b.slice(i);
}

module.exports = require("../template")({
  "clear": "晴れ",
  "no-precipitation": "降水なし",
  "mixed-precipitation": "みぞれ",
  "possible-very-light-precipitation": "弱い降水の可能性あり",
  "very-light-precipitation": "弱い降水",
  "possible-light-precipitation": "弱い降水の可能性あり",
  "light-precipitation": "弱い降水",
  "medium-precipitation": "降水",
  "heavy-precipitation": "強い降水",
  "possible-very-light-rain": "霧雨の可能性あり",
  "very-light-rain": "霧雨",
  "possible-light-rain": "小雨の可能性あり",
  "light-rain": "小雨",
  "medium-rain": "雨",
  "heavy-rain": "大雨",
  "possible-very-light-sleet": "弱いみぞれの可能性あり",
  "very-light-sleet": "弱いみぞれ",
  "possible-light-sleet": "弱いみぞれの可能性あり",
  "light-sleet": "弱いみぞれ",
  "medium-sleet": "みぞれ",
  "heavy-sleet": "強いみぞれ",
  "possible-very-light-snow": "にわか雪の可能性があり",
  "very-light-snow": "にわか雪",
  "possible-light-snow": "小雪の可能性があり",
  "light-snow": "小雪",
  "medium-snow": "雪",
  "heavy-snow": "大雪",
  "possible-thunderstorm": "激しい雷雨の可能性があり",
  "thunderstorm": "雷雨",
  "light-wind": "弱い風",
  "medium-wind": "強い風",
  "heavy-wind": "猛烈な風",
  "low-humidity": "乾燥",
  "high-humidity": "湿っぽい",
  "fog": "霧",
  "light-clouds": "薄曇り",
  "medium-clouds": "曇り",
  "heavy-clouds": "曇り",
  "today-morning": "今朝",
  "later-today-morning": "今日の午前中",
  "today-afternoon": "今日の昼過ぎ",
  "later-today-afternoon": "今日の夕方",
  "today-evening": "今日の夜の初め頃",
  "later-today-evening": "今日の夜遅く",
  "today-night": "今夜",
  "later-today-night": "今夜遅く",
  "tomorrow-morning": "明日の朝",
  "tomorrow-afternoon": "明日の昼過ぎ",
  "tomorrow-evening": "明日の夕方",
  "tomorrow-night": "明日の夜",
  "morning": "朝",
  "afternoon": "昼過ぎ",
  "evening": "夕方",
  "night": "夜",
  "today": "今日",
  "tomorrow": "明日",
  "sunday": "日曜日",
  "monday": "月曜日",
  "tuesday": "火曜日",
  "wednesday": "水曜日",
  "thursday": "木曜日",
  "friday": "金曜日",
  "saturday": "土曜日",
  "next-sunday": "次の日曜日",
  "next-monday": "次の月曜日",
  "next-tuesday": "次の火曜日",
  "next-wednesday": "次の水曜日",
  "next-thursday": "次の木曜日",
  "next-friday": "次の金曜日",
  "next-saturday": "次の土曜日",
  "minutes": "$1分",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1インチ",
  "centimeters": "$1センチメートル",
  "less-than": "$1未満",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ",及び" : "及び"
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " から ");
  },
  "with": "$1及び$2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "一時間$1",
  "starting-in": "$1が$2に始まります",
  "stopping-in": "$1が$2に終わります",
  "starting-then-stopping-later": "$1が$2に始まり、$3後終わります",
  "stopping-then-starting-later": "$1が$2に終わり、また$3後始まります",
  "for-day": "一日中$1",
  "starting": "$1は$2が始まります",
  "until": function(condition, period) {
    return  condition + period + " まで" ;
  },
  "until-starting-again": function(condition, a, b) {
    return condition + a + "まで" + b +  ", また始まる " ;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + a + " 始まって" + b + ", まで続く " ;
  },
  "during": "$1から$2にかけて",
  "for-week": "一週間中$1",
  "over-weekend": "土、日曜日に$1",
  "temperatures-peaking": "最高気温$1 $2",
  "temperatures-rising": "気温は$1 $2に上がります",
  "temperatures-valleying": "最低気温$1 $2",
  "temperatures-falling": "気温は$1 $2に下がります",
  "title": "$1",
  /* Add a period if there isn't already one. */
  "sentence": function(str) {
    if(str.charAt(str.length - 1) !== "。")
      str += "。";

    return str;
  }
});
