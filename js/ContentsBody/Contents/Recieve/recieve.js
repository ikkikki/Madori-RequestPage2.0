// *****  recieve  *****
console.log('recieve running..')


function RecieveDOM(){
  let DOM = $('.contents');
  let recieve = $('<div class="recieve"></div>');
  recieve.append(rforms('worker','text','クラウドワークス登録名'));
  recieve.append(rforms('is_compass','checkbox','コンパス有り'));
  recieve.append(rforms('upstair','checkbox','二階有り'));
  recieve.append(rforms('process_id','text','物件番号'));
  recieve.append(rforms('xml','file','xmlファイル'));
  recieve.append($('<button id="requestData" type="button"  onclick="sendRequestData()">図面登録</button>'));
  DOM.html(recieve);
}


// *** DOM methods
function rforms(id,type,val){
  let form = document.createElement('form');
  let label = document.createElement('label');
  let input = document.createElement('input');
  [label.htmlFor,label.innerText] = [id,val];
  [input.id,input.type] = [id,type];
  form.append(label);
  form.append(input);
  return form;
}

































//
