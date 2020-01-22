// *****  Contents  *****
console.log('contents running..')

/* dependant */
//  RecieveProps() from recieve
//  OrderProps()  from order


// ***** component
async function ContentsProps(){
  let mailaddress = sessionStorage.getItem('mailaddress');
  let result = await datasAPIcall(mailaddress);
  seStorageUpdate(result);
  ContentsDOM();
}


// *** DOM methods
function ContentsDOM(){
  let DOM = document.getElementById('contentsbody');
  $(DOM).append('<div class="information"></div>');
  $(DOM).append('<div class="contents"></div>');
  let contents = $('.contents');
  $(contents).append('<div class="recieve"></div>');
  $(contents).append('<div class="order"></div>');
  RecieveProps();
  OrderProps();
}


// ***  drive methods
//  set sessionStorage data
function seStorageUpdate(result){
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


// ***  API call (put)
function datasAPIcall(mailaddress){
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
