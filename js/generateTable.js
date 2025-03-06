'use strict';

// Array mit Datentyp von Tabellenspalte erzeugen
const rememberColumnContentTypes = (tableContentArray) => {

  for (let i = 0; i < tableContentArray[0].length; i++) {

    let columnContent = asNumber(tableContentArray[1][i]);

    if (!isNaN(columnContent)) {
      COLUMN_CONTENT_TYPES.push('number');
    } else if (isNaN(columnContent)) {
      COLUMN_CONTENT_TYPES.push('string');
    }
  }
}

// Generiere und befülle Tabelle
const fillTableWithContent = (inputArray, table) => {
  table.innerHTML = ''; // Tabelle leeren
  const TABLE_ROW_COUNT = inputArray[0].length; // Tabellenzeilen berechnen => 8
  const TABLE_COLUMN_COUNT = inputArray.length; // Tabellenspalten berechnen => 27

  const BOOTSTRAP_TABLE_SIZE = 12
  const COLUMN_SIZE = Math.floor(Number(BOOTSTRAP_TABLE_SIZE / TABLE_ROW_COUNT)); // Spaltengröße berechnen => 1

  for (let i = 0; i < TABLE_COLUMN_COUNT; i++) { // Reihe befüllen

    table.innerHTML += `<div class="row"></div>`;

    for (let j = 0; j < TABLE_ROW_COUNT; j++) { // Spalte befüllen

      table.querySelector(`.row:nth-child(${i + 1})`).innerHTML += `<div class="col-${j === (TABLE_ROW_COUNT - 1) ?
        (BOOTSTRAP_TABLE_SIZE - j) // Die letzte Spalte füllt den Restplatz aus
        : COLUMN_SIZE
        } border">${inputArray[i][j]}</div>`;
    }
  }
  // Tabellenüberschriften erstellen
  table.querySelector(`.row:first-child`).classList.add('my-table-head');

  colorizeTable(table);
  removeEmptyInput(table);
  setClickableHeader(table);
}

// Entferne [Kommentar] aus Tabelle
const removeEmptyInput = (table) => {
  let cells = table.querySelectorAll('.row div');
  cells.forEach(cell => cell.innerHTML = (cell.innerHTML === '[Kommentar]' ? '' : cell.innerHTML));
}

// Färbe Tabelle ein
const colorizeTable = (table) => {
  table.querySelectorAll(`.row:nth-child(2n)`).forEach(row => row.classList.add('my-table-color-1'));
  table.querySelectorAll(`.row:nth-child(2n+1)`).forEach(row => row.classList.add('my-table-color-2'));
  table.querySelector(`.my-table-head`).classList.add('bg-secondary', 'bg-gradient', 'text-white');
}

// Färbe Tabllenzeile ein und erstelle Validierungsausgabe:
const highlightFoundMutantNumber = (table) => {
  const product = $('select#produkt').value;
  const mNrP1 = getCurrentMutantNumberP1();
  const mNrP2 = getCurrentMutantNumberP2();
  const mNrP3 = getCurrentMutantNumberP3();
  const mNrP4 = getCurrentMutantNumberP4();

  const completeMutantNumber = product + '-' + mNrP1 + ' ' + mNrP2 + ' ' + mNrP3 + ' ' + mNrP4;
  console.log('SEARCH_VALUE:', completeMutantNumber);
  
  if (isMutantNumber(product, mNrP1, mNrP2, mNrP3, mNrP4)) {
    // Färbe korrekte Tabellenzeile ein
    table.querySelectorAll(`div.row`).forEach(row => {
      if(row.querySelector('div:first-Child').textContent === product) {
        highlightTableRow(table, row);
      }
    });
    console.log('ist Mutantennummer');
    $('p#mutant-number-result').innerHTML = `<strong class="text-success">${completeMutantNumber}</strong> ist eine gültige Mutantennummer.`
  } else {
    console.log('ist keine Mutantennummer');
    $('p#mutant-number-result').innerHTML = `<strong class="text-danger">${completeMutantNumber}</strong> ist keine gültige Mutantennummer.`
  }
}

// Highlighte eine Tabellenzeile
const highlightTableRow = (table, tableRow) => {
  tableRow.querySelectorAll('div').forEach(cell => cell.classList.add('my-table-cell-highlight'));
}

// Sortiere den Tabelleninhalt:
const sortTableBy = (tableHead, tableContentArray, table) => {
  let sortedContentArray = tableContentArray;
  
  let tableContentHeaders = tableContentArray.shift(); // entferne Überschriften vor dem Sortieren
  
  // Prüfe, ob Tabelleninhalt leer ist
  if (tableContentArray.length !== 0) {
    const COLUMN_INDEX = Array.from(table.querySelectorAll('.my-table-head div')).findIndex(div => div.innerHTML === tableHead);

    if (COLUMN_CONTENT_TYPES[COLUMN_INDEX] === 'number') {
      // console.log('ist numerisch');
      sortedContentArray = tableContentArray.sort((a, b) => asNumber(a[COLUMN_INDEX]) - asNumber(b[COLUMN_INDEX]));
    } else if (COLUMN_CONTENT_TYPES[COLUMN_INDEX] === 'string') {
      // console.log('ist String');
      sortedContentArray = tableContentArray.sort((a, b) => a[COLUMN_INDEX] < b[COLUMN_INDEX] ? -1 : 1);
    }
  }
  sortedContentArray.unshift(tableContentHeaders); // Überschrift hinzufügen

  return sortedContentArray;
}

// Filtere den Tabelleninhalt
const filterTableBy = (filterText, tableContentArray) => {
  let filteredContentArray = tableContentArray;

  if (filterText !== '') {
    let tableContentHeaders = tableContentArray.shift(); // entferne Überschriften vor dem Filtern

    filteredContentArray = tableContentArray.filter(content => content.some(cell => cell.includes(filterText)));  // Tabelleninhalt filtern

    filteredContentArray.unshift(tableContentHeaders); // Überschrift hinzufügen
  }
  return filteredContentArray;

}

const updateTable = (tableContentArray, table) => {

  let filteredContentArray = filterTableBy(getCurrentFilterValue(), tableContentArray); // filtern
  let sortedContentArray = sortTableBy(getCurrentSortingValue(), filteredContentArray, table); // sortieren

  fillTableWithContent(sortedContentArray, table); // Tabelle ausfüllen
  highlightFoundMutantNumber(table);
}