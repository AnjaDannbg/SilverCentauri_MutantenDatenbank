'use strict';

// EVENT: Mach Tabelle filterbar
document.querySelector('input[name = "filter"]').addEventListener('keyup', (event) => {
  // Handling
  let tableContentArray = covertCSVToArray(mutantDataCSV);
  setCurrentFilterValue(event.target.value);
  updateTable(tableContentArray, MAIN_TABLE);
});

// EVENT: Mach Tabellenüberschriften clickbar
const setClickableHeader = (table) => {
  document.querySelectorAll('.my-table-head > div').forEach(tableHead => tableHead.addEventListener('click', (event) => {
    // Handling
    let tableContentArray = covertCSVToArray(mutantDataCSV);
    setCurrentSortingValue(event.target.innerHTML);
    updateTable(tableContentArray, table);
  }));
}



