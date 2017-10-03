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

function strip_prefix(period) {
    return period.slice(0, 10) === "om natten"   ? period.slice(3) :
           period.slice(0, 6)  === "under "      ? period.slice(6) :
                                                 period;
}

function grammar(str) {
    return str.replace(/på /gi, "om ")
            .replace(/(man|tirs|ons|tors|fre|lør|søn)(dag)/gi, "$1dagen");
}

module.exports = require("../template")({
  "clear": "klart",
  "no-precipitation": "ingen målbar nedbør",
  "mixed-precipitation": "blandet nedbør",
  "possible-very-light-precipitation": "mulighed for meget let nedbør",
  "very-light-precipitation": "meget let nedbør",
  "possible-light-precipitation": "mulighed for let nedbør",
  "light-precipitation": "let nedbør",
  "medium-precipitation": "nedbør",
  "heavy-precipitation": "kraftig regn",
  "possible-very-light-rain": "mulighed for let støvregn",
  "very-light-rain": "støvregn",
  "possible-light-rain": "mulighed for lette regnbyger",
  "light-rain": "regnbyger",
  "medium-rain": "regn",
  "heavy-rain": "kraftige regnbyger",
  "possible-very-light-sleet": "mulighed for meget let slud",
  "very-light-sleet": "meget let slud",
  "possible-light-sleet": "mulighed for let slud",
  "light-sleet": "let slud",
  "medium-sleet": "slud",
  "heavy-sleet": "kraftig slud",
  "possible-very-light-snow": "mulighed for meget let sne",
  "very-light-snow": "meget let sne",
  "possible-light-snow": "mulighed for let sne",
  "light-snow": "let sne",
  "medium-snow": "sne",
  "heavy-snow": "rigelig med sne",
  "possible-thunderstorm": "tordenvejr kan forekomme",
  "thunderstorm": "tordenvejr",
  "light-wind": "let vind",
  "medium-wind": "stærk vind",
  "heavy-wind": "storm",
  "low-humidity": "tørt",
  "high-humidity": "fugtigt",
  "fog": "tåge",
  "light-clouds": "let skyet",
  "medium-clouds": "skyet",
  "heavy-clouds": "overskyet",
  "today-morning": "på formiddagen",
  "later-today-morning": "senere på formiddagen",
  "today-afternoon": "i eftermiddag",
  "later-today-afternoon": "senere i eftermiddag",
  "today-evening": "i aften",
  "later-today-evening": "senere i aften",
  "today-night": "i nat",
  "later-today-night": "senere i nat",
  "tomorrow-morning": "i morgen tidlig",
  "tomorrow-afternoon": "i morgen eftermiddag",
  "tomorrow-evening": "i morgen aften",
  "tomorrow-night": "i morgen nat",
  "morning": "om morgenen",
  "afternoon": "om eftermiddagen",
  "evening": "om aftenen",
  "night": "om natten",
  "today": "i dag",
  "tomorrow": "i morgen",
  "sunday": "på søndag",
  "monday": "på mandag",
  "tuesday": "på tirsdag",
  "wednesday": "på onsdag",
  "thursday": "på torsdag",
  "friday": "på fredag",
  "saturday": "på lørdag",
  "next-sunday": "næste søndag",
  "next-monday": "næste mandag",
  "next-tuesday": "næste tirsdag",
  "next-wednesday": "næste onsdag",
  "next-thursday": "næste torsdag",
  "next-friday": "næste fredag",
  "next-saturday": "næste lørdag",
  "minutes": "$1 min.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 tommer",
  "centimeters": "$1 cm",
  "less-than": "under $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", og " : " og "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " indtil ");
  },
  "with": "$1, med $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 i løbet af de næste par timer",
  "starting-in": "$1 om $2",
  "stopping-in": "$1 der aftager om $2",
  "starting-then-stopping-later": "$1 om $2, aftager $3 senere",
  "stopping-then-starting-later": "$1 aftager om $2, begynder igen $3 senere",
  "for-day": "$1 i løbet af dagen",
  "starting": "$1 $2",
  "until": function(condition, period) {
      return condition + " indtil " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
      return condition + " indtil " + strip_prefix(a) +
           ", kommer igen " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
      return condition + " " + a + ", fortsætter indtil " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 i løbet af ugen",
  "over-weekend": "$1 over weekenden",
  "temperatures-peaking": function(a, b) {
    return "temperaturer op til " + a + " " + grammar(b);
  },
  "temperatures-rising": function(a, b) {
    return "temperaturer stigende til " + a + " " + grammar(b);
  },
  "temperatures-valleying": function(a, b) {
    return "temperaturer der stopper ved " + a + " " + grammar(b);
  },
  "temperatures-falling": function(a, b) {
    return "temperaturer faldende til " + a + " " + grammar(b);
  },
  /* Capitalize the sentence (but not each word). */
  "title": function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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