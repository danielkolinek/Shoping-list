//on load get to local storage and load all the saved items
if (typeof(Storage) !== "undefined") {
  var len=localStorage.length;
  var output = []; //array for keys from local storage
  //if are there some items in storage load, else write example
  if(len>0){
    //First load keys
    for (var i=0, len=localStorage.length; i<len; i++) {
      output.push(localStorage.key(i));
    }
    //sort keys, because of bad sorting in local storage
    output.sort(function(a, b){return a-b});
    //load and display all items in local storage in irder by keys
    for(var i=0, len=localStorage.length; i<len; i++) {
        var key = localStorage.key(i);
        $('ul').append('<li class="item" id=' + output[i] + '>'+ localStorage[output[i]]+'<i class="fa fa-window-close" aria-hidden="true"></i></li>');
    }
  }else{
    $('ul').append('<li class="item">Empty example<i class="fa fa-window-close" aria-hidden="true"></i></li>');
  }
}else{
    alert("I am sorry, but your browser does't support local storage, so this app will not work");
}



//show or hide inputbox
$('.fa-plus-circle').on('click',function(){
  $('input').fadeToggle();
})

//add new Item
$('input').on('keypress', function(e){
  if(e.which === 13){
    var lastItem = document.getElementById("list").lastChild;
    var item = $(this).val();
    //do not insert empty array
    if(item.length > 0){
      //slice item if longer then 20 chars
      if(item.length > 20){
        item = item.slice(0, 20);
        item = item + '...';
      }
      //if no item index have to be 0
      if(localStorage.length > 0){
        var key = parseInt(lastItem.id)+1;
      }else{
        var key = 0;
      }
      $('ul').append('<li class="item" id=' + key + '>'+ item +'<i class="fa fa-window-close" aria-hidden="true"></i></li>');
      localStorage.setItem(key, item);
      $(this).val("");
    }else{
      alert("Please write something");
    }
  }
})

//delete item
$("ul").on("click", ".fa-window-close", function(){
  //delete from storage
  var key = $(this).parent();
  localStorage.removeItem(key.attr("id"));
  //delete from DOM
  $(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
})

//Item done (line-through)
$('ul').on('click', 'li', function(){
  $(this).toggleClass('done');
})
