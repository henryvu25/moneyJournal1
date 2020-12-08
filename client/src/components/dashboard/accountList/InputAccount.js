import React, { useState } from 'react'

const InputAccounts = ({setAccountsChange}) => {
    const [nickname, setNickname] = useState("");
    const [balance, setBalance] = useState("");


    const addAccount = async e => {
        e.preventDefault();
        try {

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);


            await fetch("/dashboard/accounts", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({nickname, balance})
            })

            //const parseResponse = await response.json
            //console.log(parseResponse);

            setAccountsChange(true);
            setNickname("");
            setBalance("");

            //window.location = '/'
        } catch (err) {
            console.error(err.message)
        }
    }
    
    return (
        <div>
            <h1 className="text-center my-5">My Accounts</h1>
            <form className="d-flex container-lg" action="">

                <input className="form-control" type="text" placeholder="Add Account Name" value={nickname} onChange={e => setNickname(e.target.value)}/>

                <input className="form-control ml-2" type="number" placeholder="Add Balance" value={balance} onChange={e => setBalance(e.target.value)}/>

                <button onClick={addAccount} className="btn btn-success ml-2" >Add</button>
            </form>
        </div>
    )
}

export default InputAccounts
