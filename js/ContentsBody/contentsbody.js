// *****  ContentsBody  *****
console.log('contentsbody running..')

/* dependant */
//  HeaderDOM() from header


async function ContentsBodyProps(){
  await HeaderDOM();
  await ContentsProps();
  contentSwitcher();
}


// ***  DOM methods

// ***  drive methods
function contentSwitcher(){
  var dis = $(".headernav li").eq(0);
  $(".headernav li").eq(0).addClass('active');
  reset_contents('.order');
  $(".headernav li").click(function(){
    dis = $(this);
    align(dis);
  });
};

function align(dis){
  var index = dis.index() + 1;
  console.log('ind',index);
  $(".headernav li").removeClass("active");
  dis.delay(100).queue(function() {
    dis.addClass('active').dequeue();
    if (index==1) {
      reset_contents('.order');
    }
    else if (index==2) {
      reset_contents('.recieve');
    }
    else if (index==3) {
      reset_contents('.checking');
    }
    else if (index==4) {
      reset_contents('.status');
    }
  });
}

function reset_contents(cls){
  $(".order").hide();
  $(".recieve").hide();
  $(".checking").hide();
  $(".status").hide();
  $(cls).show();
}
