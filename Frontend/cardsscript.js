

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
    /*VERİLERİ GETİRME */
    getCards();
}); 


function getCards(){
    console.log("document is ready!");
     //on click for <a> element
     const boardId= sessionStorage.getItem("boardId"); 

     console.log("getcards00");
     console.log(boardId);
     $.getJSON( "http://localhost:5288/TaskManagement/get-cards-with-board-id/"+boardId, function( data ) {/*Şimdilik new jsonla deneme yaptım. Çekerken new json yazan yere yukarıdaki urlyi yapıştırıcaz. */
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
             deletebutton.id = data[key].cardId;
             deletebutton.setAttribute('onclick','deleteCard(this.id);');
             
             updatebutton = document.createElement("button");
             updatebutton.className = "button buttonim";
             updatenode = document.createTextNode("Update");
             updatebutton.appendChild(updatenode);
             updatebutton.id = data[key].cardId;
             updatebutton.setAttribute('onclick','updateCardButton(this.id);');
             
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
     }

function deleteCard(id){
    console.log("delete içine girdim");
    fetch('http://localhost:5288/TaskManagement/delete-card/'+id, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res => {
        if (res.ok) { console.log("HTTP request successful") }
        else { console.log("HTTP request unsuccessful") }
        return res
    })
     window.location.reload();
}



function updateCardButton(id){
    var cardId = id;
    console.log("see boadr");
    console.log(cardId);
    sessionStorage.setItem("cardId", cardId);
    window.location.href="updatecard.html";
    }







/* $.getJSON( "http://localhost:5288/TaskManagement", function( data ) {
        var items = [];
        $.each( data, function() {
    
            console.log(data.name);
        });
       
      });*/