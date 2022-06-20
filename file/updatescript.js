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
         var cardId = "bc2296e8-8fe0-491c-a7f5-552eda64b4ea";
         updateCard(cardName, description, deadline, cardId);
     
 
 
 
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
     $.getJSON( "http://localhost:5288/TaskManagement/get-cards-with-board-id/4a79f69b-5982-402c-bc12-6efd87fd99a4", function( data ) {/*Şimdilik new jsonla deneme yaptım. Çekerken new json yazan yere yukarıdaki urlyi yapıştırıcaz. */
         $.each( data, function(key, value) {
                 console.log("veriler geliyormu");
                 console.log(data[key]);


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
               






 
         });
        
       });
     }


function updateCard(cardName, description, deadline, cardId){  //burda board ları gösterme değil de create etme yapcaz. parametre olarak boardname ve ownerıd al, local storage
    //on click for <a> element
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
