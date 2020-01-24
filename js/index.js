// *****  index  *****
console.log('index running..');

/* dependant */
//  OuthDOM() from oauth
//  ContentsDOM() from contentsbody


// ***** component
(async function IndexProps(){
  let mailaddress = sessionStorage.getItem('mailaddress');
  ModalDOM();
  if (!mailaddress){
    await OauthProps();
    let obs = new MutationObserver(async function(){
      oauthWaiting();
      await ContentsBodyProps();
      $('#modal').hide();
    });
    let elem = document.getElementById('oauth');
    let cfg = {
      childList: false,
      attributes: true
    }
    obs.observe(elem,cfg);
    return;
  } else {

    OauthProps();

    ContentsBodyProps();
  };
})();







// ***  DOM methods



// ***  drive methods
//  modal waiting effects
function oauthWaiting(){
  let DOM = $('#modal');
  let modalwindow = $('<div class="modalwindow"></div>');
  let cap = document.createElement('p');
  cap.innerText = '認証確認中...';
  modalwindow.append(cap);
  DOM.html(modalwindow);
  $(DOM).show();
}

























//
