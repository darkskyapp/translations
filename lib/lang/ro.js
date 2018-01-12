"use strict";

function join_with_shared_prefix(a, b, joiner) {
  var i = 0,
      j;

  while(i !== a.length &&
        i !== b.length &&
        a.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && a.charCodeAt(i - 1) !== 32)
    --i;

  return a.slice(0, i) + a.slice(i) + joiner + b.slice(i);
}

module.exports = {
  "clear": "senin",
  "no-precipitation": "fără precipitații",
  "mixed-precipitation": "precipitații mixte",
  "possible-very-light-precipitation": "posibile precipitații foarte slabe",
  "very-light-precipitation": "precipitații foarte slabe",
  "possible-light-precipitation": "posibile precipitații slabe",
  "light-precipitation": "precipitații slabe",
  "medium-precipitation": "precipitații",
  "heavy-precipitation": "precipitații abundente",
  "possible-very-light-rain": "posibil burniță",
  "very-light-rain": "burniță",
  "possible-light-rain": "posibil ploaie ușoară",
  "light-rain": "ploaie ușoară",
  "medium-rain": "ploaie",
  "heavy-rain": "ploaie torențială",
  "possible-very-light-sleet": "posibil lapoviță",
  "very-light-sleet": "lapoviță",
  "possible-light-sleet": "posibil lapoviță",
  "light-sleet": "lapoviță",
  "medium-sleet": "lapoviță",
  "heavy-sleet": "lapoviță și ninsoare",
  "possible-very-light-snow": "posibil ninsoare slabă",
  "very-light-snow": "ninsoare slabă",
  "possible-light-snow": "posibil ninsoare slabă",
  "light-snow": "ninsoare slabă",
  "medium-snow": "ninsoare",
  "heavy-snow": "ninsoare puternică",
  "possible-thunderstorm": "posibil furtună",
  "thunderstorm": "furtună",
  "light-wind": "vânt ușor",
  "medium-wind": "bate vântul",
  "heavy-wind": "vânt puternic",
  "low-humidity": "umiditate scăzută",
  "high-humidity": "umiditate ridicată",
  "fog": "ceață",
  "light-clouds": "parțial noros",
  "medium-clouds": "predominant noros",
  "heavy-clouds": "noros",
  "today-morning": "dimineață",
  "later-today-morning": "mai târziu în această dimineață",
  "today-afternoon": "după-amiază",
  "later-today-afternoon": "mai târziu în această după-amiază",
  "today-evening": "diseară",
  "later-today-evening": "mai târziu în această seară",
  "today-night": "la noapte",
  "later-today-night": "la noapte",
  "tomorrow-morning": "mâine dimineață",
  "tomorrow-afternoon": "maine după-amiază",
  "tomorrow-evening": "mâine seară",
  "tomorrow-night": "mâine noapte",
  "morning": "dimineață",
  "afternoon": "după-masă",
  "evening": "seara",
  "night": "la noapte",
  "today": "azi",
  "tomorrow": "mâine",
  "sunday": "duminică",
  "monday": "luni",
  "tuesday": "marți",
  "wednesday": "miercuri",
  "thursday": "joi",
  "friday": "vineri",
  "saturday": "sâmbătă",
  "next-sunday": "duminica viitoare",
  "next-monday": "lunea viitoare",
  "next-tuesday": "marțea viitoare",
  "next-wednesday": "miercurea viitoare",
  "next-thursday": "joia viitoare",
  "next-friday": "vinerea viitoare",
  "next-saturday": "sâmbăta viitoare",
  "minutes": function(min) {
    /* Special formatting for Romanian numbering.
     * Working correctly only up to 100.
     */
    if (min == 1) {
      return "1 minut";
    } else if (min != 1 && min < 20) {
      return min +" minute";
    } else {
      return min + " de minute";
    }
  },
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "mai puțin de $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? " și " : " și "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix("de " + a, b, " până ");
  },
  "with": "$1, cu $2",
  "range": "$1\u2013$2",
  "parenthetical": function(a, b) {
    return a + " (" + b + (a === "precipitații mixte" ? " de zăpadă)" : ")");
  },
  "for-hour": "$1 în următoarea oră",
  "starting-in": "$1, în $2",
  "stopping-in": "$1, durează $2",
  "starting-then-stopping-later": "$1 peste $2, durează $3",
  "stopping-then-starting-later": "$1, se oprește în $2, începe din nou $3 mai târziu",
  "for-day": "$1 de-a lungul zilei",
  "starting": "$1, începând de $2",
  "until": "$1 până $2",
  "until-starting-again": "$1 până $2, începe din nou $3",
  "starting-continuing-until": "$1 începând de $2 și până $3",
  "during": "$1 $2",
  "for-week": "$1 pe toată durata săptămânii",
  "over-weekend": "$1 în weekend",
  "temperatures-peaking": "temperaturi ce ating un maxim de $1 $2",
  "temperatures-rising": "temperaturi ce urcă până la $1 $2",
  "temperatures-valleying": "temperaturi ce ating un minim de $1 $2",
  "temperatures-falling": "temperaturi ce coboară până la $1 $2",
  /* Capitalize the first letter of every word, except if that word is "et".
   *
   * Fun fact: JavaScript regex's "\w" and "\b" don't recognize accented
   * characters (such as ș or ț) and so the neat trick used in the English
   * version of the "title" function can't be used here. (Conveniently,
   * anyway.)
    */
  "title": function(str) {
    return str.replace(/\S+/g, function(word) {
      return word === "și" || word === "de" || word.search(/in\./) > -1 || word.search(/cm\./) > -1 ?
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
};
