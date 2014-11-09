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

module.exports = require("../template")({
  "clear": "чисто",
  "no-precipitation": "без осадков",
  "mixed-precipitation": "смешаные осадки",
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
  "today-night": "сегодняшней ночи",
  "later-today-night": "сегодня поздней ночью",
  "tomorrow-morning": "завтра утром",
  "tomorrow-afternoon": "завтра днем",
  "tomorrow-evening": "завтра вечером",
  "tomorrow-night": "завтра ночью",
  "morning": "утра",
  "afternoon": "дня",
  "evening": "сегодня вечером",
  "night": "ночи",
  "today": "сегодняшней",
  "tomorrow": "завтра",
  "sunday": "воскресенье",
  "monday": "понедельник",
  "tuesday": "вторник",
  "wednesday": "среда",
  "thursday": "четверг",
  "friday": "пятница",
  "saturday": "суббота",
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
    return join_with_shared_prefix(a, b, " на протяжении ");
  },
  "with": "$1, с $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 в течении следующего часа",
  "starting-in": "$1 начинается в течении $2",
  "stopping-in": "$1 заканчивается в течении $2",
  "starting-then-stopping-later": "позднее, $1 начинается в течении $2, и заканчивается через $3",
  "stopping-then-starting-later": "позднее, $1 заканчивается в течении $2, и начинается сново через $3",
  "for-day": "$1 в течении всего дня",
  "starting": "$1 начинается в течении $2",
  "until": "$1 до $2",
  "until-starting-again": "$1 до $2, начиная снова $3",
  "starting-continuing-until": "$1 начиная с $2, и продолжая до $3",
  "during": "$1 в течении $2",
  "for-week": "$1 в течении всей недели",
  "over-weekend": "$1 в течении всех выходных",
  "temperatures-peaking": "температурой поднимающейся до максимума $1 $2",
  "temperatures-rising": "температурой поднимающейся до $1 $2",
  "temperatures-valleying": "температурой опускающейся до $1 $2",
  "temperatures-falling": "температурой опускающейся до минимума $1 $2",
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
  }
});
