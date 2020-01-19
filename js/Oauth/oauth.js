// *****  Oauth  *****
console.log('oauth running..')



function OauthDOM(){
  let DOM = document.getElementById('oauth');
  let inner = [
    $("<br><br>"),
    $("<p>これより先は専用ページとなります</p>"),
    $('<p>パスワードをご入力ください</p><br><br>'),
    $('<p>メールアドレス</p>'),
    $('<form><input id="mailaddress" type="email" placeholder="xxxx@example.com"></form>'),
    $('<br><p>パスワード</p>'),
    $('<form><input id="pass" type="text" placeholder="password?"></form>'),
    $('<div id="btn"><input type="button" value="送信する" onclick="EntoryCheker()"></div>'),
    ]
  for (let i=0; i < inner.length; i++){
    $(DOM).append(inner[i]);
  };
}

// export {OauthDOM}
