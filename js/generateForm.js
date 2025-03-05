'use strict';

const setProductOptions = () => {
  const htmlSelect = $('select#produkt');
  getOriginalMutantData().slice(1).forEach(row => htmlSelect.innerHTML += `<option value="${row[0]}">${row[0]}</option>`)
}


const fillMutantNumberForm = (mutantNumber) => {
  const mutantNumberArray = mutantNumber.split(/[- ]/g);
  console.log(mutantNumberArray);
  $('[name=mutant-number-product]').value = mutantNumberArray[0];
  $('#mutant-number-p1').value = mutantNumberArray[1];
  $('#mutant-number-p2').value = mutantNumberArray[2];
  $('#mutant-number-p3').value = mutantNumberArray[3];
  $('#mutant-number-p4').value = mutantNumberArray[4];

  setCurrentMutantNumberP1(mutantNumberArray[1]);
  setCurrentMutantNumberP2(mutantNumberArray[2]);
  setCurrentMutantNumberP3(mutantNumberArray[3]);
  setCurrentMutantNumberP4(mutantNumberArray[4]);
  checkInputMutantNumber();
}

const setPossibleMutantNumbers = () => {
  getPossibleMutantNumbers().forEach(mutantNumber => {
    const li = document.createElement('li');
    li.classList.add('d-flex', 'align-items-center')

    const button = document.createElement('button');
    button.textContent = '+';
    button.classList.add('btn', 'btn-light', 'm-1', 'me-3');

    const p = document.createElement('p');
    p.textContent = mutantNumber;

    li.appendChild(button);
    li.appendChild(p); 

    $('#possible-mutant-numbers ul').appendChild(li);
  })
}


const colorInvalidFormInput = (checkArray) => {
  $$('#mutant-number-search [name^=mutant-number-]').forEach((input, i) => {
    input.classList.remove('my-invalid-input');
    if(checkArray[i] === 0) input.classList.add('my-invalid-input');
  });
}

setPossibleMutantNumbers();
