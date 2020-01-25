// *****  Contents  *****
console.log('contents running..')

/* dependant */
//  RecieveProps() from recieve
//  OrderProps()  from order


// ***** component
async function ContentsProps(){
  let mailaddress = sessionStorage.getItem('mailaddress');
  if (mailaddress){
    let result = await RequestDatasAPIcall(mailaddress);
    prdataUpdate(result);
  };
  ContentsDOM();
}


// *** DOM methods
function ContentsDOM(){
  console.log('ContentsDOM running...')
  let DOM = document.getElementById('contentsbody');
  $(DOM).append('<div class="information"></div>');
  $(DOM).append('<div class="contents"></div>');
  let contents = $('.contents');
  $(contents).append('<div class="recieve"></div>');
  $(contents).append('<div class="order"></div>');
  $(contents).append('<div class="checking"></div>');
  RecieveProps();
  OrderProps();
  CheckingProps();
}


// ***  drive methods
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


// ***  API call (put)
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
