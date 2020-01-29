// *****  Modal  *****
console.log('Modal running..')





// *** DOM methods
function ModalDOM(){
  let m = $('#modal');
  m.append($('<div class="modalwindow"></div>'))
  m.hide();
}


function ModalBoxDOM(){
  let modalWrap = document.createElement('div');
  modalWrap.classList.add('modalWrap');
  let modalOverlay = document.createElement('div');
  modalOverlay.classList.add('modalOverlay');
  let modalbody = document.createElement('div');
  modalBody.classList.add('modalBody');
  let modalMain = document.createElement('div');
  modalMain.classList.add('modalMain');
  let modalContent = document.createElement('div');
  modalContent.classList.add('modalContent');
  let p = document.createElement('p');
  let spn = document.createElement('span');
  let btn = document.createElement('button');
  p.appendChild(spn);
  modalContent.appendChild(p);
  modalContent.appendChild(btn);
  modalMain.appendChild(modalContent);
  modalbody.appendChild(modalMain);
  modalWrap.appendChild(modalOverlay);

}
