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

module.exports = require("../template")({
  "clear": "cerah",
  "no-precipitation": "tidak hujan",
  "mixed-precipitation": "hujan ringan",
  "possible-very-light-precipitation": "kemungkinan hujan ringan",
  "very-light-precipitation": "hujan ringan",
  "possible-light-precipitation": "kemungkinan hujan ringan",
  "light-precipitation": "hujan ringan",
  "medium-precipitation": "hujan",
  "heavy-precipitation": "hujan lebat",
  "possible-very-light-rain": "kemungkinan hujan ringan",
  "very-light-rain": "hujan ringan",
  "possible-light-rain": "kemungkinan hujan ringan",
  "light-rain": "hujan ringan",
  "medium-rain": "hujan",
  "heavy-rain": "hujan lebat",
  "possible-very-light-sleet": "kemungkinan hujan salju",
  "very-light-sleet": "hujan salju ringan",
  "possible-light-sleet": "kemungkinan hujan salju ringan",
  "light-sleet": "hujan salju ringan",
  "medium-sleet": "hujan salju",
  "heavy-sleet": "hujan salju lebat",
  "possible-very-light-snow": "kemungkinan saju ringan",
  "very-light-snow": "salju ringan",
  "possible-light-snow": "kemungkinan salju ringan",
  "light-snow": "salju ringan",
  "medium-snow": "salju",
  "heavy-snow": "salju besar",
  "light-wind": "berangin ringan",
  "medium-wind": "berangin",
  "heavy-wind": "berangin besar",
  "low-humidity": "kering",
  "high-humidity": "lembab",
  "fog": "berkabut",
  "light-clouds": "sedikit berawan",
  "medium-clouds": "berawan",
  "heavy-clouds": "berawan besar",
  "today-morning": "pagi ini",
  "later-today-morning": "nanti pagi ini",
  "today-afternoon": "sore ini",
  "later-today-afternoon": "nanti sore ini",
  "today-evening": "malam ini",
  "later-today-evening": "nanti malam ini",
  "today-night": "malam ini",
  "later-today-night": "nanti malam ini",
  "tomorrow-morning": "besok pagi",
  "tomorrow-afternoon": "besok sore",
  "tomorrow-evening": "besok malam",
  "tomorrow-night": "besok tengah malam",
  "morning": "pada pagi hari",
  "afternoon": "pada sore hari",
  "evening": "pada malam hari",
  "night": "tengah malam",
  "today": "hari ini",
  "tomorrow": "besok",
  "sunday": "pada hari Minggu",
  "monday": "pada hari Senin",
  "tuesday": "pada hari Selasa",
  "wednesday": "pada hari Rabu",
  "thursday": "pada hari Kamis",
  "friday": "pada hari Jum'at",
  "saturday": "pada hari Sabtu",
  "minutes": "$1 min.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "dibawah $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", dan " : " dan "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " melalui ");
  },
  "with": "$1, dengan $2",
  "range": "$1\u2013$2",
  "parenthetical": function(a, b) {
    return a + " (" + b + (a === "hujan ringan" ? " oleh salju)" : ")");
  },
  "for-hour": "$1 pada jam",
  "starting-in": "$1 mulai pada $2",
  "stopping-in": "$1 berhenti pada $2",
  "starting-then-stopping-later": "$1 mulai pada $2, berhenti $3 nanti",
  "stopping-then-starting-later": "$1 berhenti pada $2, berhenti lagi $3 nanti",
  "for-day": "$1 selama sehari",
  "starting": "$1 mulai $2",
  "until": "$1 sampai $2",
  "until-starting-again": "$1 sampai $2, mulai kembali $3",
  "starting-continuing-until": "$1 mulai $2, berlanjut sampai $3",
  "during": "$1 $2",
  "for-week": "$1 selama seminggu",
  "over-weekend": "$1 selama akhir minggu",
  "temperatures-peaking": "suhu memuncak pada $1 $2",
  "temperatures-rising": "suhu naik ke $1 $2",
  "temperatures-valleying": "suhu menurun pada $1 $2",
  "temperatures-falling": "suhu turun pada $1 $2",
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
