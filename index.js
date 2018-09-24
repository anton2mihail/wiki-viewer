var apiEndpoint = "https://en.wikipedia.org/w/api.php";
var bgClasses = ['bg-primary', 'bg-secondary','bg-success','bg-danger', 'bg-warning', 'bg-light', 'bg-dark'];
var randomIdx = 0;
function searchBarAnimation(){
    $("#instructions").toggle();
    $('#search-bar').toggleClass('search-bar-expanded');
    if($("#wiki-search").value !== ""){
        $("#wiki-search").val("");
    }

}
  function search(e){
      if ($("#titleLength0").length > 0) {
          pageCleaner();
      }
        if(e.keyCode == 13){// 13 is the key code for enter key
            var searchTerm = document.getElementById("wiki-search").value;
            apiEndpoint += "?format=json&action=opensearch&search="+searchTerm+"&rvprop=content|user";
            $.ajax({
                url: apiEndpoint,
                dataType: 'jsonp',
                type: 'POST',
                success: function(result){
                    returnCleaner(result);
                }
            });
        }
    }

    function returnCleaner(objText){
        var objs = [];
        for(var i=0; i<objText[1].length; i++){
            var obj = {
                title: objText[1][i],
                content: objText[2][i],
                link : objText[3][i]
            };
            objs.push(obj);
            
        }
       if(objs.length > 0){
           addPageElements(objs);
       } 
    }

    function addPageElements(pageObjects){
        for (var x = 0; x < pageObjects.length; x++) {
            $("body").append("<center><div id='queryContent"+x+"' class='card' style='width: 80%;opacity:0.8;'><div class='card-body'><h5 id='titleLength"+x+"'class='card-title'>" + pageObjects[x].title + "</h5><p class='card-text'>" + pageObjects[x].content + "</p><a href='" + pageObjects[x].link + "' class='btn btn-info'>More Info</a></div></div></center>");
        }
        for(var y=0; y<pageObjects.length; y++){
            randomIdx = Math.floor(Math.random() * (7));
        $("#queryContent"+y).addClass(bgClasses[randomIdx]);
        $("#queryContent"+y).css({
            "transition": "opacity 0.5s",
            "margin-bottom": "5px"
        });
        $("#queryContent"+y).hover(function() {
            $(this).css({
                "opacity": "1"
            });
        },function(){
            $(this).css({
            "opacity": "0.8"
            });
        });

    }
}

function pageCleaner(){
    for(var i=0; i<10; i++){
        $("#queryContent"+i).remove();
    }
   
}