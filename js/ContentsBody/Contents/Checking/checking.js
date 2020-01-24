// *****  check  *****
console.log('checking running..')

/* dependant */



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
  }
}


// *** DOM methods


// ***  drive methods

// *  modal action


// ***  API call (put)
f
















// ***  DOM methods


// ***  drive methods
