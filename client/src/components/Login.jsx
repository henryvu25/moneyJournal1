import React, { useState } from 'react'
import {Link} from "react-router-dom"
import {toast} from "react-toastify"

const Login = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const {email, password} = inputs; //destructure the input state so there is a const email = "" and const password = ""

    const onChange = e => {
        setInputs({...inputs, [e.target.name] : e.target.value});
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {

            const body = {email, password}
            const response = await fetch("/auth/login",{
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();
            //console.log(parseRes); 

            if(parseRes.token){
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Logged in successfully!")
            }else{
                setAuth(false)
                toast.error(parseRes)
            }

            

        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div>
            <h1 className="text-center my-5" >Login</h1>
            <form onSubmit={onSubmitForm}>
                <input className="form-control my-2" type="email" name="email" placeholder="email" value={email} onChange={e => onChange(e)}/>
                <input className="form-control my-2" type="password" name="password" placeholder="password" value={password} onChange={e => onChange(e)}/>
                <button className="btn btn-success btn-block">Login</button>
            </form>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default Login
