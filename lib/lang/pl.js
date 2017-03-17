function join_with_shared_prefix(a, b, joiner) {
  var m = a,
      n = b,
      i = 0,
      j;
  if(m === "we wtorek")
    m = "w wtorek";
  if(n === "we wtorek")
    n = "w wtorek";
  while(i !== m.length &&
        i !== n.length &&
        m.charCodeAt(i) === n.charCodeAt(i))
    ++i;
  while(i && m.charCodeAt(i - 1) !== 32)
    --i;
  if(i === 2 && b === "we wtorek")
    i = 3;
  return a + joiner + b.slice(i);
}

function genitive_form(a) {
  switch(a) {
    case "jutro":
      return "jutra";
    case "w poniedziałek":
      return "poniedziałku";
    case "we wtorek":
      return "wtorku";
    case "w środę":
      return "środy";
    case "w czwartek":
      return "czwartku";
    case "w piątek":
      return "piątku";
    case "w sobotę":
      return "soboty";
    case "w niedzielę":
      return "niedzieli";
    case "w przyszły poniedziałek":
      return "przyszłego poniedziałku";
    case "w przyszły wtorek":
      return "przyszłego wtorku";
    case "w przyszłą środę":
      return "przyszłej środy";
    case "w przyszły czwartek":
      return "przyszłego czwartku";
    case "w przyszły piątek":
      return "przyszłego piątku";
    case "w przyszłą sobotę":
      return "przyszłej soboty";
    case "w przyszłą niedzielę":
      return "przyszłej niedzieli";
    default:
        return a;
  } 
}

