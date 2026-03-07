const passcode = document.getElementById("passcode");
// console.log(passcode)
const userName =document.getElementById("user");
console.log(userName);
 function login()
 {  
    let passValue = passcode.value;
    let userValue = userName.value;
    console.log(userValue ,passValue);
    if(userValue=="admin" && passValue=="admin123")
    {
        window.location.href="mainpage.html";
    }
    else{
        alert("Wrong Credential");
    }
    return false;
 }