// *****  recieve  *****
console.log('recieve running..')

/* dependant */
//  closeModal() from providers


// ***** component
async function RecieveProps(){
  await RecieveDOM();
  await xmlChecker();
}


// *** DOM methods
function RecieveDOM(){
  let DOM = $('.recieve');
  let recieve = $('<div class="recieveContents"></div>');
  recieve.append(rformsDOM('worker','text','登録メールアドレス'));
  recieve.append(rformsDOM('is_compass','checkbox','コンパス有り'));
  recieve.append(rformsDOM('upstair','checkbox','二階有り'));
  recieve.append(rformsDOM('process_id','text','物件番号'));
  recieve.append(rformsDOM('xml','file','xmlファイル'));
  recieve.append($('<button id="requestData" type="button"  onclick="Button_requestDataHandler()">図面登録</button>'));
  DOM.html(recieve);
  let mail = document.getElementById('worker');
  console.log('mal1',sessionStorage.getItem('mailaddress'));
  mail.value = sessionStorage.getItem('mailaddress');
  console.log('mal',mail.placeholder);
  let id = document.getElementById('process_id');
  id.placeholder = Object.keys(JSON.parse(sessionStorage.getItem('drawings')))[0];
}

function rformsDOM(id,type,val){
  let form = document.createElement('form');
  let label = document.createElement('label');
  let input = document.createElement('input');
  [label.htmlFor,label.innerText] = [id,val];
  [input.id,input.type] = [id,type];
  form.append(label);
  form.append(input);
  return form;
}

// ***  drive methods
//  varidate file
function xmlChecker(){
  let xml = document.getElementById("xml");
  xml.addEventListener('change',(e) => {
    let d = e.target.files[0];
    if(d.type.match('text/xml')){
      let reader = new FileReader();
      reader.readAsDataURL(d);
    } else {
      alert('xmlファイルを選択してください');
      xml.value = null;
      console.log('type',d.type)
    };
  },false);
}

//  method for button pushed  #requestData
function Button_requestDataHandler(){
  console.log('buttoned');
  let worker = document.getElementById('worker').value;
  let is_compass = document.getElementById("is_compass").checked;
  let upstair = document.getElementById("upstair").checked;
  let process_id = document.getElementById("process_id").value;
  let fdata = document.getElementById("xml").files[0];

  let reader = new FileReader();
  reader.onload = async function(){
    let filedata = reader.result;
    console.log('filedata',filedata);
    let check = new Map();
    if(!worker){
      console.log('noworker');
      check.set('worker','クラウドワークス登録名が未入力です');
    };
    if(!process_id){
      check.set('process_id','物件番号が未入力です');
    };
    if(!filedata){
      check.set('filedata','xmlファイルが未入力です');
    };
    if (check.size){
      recieveInputError(check);
    } else {
      recieveWaiting();
      let result = await RequestDrawDataUpdateAPIcall(process_id,worker,is_compass,upstair,filedata);
      recieveAPIresult(result);
    }
  }
  reader.readAsDataURL(fdata);
}

//  modal action
function recieveInputError(map){
  let DOM = $('#modal');
  let modalwindow = $('<div class="modalwindow"></div>')
  map.forEach(function(val,key){
    let cap = document.createElement('p');
    cap.classList.add("modalcap");
    console.log('val',val)
    cap.innerText = val;
    modalwindow.append(cap);
  });
  modalwindow.append($('<button type="button" onclick="closeModal()">閉じる</button>'))
  DOM.html(modalwindow);
  $(DOM).show();
}

function recieveAPIresult(result){
  let DOM = $('#modal');
  let modalwindow = $('<div class="modalwindow"></div>');
  let cap = document.createElement('p');
  if (result['error']==='process_id'){
    cap.innerText = '入力は半角数字でお願いします';
    modalwindow.append($('<p>物件番号が読み取れませんでした</p>'));
    modalwindow.append($('<p>番号を確認してください</p>'));
  } else if (result['error']==='filedata') {
    cap.innerText = 'xmlファイルが読み取れませんでした';
  } else {
    cap.innerText = '図面ファイルを登録しました';
  }
  modalwindow.append(cap);
  modalwindow.append($('<button type="button" onclick="closeModal()">閉じる</button>'))
  DOM.html(modalwindow);
  $(DOM).show();
}

function recieveWaiting(){
  let DOM = $('#modal');
  let modalwindow = $('<div class="modalwindow"></div>');
  let cap = document.createElement('p');
  cap.innerText = '図面ファイル登録中...';
  modalwindow.append(cap);
  modalwindow.append($('<button type="button" onclick="closeModal()">閉じる</button>'))
  DOM.html(modalwindow);
  $(DOM).show();
}



// ***  API call (put)
function RequestDrawDataUpdateAPIcall(process_id,worker,is_compass,upstair,filedata){
  const url = 'https://asia-northeast1-plan-proxy.cloudfunctions.net/F24_RequestDrawDataUpdateAPI'
  let obj = {
    'process_id': process_id,
    'worker' : worker,
    'is_compass' : is_compass,
    'upstair': upstair,
    'filedata': filedata
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



























//
