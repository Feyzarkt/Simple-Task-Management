const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "user" && password === "web_dev") {
        alert("You have successfully logged in.");
     //   location.reload();
        window.location.href='boards.html';
    } else {
        location.reload();
        loginErrorMsg.style.opacity = 1;
    }
})

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