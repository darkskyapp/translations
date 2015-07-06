function join_with_shared_prefix(a,joiner1,b,joiner2) {
 var m = a,
      i = 0,
      j;

  while(i !== m.length &&
        i !== b.length &&
        m.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && m.charCodeAt(i - 1) !== 32)
    --i;

  return a + joiner1 + b.slice(i)+joiner2;
}

module.exports = require("../template")({
  "clear": "açık",
  "no-precipitation": "yağış yok",
  "mixed-precipitation": "karışık yağış",
  "possible-very-light-precipitation": "çok hafif yağış ihtimali",
  "very-light-precipitation": "çok hafif yağış",
  "possible-light-precipitation": "hafif yağış ihtimali",
  "light-precipitation": "hafif yağış",
  "medium-precipitation": "yağış",
  "heavy-precipitation": "yoğun yağış ",
  "possible-very-light-rain": "çok hafif yağmur ihtimali",
  "very-light-rain": "çok hafif yağmur",
  "possible-light-rain": "hafif yağmur ihtimali",
  "light-rain": "hafif yağmur",
  "medium-rain": "yağmur",
  "heavy-rain": "yoğun yağmur",
  "possible-very-light-sleet": "çok hafif karla karışık yağmur ihtimali",
  "very-light-sleet": "çok hafif karla karışık yağmur",
  "possible-light-sleet": "hafif karla karışık yağmur ihtimali",
  "light-sleet": "hafif karla karışık yağmur",
  "medium-sleet": "karla karışık yağmur",
  "heavy-sleet": "yoğun karla karışık yağmur",
  "possible-very-light-snow": "çok hafif kar ihtimali",
  "very-light-snow": "çok hafif kar",
  "possible-light-snow": "hafif kar ihtimali",
  "light-snow": "hafif kar",
  "medium-snow": "kar",
  "heavy-snow": "yoğun kar",
  "light-wind": "hafif rüzgar",
  "medium-wind": "rüzgar ",
  "heavy-wind": "yoğun rüzgar",
  "low-humidity": "düşük nem",
  "high-humidity": "yoğun nem",
  "fog": "sis",
  "light-clouds": "hafif bulutlanma",
  "medium-clouds": "bulutlanma",
  "heavy-clouds": "yoğun bulutlanma",
  "today-morning": "bu sabah ",
  "later-today-morning": "bu sabahtan itibaren",
  "today-afternoon": "bugün öğleden sonra",
  "later-today-afternoon": "bu öğleden sonradan itibaren",
  "today-evening": "bu akşam",
  "later-today-evening": "bu akşamdan itibaren",
  "today-night": "bu gece",
  "later-today-night": "bu geceden itibaren",
  "tomorrow-morning": "yarın sabah",
  "tomorrow-afternoon": "yarın öğleden sonra",
  "tomorrow-evening": "yarın akşam ",
  "tomorrow-night": "yarın gece",
  "morning": "sabah",
  "afternoon": "öğleden sonra",
  "evening": "akşam ",
  "night": "gece",
  "today": "bugün",
  "tomorrow": "yarın",
  "sunday": "pazar",
  "monday": "pazartesi",
  "tuesday": "salı",
  "wednesday": "çarşamba",
  "thursday": "perşembe",
  "friday": "cuma",
  "saturday": "cumartesi",
  "minutes": "$1 dk.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "$1'nin altında",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a," ve ", b,""  
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a," ile ",b," arası");
  },
  "with": "$1, $2",
  "range": "$1\u2013$2",
  "parenthetical": function(a, b) {
    return a + " (" + b + (a === "karışık yağış" ? " kar)" : ")");
  },
  "for-hour": " saat boyunca $1",
  "starting-in": "$1 $2 içinde başlayacak",
  "stopping-in": "$1 $2 içinde duracak",
  "starting-then-stopping-later": "$1 $2 içinde başlayacak, $3 sonra duracak",
  "stopping-then-starting-later": "$1 $2 içinde duracak, $3 sonra tekrar başlayacak",
  "for-day": "$1 gün boyunca devam edecek",
  "starting": "$2 $1 başlayacak",
  "until": function(condition, period) {
    return condition+ period+" sona erecek" ;
  },
  "until-starting-again": function(condition, a, b) {
    return condition+" "+ a +" sona erecek, " + b + " tekrar başlayacak" ;
  },
  "starting-continuing-until": function(condition, a, b) {
    return  condition +b+" başlayacak, "+a+" sona erecek";
  },
  "during": "$2 $1",
  "for-week": "hafta boyunca $1",
  "over-weekend": "hafta sonu $1",
  "temperatures-peaking": "$2 yüksek sıcaklık $1",
  "temperatures-rising": "$2 sıcaklık $1'ye yükseliyor",
  "temperatures-valleying": "$2 hava soğuyor ve sıcaklık $1'ye düşüyor",
  "temperatures-falling": "$1 sıcaklık $2'ye düşüyor",
  /* Capitalize the first letter of every word, except if that word is
   * "and". (This is a very crude bastardization of proper English titling
   * rules, but it is adequate for the purposes of this module.) */
  "title": function(str) {
    return str.charAt(0).toUpperCase()+str.slice(1); 
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
