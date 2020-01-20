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
  $(DOM).append(header);
  headernavDOM();
}


// *** DOM methods
function headernavDOM(){
  let DOM = $('.headernav');
  let inner = [
    $('<li><span>受注状況</span></li>'),
    $('<li><span>新規受注</span></li>'),
    $('<li><span>作図納品</span></li>'),
    $('<li><span>検収納品</span></li>'),
    ]
  for (let i=0; i < inner.length; i++){
    DOM.append(inner[i]);
  };
}
