'use strict';

const setProductOptions = () => {
  const htmlSelect = $('select#produkt');
  getOriginalMutantData().slice(1).forEach(row => htmlSelect.innerHTML += `<option value="${row[0]}">${row[0]}</option>`)
}