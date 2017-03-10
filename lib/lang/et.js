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

var grammar = {
  "täna": ["tänasest", null],
  "homme": ["homsest", "homseni"],
  "öösel": ["ööst", "ööni"],
  "õhtu": ["õhtust", "õhtuni"],
  "hommikul": ["hommikust", "hommikuni"],
  "õhtul": ["õhtust", "õhtuni"],
  "pärastlõunal": ["pärastlõunast", "pärastlõunani"],
  "homme hommikul": ["homme hommikust", "homse hommikuni"],
  "hiljem õhtul": ["hilisemast õhtust", "hilisema õhtuni"],
  "hiljem öösel": ["hilisemast ööst", "hilisema ööni"],
  "homme pärastlõunal": ["homsest pärastlõunast", "homse pärastlõunani"],
  "homme õhtul": ["homsest õhtust", "homse õhtuni"],
  "homme öösel": ["homsest ööst", "homse ööni"],
  "esmaspäeval": ["esmaspäevast", "esmaspäevani"],
  "teisipäeval": ["teisipäevast", "teisipäevani"],
  "kolmapäeval": ["kolmapäevast", "kolmapäevani"],
  "neljapäeval": ["neljapäevast", "neljapäevani"],
  "reedel": ["reedest", "reedeni"],
  "laupäeval": ["laupäevast", "laupäevani"],
  "pühapäeval": ["pühapäevast", "pühapäevani"]
};

function elative(word) {
  return grammar.hasOwnProperty(word)? grammar[word][0]: word;
}

function illative(word){
  return grammar.hasOwnProperty(word)? grammar[word][1]: word;
}

module.exports = require("../template")({
  "clear": "selge",
  "no-precipitation": "kuiv",
  "mixed-precipitation": "erinevad sademed",
  "possible-very-light-precipitation": "nõrga saju võimalus",
  "very-light-precipitation": "nõrk sadu",
  "possible-light-precipitation": "kerge saju võimalus",
  "light-precipitation": "kerge sadu",
  "medium-precipitation": "mõõdukas sadu",
  "heavy-precipitation": "tugev sadu",
  "possible-very-light-rain": "nõrga vihmasaju võimalus",
  "very-light-rain": "nõrk vihmasadu",
  "possible-light-rain": "kerge vihmasaju võimalus",
  "light-rain": "kerge vihmasadu",
  "medium-rain": "mõõdukas vihmasadu",
  "heavy-rain": "tugev vihmasadu",
  "possible-very-light-sleet": "nõrga lörtsisaju võimalus",
  "very-light-sleet": "nõrk lörtsisadu",
  "possible-light-sleet": "kerge lörtsisaju võimalus",
  "light-sleet": "kerge lörtsisadu",
  "medium-sleet": "mõõdukas lörtsisadu",
  "heavy-sleet": "tugev lörtsisadu",
  "possible-very-light-snow": "nõrga lumesaju võimalus",
  "very-light-snow": "nõrk lumesadu",
  "possible-light-snow": "kerge lumesaju võimalus",
  "light-snow": "kerge lumesadu",
  "medium-snow": "mõõdukas lumesadu",
  "heavy-snow": "tugev lumesadu",
  "light-wind": "kerge tuul",
  "medium-wind": "mõõdukas tuul",
  "heavy-wind": "tugev tuul",
  "low-humidity": "kuiv",
  "high-humidity": "niiske",
  "fog": "udu",
  "light-clouds": "vähene pilvisus",
  "medium-clouds": "mõõdukas pilvisus",
  "heavy-clouds": "pilves",
  "today-morning": "hommikul",
  "later-today-morning": "hiljem täna hommikul",
  "today-afternoon": "pärastlõunal",
  "later-today-afternoon": "hiljem pärastlõunal",
  "today-evening": "õhtul",
  "later-today-evening": "hiljem õhtul",
  "today-night": "öösel",
  "later-today-night": "hiljem öösel",
  "tomorrow-morning": "homme hommikul",
  "tomorrow-afternoon": "homme pärastlõunal",
  "tomorrow-evening": "homme õhtul",
  "tomorrow-night": "homme öösel",
  "morning": "hommikul",
  "afternoon": "pärastlõunal",
  "evening": "õhtul",
  "night": "öösel",
  "today": "täna",
  "tomorrow": "homme",
  "sunday": "pühapäeval",
  "monday": "esmaspäeval",
  "tuesday": "teisipäeval",
  "wednesday": "kolmapäeval",
  "thursday": "neljapäeval",
  "friday": "reedel",
  "saturday": "laupäeval",
  "minutes": "$1 min.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 tolli",
  "centimeters": "$1 cm",
  "less-than": "alla $1",
  "and": function(a, b) {
    return join_with_shared_prefix(a, b, " ja ");
  },
  "through": function(a, b) {
    a = elative(a);
    b = illative(b);

    return (a && b)? a + " kuni " + b:
           (a || b)? (a || b) + " kuni":
                     "";
  },
  "with": "$1, $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 järgmised tund aega",
  "starting-in": "$1 oodata $2 pärast",
  "stopping-in": "$1 lõppeb $2 pärast",
  "starting-then-stopping-later": "$1 algab $2 pärast, lõppeb $3 hiljem",
  "stopping-then-starting-later": "$1 lõppeb $2 pärast, algab uuesti $3 hiljem",
  "for-day": "Terve päev on $1",
  "starting": function(condition, period){
    return condition + " alates " + elative(period); 
  },
  "until": function(condition, period) {
    return condition + " kuni " + illative(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " " + illative(a) + ", ja jälle " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " " + elative(a) + " " + illative(b);
  },
  "during": "$1 $2",
  "for-week": "$1 nädal aega",
  "over-weekend": "$1 nädalavahetusel",
  "temperatures-peaking": "temperatuur tõuseb $2 kuni $1",
  "temperatures-rising": "temperatuur tõuseb $2 kuni $1",
  "temperatures-valleying": "temperatuur langeb $2 kuni $1",
  "temperatures-falling": "temperatuur langeb $2 kuni $1",
  /* Capitalize the first character in the sentence. */
  "title": function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  /* Capitalize the first word of the sentence and end with a period. */
  "sentence": function(str) {
    str = str.charAt(0).toUpperCase() + str.slice(1);

    if(str.charAt(str.length - 1) !== ".")
      str += ".";

    return str;
  }
});
