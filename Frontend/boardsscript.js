

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
var seebutton;

$(document).ready(function () {

   console.log("document is ready!");

   var userId = sessionStorage.getItem("userid")
   console.log(userId);
   getBoards(userId);
   
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
    
    var userId = "b418ea3f-4835-4a87-be14-1c99dc3b291e";
    var boardName = "boarddd";

    boardName  = document.getElementById("createboardinput").value;
    createBoard(boardName, userId);

})
function getBoards(userId){
    //on click for <a> element
    $.getJSON( "http://localhost:5288/TaskManagement/get-boards-with-user-id/"+userId, function( data ) {/*Şimdilik new jsonla deneme yaptım. Çekerken new json yazan yere yukarıdaki urlyi yapıştırıcaz. */
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
    seebutton.id = data[key].boardId;
    seenode = document.createTextNode("See Board");
    seebutton.appendChild(seenode);
    seebutton.setAttribute('onclick','seeBoard(this.id);');
    console.log(data[key].boardId);
    var guid=  '<%=Request.QueryString[data[key].boardId]%>';

    //Sümeyra
    deletebutton = document.createElement("button");
    deletebutton.className = "button buttonim";
    deletebutton.id = data[key].boardId;
    deletenode = document.createTextNode("Delete Board");
    deletebutton.appendChild(deletenode);
    deletebutton.setAttribute('onclick','deleteBoard(this.id);');

    console.log("meslea");
    console.log(data[key].boardId);
        //seebutton.setAttribute('data-sku', data[key].boardId); // Feyza
        
    
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
    cardbody.appendChild(deletebutton);
    
    });
    });
}


function getBoardsForCards(){
    //on click for <a> element
    $.getJSON( "http://localhost:5288/TaskManagement/get-boards-with-user-id/b418ea3f-4835-4a87-be14-1c99dc3b291e", function( data ) {/*Şimdilik new jsonla deneme yaptım. Çekerken new json yazan yere yukarıdaki urlyi yapıştırıcaz. */
    $.each( data, function(key, value) {
    console.log("veriler geliyormu");
    
    
    seebutton.setAttribute('data-sku', data[key].boardId); // Feyza
        
    deletebutton.setAttribute('data-sku', data[key].boardId); // Sümeyra    
    
    console.log("veriler geldi mi:");
    console.log(data[key]);
    if(data[key].name){
    cardtitlenode = document.createTextNode(data[key].name);
    cardtitle.appendChild(cardtitlenode);
    }
    
    });
    });
}
    

//Feyza-bunu seeboard butonunun on click ine vericez board id yi storage a atıyor olucaz cards sayfasında çekicez
function seeBoard(id){
    var boardId = id;
    console.log("see boadr");
    console.log(boardId);
    sessionStorage.setItem("boardId", boardId);
    window.location.href="cards.html";
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

function deleteBoard(id){
    console.log("delete içine girdim");
    //for deleting boards, first we should delete board's cards then delete board 
    fetch('http://localhost:5288/TaskManagement/delete-card-with-board-id/'+id, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res => {
        if (res.ok) { console.log("HTTP request successful, deleteCardForBoard") }
        else { console.log("HTTP request unsuccessful") }
        return res
    })
     
    //second step, delete board 
    fetch('http://localhost:5288/TaskManagement/delete-board/'+id, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res => {
        if (res.ok) { console.log("HTTP request successful, deleteBoard"); window.location.reload();}
        else { console.log("HTTP request unsuccessful") }
        return res
    })
    //window.location.reload();
}
