// *****  Order  *****
console.log('order running..')

/* dependant */
//  RecieveDOM() from recieve


// ***** component
async function OrderProps(){
  OrderDOM();
  let acceptable = sessionStorage.getItem('acceptable');
  let drawings = JSON.parse(sessionStorage.getItem('drawings'));
  let requested = sessionStorage.getItem('requested');
  // console.log(drawings.hasOwnProperty('status'));
  if (Object.keys(drawings).length){
    orderImgDOM(drawings);
  }
  if (acceptable==='true'&&requested==='true'){
    orderButtonDOM();
    // var p = document.getElementById('orderjpg');
    // p.addEventListener('click',(function(){
    //
    // })(),false);
  }
  // let mailaddress = sessionStorage.getItem('mailaddress');
  // let data = await RequestOrderAPIcall(mailaddress);

}


// *** DOM methods
function OrderDOM(){
  let DOM = $('.order');
  let order = $('<div class="orderContents"></div>');
  DOM.html(order);
}

function orderButtonDOM(){
  let DOM = $('.orderContents');
  DOM.append($('<button id="orderjpg" type="button"  onclick="orderjpgPush()">新規受注</button>'));
}

function orderImgDOM(json_data){
  console.log('orderImgDOM running..')
  let DOM = $('.orderContents');
  let gallary = $('<ul class="requestImages"></ul>');
  for (let key in json_data){
    dic = json_data[key];
    title = document.createElement('p');
    title.innerText = '物件番号　：'+key;
    period = document.createElement('p');
    period.innerText = '作図納期　：'+dic['period'];
    li = document.createElement('li');
    li.classList.add('ordercard');
    img = document.createElement('img');
    img.src = dic['requestjpg'];
    // img.addEventListener('click', downloadFromUrl(), false);
    li.append(title);
    li.append(period);
    li.append(img);
    gallary.append(li);
  }
  DOM.append(gallary);

}

function downloadFromUrlAutomatically(url, fileName){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = function(e){
    if(this.status == 200){
      var urlUtil = window.URL || window.webkitURL;
      var imgUrl = urlUtil.createObjectURL(this.response);
      var link = document.createElement('a');
      link.href=imgUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link)
    }
  };
  xhr.send();
}


// ***  drive methods
function dataCheck(){
  let acceptable = sessionStorage.getItem('acceptable');
  console.log(acceptable)
}

//  action then #orderjpg pushed
async function orderjpgPush(){
  orderWaiting();
  let mailaddress = sessionStorage.getItem('mailaddress');
  let limit = sessionStorage.getItem('draw_limit');
  let drawings = JSON.parse(sessionStorage.getItem('drawings'));
  let data = await RequestOrderAPIcall(mailaddress);
  if (data['error']){

    orderError();

  } else if (data['ok']==='ok') {
    let id = Object.keys(data['drawings'])[0]
    let acceptable = 'false';
    if (drawings.length){
      drawings[id] = data['drawings'];
    } else {
      drawings = data['drawings'];
    }
    await orderImgDOM(drawings);
    $('#orderjpg').hide();
    $('#modal').hide();
  }
}



// *  modal action
//  error
function orderError(){
  let DOM = $('#modal');
  let modalwindow = $('<div class="modalwindow"></div>');
  let cap = document.createElement('p');
  cap.innerText = '現在お願いできる図面がありません　しばらくお待ちください';
  modalwindow.append(cap);
  modalwindow.append($('<button type="button" onclick="closeModal()">閉じる</button>'))
  DOM.html(modalwindow);
  $(DOM).show();
}

//   waithing
function orderWaiting(){
  let DOM = $('#modal');
  let modalwindow = $('<div class="modalwindow"></div>');
  let cap = document.createElement('p');
  cap.innerText = '受注図面取得中...';
  modalwindow.append(cap);
  DOM.html(modalwindow);
  $(DOM).show();
}

// ***  API call (put)
function RequestOrderAPIcall(mailaddress){
  const url = 'https://us-central1-plan-proxy.cloudfunctions.net/F23_RequestOrderAPI'
  let obj = {
    'mailaddress' : mailaddress,
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
