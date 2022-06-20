

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

  // createBoard();
 
   
}); 

window.addEventListener('load', () => {
 
    const username = sessionStorage.getItem('USERNAME');
    const password = sessionStorage.getItem('PASSWORD');
    
    
    //document.getElementById('result-name').innerHTML = username;
   // document.getElementById('result-surname').innerHTML = surname;

  // alert("username and password: " + username + password);  
   
})

//onclick event for create board
const createForm = document.getElementById("board-form");
const createButton = document.getElementById("board-form-create");
createButton.addEventListener("click", (e) => {
    e.preventDefault();
    const boardTitle = createForm.name.value;
    
    var userId = "b418ea3f-4835-4a87-be14-1c99dc3b291f";
    var boardName = "boarddd";

    boardName  = document.getElementById("createboardinput").value;





   // if (boardTitle === "") {
    //    location.reload();
        createBoard(boardName, userId);
    // } else {
    //     alert("Please enter a board name " + boardTitle);
    //     location.reload();
    // }
})


function getBoards(){
       //on click for <a> element
       $.getJSON( "http://localhost:5288/TaskManagement/get-boards-with-user-id/b418ea3f-4835-4a87-be14-1c99dc3b291f", function( data ) {/*Şimdilik new jsonla deneme yaptım. Çekerken new json yazan yere yukarıdaki urlyi yapıştırıcaz. */
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


function createBoard(boardName, userId){  //burda board ları gösterme değil de create etme yapcaz. parametre olarak boardname ve ownerıd al, local storage
    //on click for <a> element
    var url = "http://localhost:5288/TaskManagement/create-board/"+boardName+"/"+userId;
    
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



/* $.getJSON( "http://localhost:5288/TaskManagement", function( data ) {
        var items = [];
        $.each( data, function() {
    
            console.log(data.name);
        });
       
      });*/