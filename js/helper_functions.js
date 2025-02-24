'use strict';

// Wandle CVS in zweidimensionales Array um
const covertCSVToArray = (csv) => {
  let contentArray = csv.split('\n').map(csvLine => csvLine.split(','));
  return contentArray;
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