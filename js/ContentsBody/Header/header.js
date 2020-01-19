// *****  Header  *****
console.log('Header running..')


function HeaderDOM(){
  let DOM = document.getElementById('contentsbody');
  let header = $('<div class="header"></div>');
  let inner = [
    $('<h1 class="workername"></h1>'),
    $('<ul class="headernav"></nav>'),
    ]
  for (let i=0; i < inner.length; i++){
    header.append(inner[i]);
  };
  console.log(header);
  $(DOM).append(header);
  headernavDOM();
}


// *** DOM methods
function headernavDOM(){
  let DOM = $('.headernav');
  let inner = [
    $('<li><span>status</span></li>'),
    $('<li><span>order</span></li>'),
    $('<li><span>recieve</span></li>'),
    $('<li><span>checking</span></li>'),
    ]
  for (let i=0; i < inner.length; i++){
    DOM.append(inner[i]);
  };
}
