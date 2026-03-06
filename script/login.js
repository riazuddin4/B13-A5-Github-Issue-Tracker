console.log('Login functionality commign');

document.getElementById("login-btn").addEventListener("click", function(){
    //1 get the username input
    const usernameInput = document.getElementById("input-username");
    const userName = usernameInput.value;
    console.log(userName);
    //2 get the pin input
    const inputPassword= document.getElementById("input-password");
    const pass =inputPassword.value;
    console.log(pass);
    //3 match pin & username
    if(userName == "admin" && pass == "admin123"){
        alert("login Success");
        // window.location.replace("/main.html");
        window.location.assign("/main.html");
    }else{
        alert("login Failes");
        return;
    }


});