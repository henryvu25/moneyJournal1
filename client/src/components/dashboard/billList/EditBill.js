import React, { useState } from 'react'

const EditBill = ({ bill, setAccountsChange }) => {
    const [nickname, setNickname] = useState(bill.nickname)
    const [amount_due, setAmountDue] = useState(bill.amount_due)
    const [due_date, setDueDate] = useState(bill.due_date)

    const editBill = async (id) => {
        try {

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            await fetch(`http://localhost:5000/bills/${id}`, {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify({nickname, amount_due, due_date})
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
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${bill.bill_id}`} onClick={() => {setNickname(bill.nickname); setAmountDue(bill.amount_due); setDueDate(bill.due_date)}}>
                Edit
            </button>

            <div className="modal" id={`id${bill.bill_id}`} onClick={() => {setNickname(bill.nickname); setAmountDue(bill.amount_due); setDueDate(bill.due_date)}}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Bill</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={() => {setNickname(bill.nickname); setAmountDue(bill.amount_due); setDueDate(bill.due_date)}}>&times;</button>
                        </div>

                        <div className="modal-body">
                            <input type="text" className="form-control" value={nickname} onChange={e => setNickname(e.target.value)}/>

                            <input type="number" className="form-control mt-3" placeholder={amount_due} onChange={e => setAmountDue(e.target.value)}/>

                            <input type="date" className="form-control mt-3" placeholder={due_date} onChange={e => setDueDate(e.target.value)}/>
                        </div>

                        <div className="modal-footer">
                            <button onClick={() => editBill(bill.bill_id)} type="button" className="btn btn-warning" data-dismiss="modal">Edit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => {setNickname(bill.nickname); setAmountDue(bill.amount_due); setDueDate(bill.due_date)}}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditBill
