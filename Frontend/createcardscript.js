
$(document).ready(function () {


   // createBoard();
   const createButton = document.getElementById("createcardbutton");
   //create card button onclick 
    createButton.addEventListener("click", (e) => {
        e.preventDefault();
        
        var cardName = document.getElementById("title").value;
        var description = document.getElementById("desc").value;
        var deadline = document.getElementById("deadline").value;
        var boardId = sessionStorage.getItem("boardId");

        createCard(cardName, description, deadline, boardId);
        window.location.href = "cards.html";
    })
    
 }); 



function createCard(cardName, description, deadline, boardId){  
    //on click for <a> element
    var url = "http://localhost:5288/TaskManagement/create-card-without-id/"+cardName+"/"+description+"/"+deadline+"/"+boardId;
    
    fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res => {
        if (res.ok) { console.log("HTTP request successful") }
        else { console.log("HTTP request unsuccessful") }
        return res
    })
   
    
}
