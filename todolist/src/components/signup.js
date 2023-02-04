import React from 'react'
import {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Signup = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", roll: "", phone: "", password: "" ,confirmpassword:""});
    const handleSubmit = async (e) => {
        let res;
        e.preventDefault();
        const { name, roll,phone,password } = user;
        res = await fetch('/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(
                { name,roll,phone, password }
            )
        })

        // if success, '/home'
        // else, '/'
        const data = await res.json();
        if (res.status === 400 ) {
            alert('Invalid Credentials')
        }
        else {
            alert('Signin Successfull')
            navigate('/');
        }
    }

    const form = document.getElementById("signupsubmit");

    function validate(e) {
        // e.preventDefault();
        console.log("About to call validatesignup function")
        if (validatesignup()) {
            // form.submit()
            handleSubmit(e);
        }
        else {
            e.preventDefault();
        }
    };

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

    function validatesignup() {
        let temp = document.getElementsByClassName("errorf")[0]
        temp.innerHTML = "";
        console.log('validate function is called')
        let flag = true;
        // let pass = document.forms['signupform']["fpass2"].value;
        // let cpass = document.forms['signupform']["fpass3"].value;
        if (user.confirmpassword != user.password) {
            flag = false;
            seterror(0);
        }
        else if (user.password.length < 4) {
            flag = false;
            seterror(1);
        }
        return flag
    }


    return (
        <>
            <div className="container">
                <div className="c1">
                    <h1>Signup to To-do list</h1>
                </div>
                <div className="c2">
                    <form name="signupform" method="post" id="signupsubmit" onSubmit={validate}>
                        <input type="text" className="name" name="fname" placeholder="Name" required
                            value={user.name} onChange={(e) => { setUser({ ...user, name: e.target.value }) }} />
                        <input type="text" className="roll" name="froll" placeholder="Roll Number" required
                            value={user.roll} onChange={(e) => { setUser({ ...user, roll: e.target.value }) }} />
                        <input type="Phone" className="phone" name="fphone2" placeholder="Phone" required
                            value={user.phone} onChange={(e) => { setUser({ ...user, phone: e.target.value }) }} />
                        <input type="password" className="pass" name="fpass2" placeholder="Password" required
                            value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                        <input type="password" className="pass" name="fpass3" placeholder="Confirm password" required 
                         value={user.confirmpassword} onChange={(e) => { setUser({ ...user, confirmpassword: e.target.value }) }}/>
                        <input type="submit" className="submit" name="fsubmit2" value="Sign Up" />
                    </form>
                    <div className="errorf"></div>
                </div>
            </div>
        </>

    )
}

export default Signup
