// *****  recieve  *****
console.log('recieve running..')


// ***** component
async function RecieveMol(){
  await RecieveDOM();
  await xmlChecker();
}


// *** DOM methods
function RecieveDOM(){
  let DOM = $('.contents');
  let recieve = $('<div class="recieve"></div>');
  recieve.append(rformsDOM('worker','text','クラウドワークス登録名'));
  recieve.append(rformsDOM('is_compass','checkbox','コンパス有り'));
  recieve.append(rformsDOM('upstair','checkbox','二階有り'));
  recieve.append(rformsDOM('process_id','text','物件番号'));
  recieve.append(rformsDOM('xml','file','xmlファイル'));
  recieve.append($('<button id="requestData" type="button"  onclick="Button_requestDataHandler()">図面登録</button>'));
  DOM.html(recieve);
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
    if(!d.type.match('text/xml')){
      alert('xmlファイルを選択してください');
      xml.value = null;
      console.log('type',d.type)
    };
  },false);
}

//  method for button pushed  #requestData
async function Button_requestDataHandler(){
  console.log('buttoned');
  let worker = document.getElementById('worker').value;
  let is_compass = document.getElementById("is_compass").checked;
  let upstair = document.getElementById("upstair").checked;
  let process_id = document.getElementById("process_id").value;
  let filedata = document.getElementById("xml").files[0];
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
    let result = await PutXmlAPIcall(process_id,worker,is_compass,upstair);
  }
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


// ***  API call (put)
function PutXmlAPIcall(process_id,worker,is_compass,upstair){
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
