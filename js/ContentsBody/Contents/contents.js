// *****  Contents  *****
console.log('contents running..')

/* dependant */
//  RecieveDOM() from recieve


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





















// ***  DOM methods


// ***  drive methods
