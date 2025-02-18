'use strict';

const MAIN_TABLE = document.getElementById('main_table');

const init = () => {
  const INIT_TABLE_CONTENT = covertCSVToArray(mutantDataCSV)
  fillTableWithContent(INIT_TABLE_CONTENT, MAIN_TABLE);
  rememberColumnContentTypes(INIT_TABLE_CONTENT);
  // sortTableBy('Produkt', covertCSVToArray(mutantDataCSV), MAIN_TABLE);
}

const COLUMN_CONTENT_TYPES = [];

// Aktueller Tabellenfilter;
let currentFilter = '';
let currentSortingValue = 'Produkt';

const setCurrentFilter = (filterText) => currentFilter = filterText;
const setCurrentSortingValue = (sortingValue) => currentSortingValue = sortingValue;


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

const rememberColumnContentTypes = (tableContentArray) => {

  for(let i=0; i<tableContentArray[0].length; i++) {
    // Prüfe, ob Spalteninhalt Nummer ist
    let columnContent = asNumber(tableContentArray[1][i]);
  
    if (!isNaN(columnContent)) {
      console.log('ist numerisch');
      COLUMN_CONTENT_TYPES.push('number');
  
    } else if (isNaN(columnContent)) {
      console.log('ist String');
      COLUMN_CONTENT_TYPES.push('string');
  
    }
  }
  console.log('COLUMN_CONTENT_TYPES', COLUMN_CONTENT_TYPES);
}

// Wandle Kommazahlen oder Prozent in Zahl um
const asNumber = (content) => {
  if (String(content).endsWith('%')) {
    content = content.substring(0, content.length - 1).trim();
  }
  content.replace(',', '.'); // Kommazahl in englische Schreibweise umwandeln
  // console.log('content type: ', typeof Number(content));
  // console.log('content: ', Number(content));
  return Number(content);
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
  table.querySelectorAll(`.row:nth-child(2n)`).forEach(row => row.classList.add('my-tabel-color-1'));
  table.querySelectorAll(`.row:nth-child(2n+1)`).forEach(row => row.classList.add('my-tabel-color-2'));
  table.querySelector(`.my-table-head`).classList.add('bg-secondary', 'bg-gradient', 'text-white');
}

// Sortiere die Tabelle bei click auf Spaltenüberschrift:
const sortTableBy = (tableHead, tableContentArray, table) => {
  setCurrentSortingValue(tableHead);
  console.log('currentSortingValue', currentSortingValue);

  let sortedContentArray = tableContentArray;
  
  const COLUMN_INDEX = Array.from(table.querySelectorAll('.my-table-head div')).findIndex(div => div.innerHTML === tableHead);

  let tableContentHeaders = tableContentArray.shift(); // Überschriften vor dem Sortieren entfernt

  // Prüfe, ob Tabelleninhalt leer ist
  if(tableContentArray.length !== 0) {
    // Prüfe, ob Spalteninhalt Nummer ist
    let columnContent = asNumber(tableContentArray[0][COLUMN_INDEX]);
  
    if (COLUMN_CONTENT_TYPES[COLUMN_INDEX] === 'number') {
      console.log('ist numerisch');
      sortedContentArray = tableContentArray.sort((a, b) => asNumber(a[COLUMN_INDEX]) - asNumber(b[COLUMN_INDEX]));
  
    } else if (COLUMN_CONTENT_TYPES[COLUMN_INDEX] === 'string') {
      console.log('ist String');
      sortedContentArray = tableContentArray.sort((a, b) => a[COLUMN_INDEX] < b[COLUMN_INDEX] ? -1 : 1);
    }
  }
  
  sortedContentArray.unshift(tableContentHeaders); // Überschrift hinzufügen
  
  return sortedContentArray;
}

// Filtere Tabelleninhalt nach filterText
const filterTableBy = (filterText, tableContentArray) => {
  setCurrentFilter(filterText);
  // console.log('currentFilter', currentFilter);
  
  let filteredContentArray = tableContentArray;
  if (filterText !== '') {
    let tableContentHeaders = tableContentArray.shift(); // Überschriften vor dem Filtern entfernen
    
    filteredContentArray = tableContentArray.filter(content => content.some(cell => cell.includes(filterText)));  // Tabelleninhalt filtern

    filteredContentArray.unshift(tableContentHeaders); // Überschrift hinzufügen
  }
  return filteredContentArray;
    
}

// EVENT: Mach Tabellenüberschriften clickbar
const setClickableHeader = (table) => {
  document.querySelectorAll('.my-table-head > div').forEach(tableHead => tableHead.addEventListener('click', (event) => {
    let tableContentArray = covertCSVToArray(mutantDataCSV);
    let tableHeadName = event.target.innerHTML;
    // console.log('tableHeadName:', tableHeadName);
    let sortedContentArray = sortTableBy(tableHeadName, tableContentArray, table);
    let filteredContentArray = filterTableBy(currentFilter, sortedContentArray);
    fillTableWithContent(filteredContentArray, MAIN_TABLE);
  }));
}


init();

