

var element = document.getElementById("cardsid");

var carddiv;
var cardnode;
var cardbody;
var cardtitle;
var carddesc;
var deletebutton;
var deletenode;
var updatebutton;
var updatenode;
$(document).ready(function () {

    $.ajax({
        url: '/script.cgi',
        type: 'DELETE',
        success: function(result) {
            // Do something with the result
        }
    });

  
/*VERİLERİ GETİRME */
   console.log("document is ready!");
    //on click for <a> element
    $.getJSON( "http://localhost:5288/TaskManagement/get-cards-with-board-id/4a79f69b-5982-402c-bc12-6efd87fd99a4", function( data ) {/*Şimdilik new jsonla deneme yaptım. Çekerken new json yazan yere yukarıdaki urlyi yapıştırıcaz. */
        $.each( data, function(key, value) {
                console.log("veriler geliyormu");
                console.log(data[key]);
            carddiv = document.createElement("div");
            carddiv.className = "card";
            
            cardbody = document.createElement("div");
            cardbody.className = "card-body";
            
            cardtitle = document.createElement("div");
            cardtitle.className = "card-title";
            
            carddesc = document.createElement("div");
            carddesc.className = "card-desc";
            
            deletebutton = document.createElement("button");
            deletebutton.className = "button buttonim";
            deletenode = document.createTextNode("Delete");
            deletebutton.appendChild(deletenode);
            
            updatebutton = document.createElement("button");
            updatebutton.className = "button buttonim";
            updatenode = document.createTextNode("Update");
            updatebutton.appendChild(updatenode);
            console.log("veriler geldi mi:");
            console.log(data[key]);
            
            if(data[key].title){
                cardtitlenode = document.createTextNode(data[key].title);
                cardtitle.appendChild(cardtitlenode);
            }
            if(data[key].description){
                carddescnode = document.createTextNode(data[key].description);
                carddesc.appendChild(carddescnode);
            }

            element.appendChild(carddiv);
            
            carddiv.appendChild(cardbody);
            
            cardbody.appendChild(cardtitle);
            cardbody.appendChild(carddesc);
            cardbody.appendChild(deletebutton);
            cardbody.appendChild(updatebutton);


        });
       
      });
   
}); 
























/* $.getJSON( "http://localhost:5288/TaskManagement", function( data ) {
        var items = [];
        $.each( data, function() {
    
            console.log(data.name);
        });
       
      });*/