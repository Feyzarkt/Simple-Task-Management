

var element = document.getElementById("cardsid");

var carddiv;
var cardnode;
var cardbody;
var cardtitle;
var carddesc;
var deletebutton;
$(document).ready(function () {
    /*VERİLERİ GETİRME */
    getCardsFromTitle();
}); 

function getCardsFromTitle(){
   console.log("document is ready!");
    //on click for <a> element
    $.getJSON( "http://localhost:5288/TaskManagement/search-card/Deneme", function( data ) {/*Şimdilik new jsonla deneme yaptım. Çekerken new json yazan yere yukarıdaki urlyi yapıştırıcaz. */
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
            
            seebutton = document.createElement("button");
            seebutton.className = "button buttonim";
            seenode = document.createTextNode("See Card");
            seebutton.appendChild(seenode);

            console.log("veriler geldi mi:");
            console.log(data[key]);
            
            if(data[key].name){
                cardtitlenode = document.createTextNode(data[key].name);
                cardtitle.appendChild(cardtitlenode);
            }
            element.appendChild(carddiv);
            
            carddiv.appendChild(cardbody);
            
            cardbody.appendChild(cardtitle);
            cardbody.appendChild(carddesc);
            cardbody.appendChild(seebutton);


        });
       
      });
    }

    function getCardsFromDate(){
        console.log("document is ready!");
         //on click for <a> element
         $.getJSON( "http://localhost:5288/TaskManagement/search-card/Deneme", function( data ) {/*Şimdilik new jsonla deneme yaptım. Çekerken new json yazan yere yukarıdaki urlyi yapıştırıcaz. */
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
                 
                 seebutton = document.createElement("button");
                 seebutton.className = "button buttonim";
                 seenode = document.createTextNode("See Card");
                 seebutton.appendChild(seenode);
     
                 console.log("veriler geldi mi:");
                 console.log(data[key]);
                 
                 if(data[key].name){
                     cardtitlenode = document.createTextNode(data[key].name);
                     cardtitle.appendChild(cardtitlenode);
                 }
                 element.appendChild(carddiv);
                 
                 carddiv.appendChild(cardbody);
                 
                 cardbody.appendChild(cardtitle);
                 cardbody.appendChild(carddesc);
                 cardbody.appendChild(seebutton);
     
     
             });
            
           });
         }
   
 

