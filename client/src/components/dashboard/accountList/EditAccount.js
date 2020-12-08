import React, { useState } from 'react'

const EditAccounts = ({ account, setAccountsChange }) => {
    const [nickname, setNickname] = useState(account.nickname)
    const [balance, setBalance] = useState(account.balance)

    const editAccount = async (id) => {
        try {

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            await fetch(`http://localhost:5000/dashboard/accounts/${id}`, {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify({nickname, balance})
            })

            setAccountsChange(true);
            //console.log(response);
            //window.location = '/'
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div>
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${account.account_id}`} onClick={() => {setNickname(account.nickname); setBalance(account.balance)}}>
                Edit
            </button>

            <div className="modal" id={`id${account.account_id}`} onClick={() => {setNickname(account.nickname); setBalance(account.balance)}}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Account</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={() => {setNickname(account.nickname); setBalance(account.balance)}}>&times;</button>
                        </div>

                        <div className="modal-body">
                            <input type="text" className="form-control" value={nickname} onChange={e => setNickname(e.target.value)}/>

                            <input type="number" className="form-control mt-3" placeholder={balance} onChange={e => setBalance(e.target.value)}/>
                        </div>

                        <div className="modal-footer">
                            <button onClick={() => editAccount(account.account_id)} type="button" className="btn btn-warning" data-dismiss="modal">Edit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => {setNickname(account.nickname); setBalance(account.balance)}}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditAccounts
