
const form  = document.getElementById("signupsubmit");

form.addEventListener('submit', function(e) {

    console.log("About to call validatesignup function")
    if( validatesignup()){
        form.submit()
    }
    else{
        e.preventDefault();
    }
}
);

function seterror(f) {
    let temp = document.getElementsByClassName("errorf")[0]

    temp.style.color = "red";
    if (f == 0) {
        temp.innerHTML = "*Passwords do not match!";
    }
    if (f == 1) {
        temp.innerHTML = "*Password is too short!";
    }
}

function validatesignup(){
    let temp = document.getElementsByClassName("errorf")[0]
    temp.innerHTML = "";
    console.log('validate function is called')
    let flag = true;
    let pass = document.forms['signupform']["fpass2"].value;
    let cpass = document.forms['signupform']["fpass3"].value;
    if (pass != cpass) {
        flag = false;
        seterror(0);
    }
    else if (pass.length < 4) {
        flag = false;
        seterror(1);
    }
    return flag
}
