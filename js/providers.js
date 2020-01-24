// *****  providers  *****
console.log('providers running..')

/* dependant */





// ***  drive methods
//  show modal window
function modalShow(text){
  let DOM = $('#modal');
  let modalwindow = $('<div class="modalwindow"></div>');
  let cap = document.createElement('p');
  cap.innerText = text;
  modalwindow.append(cap);
  modalwindow.append($('<button type="button" onclick="closeModal()">閉じる</button>'))
  DOM.html(modalwindow);
  $(DOM).show();
}

//  close modal window
function closeModal(){
  $('#modal').hide();
}

// ***  API call (put)
// //  Oauth,
// function RequestOauthAPIcall(worker_name,mailaddress){
//   const url = 'https://us-central1-plan-proxy.cloudfunctions.net/F21_RequestOauthAPI'
//   let obj = {
//     'worker_name': worker_name,
//     'mailaddress' : mailaddress,
//   }
//   let result = fetch(url,{
//     mode: 'cors',
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(obj)
//   }).then(function(response){
//     return response.json();
//   }).then(function(data){
//     console.log(data);
//     return data;
//   });
//   return result;
// }

// //  Oauth,Contents,
// function RequestDatasAPIcall(mailaddress){
//   const url = 'https://us-central1-plan-proxy.cloudfunctions.net/F22_RequestDatasAPI'
//   let obj = {
//     'mailaddress': mailaddress
//   }
//   let result = fetch(url,{
//     mode: 'cors',
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(obj)
//   }).then(function(response){
//     return response.json();
//   }).then(function(data){
//     console.log(data);
//     return data;
//   });
//   return result;
// }

//  Recieve,
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
