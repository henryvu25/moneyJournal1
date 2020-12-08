import React, { useState } from 'react'

const InputBills = ({setAccountsChange}) => {
    const [nickname, setNickname] = useState("");
    const [amount_due, setAmountDue] = useState("");
    const [due_date, setDueDate] = useState("");


    const addBill = async e => {
        e.preventDefault();
        try {

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);


            const response = await fetch("http://localhost:5000/bills/", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({nickname, amount_due, due_date})
            })

            const parseResponse = await response.json
            console.log(parseResponse);

            setAccountsChange(true);
            setNickname("");
            setAmountDue("");
            setDueDate("");

            //window.location = '/'
        } catch (err) {
            console.error(err.message)
        }
    }
    
    return (
        <div>
            <h1 className="text-center my-5">My Bills</h1>
            <form className="d-flex container-lg" action="">

                <input className="form-control" type="text" placeholder="Add Bill Name" value={nickname} onChange={e => setNickname(e.target.value)}/>

                <input className="form-control ml-2" type="number" placeholder="Add Amount Due" value={amount_due} onChange={e => setAmountDue(e.target.value)}/>

                <input className="form-control ml-2" type="date" placeholder="Add Due Date" value={due_date} onChange={e => setDueDate(e.target.value)}/>

                <button onClick={addBill} className="btn btn-success ml-2" >Add</button>
            </form>
        </div>
    )
}

export default InputBills
