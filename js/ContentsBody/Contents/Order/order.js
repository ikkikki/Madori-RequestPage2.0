// *****  Order  *****
console.log('order running..')

/* dependant */
//  RecieveDOM() from recieve


// ***** component
async function OrderProps(){
  await OrderDOM();

}


// *** DOM methods
function OrderDOM(){
  let DOM = $('.order');
  let order = $('<div class="orderContents"></div>');
  order.append($('<img src="" alt="">'))
  order.append($('<button id="orderjpg" type="button"  onclick="Button_requestDataHandler()">新規受注</button>'));
  DOM.html(order);
}





















// ***  DOM methods


// ***  drive methods
