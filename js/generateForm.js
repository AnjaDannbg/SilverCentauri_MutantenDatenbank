'use strict';

const setProductOptions = () => {
  const htmlSelect = $('select#produkt');
  getOriginalMutantData().slice(1).forEach(row => htmlSelect.innerHTML += `<option value="${row[0]}">${row[0]}</option>`)
}

const colorInvalidFormInput = (checkArray) => {
  $$('#mutant-number-search [name^=mutant-number-]').forEach((input, i) => {
    input.classList.remove('my-invalid-input');
    if(checkArray[i] === 0) input.classList.add('my-invalid-input');
  });
}