$(document).ready(function () {


    // createBoard();
    const updateButton = document.getElementById("updatecardbutton");
    //create card button onclick 
    updateButton.addEventListener("click", (e) => {
         console.log("geldi mi buraya");
         e.preventDefault();
         
         var cardName = document.getElementById("updatetitle").value;
         console.log("nolur nolmaz." + cardName);
         var description = document.getElementById("updatedesc").value;
         var deadline = document.getElementById("updatedeadline").value;
         updateCard(cardName, description, deadline);
     
 
 
 
     // if (boardTitle === "") {
         //    location.reload();
         // createBoard(boardName, userId);
         // } else {
         //     alert("Please enter a board name " + boardTitle);
         //     location.reload();
         // }
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
                    var updatetitle = document.getElementById("updatetitle");
                    console.log(data[key].title);
                    updatetitle.placeholder = data[key].title;

                 }

                 if(data[key].description){
                    var updatedescription = document.getElementById("updatedesc");
                    console.log(data[key].description);
                    updatedescription.placeholder = data[key].description;

                }

                if(data[key].deadline){
                    var updatedeadline = document.getElementById("updatedeadline");
                    console.log(data[key].deadline);
                    updatedeadline.placeholder = data[key].deadline;

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
