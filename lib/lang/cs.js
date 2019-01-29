"use strict";

function remove_prefix_and_use_genitive(a) {
  switch(a) {
    case "dnes ráno":
      return "dnešního rána";
    case "dnes dopoledne":
      return "dnešního dopoledne";
    case "dnes odpoledne":
      return "dnešního odpoledne";
    case "dnes podvečer":
      return "dnešního podvečera";
    case "dnes večer":
      return "dnešního večera";
    case "dnes pozdě večer":
      return "dnešního pozdního večera";
    case "dnes v noci":
      return "dnešní noci";
    case "dnes pozdě v noci":
      return "dnešní pozdní noci";
    case "zítra ráno":
      return "zítřejšího rána";
    case "zítra odpoledne":
      return "zítřejšího odpoledne";
    case "zítra večer":
      return "zítřejšího večera";
    case "zítra v noci":
      return "zítřejší noci";
    case "ráno":
      return "rána";
    case "odpoledne":
      return "odpoledne";
    case "večer":
      return "večera";
    case "v noci":
      return "noci";
    case "v pondělí":
      return "pondelí";
    case "v úterý":
      return "uterý";
    case "ve středu":
      return "středy";
    case "ve čtvrtek":
      return "čtvrtka";
    case "v pátek":
      return "pátku";
    case "v sobotu":
      return "soboty";
    case "v neděli":
      return "neděle";
    default:
      return a;
  }
}

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

module.exports = {
  "clear": "jasno",
  "no-precipitation": "bez srážek",
  "mixed-precipitation": "smíšené srážky",
  "possible-very-light-precipitation": "možnost velmi slabých srážek",
  "very-light-precipitation": "velmi slabé srážky",
  "possible-light-precipitation": "možnost slabých srážek",
  "light-precipitation": "slabé srážky",
  "medium-precipitation": "srážky",
  "heavy-precipitation": "silné srážky",
  "possible-very-light-rain": "možnost mrholení",
  "very-light-rain": "mrholení",
  "possible-light-rain": "možnost slabého deště",
  "light-rain": "slabý déšť",
  "medium-rain": "déšť",
  "heavy-rain": "vydatný déšť",
  "possible-very-light-sleet": "možnost slabého deště se sněhem",
  "very-light-sleet": "slabý déšť se sněhem",
  "possible-light-sleet": "možnost slabého deště se sněhem",
  "light-sleet": "slabý déšť se sněhem",
  "medium-sleet": "déšť se sněhem",
  "heavy-sleet": "vydatný déšť se sněhem",
  "possible-very-light-snow": "možnost slabého sněžení",
  "very-light-snow": "slabé sněžení",
  "possible-light-snow": "možnost slabého sněžení",
  "light-snow": "slabé sněžení",
  "medium-snow": "sněžení",
  "heavy-snow": "vydatné sněžení",
  "light-wind": "slabý vítr",
  "medium-wind": "větrno",
  "heavy-wind": "silný vítr",
  "low-humidity": "nízká vlhkost",
  "high-humidity": "vysoká vlhkost",
  "fog": "mlhavo",
  "light-clouds": "částečně zataženo",
  "medium-clouds": "převážně zataženo",
  "heavy-clouds": "zataženo",
  "today-morning": "dnes ráno",
  "later-today-morning": "dnes dopoledne",
  "today-afternoon": "dnes odpoledne",
  "later-today-afternoon": "dnes podvečer",
  "today-evening": "dnes večer",
  "later-today-evening": "dnes pozdě večer",
  "today-night": "dnes v noci",
  "later-today-night": "dnes pozdě v noci",
  "tomorrow-morning": "zítra ráno",
  "tomorrow-afternoon": "zítra odpoledne",
  "tomorrow-evening": "zítra večer",
  "tomorrow-night": "zítra v noci",
  "morning": "ráno",
  "afternoon": "odpoledne",
  "evening": "večer",
  "night": "v noci",
  "today": "dnes",
  "tomorrow": "zítra",
  "sunday": "v neděli",
  "monday": "v pondělí",
  "tuesday": "v úterý",
  "wednesday": "ve středu",
  "thursday": "ve čtvrtek",
  "friday": "v pátek",
  "saturday": "v sobotu",
  "next-sunday": "v neděli", // FIXME
  "next-monday": "v pondělí", // FIXME
  "next-tuesday": "v úterý", // FIXME
  "next-wednesday": "ve středu", // FIXME
  "next-thursday": "ve čtvrtek", // FIXME
  "next-friday": "v pátek", // FIXME
  "next-saturday": "v sobotu", // FIXME
  "minutes": "$1 min.",
  "fahrenheit": "$1°F",
  "celsius": "$1°C",
  "inches": "$1 in",
  "centimeters": "$1 cm",
  "less-than": "méně než $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      " a "
    );
  },
  "through": function(a, b) {
    return "od " + remove_prefix_and_use_genitive(a) + " do " + remove_prefix_and_use_genitive(b);
  },
  "with": "$1, $2",
  "range": "$1-$2",
  "parenthetical": function(a, b) {
    return a + " (" + b + (a === "smíšené srážky" ? " sněhu)" : ")");
  },
  "for-hour": "$1 hodinu",
  "starting-in": "$1 za $2",
  "stopping-in": "$1 skončí za $2",
  "starting-then-stopping-later": "$1 za $2, skončí o $3 později",
  "stopping-then-starting-later": "$1 skončí za $2 a začne znovu o $3 později",
  "for-day": "Během dne $1",
  "starting": function(a, b) {
    return "od " + remove_prefix_and_use_genitive(b) + " " + a;
  },
  "until": function(condition, period) {
    return condition + " až do " + remove_prefix_and_use_genitive(period);
  },
  "until-starting-again": function(condition, a, b) {
    let starting = "";
    if(condition.endsWith("srážky"))
      starting = ", které začnou znovu ";
    else if(condition.endsWith("déšť") || condition.endsWith("déšť se sněhem") || condition.endsWith("vítr"))
      starting = ", který začne znovu ";
    else if(condition.endsWith("sněžení") || condition.endsWith("mrholení"))
      starting = ", které začne znovu ";
    else if(condition.endsWith("vlhkost"))
      starting = ", která začne znovu ";
    else if(condition.endsWith("zataženo") || condition.endsWith("mlhavo"))
      starting = "a začne znovu ";

    return condition + " až do " + remove_prefix_and_use_genitive(a) + starting + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    let continuing = "";
    if(condition.endsWith("srážky"))
      continuing = ", které přetrvají až do ";
    else if(condition.endsWith("déšť") || condition.endsWith("déšť se sněhem") || condition.endsWith("vítr"))
      continuing = ", který přetrvá až do ";
    else if(condition.endsWith("snežení") || condition.endsWith("mrholení"))
      continuing = ", které přetrvá až do ";
    else if(condition.endsWith("vlhkost"))
      continuing = ", která přetrvá až do ";
    else if(condition.endsWith("zataženo") || condition.endsWith("mlhavo"))
      continuing = " a přetrvá až do ";
    return "od " + remove_prefix_and_use_genitive(a) + " " + condition + continuing + remove_prefix_and_use_genitive(b);
  },
  "during": "$2 $1",
  "for-week": "$1 během týdne",
  "over-weekend": "$1 přes víkend",
  "temperatures-peaking": "$2 s teplotním maximem $1",
  "temperatures-rising": "$2 s teplotami stoupajícími k $1",
  "temperatures-valleying": "$2 s teplotním minimem $1",
  "temperatures-falling": "$2 s teplotami klesajícími k $1",
  /* Capitalize the first letter of first word. */
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
  },
};
