'use strict';



const saveMutantNumberInput = () => {
  setCurrentMutantNumberP1($('input[name = "mutant-number-p1"]').value);
  setCurrentMutantNumberP2($('input[name = "mutant-number-p2"]').value);
  setCurrentMutantNumberP3($('input[name = "mutant-number-p3"]').value);
  setCurrentMutantNumberP4($('input[name = "mutant-number-p4"]').value);
}

const checkInputMutantNumber = () => {
  let tableContentArray = getOriginalMutantData();
  updateTable(tableContentArray, MAIN_TABLE);
}

// EVENT: Tabelle filtern
document.querySelector('input[name = "filter"]').addEventListener('keyup', (event) => {
  // Handling
  let tableContentArray = getOriginalMutantData();
  setCurrentFilterValue(event.target.value);
  updateTable(tableContentArray, MAIN_TABLE);
});

// EVENT: Sortiere bei click auf Tabellenüberschrift
const setClickableHeader = (table) => {
  document.querySelectorAll('.my-table-head > div').forEach(tableHead => tableHead.addEventListener('click', (event) => {
    // Handling
    let tableContentArray = getOriginalMutantData();
    setCurrentSortingValue(event.target.innerHTML);
    updateTable(tableContentArray, table);
  }));
}

// EVENT: Mutantennummer suchen
document.querySelectorAll('input[name ^= "mutant-number"]').forEach(input => input.addEventListener('keyup', () => {
  // Handling
  saveMutantNumberInput();
  checkInputMutantNumber();
}));

// EVENT: Mutantennummer suchen
document.querySelector('select[name = "mutant-number-product"]').addEventListener('change', () => {
  // Handling
  saveMutantNumberInput();
  checkInputMutantNumber();
});

document.querySelectorAll('#possible-mutant-numbers li button').forEach(input => input.addEventListener('click', (event) => {
  event.preventDefault();
  fillMutantNumberForm(event.target.nextElementSibling.textContent);
}))



