"use strict";

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

function time2(time) {
  switch(time) {
    case "вранці": return "ранку";
    case "вдень": return "середини дня";
    case "ввечері": return "вечору";
    case "вночі": return "ночі";
    case "сьогодні вранці": return "сьогоднішнього ранку";
    case "сьогодні пізно вранці": return "сьогоднішнього пізнього ранку";
    case "сьогодні вдень": return "середини дня";
    case "сьогодні пізно вдень": return "сьогоднішнього пізнього дня";
    case "сьогодні ввечері": return "сьогоднішнього вечору";
    case "сьогодні пізно ввечері": return "сьогоднішнього пізнього вечору";
    case "сьогодні вночі": return "сьогоднішньої ночі";
    case "сьогодні пізно вночі": return "сьогоднішньої пізньої ночі";
    case "завтра вранці": return "завтрашнього ранку";
    case "завтра вдень": return "завтрашнього дня";
    case "завтра ввечері": return "завтрашнього вечору";
    case "завтра вночі": return "завтрашньої ночі";
    case "у неділю": return "неділі";
    case "в понеділок": return "понеділка";
    case "у вівторок": return "вівторка";
    case "в середу": return "середи";
    case "в четвер": return "четверга";
    case "в п'ятницю": return "п'ятниці";
    case "в суботу": return "суботи";
    default: return time;
  }
}

module.exports = {
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
  },
};
