// *****  Order  *****
console.log('order running..')

/* dependant */
//  RecieveDOM() from recieve


// ***** component
async function OrderProps(){
  OrderDOM();
  let acceptable = sessionStorage.getItem('acceptable');
  let drowings = JSON.parse(sessionStorage.getItem('drowings'));
  // console.log(drowings.hasOwnProperty('status'));
  if (Object.keys(drowings).length){
    orderImgDOM(drowings);
  }
  if (acceptable==='True'){
    orderButtonDOM();
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
  let DOM = $('.orderContents');
  let gallary = $('<ul class="requestImages"></ul>');
  for (let key in json_data){
    dic = json_data[key];
    console.log('ddd',dic);
    img = document.createElement('img');
    console.log('jpg',dic['requestjpg']);
    console.log('jpg',dic['status']);
    img.src = dic['requestjpg'];
    gallary.append(img);
  }
  DOM.append(gallary);
}


// ***  drive methods
function dataCheck(){
  let acceptable = sessionStorage.getItem('acceptable');
  console.log(acceptable)
}

//  action then #orderjpg pushed
async function orderjpgPush(){
  let mailaddress = sessionStorage.getItem('mailaddress');
  let data = await RequestOrderAPIcall(mailaddress);
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
