

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



   console.log("document is ready!");
   getBoards();
 
   
}); 

window.addEventListener('load', () => {
 
    const username = sessionStorage.getItem('USERNAME');
    const password = sessionStorage.getItem('PASSWORD');
    
    
    //document.getElementById('result-name').innerHTML = username;
   // document.getElementById('result-surname').innerHTML = surname;
   alert("username and password: " + username + password);
   
})


function getBoards(){
       //on click for <a> element
       $.getJSON( "http://localhost:5288/TaskManagement/get-boards-with-user-id/b418ea3f-4835-4a87-be14-1c99dc3b291e", function( data ) {/*Şimdilik new jsonla deneme yaptım. Çekerken new json yazan yere yukarıdaki urlyi yapıştırıcaz. */
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
           seenode = document.createTextNode("See Board");
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


function createBoard(){
    //on click for <a> element
    $.getJSON( "http://localhost:5288/TaskManagement/get-boards-with-user-id/b418ea3f-4835-4a87-be14-1c99dc3b291e", function( data ) {/*Şimdilik new jsonla deneme yaptım. Çekerken new json yazan yere yukarıdaki urlyi yapıştırıcaz. */
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
        seenode = document.createTextNode("See Board");
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



/* $.getJSON( "http://localhost:5288/TaskManagement", function( data ) {
        var items = [];
        $.each( data, function() {
    
            console.log(data.name);
        });
       
      });*/