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























//
