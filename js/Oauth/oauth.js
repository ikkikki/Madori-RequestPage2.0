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
    $('<button id="oauthbtn" type="button" onclick="EntoryCheker()">送信する</button>'),
    ]
  for (let i=0; i < inner.length; i++){
    $(DOM).append(inner[i]);
  };
}

// ***  drive methods
//  chaeck is storage has datas
function OauthChecker(){

}

//  callAPI and check oauth
async function EntoryCheker(){
  let worker_name = document.getElementById('worker_name').value;
  let mailaddress = document.getElementById('worker_address').value;
  oauthWaiting();
  let result = await fetchOauth(worker_name,mailaddress);
  if (result['ok']){
    $('#modal').hide();
    $('#oauth').hide();
    $('#contentsbody').show();
    sessionStorageUpdate(result);
    return;
  } else {
    let DOM = $('#modal');
    let modalwindow = $('<div class="modalwindow"></div>');
    let cap = document.createElement('p');
    if (result['error']==='worker_name'){
      cap.innerText = 'クラウドワークス登録名が無効です';
    } else if (result['error']==='mailaddress') {
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
function sessionStorageUpdate(result){
  // sessionStorage.setItem('mailaddress',JSON.stringify(json));
  sessionStorage.setItem('worker_name',result['worker_name']);
  sessionStorage.setItem('mailaddress',result['mailaddress']);
  sessionStorage.setItem('draw_limit',result['draw_limit']);
  console.log('sessionStorage updated with oauthed data')
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
function fetchOauth(worker_name,mailaddress){
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
