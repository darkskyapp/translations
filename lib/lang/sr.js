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

function time_var(time, pref, t) {
  switch(time) {
    case "danas":
      return pref + " danas";
    case "utor":
    case "ponedelj":
    case "pet":
    case "četvrt":
      switch(pref) {
        case "od":
        case "do":
          return (t[2] === "during" && t[3] === "through")?
            time + "ka":
            pref + " " + time + "ka";
        case "u":
          return "u " + time + "ak";
        default:
          return time + "ak";
      }
    case "nedelj":	
      switch(pref) {
	case "od":
	case "do":
	  return "nedelje";
	case "u":
	  return "u nedelju";
	default:
          return "nedelja";
      }
    case "subot":
    case "sred":
      switch(pref) {
        case "od":
        case "do":
	  return time + "e";
        case "u":
	  return "u " + time + "u";
	default:
          return time + "u";
      }
    case "noć":
      return (t[1] === "starting-continuing-until" || pref === "u")?
        "tokom noći":
        "noća";
    case "sutra noć":
      return (t[2] === "starting-continuing-until" || pref === "u")?
	"tokom noći":
        "sutra noć";
    case "kasnije noć":
      return (t[2] === "starting")? "kasnije tokom noći": "kasnije noć";
    case "kasnije ovog jutra":
      return (t[1] === "during")? "kasnije tokom ovog jutra":
                                  "kasnije ovog jutra";
    default:
      return time;
  };
}

function check_condition(c) {
  return (c === "slabe padavine" || c === "padavine" || c === "jake padavine")?
    "počinju":
    "počev od";
}

function get_prefix(a, t) {
  switch(a) {
    case "sred":
      return " i "
    case "sutra ujutro":
      return (t[1] === "during" && t[2] === "and")? " i ": ", ";
    default:
      return (t[0] === "title" && t[1] === "and")? " i ": ", ";
  }
}

module.exports = require("../template")({
  "clear": "vedro", 
  "no-precipitation": "nema padavina",
  "mixed-precipitation": "različite padavine",
  "possible-very-light-precipitation": "moguće su veoma slabe padavine",
  "very-light-precipitation": "veoma slabe padavine",
  "possible-light-precipitation": "moguće su slabe padavine",
  "light-precipitation": "slabe padavine",
  "medium-precipitation": "padavine",
  "heavy-precipitation": "jake padavine",
  "possible-very-light-rain": "moguća je veoma sitna kiša",
  "very-light-rain": "veoma sitna kiša",
  "possible-light-rain": "moguća je sitna kiša",
  "light-rain": "sitna kiša",
  "medium-rain": "kiša",
  "heavy-rain": "jaka kiša",
  "possible-very-light-sleet": "moguća je veoma slaba susnežica",
  "very-light-sleet": "veoma slaba susnežica",
  "possible-light-sleet": "moguća je slaba susnežica",
  "light-sleet": "slaba susnežica",
  "medium-sleet": "susnežica",
  "heavy-sleet": "jaka susnežica",
  "possible-very-light-snow": "moguć je veoma sitan sneg",
  "very-light-snow": "veoma sitan sneg",
  "possible-light-snow": "moguć je sitan sneg",
  "light-snow": "sitan sneg",
  "medium-snow": "sneg",
  "heavy-snow": "jak sneg",
  "light-wind": "vetrovito", 
  "medium-wind": "vetrovito",
  "heavy-wind": "opasno vetrovito",
  "low-humidity": "suvo",
  "high-humidity": "vlažno",
  "fog": "maglovito",
  "light-clouds": "mestimično oblačno",
  "medium-clouds": "pretežno oblačno", 
  "heavy-clouds": "oblačno",
  "today-morning": "ovog jutra",
  "later-today-morning": "kasnije ovog jutra",
  "today-afternoon": "ovog popodneva",
  "later-today-afternoon": "kasnije ovog popodneva",
  "today-evening": "uveče",
  "later-today-evening": "kasno uveče",
  "today-night": "večeras",
  "later-today-night": "kasnije noć",
  "tomorrow-morning": "sutra ujutro",
  "tomorrow-afternoon": "sutra popodne",
  "tomorrow-evening": "sutra uveče",
  "tomorrow-night": "sutra noć",
  "morning": "ujutro",
  "afternoon": "popodne",
  "evening": "uveče",
  "night": "noć",  
  "today": "danas",
  "tomorrow": "sutra",
  "monday": "ponedelj",
  "tuesday": "utor",
  "wednesday": "sred",
  "thursday": "četvrt",
  "friday": "pet",
  "saturday": "subot",
  "sunday": "nedelj",
  "minutes": "$1 minuta",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 inča",
  "centimeters": "$1cm",
  "less-than": "ispod $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      time_var(a, "u", this),
      time_var(b, "u", this),
      get_prefix(b, this)
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(
      time_var(a, "od", this),
      time_var(b, "do", this),
      " do "
    );
  },
  "with": "$1, sa $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 za ovaj sat",
  "starting-in": "$1 počinje za $2",
  "stopping-in": "$1 prestaje za $2",
  "starting-then-stopping-later": "$1 počinje za $2, onda prestaje za $3",
  "stopping-then-starting-later": "$1 prestaje za $2, onda počinje za $3",
  "for-day": "$1 tokom celog dana",
  "starting": function(condition, time) {
    return condition + " počinje " + time_var(time, "u", this);
  },
  "until": function(condition, time) {
    return condition + " do " + time_var(time, "", this);
  },
  "until-starting-again": function(condition, until, again) {
    return condition + " " + time_var(until, "do", this) +
      " i opet počinje " + again;
  },
  "starting-continuing-until": function(condition, from, to) {
    from = time_var(from,  "", this);
    to   = time_var(  to, "u", this);
    return condition + " " + check_condition(condition) + " " + from +
      ", nastaviće se " + to;
  },
  "during": function(condition, time) {
    time = time_var(time, "u", this);

    return (this[1] === "and")?
      (time + " " + condition):
      (condition + " " + time);
  },
  "for-week": "$1 tokom sedmice",
  "over-weekend": "$1 tokom vikenda",
  "temperatures-peaking": function(a, b) {
    return "temperaturom najviše do " + a + " " + time_var(b, "u", this);
  },
  "temperatures-rising": function(a, b) {
    return "temperaturnim rastom do " + a + " " + time_var(b, "u", this);
  },
  "temperatures-valleying": function(a, b) {
    return "temperaturom najniže do " + a + " " + time_var(b, "u", this);
  },
  "temperatures-falling": function(a, b) {
    return "temperaturnim padom do " + a + " " + time_var(b, "u", this);
  },
  /* Capitalize the first letter of every word. */
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
