'use strict';

// EVENT: Mach Tabelle filterbar
document.querySelector('input[name = "filter"]').addEventListener('keyup', (event) => {
  // Handling
  const FILTER_TEXT = event.target.value;
  
  let tableContentArray = covertCSVToArray(mutantDataCSV);

  let filteredContentArray = filterTableBy(FILTER_TEXT, tableContentArray);

  let sortedContentArray = sortTableBy(currentSortingValue, filteredContentArray, MAIN_TABLE);

  fillTableWithContent(sortedContentArray, MAIN_TABLE);
});

