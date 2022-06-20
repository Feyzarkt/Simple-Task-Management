
$(document).ready(function () {


   // createBoard();
   const createButton = document.getElementById("createcardbutton");
   //create card button onclick 
    createButton.addEventListener("click", (e) => {
        console.log("geldi mi buraya");
        e.preventDefault();
        
        var cardName = document.getElementById("title").value;
        console.log("nolur nolmaz." + cardName);
        var description = document.getElementById("desc").value;
        var deadline = document.getElementById("deadline").value;
        var boardId = "4a79f69b-5982-402c-bc12-6efd87fd99a4";
        createCard(cardName, description, deadline, boardId);
    



    // if (boardTitle === "") {
        //    location.reload();
        // createBoard(boardName, userId);
        // } else {
        //     alert("Please enter a board name " + boardTitle);
        //     location.reload();
        // }
    })
    
 }); 



function createCard(cardName, description, deadline, boardId){  //burda board ları gösterme değil de create etme yapcaz. parametre olarak boardname ve ownerıd al, local storage
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
