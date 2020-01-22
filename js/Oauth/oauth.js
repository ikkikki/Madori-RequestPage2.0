// *****  Oauth  *****
console.log('oauth running..')


// ***** component
function OauthProps(){
  OauthDOM();
  $('#oauth').show();
  $('#contentsbody').hide();
}


// *** DOM methods
function OauthDOM(){
  let DOM = document.getElementById('oauth');
  let inner = [
    $("<br><br>"),
    $("<p>これより先は専用ページとなります</p>"),
    $('<p>パスワードをご入力ください</p><br><br>'),
    $('<p>クラウドワークス登録名</p>'),
    $('<form><input id="worker_name" type="text"></form>'),
    $('<br><p>メールアドレス</p>'),
    $('<form><input id="worker_address" type="email"></form>'),
    $('<button id="oauthbtn" type="button" onclick="oauthbtnPush()">送信する</button>'),
    ]
  for (let i=0; i < inner.length; i++){
    $(DOM).append(inner[i]);
  };
}

// ***  drive methods
//  action then #oauthbtn pushed
async function oauthbtnPush(){
  let worker_name = document.getElementById('worker_name').value;
  let mailaddress = document.getElementById('worker_address').value;
  oauthWaiting();
  let workerdata = await RequestOauthAPIcall(worker_name,mailaddress);
  if (workerdata['ok']){
    $('#modal').hide();
    $('#oauth').hide();
    $('#contentsbody').show();
    workerdataUpdate(workerdata);
    let prdata = await RequestDatasAPIcall(mailaddress);
    prdataUpdate(prdata);
    return;
  } else {
    let DOM = $('#modal');
    let modalwindow = $('<div class="modalwindow"></div>');
    let cap = document.createElement('p');
    if (workerdata['error']==='worker_name'){
      cap.innerText = 'クラウドワークス登録名が無効です';
    } else if (workerdata['error']==='mailaddress') {
      cap.innerText = 'メールアドレスが無効です';
    } else {
      cap.innerText = '認証に失敗しました';
    }
    modalwindow.append(cap);
    modalwindow.append($('<button type="button" onclick="closeModal()">閉じる</button>'))
    DOM.html(modalwindow);
    $(DOM).show();
  }
}

//  set sessionStorage data
function workerdataUpdate(result){
  // sessionStorage.setItem('mailaddress',JSON.stringify(json));
  sessionStorage.setItem('worker_name',result['worker_name']);
  sessionStorage.setItem('mailaddress',result['mailaddress']);
  sessionStorage.setItem('draw_limit',result['draw_limit']);
  console.log('sessionStorage updated with oauthed data')
}

//  set sessionStorage data
function prdataUpdate(result){
  sessionStorage.setItem('drowings',JSON.stringify(result['drowings']));
  sessionStorage.setItem('drowing_counts',result['drowing_counts']);
  let acceptable = (()=>{
    let limit = sessionStorage.getItem('draw_limit');
    if (result['draw_limit']>limit){
      return 'False';
    } else {
      return 'True';
    };
  })();
  sessionStorage.setItem('acceptable',acceptable);
  console.log('sessionStorage updated with basedata')
}

//  modal waiting effects
function oauthWaiting(){
  let DOM = $('#modal');
  let modalwindow = $('<div class="modalwindow"></div>');
  let cap = document.createElement('p');
  cap.innerText = '認証確認中...';
  modalwindow.append(cap);
  DOM.html(modalwindow);
  $(DOM).show();
}


// ***  API call (post)
function RequestOauthAPIcall(worker_name,mailaddress){
  const url = 'https://us-central1-plan-proxy.cloudfunctions.net/F21_RequestOauthAPI'
  let obj = {
    'worker_name': worker_name,
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
