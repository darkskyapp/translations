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
    case "в неделя": return "неделя";
    case "в понеделник": return "понеделник";
    case "във вторник": return "вторник";
    case "в сряда": return "сряда";
    case "в четвъртък": return "четвъртък";
    case "в петък": return "петък";
    case "в събота": return "събота";
    default: return time;
  }
}

module.exports = {
  "clear": "ясно",
  "no-precipitation": "без превалявания",
  "mixed-precipitation": "смесени превалявания",
  "possible-very-light-precipitation": "възможни незначителни превалявания",
  "very-light-precipitation": "незначителни превалявания",
  "possible-light-precipitation": "възможни леки превалявания",
  "light-precipitation": "леки превалявания",
  "medium-precipitation": "превалявания",
  "heavy-precipitation": "силни превалявания",
  "possible-very-light-rain": "възможен ръмеж",
  "very-light-rain": "ръмеж",
  "possible-light-rain": "възможен слаб дъжд",
  "light-rain": "слаб дъжд",
  "medium-rain": "дъжд",
  "heavy-rain": "силен дъжд",
  "possible-very-light-sleet": "възможна много слаба градушка",
  "very-light-sleet": "много слаба градушка",
  "possible-light-sleet": "възможна слаба градушка",
  "light-sleet": "слаба градушка",
  "medium-sleet": "градушка",
  "heavy-sleet": "силна градушка",
  "possible-very-light-snow": "възможен много слаб сняг",
  "very-light-snow": "много слаб сняг",
  "possible-light-snow": "възможен слаб сняг",
  "light-snow": "слаб сняг",
  "medium-snow": "снеговалеж",
  "heavy-snow": "силен снеговалеж",
  "possible-thunderstorm": "възможна гръмотевична буря",
  "thunderstorm": "гръмотевична буря",
  "light-wind": "слаб вятър",
  "medium-wind": "умерен вятър",
  "heavy-wind": "силен вятър",
  "low-humidity": "сухо",
  "high-humidity": "влажно",
  "fog": "мъгла",
  "light-clouds": "незначителна облачност",
  "medium-clouds": "облачно",
  "heavy-clouds": "гъста облачност",
  "today-morning": "тази сутрин",
  "later-today-morning": "по-късно тази сутрин",
  "today-afternoon": "днес следобед",
  "later-today-afternoon": "по-късно днес следобед",
  "today-evening": "вечерта",
  "later-today-evening": "по-късно вечерта",
  "today-night": "през нощта",
  "later-today-night": "по-късно през нощта",
  "tomorrow-morning": "утре сутринта",
  "tomorrow-afternoon": "утре следобед",
  "tomorrow-evening": "утре вечерта",
  "tomorrow-night": "утре през нощта",
  "morning": "сутринта",
  "afternoon": "следобед",
  "evening": "вечерта",
  "night": "през нощта",
  "today": "днес",
  "tomorrow": "утре",
  "sunday": "в неделя",
  "monday": "в понеделник",
  "tuesday": "във вторник",
  "wednesday": "в сряда",
  "thursday": "в четвъртък",
  "friday": "в петък",
  "saturday": "в събота",
  "next-sunday": "следващата неделя",
  "next-monday": "следващия понеделник",
  "next-tuesday": "следващия вторник",
  "next-wednesday": "следващата сряда",
  "next-thursday": "следващия четвъртък",
  "next-friday": "следващия петък",
  "next-saturday": "следващата събота",
  "minutes": "$1 мин",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 см.",
  "less-than": "по-малко $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", и " : " и "
    );
  },
  "through": function(a, b) {
    // return join_with_shared_prefix(a, time2(b), " до ");
    return "от " + a + " до " + time2(b);
  },
  "with": "$1, с $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 през следващия час",
  "starting-in": "$1 започва след $2",
  "stopping-in": "$1 приключва до $2",
  "starting-then-stopping-later": "$1 започва след $2, и приключва до $3 по-късно",
  "stopping-then-starting-later": "$1 приключва до $2, и започва отново след" +
    " $3",
  "for-day": "$1 през целия ден",
  "starting": "$1 започва $2",
  "until": function(condition, time) {
    // return condition + " до " + time2(time);
    return condition + " " + time;
  },
  "until-starting-again": function(condition, timeUntil, timeAgain){
    // timeUntil = time2(timeUntil);
    return condition + " до " + timeUntil + ", започва отново " + timeAgain;
  },
  "starting-continuing-until": function(condition, timeFrom, timeTo) {
    // timeFrom = time2(timeFrom);
    // timeTo = time2(timeTo);
    return condition + ", започва от " + timeFrom + ", до " + timeTo;
  },
  "during": function(condition, time) {
    return condition + " " + time;
  },
  "for-week": "$1 през седмицата",
  "over-weekend": "$1 през уикенда",
  "temperatures-peaking": "максимални температури, достигащи $1 $2",
  "temperatures-rising": "максимални температури, покачващи се до $1 $2",
  "temperatures-valleying": "максимални температури, падащи до $1 $2",
  "temperatures-falling": "максимални температури, падащи до минимум $1 $2",
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
  "next-hour-forecast-status": "Прогнозата за идния час $1 поради $2.",
  "unavailable": "не е налична",
  "temporarily-unavailable": "временно не е на разположение",
  "partially-unavailable": "е частична",
  "station-offline": "това че всички близки станции не са на линия",
  "station-incomplete": "пропуски в покритието от близки станции",
};
