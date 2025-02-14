'use strict';

// const root = document.getElementById('root');
const main_table = document.getElementById('main_table');

let mutantDataCSV =
  `Produkt,Startjahr,Endjahr,Tierart,Anzahl Tiere,Erfolgsquote,Erfolgreiche Mutierungen,Kommentar
SIM1,1999,2001,Langschwanzmakake,50,8%,4,[Kommentar]
SIM2,2001,2002,Langschwanzmakake,80,17%,14,[Kommentar]
SIM3,2001,2006,Langschwanzmakake,200,26%,52,Einführung Kaninchen
SIM4,2006,2011,Langschwanzmakake,100,12%,12,[Kommentar]
SIM5,2012,2017,Langschwanzmakake,400,40%,160,Einführung Katzen
SIM6,2018,2023,Langschwanzmakake,300,81%,243,[Kommentar]
SIM7,2024,2027,Langschwanzmakake,200,87%,174,[Kommentar]
CUN1,2002,2002,Kaninchen,120,5%,6,[Kommentar]
CUN2,2003,2004,Kaninchen,50,6%,3,[Kommentar]
CUN3,2004,2008,Kaninchen,400,10%,40,[Kommentar]
CUN4,2008,2013,Kaninchen,1200,23%,276,Erfolgreiche Kommerzialisierung
CUN5,2012,2014,Kaninchen,100,22%,22,[Kommentar]
CUN6,2015,2020,Kaninchen,400,64%,256,[Kommentar]
CUN7,2021,2026,Kaninchen,400,63%,252,[Kommentar]
CUN8,2027,2027,Kaninchen,40,64%,26,[Kommentar]
FEL1,2016,2016,Katze,100,4%,4,[Kommentar]
FEL2,2016,2017,Katze,150,9%,14,[Kommentar]
FEL3,2017,2022,Katze,400,30%,120,Pause
FEL4,2018,2022,Katze,300,57%,171,Linus
FEL5,2023,2027,Katze,500,53%,265,[Kommentar]
FEL6,2025,2027,Katze,100,54%,54,LinusII
CAN1,2017,2017,Hund,100,2%,2,[Kommentar]
CAN2,2017,2017,Hund,100,10%,10,[Kommentar]
CAN3,2017,2019,Hund,300,28%,84,Bellé
CAN4,2018,2023,Hund,520,54%,281,[Kommentar]
CAN5,2023,2027,Hund,300,53%,159,[Kommentar]`;

const covertCSVToArray = (csv) => {
  let objectArray = csv.split('\n').map(csvLine => csvLine.split(','));
  return objectArray;

}

// Generiere und befülle Tabelle
const fillTableWithContent = (inputArray, table) => {
  table.innerHTML = '';
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
  // Tabelle einfärben
  colorizeTable(table);
  removeEmptyInput(table);

}

// Entferne [Kommentar] aus Tabelle
const removeEmptyInput = (table) => {
  console.log('call: removeEmptyInput');
  console.log(table.querySelector('.row div').innerHTML);
  let cells = table.querySelectorAll('.row div');
  cells.forEach(cell => cell.innerHTML = (cell.innerHTML === '[Kommentar]' ? '' : cell.innerHTML));
}

const colorizeTable = (table) => {
  table.querySelectorAll(`.row:nth-child(2n)`).forEach(row => row.classList.add('my-tabel-color-1'));
  table.querySelectorAll(`.row:nth-child(2n+1)`).forEach(row => row.classList.add('my-tabel-color-2'));
  table.querySelector(`.my-table-head`).classList.add('bg-secondary', 'bg-gradient', 'text-white');
}

// sortiere die Liste bei click auf Spaltenüberschrift - WIP:
const sortTableBy = (tableHead, tableContentArray, table) => {
  const COLUMN_INDEX = Array.from(table.querySelectorAll('.my-table-head div')).findIndex(div => div.innerHTML === tableHead);
  // console.log('COLUMN_INDEX:', COLUMN_INDEX);
  let newTableContentArray = tableContentArray.map(a => a);
  let sortedArray = [];
  let tableContentHeaders = newTableContentArray.shift(); // Überschriften vor dem Sortieren entfernt
  console.log('newTableContentArray:', newTableContentArray)

  if(!isNaN(newTableContentArray[0][COLUMN_INDEX])) {
    console.log('ist numerisch');
    
    sortedArray = newTableContentArray.sort((a, b) => Number(a[COLUMN_INDEX]) - Number(b[COLUMN_INDEX]));

  } else if (isNaN(newTableContentArray[0][COLUMN_INDEX])) {
    console.log('ist String');
    sortedArray = newTableContentArray.sort((a, b) => a[COLUMN_INDEX] < b[COLUMN_INDEX] ? -1 : 1);

  }

  console.log('sortedArray:', sortedArray)
  // Tabelle neu ausfüllen:
  sortedArray.unshift(tableContentHeaders); // Überschrift hinzufügen
  fillTableWithContent(sortedArray, table);
}

fillTableWithContent(covertCSVToArray(mutantDataCSV), main_table);
sortTableBy('Tierart', covertCSVToArray(mutantDataCSV), main_table);

