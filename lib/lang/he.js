"use strict";

function join_with_shared_prefix(a, b, joiner) {
  let m = a;
  let i = 0;

  while(i !== m.length &&
        i !== b.length &&
        m.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && m.charCodeAt(i - 1) !== 32)
    --i;

  return a + joiner + b.slice(i);
}

const SUNDAY="ראשון"
const MONDAY="שני"
const TUESDAY="שלישי"
const WEDNESDAY="רביעי"
const THURSDAY="חמישי"
const FRIDAY="שישי"
const SATURDAY="שבת"

function properAtTimePrefix(at){
  if (at.startsWith(SUNDAY) || at.startsWith(MONDAY) || at.startsWith(TUESDAY) || at.startsWith(WEDNESDAY) || at.startsWith(THURSDAY) || at.startsWith(FRIDAY) || at.startsWith(SATURDAY)) {
    return "ב";
  }
  // default, return no prefix
  return "";
}

module.exports = {
  "clear": "בהיר",
  "no-precipitation": "ללא משקעים",
  "mixed-precipitation": "משקעים מעורבים",
  "possible-very-light-precipitation": "אפשרות נמוך מאוד למשקעים",
  "very-light-precipitation": "משקעים קלים מאוד",
  "possible-light-precipitation": "אפשרות נמוך למשקעים",
  "light-precipitation": "משקעים קלים",
  "medium-precipitation": "משקעים",
  "heavy-precipitation": "משקעים כבדים",
  "possible-very-light-rain": "אפשרות לטפטוף",
  "very-light-rain": "טפטוף",
  "possible-light-rain": "אפשרות לגשם קל",
  "light-rain": "גשם קל",
  "medium-rain": "גשם",
  "heavy-rain": "גשם כבד",
  "possible-very-light-sleet": "אפשרות לשלג-קרח קל מאוד",
  "very-light-sleet": "שלג-קרח קל",
  "possible-light-sleet": "אפשרות לשלג-קרח קל",
  "light-sleet": "שלג-קרח קל",
  "medium-sleet": "שלג-קרח",
  "heavy-sleet": "שלג-קרח כבד",
  "possible-very-light-snow": "אפשרות לשלג קל מאוד",
  "very-light-snow": "שלג קל מאוד",
  "possible-light-snow": "אפשרות לשלג קל",
  "light-snow": "שלג קל",
  "medium-snow": "שלג",
  "heavy-snow": "שלג כבד",
  "possible-thunderstorm": "אפשרות לסופת ברקים",
  "thunderstorm": "סופת ברקים",
  "light-wind": "רוח קלה",
  "medium-wind": "רוח",
  "heavy-wind": "רוח חזקה",
  "low-humidity": "יבש",
  "high-humidity": "לחות גבוהה",
  "fog": "ערפל",
  "light-clouds": "עננות חלקית",
  "medium-clouds": "מעונן חלקית",
  "heavy-clouds": "עננות",
  "today-morning": "בבוקר",
  "later-today-morning": "מאוחר יותר בבוקר",
  "today-afternoon": "אחרי הצהרים",
  "later-today-afternoon": "מאוחר יותר אחר הצהרים",
  "today-evening": "הערב",
  "later-today-evening": "מאוחר יותר הערב",
  "today-night": "הלילה",
  "later-today-night": "מאוחר יותר הלילה",
  "tomorrow-morning": "מחר בבוקר",
  "tomorrow-afternoon": "מחר אחרי הצהרים",
  "tomorrow-evening": "מחר בערב",
  "tomorrow-night": "מחר בלילה",
  "morning": "בבוקר",
  "afternoon": "אחר הצהרים",
  "evening": "הערב",
  "night": "הלילה",
  "today": "היום",
  "tomorrow": "מחר",
  "sunday": SUNDAY,
  "monday": MONDAY,
  "tuesday": TUESDAY,
  "wednesday": WEDNESDAY,
  "thursday": THURSDAY,
  "friday": FRIDAY,
  "saturday": SATURDAY,
  "next-sunday": `${SUNDAY} הבא`,
  "next-monday": `${MONDAY} הבא`,
  "next-tuesday": `${TUESDAY} הבא`,
  "next-wednesday": `${WEDNESDAY} הבא`,
  "next-thursday": `${THURSDAY} הבא`,
  "next-friday": `${FRIDAY} הבא`,
  "next-saturday": `${SATURDAY} הבאה`,
  "fahrenheit": "$1 מעלות פרנהייט",
  "minutes": function(time){
    return time === "1" ? "דקה" : time + " דקות";
  },
  "celsius": "$1 מעלות צלסיוס",
  "inches": "$1 אינץ׳",
  "centimeters" : function(size){
    return size === "1" ? "סֿ״מ" : size + " סֿ״מ";
  },
  "less-than": "פחות מ$1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", ו" : " ו"
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " עד ");
  },
  "with": "$1, ו$2",
  "range": "$1\u2013$2",
  "parenthetical": function(a, b) {
    return a + " (" + b + (a === "משקעים מעורבים" ? " של שלג)" : ")");
  },
  "for-hour": "$1 לשעה הקרובה",
  "starting-in": "$1 יתחיל בעוד $2",
  "stopping-in": "$1 יפסק בעוד $2",
  "starting-then-stopping-later": "$1 יתחיל בעוד $2, יפסק אחרי $3",
  "stopping-then-starting-later": "$1 יפסק בעוד $2, יתחדש לאחר $3",
  "for-day": "$1 לאורך היום",
  "starting": "$1 מתחיל $2",
  "until": function(condition, period) {
    return condition + " עד " + period;
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " עד " + a + ", ויתחדש " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " מ" + (a === "בבוקר" ? "הבוקר" : a) + ", ימשך עד " + b;
  },
  "during": function(condition, at) {
    return `${condition} ${properAtTimePrefix(at)}${at}`;
  },
  "for-week": "$1 במשך השבוע",
  "over-weekend": "$1 לאורך הסוף שבוע",
  "temperatures-peaking": function(temp, at) {
    return `חום גבוה יגיע לשיא של ${temp} ${properAtTimePrefix(at)}${at}`;
  },
  "temperatures-rising": function(temp, at) {
    return `חום גבוה יטפס ל-${temp} ${properAtTimePrefix(at)}${at}`;
  },
  "temperatures-valleying": function(temp, at) {
    return `חום גבוה ירד עד ${temp} ${properAtTimePrefix(at)}${at}`;
  },
  "temperatures-falling": function(temp, at){
    return `חום גבוה יפול ל-${temp} ${properAtTimePrefix(at)}${at}`;
  },
  // Capitalize the first letter of every word, except if that word is
  // "and". (This is a very crude bastardization of proper English titling
  // rules, but it is adequate for the purposes of this module.)
  "title": function(str) {
    return str;
  },
  /* Capitalize the first word of the sentence and end with a period. */
  "sentence": function(str) {
    /* Add a period if there isn't already one. */
    if(str.charAt(str.length - 1) !== ".")
      str += ".";

    return str;
  },
};
