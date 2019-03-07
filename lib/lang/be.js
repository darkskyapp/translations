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
    case "раніцай": return "раніцы";
    case "днём": return "сярэдзіны дня";
    case "вечарам": return "вечара";
    case "ноччу": return "ночы";
    case "сёння ранкам": return "сённяшняй раніцы";
    case "сёння позняй раніцай": return "сённяшняй позняй раніцы";
    case "сёння днём": return "сярэдзіны дня";
    case "сёння познім днём": return "сённяшняга позняга дня";
    case "сёння ўвечары": return "сённяшняга вечара";
    case "сёння познім вечарам": return "сённяшняга позняга вечара";
    case "сёння ноччу": return "сённяшняй ночы";
    case "сёння позняй ноччу": return "сённяшняй позняй ночы";
    case "заўтра раніцай": return "заўтрашняй раніцы";
    case "заўтра днём": return "заўтрашняга дня";
    case "заўтра ўвечары": return "заўтрашняга вечара";
    case "ўвечары": return "вечара";
    case "заўтра ноччу": return "заўтрашняй ночы";
    case "у нядзелю": return "нядзелі";
    case "у панядзелак": return "панядзелка";
    case "у аўторак": return "аўторка";
    case "у сераду": return "серады";
    case "у чацвер": return "чацвярга";
    case "у пятніцу": return "пятніцы";
    case "у суботу": return "суботы";
    default: return time;
  }
}

module.exports = {
  "clear": "ясна",
  "no-precipitation": "без ападкаў",
  "mixed-precipitation": "змешаныя ападкі",
  "possible-very-light-precipitation": "магчымы нязначныя ападкі",
  "very-light-precipitation": "нязначныя ападкі",
  "possible-light-precipitation": "магчымы невялікія ападкі",
  "light-precipitation": "невялікія ападкі",
  "medium-precipitation": "ападкі",
  "heavy-precipitation": "моцныя ападкі",
  "possible-very-light-rain": "магчымы нязначны дождж",
  "very-light-rain": "нязначны дождж",
  "possible-light-rain": "магчымы невялікі дождж",
  "light-rain": "невялікі дождж",
  "medium-rain": "дождж",
  "heavy-rain": "моцны дождж",
  "possible-very-light-sleet": "магчымы нязначны град",
  "very-light-sleet": "нязначны град",
  "possible-light-sleet": "магчымы невялікі град",
  "light-sleet": "невялікі град",
  "medium-sleet": "град",
  "heavy-sleet": "моцны град",
  "possible-very-light-snow": "магчымы нязначны снег",
  "very-light-snow": "нязначны снег",
  "possible-light-snow": "магчымы невялікі снег",
  "light-snow": "невялікі снег",
  "medium-snow": "снег",
  "heavy-snow": "снегапад",
  "possible-thunderstorm": "магчымы навальніцы",
  "thunderstorm": "навальніцы",
  "light-wind": "слабы вецер",
  "medium-wind": "вецер",
  "heavy-wind": "моцны вецер",
  "low-humidity": "суха",
  "high-humidity": "вільготна",
  "fog": "туман",
  "light-clouds": "невялікая воблачнасць",
  "medium-clouds": "воблачна",
  "heavy-clouds": "моцная воблачнасць",
  "today-morning": "сёння ранкам",
  "later-today-morning": "сёння позняй раніцай",
  "today-afternoon": "сёння днём",
  "later-today-afternoon": "сёння познім днём",
  "today-evening": "сёння ўвечары",
  "later-today-evening": "сёння познім вечарам",
  "today-night": "сёння ноччу",
  "later-today-night": "сёння позняй ноччу",
  "tomorrow-morning": "заўтра раніцай",
  "tomorrow-afternoon": "заўтра днём",
  "tomorrow-evening": "заўтра ўвечары",
  "tomorrow-night": "заўтра ноччу",
  "morning": "раніцай",
  "afternoon": "днём",
  "evening": "ўвечары",
  "night": "ноччу",
  "today": "сёння",
  "tomorrow": "заўтра",
  "sunday": "у нядзелю",
  "monday": "у панядзелак",
  "tuesday": "у аўторак",
  "wednesday": "у сераду",
  "thursday": "у чацвер",
  "friday": "у пятніцу",
  "saturday": "у суботу",
  "next-sunday": "у наступную нядзелю",
  "next-monday": "у наступны панядзелак",
  "next-tuesday": "у наступны аўторак",
  "next-wednesday": "у наступную сераду",
  "next-thursday": "у наступны чацвер",
  "next-friday": "у наступную пятніцу",
  "next-saturday": "у наступную суботу",
  "minutes": "$1 хв",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 см.",
  "less-than": "менш за $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", і " : " і "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, time2(b), " і да ");
  },
  "with": "$1, з $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 на працягу наступнай гадзіны",
  "starting-in": "$1 пачынаецца праз $2",
  "stopping-in": "$1 заканчваецца праз $2",
  "starting-then-stopping-later": "$1 пачынаецца на працягу $2, і заканчваецца праз $3",
  "stopping-then-starting-later": "$1 заканчваецца на працягу $2, і пачынаецца зноў праз $3",
  "for-day": "$1 на працягу ўсяго дня",
  "starting": "$1 пачынаецца $2",
  "until": function(condition, time) {
    return condition + " да " + time2(time);
  },
  "until-starting-again": function(condition, timeUntil, timeAgain){
    timeUntil = time2(timeUntil);
    return condition + " да " + timeUntil + ", пачынаючыся зноў " + timeAgain;
  },
  "starting-continuing-until": function(condition, timeFrom, timeTo) {
    timeFrom = time2(timeFrom);
    timeTo = time2(timeTo);
    return condition + ", пачынаючыся з " + timeFrom + ", і да " + timeTo;
  },
  "during": function(condition, time) {
    return condition + " " + time;
  },
  "for-week": "$1 на працягу ўсяго тыдня",
  "over-weekend": "$1 на працягу ўсіх выходных",
  "temperatures-peaking": "тэмпературай, што ўздымаецца да максімуму $1 $2",
  "temperatures-rising": "тэмпературай, што ўздымаецца да $1 $2",
  "temperatures-valleying": "тэмпературай, што апускаецца да $1 $2",
  "temperatures-falling": "тэмпературай, што апускаецца да мінімуму $1 $2",
  /* Capitalize the first letter of every word, except if that word is "e". */
  "title": function(str) {
    return str.replace(/\S+/g, function(word) {
      return word === "і" ?
        word :
        word.charAt(0).toUpperCase() + word.slice(1);
    });
  },
  // Replace u with short u after vowels in the begnning of the words,
  // capitalize the first word of the sentence and end with a period.
  "sentence": function(str) {
    /* Replace u with short u after vowels in the begnning of words following vowels */
    str = str.replace(/[аеёіоуыэюя]\sу/gi, function(word) {
      return word.slice(0, -1) + "ў";
    });

    /* Capitalize. */
    str = str.charAt(0).toUpperCase() + str.slice(1);

    /* Add a period if there isn't already one. */
    if(str.charAt(str.length - 1) !== ".")
      str += ".";

    return str;
  },
};
