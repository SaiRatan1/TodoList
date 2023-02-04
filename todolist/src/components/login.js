
import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import CredContext from '../context/Credentials/credContext'

const Login = () => {
    const credentials = useContext(CredContext);


    console.log('Login component is reloading')
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", password: "" });

    const handleSubmit = async (e) => {  //Checking for a valid user credentials
        let res;
        e.preventDefault();
        if (!user.name || !user.password) {
            alert('Invalid Credentials');
        }
        else {
            const { name, password } = user;
            res = await fetch('/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    { name, password }
                )
            })
        }

        // if success, '/home'
        // else, '/'
        const data = await res.json();
        if (res.status === 400 || !data) {
            console.log('here')
            alert('Invalid Credentials')
        }
        else {
            console.log(user.name, "this is from function")
            credentials.setUser(user.name);
            navigate('/home');
        }
    }


    return (
        <>
            <div className="container">
                <div className="c1">
                    <h1>To-do List</h1>
                </div>

                <div className="c2">
                    <form onSubmit={handleSubmit} method="POST">
                        <input type="text" name="fphone" placeholder="Name" className="phone" value={user.name} onChange={(e) => { setUser({ ...user, name: e.target.value }) }} /><br />
                        <input type="password" name="fpass" placeholder="Password" className="pass" value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} /><br />
                        <input type="submit" name="fsubmit" className="submit" value="Login" />
                    </form>
                    <p className="forgot">
                        <Link to="/forgot" >Forgot password?</Link>
                    </p>
                    <hr />
                    <Link to="/signup">
                        <button className="but" type="submit">Create a new account</button>
                    </Link>
                </div>
                <div name="invalidname" className="invalid" >
                </div>

            </div>
        </>
    )
}

export default Login