module.exports = require("../template")({
  "clear": "bezchmurnie",
  "no-precipitation": "brak opadów",
  "mixed-precipitation": "przelotne opady",
  "possible-very-light-precipitation": "możliwe słabe opady",
  "very-light-precipitation": "słabe opady",
  "possible-light-precipitation": "możliwe niewielkie opady",
  "light-precipitation": "niewielkie opady",
  "medium-precipitation": "opady",
  "heavy-precipitation": "silne opady",
  "possible-very-light-rain": "możliwa mżawka",
  "very-light-rain": "mżawka",
  "possible-light-rain": "możliwy niewielki deszcz",
  "light-rain": "niewielki deszcz",
  "medium-rain": "deszcz",
  "heavy-rain": "ulewa",
  "possible-very-light-sleet": "możliwe słabe opady deszczu ze śniegiem",
  "very-light-sleet": "słabe opady deszczu ze śniegiem",
  "possible-light-sleet": "możliwe niewielkie opady deszczu ze śniegiem",
  "light-sleet": "niewielkie opady deszczu ze śniegiem",
  "medium-sleet": "deszcz ze śniegiem",
  "heavy-sleet": "deszcz ze śniegiem",
  "possible-very-light-snow": "możliwy drobny śnieg",
  "very-light-snow": "drobny śnieg",
  "possible-light-snow": "możliwy niewielki śnieg",
  "light-snow": "niewielki śnieg",
  "medium-snow": "śnieg",
  "heavy-snow": "śnieżyca",
  "possible-thunderstorm": "możliwa burza",
  "thunderstorm": "burza",
  "light-wind": "słaby wiatr",
  "medium-wind": "umiarkowany wiatr",
  "heavy-wind": "silny wiatr",
  "low-humidity": "niska wilgotność",
  "high-humidity": "duża wilgotność",
  "fog": "mgła",
  "light-clouds": "niewielkie zachmurzenie",
  "medium-clouds": "średnie zachmurzenie",
  "heavy-clouds": "duże zachmurzenie",
  "today-morning": "rano",
  "later-today-morning": "przed południem",
  "today-afternoon": "po południu",
  "later-today-afternoon": "późnym popołudniem",
  "today-evening": "wieczorem",
  "later-today-evening": "późnym wieczorem",
  "today-night": "nocą",
  "later-today-night": "późno w nocy",
  "tomorrow-morning": "jutro rano",
  "tomorrow-afternoon": "jutro po południu",
  "tomorrow-evening": "jutro wieczorem",
  "tomorrow-night": "jutro w nocy",
  "morning": "rano",
  "afternoon": "po południu",
  "evening": "wieczorem",
  "night": "nocą",
  "today": "dzisiaj",
  "tomorrow": "jutro",
  "sunday": "w niedzielę",
  "monday": "w poniedziałek",
  "tuesday": "we wtorek",
  "wednesday": "w środę",
  "thursday": "w czwartek",
  "friday": "w piątek",
  "saturday": "w sobotę",
  "next-sunday": "w przyszłą niedzielę",
  "next-monday": "w przyszły poniedziałek",
  "next-tuesday": "w przyszły wtorek",
  "next-wednesday": "w przyszłą środę",
  "next-thursday": "w przyszły czwartek",
  "next-friday": "w przyszły piątek",
  "next-saturday": "w przyszłą sobotę",
  "minutes": "$1 min.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in",
  "centimeters": "$1 cm",
  "less-than": "mniej niż $1",
  "and": function(a, b) {
    var times = ["w poniedziałek","we wtorek","w środę","w czwartek","w piątek",
                 "w sobotę","w niedzielę","rano","po południu","wieczorem","nocą",
                 "przed południem","późnym popołudniem","późnym wieczorem","późno w nocy",
                 "dzisiaj","jutro","jutro rano","jutro po południu","jutro wieczorem",
                 "w przyszły poniedziałek","w przyszły wtorek","w przyszłą środę",
                 "w przyszły czwartek","w przyszły piątek","w przyszłą sobotę",
                 "w przyszłą niedzielę"];
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",")<0 && times.indexOf(a)>-1 && times.indexOf(b)>-1 ? " i " : ", "
    );
  },
  "through": function(a, b) {    
    return 'od ' + genitive_form(a) + ' do ' + genitive_form(b);
  },
  "with": "$1, $2",
  "range": "$1\u2013$2",
  "parenthetical": function(a, b) {
    return a + " (" + b + (a === "przelotne opady" ? " śniegu)" : ")");
  },
  "for-hour": "$1 przez godzinę",
  "starting-in": "$1 za $2",
  "stopping-in": "$1 skończy się za $2",
  "starting-then-stopping-later": "$1 za $2, skończy się po $3",
  "stopping-then-starting-later": "$1 skończy się za $2, ponownie zacznie $3 później",
  "for-day": "$1 w ciągu dnia",
  "starting": "$2 $1",
  "until": function(condition, period) {
    var lstr = (condition.indexOf("opady") > -1) ? ", ustaną " : ", ustanie ";
    return condition + lstr + period;
  },
  "until-starting-again": function(condition, a, b) {
    var lstr = (condition.indexOf("opady") > -1) ? ", ustaną " : ", ustanie ";
    return condition + lstr + a + ", " + b + " ponownie " + condition;
  },
  "starting-continuing-until": function(condition, a, b) {
    var lstr = (condition.indexOf("opady") > -1) ? ", skończą" : ", skończy";
    return a + " " + condition + lstr + " się " + b;
  },
  "during": "$2 $1",
  "for-week": "$1 w ciągu tygodnia",
  "over-weekend": "$1 w ciągu weekendu",
  "temperatures-peaking": "$2 temperatura wzrośnie do $1",
  "temperatures-rising": "$2 ocieplenie do $1",
  "temperatures-valleying": "$2 temperatura spadnie do $1",
  "temperatures-falling": "$2 ochłodzenie do $1",
  /* Capitalize the first letter of every word is no adequate for this module */
  "title": function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  /* Capitalize the first word of the sentence and end with a period. */
  "sentence": function(str) {
    str = str.charAt(0).toUpperCase() + str.slice(1);
    if (str.charAt(str.length - 1) !== ".")
      str += ".";
    return str;
  }
});
