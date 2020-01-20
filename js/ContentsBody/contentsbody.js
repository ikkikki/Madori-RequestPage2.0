// *****  ContentsBody  *****
console.log('contentsbody running..')

/* dependant */
//  HeaderDOM() from header


async function ContentsBodyDOM(){
  await HeaderDOM();
  await ContentsDOM();
  contentSwitcher();
}


// ***  DOM methods

// ***  drive methods
function contentSwitcher(){
  var dis = $(".headernav li").eq(0);
  $(".headernav li").eq(2).addClass('active');
  $(".recieve").addClass('active');
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
      reset_contents('.status');
    }
    if (index==2) {
      reset_contents('.order');
    }
    else if (index==3) {
      reset_contents('.recieve');
    }
    else if (index==3) {
      reset_contents('.checking');
    }
  });
}

function reset_contents(cls){
  $(".status").hide();
  $(".order").hide();
  $(".recieve").hide();
  $(".checking").hide();
  $(cls).show();
}
