"use strict";


module.exports = {
  "clear": "صاف کریں",
  "no-precipitation": "کوئی ورن نہیں",
  "mixed-precipitation": "مخلوط ورن",
  "possible-very-light-precipitation": "ممکنہ ورن",
  "very-light-precipitation": "ہلکی ورن",
  "possible-light-precipitation": "ممکنہ ہلکی ورن",
  "light-precipitation": "ہلکی ورن",
  "medium-precipitation": "ورن",
  "heavy-precipitation": "بھاری ورن",
  "possible-very-light-rain": "ممکنہ بوندا باندی",
  "very-light-rain": "بوندا باندی",
  "possible-light-rain": "ممکنہ ہلکی بارش",
  "light-rain": "ہلکی بارش",
  "medium-rain": "بارش",
  "heavy-rain": "بھاری بارش",
  "possible-very-light-sleet": "ممکنہ اولے والی بارش",
  "very-light-sleet": "ہلکی اولے والی بارش",
  "possible-light-sleet": "ممکنہ ہلکی اولے والی بارش",
  "light-sleet": "ہلکی اولے والی بارش",
  "medium-sleet": "اولے والی بارش",
  "heavy-sleet": "بھاری اولے والی بارش",
  "possible-very-light-snow": "ممکنہ برف",
  "very-light-snow": "برف",
  "possible-light-snow": "ممکنہ ہلکی برف",
  "light-snow": "ہلکی برف",
  "medium-snow": "برف باری",
  "heavy-snow": "بھاری برف باری",
  "possible-thunderstorm": "ممکنہ برق و باراں",
  "thunderstorm": "برق و باراں",
  "light-wind": "ہوائی",
  "medium-wind": "طوفانی ہوا",
  "heavy-wind": "خطرناک ہوائی",
  "low-humidity": "روکھا",
  "high-humidity": "نمی",
  "fog": "دھندلا",
  "light-clouds": "جزوی طور پر ابر آلود",
  "medium-clouds": "زیادہ تر ابر آلود",
  "heavy-clouds": "ابر آلود",
  "today-morning": "اس صبح",
  "later-today-morning": "بعد میں آج صبح",
  "today-afternoon": "اس دوپہر",
  "later-today-afternoon": "بعد میں اس دوپہر",
  "today-evening": "اس شام",
  "later-today-evening": "بعد میں اس شام",
  "today-night": "اس رات",
  "later-today-night": "بعد میں اس رات",
  "tomorrow-morning": "کل صبح",
  "tomorrow-afternoon": "کل دوپہر",
  "tomorrow-evening": "کل شام",
  "tomorrow-night": "کل رات",
  "morning": "صبح",
  "afternoon": "دوپہر",
  "evening": "شام",
  "night": "رات بھر",
  "today": "آج کے دن",
  "tomorrow": "کل",
  "sunday": "اتوار کو",
  "monday": "پیر کو",
  "tuesday": "منگل کو",
  "wednesday": "بدھ کو",
  "thursday": "جمعرات کو",
  "friday": "جمعہ کو",
  "saturday": "ہفتے کو",
  "next-sunday": "اگلے اتوار",
  "next-monday": "اگلے پیر",
  "next-tuesday": "اگلے منگل",
  "next-wednesday": "اگلے بدھ",
  "next-thursday": "اگلی جمعرات",
  "next-friday": "اگلی جمعہ",
  "next-saturday": "اگلے ہفتے کے دن",
  "minutes": function(value) {
    return "منٹ " + value;
  },
  "fahrenheit": function(value) {
    return `فارن ہائیٹ ${value}`;
  },
  "celsius": function(value) {
    return `سیلشن ${value}`;
  },
  "inches": function(value) {
    return `انچ ${value}`;
  },
  "centimeters": function(value) {
    return `سینٹی میٹرس ${value}`;
  },
  "less-than": function(value) {
    return `سے کم ${value}`;
  },
  "for-hour": "$1 ایک گھنٹے کے لئے",
  "starting-in": function(first, second) {
    return `شروع ہو رہا ${first} میں ${second}`;
  },
  "stopping-in": function(first, second) {
    return `رک رہا ${first} میں ${second}`;
  },
  "starting-then-stopping-later": function(first, second, third) {
    return `رک رہا ہے ${third} شروع ہو رہا، بعد میں ${first} میں ${second}`;
  },
  "stopping-then-starting-later": function(first, second, third) {
    return `شروع ہو رہا ہے ${third} رک رہا، بعد میں ${first} میں ${second}`;
  },
  "for-day": function(first) {
    return `پورے دن ${first}`;
  },
  "starting": function(first, second) {
    return `${second} میں ${first}`;
  },
  "until": function(first, second) {
    return `${first} تک ${second}`;
  },
  "until-starting-again": function(first, second, third) {
    return `${third} دوبارہ شروع کر رہا ہے ،${first} تک ${second}`;
  },
  "starting-continuing-until": function(first, second, third) {
    return `${third} جاری رہا ہے جب تک ،${first} تک ${second}`;
  },
  "during": function(first, second) {
    return `کے دوران ${second} ${first}`;
  },
  "for-week": function(first) {
    return `پورے ہفتے ${first}`;
  },
  "over-weekend": function(first) {
    return `ہفتے کے دن پر ${first}`;
  },
  "temperatures-peaking": function(first, second) {
    return `ہفتے کے دن پر ${second} ${first}`;
  },
  "temperatures-rising": function(first, second) {
    return `کی طرف تیز درجہ حرارت بڑھ رہا ہے ${second} ${first}`;
  },
  "temperatures-valleying": function(first, second) {
    return `کے نیچے تیز درجہ حرارت بن رہا ہے ${second} ${first}`;
  },
  "temperatures-falling": function(first, second) {
    return `کی جانب تیز درجہ حرارت بن رہا ہے ${second} ${first}`;
  },
  "and": function(first, second) {
    return `${second} اور ${first}`;
  },
  "through": function(first, second) {
    return `بھر ${second}، ${first}`;
  },
  "with": function(first, second) {
    return `کے ساتھ ${second}، ${first}`;
  },
  "range": "$1\u2013$2",
  "title": "$1",
  "sentence": "$1",
  "parenthetical": "$1 ($2)",
};
