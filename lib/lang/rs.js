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
  return period.slice(0, 9) === "overnight" ? period.slice(4) :
         period.slice(0, 7) ===   "in the " ? period.slice(7) :
                                              period;
}
function time_var(time, pref, t)
{
  switch(time) {
    case "danas":
			time = pref+" "+time;
			break;
		break;
    case "utor":
    case "ponedelj":
    case "pet":
    case "četvrt":
      switch(pref){
				case "od":
				case "do":
					time+="ka";
					if(t!==undefined){
						if(t[2]!==undefined && t[3]!==undefined && t[2]=="during" && t[3]=="through"){
							return time;
						}
					}
					time = pref+"do "+time;
				break;
				case "u":
					time += "ak";
					time = pref+" "+time;
				break;
				default:
					time += "ak";
				break;
			}
      break;
		case "nedelj":	
			switch(pref){
				case "od":
				case "do":
					time += "e";
				break;
				case "u":
					time += "u";
					time = pref+" "+time;
				break;
				default:
					time += "a";
				break;
			}
		break;
    case "subot":
    case "sred":
			switch(pref){
				case "od":
				case "do":
					time += "e";
				break;
				case "u":
					time += "u";
					time = pref+" "+time;
				break;
				default:
					time += "u";
				break;
			}
      break;
		case "noć":
			if(t[1]=="starting-continuing-until"){
				return "tokom noći";
			}
			switch(pref){
				case "u":
					time += "i";
					time = "tokom "+time;
				break;
				default:
					time += "a";
				break;
			}
		break;
		case "sutra noć":
			if(t[2]=="starting-continuing-until"){
				return "tokom noći";
			}
			switch(pref){
				case "u":
					time += "i";
					time = "tokom "+time;
				break;
				default:
					
				break;
			}
		break;
		case "kasnije noć":
			if(t[2]=="starting"){
				return "kasnije tokom noći";
			}
		break;
		case "kasnije ovog jutra":
			if(t[1]=="during"){
				return "kasnije tokom ovog jutra";
			}
			if(t[1]=="until-starting-again"){
				return "kasnije ovog jutra";
			}
		break;
 
  };

  return time;
}
function checkCondition(a){
	switch(a){
		case "slabe padavine":
		case "padavine":
		case "jake padavine":
			return "počinju";
		break;
		default:
			return "počev od";
		break;
	}
}
function getPrefix(a, t){
	switch(a){
		case "sred":
			return " i "
		break;
		case "sutra ujutro":
			if(t[1]=="during" && t[2]=="and"){
				return " i ";
			}
			return ", ";
		break;
		default:
			if(t!==undefined){
				if(t[0]=="title" && t[1]=="and"){
					return " i ";
				}
			}
			return ", ";
		break;
	}
}
module.exports = require("../template")({
  "clear": function(){ return "vedro"; }, 
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
  "heavy-snow": function(){ return "jak sneg"; },
  "light-wind": function(){ return "vetrovito"; }, 
  "medium-wind": function(){ return "vetrovito"; },
  "heavy-wind": function(){ return "opasno vetrovito"; },
  "low-humidity": function(){ return "suvo"; },
  "high-humidity": function(){ return "vlažno"; },
  "fog": function(){ return "maglovito"; },
  "light-clouds": function(){ return "mestimično oblačno"; },
  "medium-clouds": function(){ return "pretežno oblačno"; }, 
  "heavy-clouds": function(){ return "oblačno"; },
  "today-morning": "ovog jutra",
  "later-today-morning": function(){ return "kasnije ovog jutra"; },
  "today-afternoon": "ovog popodneva",
  "later-today-afternoon": "kasnije ovog popodneva",
  "today-evening": "uveče",
  "later-today-evening": "kasno uveče",
  "today-night": "večeras",
  "later-today-night": function(){ return "kasnije noć"; },
  "tomorrow-morning": function(){ return "sutra ujutro"; },
  "tomorrow-afternoon": "sutra popodne",
  "tomorrow-evening": "sutra uveče",
  "tomorrow-night": function(){ return "sutra noć"; },
  "morning": "ujutro",
  "afternoon": "popodne",
  "evening": "uveče",
  "night": function(){ return "noć"; },  
  "today": "danas",
  "tomorrow": "sutra",
  "monday": function(){ return "ponedelj"; },
  "tuesday": function(){ return "utor"; },
  "wednesday": function(){ return "sred"; },
  "thursday": function(){ return "četvrt"; },
  "friday": function(){ return "pet"; },
  "saturday": function(){ return "subot"; },
	"sunday": function(){ return "nedelj"; },
  "minutes": "$1 minuta",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 inča",
  "centimeters": "$1cm",
  "less-than": "ispod $1",
  "and": function(a, b) {
		var c = getPrefix(b, this);
		a = time_var(a, "u", this);
		b = time_var(b, "u", this);
    return join_with_shared_prefix(
      a,
      b,
      c
    );
  },
  "through": function(a, b) {
		return join_with_shared_prefix(time_var(a, "od", this), time_var(b, "do", this), " do ");
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
  "until-starting-again": function(condition, timeUntil, timeAgain){
    timeUntil = time_var(timeUntil, "do", this);
    return condition + " " + timeUntil + " i opet počinje " + timeAgain;
  },
  "starting-continuing-until": function(condition, timeFrom, timeTo) {
    timeFrom = time_var(timeFrom, "", this);
    timeTo = time_var(timeTo, "u", this);
		var starting_word = checkCondition(condition);
    return condition + " " +starting_word + " " + timeFrom + ", nastaviće se " + timeTo;
  },
  "during": function(condition, time) {
		time = time_var(time, "u", this);
		if(this[1] === "and")
      return time + " " + condition;
    return condition + " " + time;
  },
  "for-week": "$1 tokom sedmice",
  "over-weekend": "$1 tokom vikenda",
  "temperatures-peaking": function(a, b){
		b = time_var(b, "u", this);
		return "temperaturom najviše do "+a+" "+b;
	},
  "temperatures-rising": function(a, b){
		b = time_var(b, "u", this);
		return "temperaturnim rastom do "+a+" "+b;
	},
  "temperatures-valleying": function(a, b){
		b = time_var(b, "u", this);
		return "temperaturom najniže do "+a+" "+b;
	},
  "temperatures-falling": function(a, b){
		b = time_var(b, "u", this);
		return "temperaturnim padom do "+a+" "+b;
	},
  /* Capitalize the first letter of every word, except if that word is "e". */
  "title": function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
    /*return str.replace(
      /\b(?:a(?!nd\b)|[^\Wa])/g,
      function(letter) {
        return letter.toUpperCase();
      }
    );*/
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
