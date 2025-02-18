'use strict';

const init = () => {
  const INIT_TABLE_CONTENT = covertCSVToArray(mutantDataCSV)
  fillTableWithContent(INIT_TABLE_CONTENT, MAIN_TABLE);
  rememberColumnContentTypes(INIT_TABLE_CONTENT);
  // sortTableBy('Produkt', covertCSVToArray(mutantDataCSV), MAIN_TABLE);
}

init();