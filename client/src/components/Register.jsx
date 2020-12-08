import React, { useState } from 'react'
import {Link} from "react-router-dom"
import {toast} from "react-toastify"

const Register = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    })

    const {name, email, password} = inputs;

    const onChange = e => {
        setInputs({...inputs, [e.target.name] : e.target.value});
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {name, email, password}
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json()

            //console.log(parseRes);

            if(parseRes.token){
                localStorage.setItem("token", parseRes.token)
                setAuth(true);
                toast.success("Registration successful!")
            } else {
                setAuth(false)
                toast.error(parseRes)
            }

            
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div>
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input className="form-control my-2" type="text" name="name" placeholder="name" value={name} onChange={e => onChange(e)}/>
                <input className="form-control my-2" type="email" name="email" placeholder="email" value={email} onChange={e => onChange(e)}/>
                <input className="form-control my-2" type="password" name="password" placeholder="password" value={password} onChange={e => onChange(e)}/>
                <button className="btn btn-success btn-block">Register</button>
            </form>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Register