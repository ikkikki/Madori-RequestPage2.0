// *****  check  *****
console.log('checking running..')

/* dependant */



// ***** component
async function CheckingProps(){
  CheckingDOM();
}


// *** DOM methods
function CheckingDOM(){
  let DOM = $('.checking');
  let basediv = $('<div class="checkingContents"></div>');
  DOM.html(basediv);
}

function checkingImgDOM(drawings){
  console.log('checkingImgDOM running..')
  let DOM = $('.checkingContents');
  let gallary = $('<ul class="checkedImages"></ul>');
  for (let key in drawings){
    dic = drawings[key];
    title = document.createElement('p');
    title.innerText = '物件番号　：'+key;
    period = document.createElement('p');
    period.innerText = '作図納期　：'+dic['period'];
    li = document.createElement('li');
    li.classList.add('ordercard');
    orimg = document.createElement('img');
    orimg.src = dic['requestjpg'];
    primg = document.createElement('img');
    primg.src = dic['printedjpg'];
    li.append(title);
    li.append(period);
    li.append(orimg);
    li.append(primg);
    gallary.append(li);
  }
  DOM.append(gallary);
}

// ***  drive methods



// *  modal action


// ***  API call (put)
















// ***  DOM methods


// ***  drive methods
