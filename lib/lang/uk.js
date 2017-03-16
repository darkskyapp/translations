function join_with_shared_prefix(a, b, joiner) {
  var m = a,
      i = 0,
      j;

  while(i !== m.length &&
        i !== b.length &&
        m.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && m.charCodeAt(i - 1) !== 32)
    --i;

  return a + joiner + b.slice(i);
}

function time2(time)
{
  switch(time) {
    case "вранці":
      time = "ранку";
      break;
    case "вдень":
      time = "середини дня";
      break;
    case "ввечері":
      time = "вечору";
      break;
    case "вночі":
      time = "ночі";
      break;
    case "сьогодні вранці":
      time="сьогоднішнього ранку";
      break;
    case "сьогодні пізно вранці":
      time="сьогоднішнього пізнього ранку";
      break;
    case "сьогодні вдень":
      time="середини дня";
      break;
    case "сьогодні пізно вдень":
      time="сьогоднішнього пізнього дня";
      break;
    case "сьогодні ввечері":
      time="сьогоднішнього вечору";
      break;
    case "сьогодні пізно ввечері":
      time="сьогоднішнього пізнього вечору";
      break;
    case "сьогодні вночі":
      time="сьогоднішньої ночі";
      break;
    case "сьогодні пізно вночі":
      time="сьогоднішньої пізньої ночі";
      break;
    case "завтра вранці":
      time="завтрашнього ранку";
      break;
    case "завтра вдень":
      time="завтрашнього дня";
      break;
    case "завтра ввечері":
      time="завтрашнього вечору";
      break;
    case "завтра вночі":
      time="завтрашньої ночі";
      break;
    case "у неділю":
      time="неділі";
      break;
    case "в понеділок":
      time="понеділка";
      break;
    case "у вівторок":
      time="вівторка";
      break;
    case "в середу":
      time="середи";
      break;
    case "в четвер":
      time="четверга";
      break;
    case "в п'ятницю":
      time="п'ятниці";
      break;
    case "в суботу":
      time="суботи";
      break;
  };

  return time;
}

module.exports = require("../template")({
  "clear": "ясно",
  "no-precipitation": "без опадів",
  "mixed-precipitation": "змішані опади",
  "possible-very-light-precipitation": "можливі незначні опади",
  "very-light-precipitation": "незначні опади",
  "possible-light-precipitation": "можливі невеликі опади",
  "light-precipitation": "невеликі опади",
  "medium-precipitation": "опади",
  "heavy-precipitation": "сильні опади",
  "possible-very-light-rain": "можливий незначний дощ",
  "very-light-rain": "незначний дощ",
  "possible-light-rain": "можливий невеликий дощ",
  "light-rain": "невеликий дощ",
  "medium-rain": "дощ",
  "heavy-rain": "сильний дощ",
  "possible-very-light-sleet": "можливий незначний град",
  "very-light-sleet": "незначний град",
  "possible-light-sleet": "можливий невеликий град",
  "light-sleet": "невеликий град",
  "medium-sleet": "град",
  "heavy-sleet": "сильний град",
  "possible-very-light-snow": "можливий незначний сніг",
  "very-light-snow": "незначний сніг",
  "possible-light-snow": "можливий невеликий сніг",
  "light-snow": "невеликий сніг",
  "medium-snow": "сніг",
  "heavy-snow": "снігопад",
  "possible-thunderstorm": "можливі грози",
  "thunderstorm": "грози",
  "light-wind": "слабкий вітер",
  "medium-wind": "вітер",
  "heavy-wind": "сильний вітер",
  "low-humidity": "сухо",
  "high-humidity": "волого",
  "fog": "туман",
  "light-clouds": "невелика хмарність",
  "medium-clouds": "хмарно",
  "heavy-clouds": "сильна хмарність",
  "today-morning": "сьогодні вранці",
  "later-today-morning": "сьогодні пізно вранці",
  "today-afternoon": "сьогодні вдень",
  "later-today-afternoon": "сьогодні пізно вдень",
  "today-evening": "сьогодні ввечері",
  "later-today-evening": "сьогодні пізно ввечері",
  "today-night": "сьогодні вночі",
  "later-today-night": "сьогодні пізно вночі",
  "tomorrow-morning": "завтра вранці",
  "tomorrow-afternoon": "завтра вдень",
  "tomorrow-evening": "завтра ввечері",
  "tomorrow-night": "завтра вночі",
  "morning": "вранці",
  "afternoon": "вдень",
  "evening": "ввечері",
  "night": "вночі",
  "today": "сьогодні",
  "tomorrow": "завтра",
  "sunday": "в неділю",
  "monday": "в понеділок",
  "tuesday": "у вівторок",
  "wednesday": "в середу",
  "thursday": "в четвер",
  "friday": "в п'ятницю",
  "saturday": "в суботу",
  "next-sunday": "в неділю",
  "next-monday": "наступного понеділка",
  "next-tuesday": "наступного вівторка",
  "next-wednesday": "наступної середи",
  "next-thursday": "наступного четверга",
  "next-friday": "наступної п'ятниці",
  "next-saturday": "наступної суботи",
  "minutes": "$1 хв.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 см.",
  "less-than": "менше $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", і " : " і "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, time2(b), " і до ");
  },
  "with": "$1, з $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 протягом наступної години",
  "starting-in": "$1 починається за $2",
  "stopping-in": "$1 закінчується за $2",
  "starting-then-stopping-later": "$1 починається за $2, і закінчується за $3",
  "stopping-then-starting-later": "$1 закінчується за $2, і починається знову за $3",
  "for-day": "$1 протягом всього дня",
  "starting": "$1 починається $2",
  "until": function(condition, time) {
    return condition + " до " + time2(time);
  },
  "until-starting-again": function(condition, timeUntil, timeAgain){
    timeUntil = time2(timeUntil);
    return condition + " до " + timeUntil + ", починаючись знову " + timeAgain;
  },
  "starting-continuing-until": function(condition, timeFrom, timeTo) {
    timeFrom = time2(timeFrom);
    timeTo = time2(timeTo);
    return condition + ", починаючись з " + timeFrom + ", і до " + timeTo;
  },
  "during": function(condition, time) {
    return condition + " " + time;
  },
  "for-week": "$1 протягом всього тижня",
  "over-weekend": "$1 протягом всіх вихідних",
  "temperatures-peaking": "температурою, що піднімається до максимуму $1 $2",
  "temperatures-rising": "температурою, що піднімається до $1 $2",
  "temperatures-valleying": "температурою, що знижується до $1 $2",
  "temperatures-falling": "температурою, що знижується до мінімуму $1 $2",
  /* Capitalize the first letter of every word, except if that word is "e". */
  "title": function(str) {
    return str.replace(/\S+/g, function(word) {
      return word === "і" ?
        word :
        word.charAt(0).toUpperCase() + word.slice(1);
    });
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
