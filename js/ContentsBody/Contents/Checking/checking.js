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
    gallary.append(approveButtonDOM(key));
    // gallary.append(rewriteButtonDOM(key));
  }
  DOM.append(gallary);
}

function approveButtonDOM(id){
  let button = document.createElement('button');
  [button.type,button.innerText] = ['button','approve'];
  button.setAttribute('onclick','RequestCheckedDataUpdateAPIcall(id)')
  return button;
}

function rewriteButtonDOM(id){
  let form = document.createElement('form');
  let label = document.createElement('label');
  let input = document.createElement('input');
  let button = document.createElement('button');
  [label.htmlFor,label.innerText] = ['rewriteInput'+id,'xmlファイル'];
  [input.id,input.type] = ['rewriteInput'+id,'file'];
  [button.type,button.innerText] = ['button','rewrite file'];
  button.setAttribute('onclick','test(id)');
  form.append(label);
  form.append(input);
  form.append(button);
  return form;
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
  return checking_datas;
}


// *  modal action


// ***  API call (put)
function RequestCheckedDataUpdateAPIcall(process_id){
  const url = 'https://us-central1-plan-proxy.cloudfunctions.net/F26_RequestCheckedDataUpdateAPI'
  let obj = {
    'process_id': process_id,
  }
  let result = fetch(url,{
    mode: 'cors',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(function(response){
    return response.json();
  }).then(function(data){
    console.log(data);
    return data;
  });
  return result;
  }















// ***  DOM methods


// ***  drive methods
