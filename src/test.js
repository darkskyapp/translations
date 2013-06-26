var rows = document.getElementById("tests").getElementsByTagName("tr"),
    i, cells, input, j, output;

for(i = 0; i !== rows.length; ++i) {
  cells = rows[i].getElementsByTagName("td");
  input = undefined;

  for(j = 0; j !== cells.length; ++j) {
    if(cells[j].className === "input")
      try {
        input = SExp.parse(cells[j].textContent);
      }

      catch(e) {
        input = undefined;
      }

    else if(!input || !DarkSky.hasLanguage(cells[j].className))
      cells[j].className += " skip";

    else
      try {
        output = DarkSky.translate(cells[j].className, input);

        if(output === cells[j].textContent)
          cells[j].className += " pass";

        else {
          cells[j].className += " fail";
          cells[j].innerHTML += "<br>(" + output + ")";
        }
      }

      catch(e) {
        cells[j].className += " fail";
        cells[j].innerHTML += "<br>(" + e.message + ")";
      }
  }
}
