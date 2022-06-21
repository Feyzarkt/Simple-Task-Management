var updatetitle;
var updatedescription;
var updatedeadline;



$(document).ready(function () {

    const updateButton = document.getElementById("updatecardbutton");

    updateButton.addEventListener("click", (e) => {
         e.preventDefault();
         
         var cardName = document.getElementById("updatetitle").value;
         var description = document.getElementById("updatedesc").value;
         var deadline = document.getElementById("updatedeadline").value;
         updateCard(cardName, description, deadline);
         updatetitle.value="";
         updatedescription.value="";
         updatedeadline.value="";
         alert(cardName+" is updated!");
         window.location.href = "cards.html";
         
     })
     getCards();
  }); 

  function getCards(){
    console.log("document is ready!");
     //on click for <a> element
     const cardId= sessionStorage.getItem("cardId"); 
     const boardId = sessionStorage.getItem("boardId");
     $.getJSON( "http://localhost:5288/TaskManagement/get-cards-with-board-id/"+boardId, function( data ) {/*Şimdilik new jsonla deneme yaptım. Çekerken new json yazan yere yukarıdaki urlyi yapıştırıcaz. */
         $.each( data, function(key, value) {
                 console.log("veriler geliyormu");
                 console.log(data[key]);

                    if(data[key].cardId == cardId){
                 if(data[key].title){
                    updatetitle = document.getElementById("updatetitle");
                    console.log(data[key].title);
                    updatetitle.value = data[key].title;

                 }

                 if(data[key].description){
                    updatedescription = document.getElementById("updatedesc");
                    console.log(data[key].description);
                    updatedescription.value = data[key].description;

                }

                if(data[key].deadline){
                    updatedeadline = document.getElementById("updatedeadline");
                    console.log(data[key].deadline);
                    updatedeadline.value = data[key].deadline;

                }
               }
 
         });
        
       });
     }


function updateCard(cardName, description, deadline){  //burda board ları gösterme değil de create etme yapcaz. parametre olarak boardname ve ownerıd al, local storage
    //on click for <a> element
    const cardId= sessionStorage.getItem("cardId"); 

    var url = "http://localhost:5288/TaskManagement/update-card-with-parameters/"+cardName+"/"+description+"/"+deadline+"/"+cardId;
    
    fetch(url, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res => {
        if (res.ok) { console.log("HTTP request successful") }
        else { console.log("HTTP request unsuccessful") }
        return res
    })
    
}