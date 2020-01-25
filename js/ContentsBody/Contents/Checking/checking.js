// *****  check  *****
console.log('checking running..')

/* dependant */



// ***** component
async function CheckingProps(){
  CheckingDOM();
  let checking_datas = drawingsCheck();
  checkingImgDOM(checking_datas);
}


// *** DOM methods
function CheckingDOM(){
  let DOM = $('.checking');
  let basediv = $('<div class="checkingContents"></div>');
  DOM.html(basediv);
}

function checkingImgDOM(checking_datas){
  console.log('checkingImgDOM running..')
  let DOM = $('.checkingContents');
  let gallary = $('<ul class="checkedImages"></ul>');
  for (let key in checking_datas){
    dic = checking_datas[key];
    title = document.createElement('p');
    title.innerText = '物件番号　：'+key;
    period = document.createElement('p');
    period.innerText = '作図納期　：'+dic['period'];
    li = document.createElement('li');
    li.classList.add('checkcard');
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
//  check is data showable images
function drawingsCheck() {
  let drawings = JSON.parse(sessionStorage.getItem('drawings'));
  let checking_datas = new Map();
  for (let key in drawings){
    console.log(key,drawings[key]);
    data = drawings[key]
    if (data['status']==='checked'||data['status']==='printed'){
      checking_datas[key] = data;
    }
  }
  console.log(drawings);
  console.log(checking_datas);
  return checking_datas;
}


// *  modal action


// ***  API call (put)
















// ***  DOM methods


// ***  drive methods
