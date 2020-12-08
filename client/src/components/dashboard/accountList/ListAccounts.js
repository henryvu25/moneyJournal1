import React, { useEffect, useState } from 'react'
import EditAccount from "./EditAccount"

const ListAccounts = ({allAccounts, setAccountsChange}) => {
    console.log(allAccounts)
    const [accounts, setAccounts] = useState([]);


    const handleDelete = async (id) => {
        try {
            await fetch(`/dashboard/accounts/${id}`, {
                method: "DELETE",
                headers: {token : localStorage.token} 
            })
            
            setAccounts(accounts.filter(account => account.account_id !==id))
        } catch (err) {
            console.error(err.message)
        }
    }

    //useEffect continues running making multiple requests. when an empty array is in the second parameter, it runs it once until the list is updated
    useEffect(() => {
        setAccounts(allAccounts)
    }, [allAccounts])
    
    
    return (
        <div>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">Account Name</th>
                        <th scope="col">Balance</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                {accounts.length !== 0 && accounts[0].account_id !== null && accounts.map(account => (
                        <tr key={account.account_id}>
                            <td>{account.nickname}</td>
                            <td>{account.balance}</td>
                            <td><EditAccount account={account} setAccountsChange={setAccountsChange}/></td>
                            <td><button onClick={() => handleDelete(account.account_id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                    ))}
                    {/* <tr>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr> */}

                </tbody>
            </table>
        </div>
    )
}

export default ListAccounts
