import React, {useState, useEffect} from 'react'
import {toast} from "react-toastify"
//components
import InputAccount from "./accountList/InputAccount"
import ListAccounts from "./accountList/ListAccounts"
import {Link} from "react-router-dom"



const Dashboard = ({setAuth}) => {
    const [name, setName] = useState("");
    const [allAccounts, setAllAccounts] = useState([]);
    const [accountsChange, setAccountsChange] = useState(false)
    
    const getName = async () => {
        try {
            const response = await fetch("/dashboard/", {
                method: "GET",
                headers: {token : localStorage.token}
            });
            const parseRes = await response.json();
            //console.log(parseRes);

            setAllAccounts(parseRes);

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
            
            <InputAccount setAccountsChange={setAccountsChange}/>
            <ListAccounts allAccounts={allAccounts} setAccountsChange={setAccountsChange}/>
        </div>
    )
}

export default Dashboard
