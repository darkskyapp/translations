"use strict";

function join_with_shared_prefix(a, b, joiner) {
  let m = a;
  let i = 0;

  // HACK: This gets around "today through on Tuesday" or cases like it, which
  // are incorrect in English.
  if(m === "an-diugh" || m === "a-màireach")
    m = "air " + m;

  while(i !== m.length &&
        i !== b.length &&
        m.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && m.charCodeAt(i - 1) !== 32)
    --i;

  return a + joiner + b.slice(i);
}

function strip_prefix(period) {
  return period.slice(0, 9) === "fad na h-oidhche" ? period.slice(4) :
    period.slice(0, 7) === "ann an " ? period.slice(7) :
      period;
}

module.exports = {
  "clear": "soilleir",
  "no-precipitation": "gun sileadh",
  "mixed-precipitation": "sileadh measgaichte",
  "possible-very-light-precipitation": "tha cothrom ann gum bi sileadh glè aotrom",
  "very-light-precipitation": "sileadh glè aotrom",
  "possible-light-precipitation": "tha cothrom ann gum bi sileadh aotrom",
  "light-precipitation": "sileadh aotrom",
  "medium-precipitation": "sileadh",
  "heavy-precipitation": "sileadh trom",
  "possible-very-light-rain": "tha cothrom ann gum bi uisge glè aotrom",
  "very-light-rain": "uisge glè aotrom",
  "possible-light-rain": "tha cothrom ann gum bi uisge aotrom",
  "light-rain": "uisge aotrom",
  "medium-rain": "uisge",
  "heavy-rain": "uisge trom",
  "possible-very-light-sleet": "tha cothrom ann gum bi flin glè aotrom",
  "very-light-sleet": "flin glè aotrom",
  "possible-light-sleet": "tha cothrom ann gum bi flin aotrom",
  "light-sleet": "flin aotrom",
  "medium-sleet": "flin",
  "heavy-sleet": "flin trom",
  "possible-very-light-snow": "tha cothrom ann gum bi fras sneachda",
  "very-light-snow": "frasan sneachda",
  "possible-light-snow": "tha cothrom ann gum bi sneachd aotrom",
  "light-snow": "sneachd aotrom",
  "medium-snow": "sneachd",
  "heavy-snow": "sneachda trom",
  "possible-thunderstorm": "tha cothrom ann gum bi stoirmean tàirneanaich",
  "thunderstorm": "stoirmean tàirneanaich",
  "light-wind": "oiteag shocair",
  "medium-wind": "gaoth",
  "heavy-wind": "gaoth chunnartach",
  "low-humidity": "tioram",
  "high-humidity": "tais",
  "fog": "ceòthach",
  "light-clouds": "sgothan aotrom",
  "medium-clouds": "sgothach",
  "heavy-clouds": "sgothan trom",
  "today-morning": "madainn an-diugh",
  "later-today-morning": "nas anmoiche madainn an-diugh",
  "today-afternoon": "feasgar an-diugh",
  "later-today-afternoon": "nas anmoiche feasgar an-diugh",
  "today-evening": "feasgar an-diugh",
  "later-today-evening": "nas anmoiche feasgar an-diugh",
  "today-night": "a-nochd",
  "later-today-night": "nas anmoiche a-nochd",
  "tomorrow-morning": "madainn a-màireach",
  "tomorrow-afternoon": "feasgar a-màireach",
  "tomorrow-evening": "feasgar a-màireach",
  "tomorrow-night": "an ath oidhche",
  "morning": "anns a' mhadainn",
  "afternoon": "anns an fheasgar",
  "evening": "anns an fheasgar",
  "night": "a-nochd",
  "today": "an-diugh",
  "tomorrow": "a-màireach",
  "sunday": "Didòmhnaich",
  "monday": "Diluain",
  "tuesday": "Dimàirt",
  "wednesday": "Diciadain",
  "thursday": "Diardaoin",
  "friday": "Dihaoine",
  "saturday": "Disathairne",
  "next-sunday": "Didòmhnaich an ath sheachdain",
  "next-monday": "Diluain an ath sheachdain",
  "next-tuesday": "Dimàirt an ath sheachdain",
  "next-wednesday": "Diciadain an ath sheachdain",
  "next-thursday": "Diardaoin an ath sheachdain",
  "next-friday": "Dihaoine an ath sheachdain",
  "next-saturday": "Disathairne  an ath sheachdain",
  "minutes": "$1 mion.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 òir.",
  "centimeters": "$1 cm.",
  "less-than": "< $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", agus " : " agus "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " tro ");
  },
  "with": "$1, le $2",
  "range": "$1\u2013$2",
  "parenthetical": function(a, b) {
    return a + " (" + b + (a === "sileadh measgaichte" ? " sneachda)" : ")");
  },
  "for-hour": "$1 fad uair a thìde",
  "starting-in": "$1 a' tòiseachadh ann an $2",
  "stopping-in": "$1 a' stad ann an $2",
  "starting-then-stopping-later": "$1 a' tòiseachadh ann an $2, a' stad as dèidh $3",
  "stopping-then-starting-later": "$1 a' stad ann an $2, a' tòiseachadh a-rithist as dèidh $3",
  "for-day": "$1 fad an latha",
  "starting": "$1 a' tòiseachadh $2",
  "until": function(condition, period) {
    return condition + " a' stad " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " a' stad " + strip_prefix(a) + ", a' tòiseachadh a-rithist " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " a' tòiseachadh " + a + ", a' stad " + strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 fad na seachdain",
  "over-weekend": "$1 thairis air an deireadh-sheachdain",
  "temperatures-peaking": "an teòthachd as àirde a' ruigsinn $1 $2",
  "temperatures-rising": "an teòthachd as àirde a' ruigsinn $1 $2",
  "temperatures-valleying": "an teòthachd as àirde a' tuiteam gu $1 $2",
  "temperatures-falling": "an teòthachd as àirde a' tuiteam gu $1 $2",
  // Capitalize the first letter of every word, except if that word is
  // "and". (This is a very crude bastardization of proper English titling
  // rules, but it is adequate for the purposes of this module.)
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
  },
  "unavailable-radar": "Cha deach dad a lorg an-dràsta air sgàth 's $1.",
  "station-offline": "gu bheil a h-uile stèisean-radar far loidhne",
};
