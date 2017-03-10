function join_with_shared_prefix(a, b, joiner) {
  var m = a,
      i = 0,
      j;

  while(i !== m.length &&
        i !== b.length &&
        m.charCodeAt(i) === b.charCodeAt(i)) {
    ++i;
  }
  while(i && m.charCodeAt(i - 1) !== 32) {
    --i;
  }

  return a + joiner + b.slice(i);
}

function strip_prefix(period) {
  return period             === "απόψε"   ? "σήμερα το βράδυ" :
         period.slice(0, 7) === "σήμερα " ? period.slice(7) :
                                            period;
}

module.exports = require("../template")({
  "clear": "αίθριος",
  "no-precipitation": "καθόλου υετός",
  "mixed-precipitation": "μικτός υετός",
  "possible-very-light-precipitation": "πιθανός ασθενής υετός",
  "very-light-precipitation": "ασθενής υετός",
  "possible-light-precipitation": "πιθανός ελαφρύς υετός",
  "light-precipitation": "ελαφρύς υετός",
  "medium-precipitation": "υετός",
  "heavy-precipitation": "ισχυρός υετός",
  "possible-very-light-rain": "πιθανή ασθενής βροχή",
  "very-light-rain": "ασθενής βροχή",
  "possible-light-rain": "πιθανή ελαφριά βροχή",
  "light-rain": "ελαφριά βροχή",
  "medium-rain": "βροχή",
  "heavy-rain": "ισχυρή βροχή",
  "possible-very-light-sleet": "πιθανό ασθενές χιονόνερο",
  "very-light-sleet": "ασθενές χιονόνερο",
  "possible-light-sleet": "πιθανό ελαφρύ χιονόνερο",
  "light-sleet": "ελαφρύ χιονόνερο",
  "medium-sleet": "χιονόνερο",
  "heavy-sleet": "ισχυρό χιονόνερο",
  "possible-very-light-snow": "πιθανή ασθενής χιονόπτωση",
  "very-light-snow": "ασθενής χιονόπτωση",
  "possible-light-snow": "πιθανή ελαφρά χιονόπτωση",
  "light-snow": "ελαφρά χιονόπτωση",
  "medium-snow": "χιονόπτωση",
  "heavy-snow": "ισχυρή χιονόπτωση",
  "possible-thunderstorm": "πιθανή καταιγίδα",
  "thunderstorm": "καταιγίδα",
  "light-wind": "ασθενής άνεμος",
  "medium-wind": "μέτριος άνεμος",
  "heavy-wind": "ισχυρός άνεμος",
  "low-humidity": "ξηρασία",
  "high-humidity": "υγρασία",
  "fog": "ομίχλη",
  "light-clouds": "αραιές νεφώσεις",
  "medium-clouds": "μερικώς νεφελώδης",
  "heavy-clouds": "νεφελώδης",
  "today-morning": "σήμερα το πρωί",
  "later-today-morning": "αργότερα σήμερα το πρωί",
  "today-afternoon": "σήμερα το μεσημέρι",
  "later-today-afternoon": "αργότερα σήμερα το μεσημέρι",
  "today-evening": "σήμερα το απόγευμα",
  "later-today-evening": "αργότερα σήμερα το απόγευμα",
  "today-night": "απόψε",
  "later-today-night": "αργότερα το βράδυ",
  "tomorrow-morning": "αύριο το πρωί",
  "tomorrow-afternoon": "αύριο το μεσημέρι",
  "tomorrow-evening": "αύριο το απόγευμα",
  "tomorrow-night": "αύριο το βράδυ",
  "morning": "το πρωί",
  "afternoon": "το μεσημέρι",
  "evening": "το απόγευμα",
  "night": "το βράδυ",
  "today": "σήμερα",
  "tomorrow": "αύριο",
  "sunday": "την Κυριακή",
  "monday": "την Δευτέρα",
  "tuesday": "την Τρίτη",
  "wednesday": "την Τετάρτη",
  "thursday": "την Πέμπτη",
  "friday": "την Παρασκευή",
  "saturday": "το Σάββατο",
  "next-sunday": "την επόμενη Κυριακή",
  "next-monday": "την επόμενη Δευτέρα",
  "next-tuesday": "την επόμενη Τρίτη",
  "next-wednesday": "την επόμενη Τετάρτη",
  "next-thursday": "την επόμενη Πέμπτη",
  "next-friday": "την επόμενη Παρασκευή",
  "next-saturday": "το επόμενο Σάββατο",
  "minutes": "$1 λεπτά",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 ιν.",
  "centimeters": "$1 εκ.",
  "less-than": "λιγότερα από $1",
  "and": function(a, b) {
    return a + (a.indexOf(",") !== -1 ? ", και " : " και ") + b;
  },
  "through": function(a, b) {
    return a + " μέχρι " + b;
  },
  "with": "$1, με $2",
  "range": "$1\u2013$2",
  "parenthetical": function(a, b) {
    return a + " (" + b + (a === "μικτός υετός" ? " χιονιού)" : ")");
  },
  "for-hour": "$1 για αυτή την ώρα",
  "starting-in": "$1 που θα αρχίσει σε $2",
  "stopping-in": "$1 που θα σταματήσει σε $2",
  "starting-then-stopping-later": "$1 που θα αρχίσει σε $2, και θα σταματήσει $3 αργότερα",
  "stopping-then-starting-later": "$1 που θα σταματήσει σε $2, και θα συνεχιστεί $3 αργότερα",
  "for-day": "$1 κατά τη διάρκεια της ημέρας",
  "starting": "$1 που θα αρχίσει $2",
  "until": function(condition, period) {
    return condition + " μέχρι " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " μέχρι " + strip_prefix(a) + ", που θα συνεχιστεί και " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " που θα αρχίσει " + a + ", και θα συνεχιστεί μέχρι " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 κατά τη διάρκεια της εβδομάδας",
  "over-weekend": "$1 το Σαββατοκύριακο",
  "temperatures-peaking": "θερμοκρασίες να κορυφώνονται στους $1 $2",
  "temperatures-rising": "θερμοκρασίες να αυξάνονται έως τους $1 $2",
  "temperatures-valleying": "θερμοκρασίες να πέφτουν στους $1 $2",
  "temperatures-falling": "θερμοκρασίες να μειώνονται στους $1 $2",
  /* Capitalize the first letter of every word */
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
