'use strict';

// const root = document.getElementById('root');
const main_table = document.getElementById('main_table');


let dataArray

let data =
  `SIM1	1999	2001	Rhesusaffen		50	8%	4 Kommentar
SIM2	2001	2002	Rhesusaffen		80	17%	14 Kommentar
SIM3	2001	2006	Rhesusaffen	200	26%	52 Kommentar
SIM4	2006	2011	Rhesusaffen		100	12%	12 Kommentar
SIM5	2012	2017	Rhesusaffen 400	40%	160 Kommentar
SIM6	2018	2023	Rhesusaffen		300	81%	243 Kommentar
SIM7	2024	2027	Rhesusaffen		200	87%	174 Kommentar
CUN1	2002	2002	Kaninchen		120	5%	6 Kommentar
CUN2	2003	2004	Kaninchen		50	6%	3 Kommentar
CUN3	2004	2008	Kaninchen		400	10%	40 Kommentar
CUN4	2008	2013	Kaninchen		1200	23%	276 Kommentar
CUN5	2012	2014	Kaninchen		100	22%	22 Kommentar
CUN6	2015	2020	Kaninchen		400	64%	256 Kommentar
CUN7	2021	2026	Kaninchen		400	63%	252 Kommentar
CUN8	2027	2027	Kaninchen		40	64%	26 Kommentar
FEL1	2016	2016	Katzen		100	4%	4 Kommentar
FEL2	2016	2017	Katzen		150	9%	14 Kommentar
FEL3	2017	2022	Katzen	400	30%	120 Kommentar
FEL4	2018	2022	Katzen	300	57%	171 Kommentar
FEL5	2023	2027	Katzen		500	53%	265 Kommentar
FEL6	2025	2027	Katzen	100	54%	54 Kommentar
CAN1	2017	2017	Hunde		100	2%	2 Kommentar
CAN2	2017	2017	Hunde		100	10%	10 Kommentar
CAN3	2017	2019	Hunde	300	28%	84 Kommentar
CAN4	2018	2023	Hunde		520	54%	281 Kommentar
CAN5	2023	2027	Hunde		300	53%	159 Kommentar`;

const convertStringToObject = (text) => {
  let objectArray = [];
  let dataArray = text.replace(/\s/g, ',').split(',').filter(n => n !== ''); // Text auftrennen und Array befüllen
  let i = 0;
  for (let j = 0; j < dataArray.length; j += 8) {
    objectArray[i] = {};
    objectArray[i]['Produkt'] = dataArray[j];
    objectArray[i]['Startjahr'] = dataArray[j + 1];
    objectArray[i]['Endjahr'] = dataArray[j + 2];
    objectArray[i]['Tierart'] = dataArray[j + 3];
    objectArray[i]['Erfolgsquote'] = dataArray[j + 4];
    objectArray[i]['Anzahl Tiere'] = dataArray[j + 5];
    objectArray[i]['Erfolgreiche Mutierungen'] = dataArray[j + 6];
    objectArray[i]['Kommentar'] = dataArray[j + 7] === 'Kommentar' ? '' : dataArray[j + 7]; // Nur ausfüllen, wenn echter Kommentar vorhanden
    i++;
  }
  return objectArray;
}

const fillTableWithInput = (inputArray, table) => {
  const BOOTSTRAP_TABLE_SIZE = 12
  const TABLE_ROW_COUNT = table.querySelectorAll('.my-table-head > div').length; // Tabellenspalten berechnen => 26
  const TABLE_COLUMN_COUNT = inputArray.length; // Tabellenzeilen aus inputArray berechnen => 8
  const COLUMN_SIZE = Math.floor(Number(BOOTSTRAP_TABLE_SIZE / TABLE_ROW_COUNT)); // Spaltengröße berechnen => 1

  let inputValues = [];

  for (let i = 0; i < TABLE_COLUMN_COUNT; i++) { // Reihe befüllen

    table.innerHTML += `<div class="row border"></div>`;
    inputValues = Object.values(inputArray[i]);

    for (let j = 0; j < TABLE_ROW_COUNT; j++) { // Spalte befüllen

      table.querySelector(`.row:nth-child(${i + 2})`).innerHTML += `<div class="col-${j === (TABLE_ROW_COUNT - 1) ?
          (BOOTSTRAP_TABLE_SIZE - j) // Die letzte Spalte füllt den Restplatz aus
          : COLUMN_SIZE
        } border">${inputValues[j]}</div>`;
    }
  }
  // console.log(BOOTSTRAP_TABLE_SIZE - j - 1);
}

let mutantDataArray = convertStringToObject(data);
fillTableWithInput(mutantDataArray, main_table);

