'use strict';

// TODO:
const isMutantNumber = (product, productNr, gender, birthDate, mutantNr) => {

  // const PRODUCT = inputValue.substring(0, 4);
  // const PRODUCT_NUMBER = Number(inputValue.split(/[- ]/g)[1]);
  // const GENDER = Number(inputValue.split(/[- ]/g)[2].charAt(0));
  // const BIRTH_DATE = inputValue.split(/[- ]/g)[2].substring(1, 9);
  // const MUTANT_NUMBER = inputValue.split(/[- ]/g)[2].substring(9, inputValue.length);

  const checkArray = [0, 0, 0, 0, 0];
  console.log(product, productNr, gender, birthDate, mutantNr)

  if (product.length !== 0) {
    checkArray[0] = 1;
  } else console.log('Produkt stimmt nicht');

  if (productNrCorrespondsWithProduct(product, productNr)) {
    checkArray[1] = 1;
  } else console.log('Produktnummer stimmt nicht');

  if ((Number(gender) === 1 || Number(gender) === 2)) {
    checkArray[2] = 1;
  } else console.log('Geschlecht stimmt nicht');

  if (!isNaN(new Date(convertToDate(birthDate))) && birthDateCorrespondsWithProduct(product, birthDate)){
    checkArray[3] = 1;
  } else console.log('Datum stimmt nicht');

  if (mutantNr > 0) {
    checkArray[4] = 1;
  } else console.log('Mutantennummer stimmt nicht');

  colorInvalidFormInput(checkArray);
  return checkArray.every(digit => digit === 1) ? true : false;
}

const birthDateCorrespondsWithProduct = (product, birthDate) => {
  const birthYear = birthDate.substring(4, 8);
  console.log("birthYear ----->", birthYear);

  let productArray = getOriginalMutantData().find(productArray => 
    productArray[0] === product)

  const productStartYear = productArray[1];
  const productEndYear = productArray[2];
  console.log("productStartYear ----->", productStartYear);
  console.log("productEndYear ----->", productEndYear);
  
  return (birthYear >= productStartYear && birthYear <= productEndYear);
}

const productNrCorrespondsWithProduct = (product, productNr) => {
  let productArray = getOriginalMutantData().find(productArray => 
    productArray[0] === product)

    const maxProductNr = Number(productArray[6]);

    return (productNr > 0 && productNr <= maxProductNr);
}

const mutantNrCorrespondsWithProduct = (product, mutantNr) => {

}

const convertToDate = (date) => {
  if (date.length === 8) {
    const day = date.substring(0, 2)
    const month = date.substring(2, 4)
    const year = date.substring(4, 8)
    return year + '/' + month + '/' + day;

  }
  console.log('invalid Date');
  return 'invalid Date';
}