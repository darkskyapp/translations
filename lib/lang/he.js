function join_with_shared_prefix(a, b, joiner) {
  return a + joiner + b;
}

function strip_prefix(period) {
  return period.slice(0, 9) === "במשך הלילה" ? period.slice(4) :
         period.slice(0, 7) ===   "ב" ? period.slice(7) :
                                              period;
}

module.exports = require("../template")({
  "clear": "בהיר",
  "no-precipitation": "ללא משקעים",
  "mixed-precipitation": "משקעים מעורבים",
  "possible-very-light-precipitation": "היתכנות למשקעים קלילים",
  "very-light-precipitation": "משקעים קלילים",
  "possible-light-precipitation": "היתכנות למשקעים קלים",
  "light-precipitation": "משקעים קלים",
  "medium-precipitation": "משקעים",
  "heavy-precipitation": "משקעים כבדים",
  "possible-very-light-rain": "היתכנות לטפטופים",
  "very-light-rain": "טפטופים",
  "possible-light-rain": "היתכנות לגשם קל",
  "light-rain": "גשם קל",
  "medium-rain": "גשם",
  "heavy-rain": "גשם כבד",
  "possible-very-light-sleet": "היתכנות לשלג מימי קל ביותר",
  "very-light-sleet": "שלג מימי קל ביותר",
  "possible-light-sleet": "היתכנות לשלג מימי קל",
  "light-sleet": "שלג מימי קל",
  "medium-sleet": "שלג מימי",
  "heavy-sleet": "שלג מימי כבד",
  "possible-very-light-snow": "היתכנות לזרזיפי שלג",
  "very-light-snow": "זרזיפי שלג",
  "possible-light-snow": "התיכנות לשלג קל",
  "light-snow": "שלג קל",
  "medium-snow": "שלג",
  "heavy-snow": "שלג כבד",
  "possible-thunderstorm": "היתכנות לסופות רעמים",
  "thunderstorm": "סופות רעמים",
  "light-wind": "נעים",
  "medium-wind": "רוחות",
  "heavy-wind": "רוחות ערות",
  "low-humidity": "יבש",
  "high-humidity": "לח",
  "fog": "ערפילי",
  "light-clouds": "מעונן חלקית",
  "medium-clouds": "מעונן בעיקר",
  "heavy-clouds": "מעונן",
  "today-morning": "הבוקר",
  "later-today-morning": "מאוחר יותר הבוקר",
  "today-afternoon": "אחר הצהריים",
  "later-today-afternoon": "מאוחר יותר אחר הצהריים",
  "today-evening": "הערב",
  "later-today-evening": "מאוחר יותר הערב",
  "today-night": "הלילה",
  "later-today-night": "מאוחר יותר הלילה",
  "tomorrow-morning": "מחר בבוקר",
  "tomorrow-afternoon": "מחר אחר הצהריים",
  "tomorrow-evening": "מחר בערב",
  "tomorrow-night": "מחר בלילה",
  "morning": "בבוקר",
  "afternoon": "אחר הצהריים",
  "evening": "בערב",
  "night": "במשך הלילה",
  "today": "היום",
  "tomorrow": "מחר",
  "sunday": "ביום ראשון",
  "monday": "ביום שני",
  "tuesday": "ביום שלישי",
  "wednesday": "ביום רביעי",
  "thursday": "ביום חמישי",
  "friday": "ביום שישי",
  "saturday": "ביום שבת",
  "next-sunday": "ראשון הבא",
  "next-monday": "שני הבא",
  "next-tuesday": "שלישי הבא",
  "next-wednesday": "רביעי הבא",
  "next-thursday": "חמישי הבא",
  "next-friday": "שישי הבא",
  "next-saturday": "שבת  הבאה",
  "minutes": "$1 דקות",
  "fahrenheit": "$1\u00B0פ",
  "celsius": "$1\u00B0צ",
  "inches": "$1 אינץ׳",
  "centimeters": "$1 סנטימטר",
  "less-than": "מתחת ל- $1",
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
  "with": "$1, עם $2",
  "range": "$1\u2013$2",
  "parenthetical": function(a, b) {
    return a + " (" + b + (a === "משקעים מעורבים" ? " של שלג)" : ")");
  },
  "for-hour": "$1 למשך השעה",
  "starting-in": "$1 יתחיל ב $2",
  "stopping-in": "$1 יגיע עד $2",
  "starting-then-stopping-later": "$1 יתחיל ב $2, ויגיע עד $3 מאוחר יותר",
  "stopping-then-starting-later": "$1 יגיע עד $2, יתחיל שוב ב $3 מאוחר יותר",
  "for-day": "$1 למשך היום",
  "starting": "$1 יתחיל $2",
  "until": function(condition, period) {
    return condition + " עד " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " עד " + strip_prefix(a) + ", יתחיל שוב ב " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " יתחיל " + a + ", ויימשך עד " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 במהלך השבוע",
  "over-weekend": "$1 בסוף השבוע",
  "temperatures-peaking": "הטמפרטורות יגיעו ל- $1 $2",
  "temperatures-rising": "הטמפרטורות יטפסו עד ל- $1 $2",
  "temperatures-valleying": "הטמפרטורות ירדו עד ל- $1 $2",
  "temperatures-falling": "התמפרטורות יצנחו ל- $1 $2",
  "title": function(str) {
    return str;
  },
  /* Capitalize the first word of the sentence and end with a period. */
  "sentence": function(str) {
    /* Add a period if there isn't already one. */
    if(str.charAt(str.length - 1) !== ".")
      str += ".";

    return str;
  }
});
