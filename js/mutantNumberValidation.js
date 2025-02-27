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
  if(!birthDateCorrespondsWithProduct(product, birthDate)) {
    console.log('Datum stimmt nicht mit Produkt überein');
    return false;
  }
   if (mutantNr < 1) {
    console.log('Mutantennummer stimmt nicht');
    return false;
  };

  return true;
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