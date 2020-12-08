import React, {useState, useEffect} from 'react'
import {toast} from "react-toastify"
//components
import InputBill from "./InputBill"
import ListBills from "./ListBills"

import {Link} from "react-router-dom"


const Bills = ({setAuth}) => {
    const [name, setName] = useState("");
    const [allBills, setAllBills] = useState([]);
    const [accountsChange, setAccountsChange] = useState(false)
    
    const getName = async () => {
        try {
            const response = await fetch("/bills/", {
                method: "GET",
                headers: {token : localStorage.token}
            });
            const parseRes = await response.json();
            //console.log(parseRes);

            setAllBills(parseRes);

            setName(parseRes[0].first_name);

        } catch (err) {
            console.error(err.message)
        }
    }
    
    useEffect(() => {
        getName();
        setAccountsChange(false)
    },[accountsChange])

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
        toast.success("Logged out successfully!")
    }

    return (
        <div>
            <div className="d-flex mt-5 justify-content-around">
                <h2>Hi, {name}</h2>
                <Link to="/dashboard" className="btn btn-primary btn-lg">Accounts</Link>
                <Link to="/bills" className="btn btn-primary btn-lg">Bills</Link>
                <Link to="/plans" className="btn btn-primary btn-lg">Plans</Link>
                <button onClick={e => logout(e)} className="btn btn-warning">Logout</button>
            </div>

            <InputBill setAccountsChange={setAccountsChange}/>
            <ListBills allBills={allBills} setAccountsChange={setAccountsChange}/>
        </div>
    )
}

export default Bills
