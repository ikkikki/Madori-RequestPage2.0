// *****  Oauth  *****
console.log('oauth running..')


// ***** component
function OauthProps(){
  OauthDOM();
  $('#oauth').show();
  $('#contentsbody').hide();
}


// *** DOM methods
function OauthDOM(){
  let DOM = document.getElementById('oauth');
  let inner = [
    $("<br><br>"),
    $("<p>これより先は専用ページとなります</p>"),
    $('<p>パスワードをご入力ください</p><br><br>'),
    $('<p>クラウドワークス登録名</p>'),
    $('<form><input id="mailaddress" type="text"></form>'),
    $('<br><p>メールアドレス</p>'),
    $('<form><input id="pass" type="email"></form>'),
    $('<button id="oauthbtn" type="button" onclick="EntoryCheker()">送信する</button>'),
    ]
  for (let i=0; i < inner.length; i++){
    $(DOM).append(inner[i]);
  };
}
