const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

$(document).ready(function () {

    console.log("document is ready!");
 
}); 

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    login(username, password)
})

function login(username, password){
    //on click for <a> element
    console.log("ilk veriler geliyormu");
    $.getJSON( 'http://localhost:5288/TaskManagement/login/'+username+"/"+password, function( data ) {
        if(data != null){
            console.log(data["userId"]);
            alert("You have successfully logged in.");
            sessionStorage.setItem("userid", data["userId"])
            window.location.href='boards.html';
        }else alert("Username or password are wrong.");
    });
   
}
function handleSubmit () {
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    // to set into local storage
    /* localStorage.setItem("NAME", name);
    localStorage.setItem("SURNAME", surname); */
    
    sessionStorage.setItem("USERNAME", username);
    sessionStorage.setItem("PASSWORD", password);

    return;
}