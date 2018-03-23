"use strict";

function join_with_shared_prefix(a, b, joiner) {
  let i = 0;

  while(i !== a.length &&
        i !== b.length &&
        a.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && a.charCodeAt(i - 1) !== 32)
    --i;

  return a + joiner + b.slice(i);
}

function time2(time) {
  switch(time) {
    case "утром": return "утра";
    case "днем": return "середины дня";
    case "вечером": return "вечера";
    case "ночью": return "ночи";
    case "сегодня утром": return "сегодняшнего утра";
    case "сегодня поздним утром": return "сегодняшнего позднего утра";
    case "сегодня днем": return "середины дня";
    case "сегодня поздним днем": return "сегодняшнего позднего дня";
    case "сегодня вечером": return "сегодняшнего вечера";
    case "сегодня поздним вечером": return "сегодняшнего позднего вечера";
    case "сегодня ночью": return "сегодняшней ночи";
    case "сегодня поздней ночью": return "сегодняшней поздней ночи";
    case "завтра утром": return "завтрашнего утра";
    case "завтра днем": return "завтрашнего дня";
    case "завтра вечером": return "завтрашнего вечера";
    case "завтра ночью": return "завтрашней ночи";
    case "в воскресенье": return "воскресенья";
    case "в понедельник": return "понедельника";
    case "во вторник": return "вторника";
    case "в среду": return "среды";
    case "в четверг": return "четверга";
    case "в пятницу": return "пятницы";
    case "в субботу": return "субботы";
    default: return time;
  }
}

module.exports = {
  "clear": "ясно",
  "no-precipitation": "без осадков",
  "mixed-precipitation": "смешанные осадки",
  "possible-very-light-precipitation": "возможны незначительные осадки",
  "very-light-precipitation": "незначительные осадки",
  "possible-light-precipitation": "возможны небольшие осадки",
  "light-precipitation": "небольшие осадки",
  "medium-precipitation": "осадки",
  "heavy-precipitation": "сильные осадки",
  "possible-very-light-rain": "возможен незначительный дождь",
  "very-light-rain": "незначительный дождь",
  "possible-light-rain": "возможен небольшой дождь",
  "light-rain": "небольшой дождь",
  "medium-rain": "дождь",
  "heavy-rain": "сильный дождь",
  "possible-very-light-sleet": "возможен незначительный град",
  "very-light-sleet": "незначительный град",
  "possible-light-sleet": "возможен небольшой град",
  "light-sleet": "небольшой град",
  "medium-sleet": "град",
  "heavy-sleet": "сильный град",
  "possible-very-light-snow": "возможен незначительный снег",
  "very-light-snow": "незначительный снег",
  "possible-light-snow": "возможен небольшой снег",
  "light-snow": "небольшой снег",
  "medium-snow": "снег",
  "heavy-snow": "снегопад",
  "possible-thunderstorm": "возможны грозы",
  "thunderstorm": "грозы",
  "light-wind": "слабый ветер",
  "medium-wind": "ветер",
  "heavy-wind": "сильный ветер",
  "low-humidity": "сухо",
  "high-humidity": "влажно",
  "fog": "туман",
  "light-clouds": "небольшая облачность",
  "medium-clouds": "облачно",
  "heavy-clouds": "сильная облачность",
  "today-morning": "сегодня утром",
  "later-today-morning": "сегодня поздним утром",
  "today-afternoon": "сегодня днем",
  "later-today-afternoon": "сегодня поздним днем",
  "today-evening": "сегодня вечером",
  "later-today-evening": "сегодня поздним вечером",
  "today-night": "сегодня ночью",
  "later-today-night": "сегодня поздней ночью",
  "tomorrow-morning": "завтра утром",
  "tomorrow-afternoon": "завтра днем",
  "tomorrow-evening": "завтра вечером",
  "tomorrow-night": "завтра ночью",
  "morning": "утром",
  "afternoon": "днем",
  "evening": "вечером",
  "night": "ночью",
  "today": "сегодня",
  "tomorrow": "завтра",
  "sunday": "в воскресенье",
  "monday": "в понедельник",
  "tuesday": "во вторник",
  "wednesday": "в среду",
  "thursday": "в четверг",
  "friday": "в пятницу",
  "saturday": "в субботу",
  "next-sunday": "в следующее воскресенье",
  "next-monday": "в следующий понедельник",
  "next-tuesday": "в следующий вторник",
  "next-wednesday": "в следующую среду",
  "next-thursday": "в следующий четверг",
  "next-friday": "в следующую пятницу",
  "next-saturday": "в следующую субботу",
  "minutes": "$1 мин",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 см.",
  "less-than": "меньше $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", и " : " и "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, time2(b), " и до ");
  },
  "with": "$1, с $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 в течение следующего часа",
  "starting-in": "$1 начинается в течение $2",
  "stopping-in": "$1 заканчивается в течение $2",
  "starting-then-stopping-later": "$1 начинается в течение $2, и заканчивается через $3",
  "stopping-then-starting-later": "$1 заканчивается в течение $2, и начинается снова через $3",
  "for-day": "$1 в течение всего дня",
  "starting": "$1 начинается $2",
  "until": function(condition, time) {
    return condition + " до " + time2(time);
  },
  "until-starting-again": function(condition, timeUntil, timeAgain){
    timeUntil = time2(timeUntil);
    return condition + " до " + timeUntil + ", начинаясь снова " + timeAgain;
  },
  "starting-continuing-until": function(condition, timeFrom, timeTo) {
    timeFrom = time2(timeFrom);
    timeTo = time2(timeTo);
    return condition + ", начинаясь с " + timeFrom + ", и до " + timeTo;
  },
  "during": function(condition, time) {
    return condition + " " + time;
  },
  "for-week": "$1 в течение всей недели",
  "over-weekend": "$1 в течение всех выходных",
  "temperatures-peaking": "температурой, поднимающейся до максимума $1 $2",
  "temperatures-rising": "температурой, поднимающейся до $1 $2",
  "temperatures-valleying": "температурой, опускающейся до $1 $2",
  "temperatures-falling": "температурой, опускающейся до минимума $1 $2",
  /* Capitalize the first letter of every word, except if that word is "e". */
  "title": function(str) {
    return str.replace(/\S+/g, function(word) {
      return word === "и" ?
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
