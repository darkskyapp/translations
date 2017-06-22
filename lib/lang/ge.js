function join_with_shared_prefix(a, b, joiner) {
  var m = a,
      i = 0,
      j;

  if(m === "დღეს" || m === "ხვალ")
    m = "ზე " + m;

  while(i !== m.length &&
        i !== b.length &&
        m.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && m.charCodeAt(i - 1) !== 32)
    --i;

  return a + joiner + b.slice(i);
}

function strip_prefix(period) {
  return period.slice(0, 9) === "ღამით" ? period.slice(4) :
         period.slice(0, 7) ===   "ში " ? period.slice(7) :
                                              period;
}

module.exports = require("../template")({
  "clear": "მოწმენდილი",
  "no-precipitation": "უნალექო",
  "mixed-precipitation": "ცვალებადი ნალექი",
  "possible-very-light-precipitation": "მოსალოდნელია სუსტი ნალექი",
  "very-light-precipitation": "სუსტი ნალექი",
  "possible-light-precipitation": "მოსალოდნელია მცირე ნალექი",
  "light-precipitation": "მცირე ნალექი",
  "medium-precipitation": "ნალექი",
  "heavy-precipitation": "ძლიერი ნალექი",
  "possible-very-light-rain": "მოსალოდნელია სუსტი წვიმა",
  "very-light-rain": "სუსტი წვიმა",
  "possible-light-rain": "მოსალოდნელია მცირე წვიმა",
  "light-rain": "მცირე წვიმა",
  "medium-rain": "წვიმა",
  "heavy-rain": "ძლიერი წვიმა",
  "possible-very-light-sleet": "მოსალოდნელია სუსტი თოვლჭყაპი",
  "very-light-sleet": "სუსტი თოვლჭყაპი",
  "possible-light-sleet": "მოსალოდნელია მცირე თოვლჭყაპი",
  "light-sleet": "მცირე თოვლჭყაპი",
  "medium-sleet": "თოვლჭყაპი",
  "heavy-sleet": "ძლიერი თოვლჭყაპი",
  "possible-very-light-snow": "მოსალოდნელია სუსტი თოვლი",
  "very-light-snow": "სუსტი თოვლი",
  "possible-light-snow": "მოსალოდნელია მცირე თოვლი",
  "light-snow": "მცირე თოვლი",
  "medium-snow": "თოვლი",
  "heavy-snow": "ძლიერი თოვლი",
  "possible-thunderstorm": "მოსალოდნელია ავდარი",
  "thunderstorm": "ავდარი",
  "light-wind": "სუსტი ქარი",
  "medium-wind": "ქარი",
  "heavy-wind": "ძლიერი ქარი",
  "low-humidity": "მშრალი",
  "high-humidity": "ტენიანი",
  "fog": "ნისლი",
  "light-clouds": "ნაწილობრივ ღრუბლიანი",
  "medium-clouds": "უმეტესად ღრუბლიანი",
  "heavy-clouds": "მოღრუბლული",
  "today-morning": "დილით",
  "later-today-morning": "დღეს დილით",
  "today-afternoon": "შუადღე",
  "later-today-afternoon": "ნაშუადღევი",
  "today-evening": "საღამოს",
  "later-today-evening": "ამ საღამოს",
  "today-night": "ღამე",
  "later-today-night": "გვიან ღამით",
  "tomorrow-morning": "ხვალ დილით",
  "tomorrow-afternoon": "ხვალ შუადღეს",
  "tomorrow-evening": "ხვალ საღამოს",
  "tomorrow-night": "ხვალ ღამით",
  "morning": "დილას",
  "afternoon": "შუადღეს",
  "evening": "საღამოს",
  "night": "საღამო",
  "today": "დღეს",
  "tomorrow": "ხვალ",
  "sunday": "კვირა",
  "monday": "ორშაბათი",
  "tuesday": "სამშაბათი",
  "wednesday": "ოთხშაბათი",
  "thursday": "ხუთშაბათი",
  "friday": "პარასკევი",
  "saturday": "შაბათი",
  "next-sunday": "შემდეგი კვირა",
  "next-monday": "შემდეგი ორშაბათი",
  "next-tuesday": "შემდეგი სამშაბათი",
  "next-wednesday": "შემდეგი ოთხშაბათი",
  "next-thursday": "შემდეგი ხუთშაბათი",
  "next-friday": "შემდეგი პარასკევი",
  "next-saturday": "შემდეგი შაბათი",
  "minutes": "$1 წთ.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 ინ.",
  "centimeters": "$1 სმ.",
  "less-than": "< $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? " და " : " და "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " მდე ");
  },
  "with": "$1, თან $2",
  "range": "$1\u2013$2",
  "parenthetical": function(a, b) {
    return a + " (" + b + (a === "ცვალებადი ნალექი" ? " თოვლის გარეშე)" : ")");
  },
  "for-hour": "$1 ამ დროისთვის",
  "starting-in": "$1 დაიწყება $2",
  "stopping-in": "$1 შეწყდება $2",
  "starting-then-stopping-later": "$1 დაიწყება $2, შეწყდება $3 მოგვიანებით",
  "stopping-then-starting-later": "$1 შეწყდება $2, დაიწყება კვლავ $3 მოგვიანებით",
  "for-day": "$1 მთელი დღის განმავლობაში",
  "starting": "$1 დაიწყება $2",
  "until": function(condition, period) {
    return condition + " გაგრძელდება " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " მანამდე " + strip_prefix(a) + ", დაიწყება კვლავ " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " დაიწყება " + a + ", გაგრძელდება " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 მთელი კვირის განმავლობაში",
  "over-weekend": "$1 შაბათ-კვირას",
  "temperatures-peaking": "ტემპერატურა პიკს აღწევს $1 $2",
  "temperatures-rising": "ტემპერატურა მოიმატებს $1 $2",
  "temperatures-valleying": "ტემპერატურა დაიწევს $1 $2",
  "temperatures-falling": "ტემპერატურა დაეცემა $1 $2",
  /* Capitalize the first letter of every word, except if that word is
   * "and". (This is a very crude bastardization of proper English titling
   * rules, but it is adequate for the purposes of this module.) */
  "title": function(str) {
    return str.replace(
      /\b(?:a(?!nd\b)|c(?!m\.)|i(?!n\.)|[^\Waci])/g,
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
