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
  basediv.append($('<ul class="checkedImages"></ul>'));
  DOM.html(basediv);
}

function checkingImgDOM(checking_datas){
  console.log('checkingImgDOM running..')
  let DOM = $('.checkedImages');
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
    // approveButtonAct(ga);
  }
  DOM.html(gallary);

}

function approveButtonDOM(id){
  let button = document.createElement('button');
  [button.type,button.innerText] = ['button','approve'];
  // button.setAttribute('onclick','RequestCheckedDataUpdateAPIcall(id)')
  approveButtonAct(button,id);
  return button;
}

function approveButtonAct(elm,process_id){
  elm.addEventListener('click',async function(){
    approveWaiting();
    let res = await RequestCheckedDataUpdateAPIcall(process_id);
    if (res['error']){
      approveError();
    } else if (res['ok']==='ok') {
      let mailaddress = sessionStorage.getItem('mailaddress');
      if (mailaddress){
        let result = await RequestDatasAPIcall(mailaddress);
        await prdataUpdate(result);
        let checking_datas = await drawingsCheck();
        await checkingImgDOM(checking_datas);
        $('#modal').hide();
      };
    }
  },false);
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

//  set sessionStorage data
function prdataUpdate(result){
  sessionStorage.setItem('drawings',JSON.stringify(result['drawings']));
  sessionStorage.setItem('drawing_counts',result['drawing_counts']);
  sessionStorage.setItem('requested',result['requested']);
  let acceptable = (()=>{
    let limit = sessionStorage.getItem('draw_limit');
    console.log('lim',result['drawing_counts'],limit);
    if (result['drawing_counts']>limit){
      return 'false';
    } else {
      return 'true';
    };
  })();
  sessionStorage.setItem('acceptable',acceptable);
  OrderProps();
  console.log('sessionStorage updated with basedata')
}

// *  modal action
//  error
function approveError(){
  let DOM = $('#modal');
  let modalwindow = $('<div class="modalwindow"></div>');
  let cap = document.createElement('p');
  cap.innerText = '登録に失敗しました';
  modalwindow.append(cap);
  modalwindow.append($('<button type="button" onclick="closeModal()">閉じる</button>'))
  DOM.html(modalwindow);
  $(DOM).show();
}

//   waithing
function approveWaiting(){
  let DOM = $('#modal');
  let modalwindow = $('<div class="modalwindow"></div>');
  let cap = document.createElement('p');
  cap.innerText = '依頼完了登録中...';
  modalwindow.append(cap);
  DOM.html(modalwindow);
  $(DOM).show();
}


// ***  API call (put)
function RequestCheckedDataUpdateAPIcall(process_id){
  const url = 'https://us-central1-plan-proxy.cloudfunctions.net/F26_RequestCheckedDataUpdateAPI'
  console.log('pid',process_id);
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

function RequestDatasAPIcall(mailaddress){
  const url = 'https://us-central1-plan-proxy.cloudfunctions.net/F22_RequestDatasAPI'
  let obj = {
    'mailaddress': mailaddress
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
