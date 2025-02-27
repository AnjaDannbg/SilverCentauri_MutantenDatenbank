'use strict';

// TODO:
const isMutantNumber = (product, productNr, gender, birthDate, mutantNr) => {

  // const PRODUCT = inputValue.substring(0, 4);
  // const PRODUCT_NUMBER = Number(inputValue.split(/[- ]/g)[1]);
  // const GENDER = Number(inputValue.split(/[- ]/g)[2].charAt(0));
  // const BIRTH_DATE = inputValue.split(/[- ]/g)[2].substring(1, 9);
  // const MUTANT_NUMBER = inputValue.split(/[- ]/g)[2].substring(9, inputValue.length);

  console.log(product, productNr, gender, birthDate, mutantNr)

  if (product.length === 0) {
    console.log('Produkt stimmt nicht');
    return false;
  }
  if (productNr === 0) {
    console.log('Produktnummer stimmt nicht');
    return false;
  }
  if (!(Number(gender) === 1 || Number(gender) === 2)) {
    console.log('Geschlecht stimmt nicht');
    return false;
  }
  if (isNaN(new Date(convertToDate(birthDate)))){
    console.log('Datum stimmt nicht');
    return false;
  }
   if (mutantNr < 1) {
    console.log('Mutantennummer stimmt nicht');
    return false;
  };

  return true;
}

const convertToDate = (date) => {
  if (date.length === 8) {
    const day = date.substring(0, 2)
    const month = date.substring(2, 4)
    const year = date.substring(5, 9)
    return year + '/' + month + '/' + day;

  }
  console.log('invalid Date');
  return 'invalid Date';
}