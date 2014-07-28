function join_with_shared_prefix(a, b, joiner) {
  var m = a,
      i = 0,
      j;

  /* HACK: This gets around "today through on Tuesday" or cases like it, which
   * are incorrect in English. */
  if(m === "днес" || m === "утре")
    m = "на " + m;

  while(i !== m.length &&
        i !== b.length &&
        m.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && m.charCodeAt(i - 1) !== 32)
    --i;

  return a + joiner + b.slice(i);
}

function strip_prefix(period) {
  return period.slice(0, 9) === "през цялата нощ" ? period.slice(4) :
         period.slice(0, 7) ===   "в на " ? period.slice(7) :
                                              period;
}

module.exports = require("../template")({
 "clear": "ясно",
  "no-precipitation": "без валежи",
  "mixed-precipitation": "смесени валежи",
  "possible-very-light-precipitation": "възможни леки превалявания",
  "very-light-precipitation": "леки превалявания",
  "possible-light-precipitation": "възможност за превалявания с гръмотевици",
  "light-precipitation": "дъжд с гръмотевици",
  "medium-precipitation": "дъжд",
  "heavy-precipitation": "силен дъжд",
  "possible-very-light-rain": "възможност за слабо преваляване",
  "very-light-rain": "ситен дъжд",
  "possible-light-rain": "възможност за слаб дъжд",
  "light-rain": "слаб дъжд",
  "medium-rain": "дъжд",
  "heavy-rain": "силен дъжд",
  "possible-very-light-sleet": "възможност за слаба киша",
  "very-light-sleet": "слаба градушка",
  "possible-light-sleet": "възможна е слаба градушка",
  "light-sleet": "лека градушка",
  "medium-sleet": "градушка",
  "heavy-sleet": "голяма киша",
  "possible-very-light-snow": "възможни са леки снежни виелици",
  "very-light-snow": "лека снежна виелица виелици",
  "possible-light-snow": "вероятен снеговалеж",
  "light-snow": "слаб сняг",
  "medium-snow": "сняг",
  "heavy-snow": "обилни снеговалежи",
  "light-wind": "слаб вятър",
  "medium-wind": "ветровито",
  "heavy-wind": "опасни ветрове",
  "low-humidity": "сухо",
  "high-humidity": "влажност",
  "fog": "мъгливо",
  "light-clouds": "разкъсана облачност",
  "medium-clouds": "облачност",
  "heavy-clouds": "плътна облачност",
  "today-morning": "тази сутрин",
  "later-today-morning": "по късно тази сутрин",
  "today-afternoon": "следобед",
  "later-today-afternoon": "късния следобед",
  "today-evening": "тази нощ",
  "later-today-evening": "по-късно тази вечер",
  "today-night": "нощес",
  "later-today-night": "късно вечерта",
  "tomorrow-morning": "утре сутин",
  "tomorrow-afternoon": "утре следобед",
  "tomorrow-evening": "утре вечер",
  "tomorrow-night": "утре късно вечер",
  "morning": "сутринта",
  "afternoon": "следобед",
  "evening": "през нощта",
  "night": "късно през нощта",
  "today": "днес",
  "tomorrow": "утре",
  "sunday": "в Неделя",
  "monday": "в Понеделник",
  "tuesday": "във Вторник",
  "wednesday": "в Сряда",
  "thursday": "в Четвъртък",
  "friday": "в Петък",
  "saturday": "в Събота",
  "minutes": "$1 мин.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 в.",
  "centimeters": "$1 см.",
  "less-than": "под $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", и " : " и "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " през ");
  },
  "with": "$1, с $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 вмъкнат ($2)",
  "for-hour": "$1 за час",
  "starting-in": "$1 започва в $2",
  "stopping-in": "$1 приключва в $2",
  "starting-then-stopping-later": "$1 започва в $2, спира $3 по-късно",
  "stopping-then-starting-later": "$1 спира в $2, започва отново $3 по-късно",
  "for-day": "$1 през деня",
  "starting": "$1 започва $2",
  "until": function (condition, period) {
    return condition + " до " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " до " + strip_prefix(a) + ", започва отново " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " започва " + a + ", и ще продължава до " +
           strip_prefix(b);
  },
  "during": "$1 по време на $2",
  "for-week": "$1 през седмицата",
  "over-weekend": "$1 в края на седмицата ",
  "temperatures-peaking": "температурен максимум $1 $2",
  "temperatures-rising": "температурите се вдигат до $1 $2",
  "temperatures-valleying": "температурен минимум $1 $2",
  "temperatures-falling": "температурите падат до $1 $2",
  /* Capitalize the first letter of every word, except if that word is
   * "and". (This is a very crude bastardization of proper English titling
   * rules, but it is adequate for the purposes of this module.) */
  "title": function(str) {
    return str.replace(
      /\b(?:a(?!nd\b)|[^\Wa])/g,
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
});
