import React, { useEffect, useState } from 'react'
import EditBill from "./EditBill"

const ListBills = ({allBills, setAccountsChange}) => {
    //console.log(allAccounts)
    const [bills, setBills] = useState([]);


    const handleDelete = async (id) => {
        try {
            await fetch(`/bills/${id}`, {
                method: "DELETE",
                headers: {token : localStorage.token} 
            })
            //console.log(response);
            setBills(bills.filter(bill => bill.bill_id !==id))
        } catch (err) {
            console.error(err.message)
        }
    }

    //useEffect continues running making multiple requests. when an empty array is in the second parameter, it runs it once until the list is updated
    useEffect(() => {
        setBills(allBills)
    }, [allBills])
    
    
    return (
        <div>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">Bill Name</th>
                        <th scope="col">Amount Due</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                {bills.length !== 0 && bills[0].bill_id !== null && bills.map(bill => (
                        <tr key={bill.bill_id}>
                            <td>{bill.nickname}</td>
                            <td>{bill.amount_due}</td>
                            <td>{bill.due_date.slice(0,10)}</td>
                            <td><EditBill bill={bill} setAccountsChange={setAccountsChange}/></td>
                            <td><button onClick={() => handleDelete(bill.bill_id)} className="btn btn-danger">Delete</button></td>
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

export default ListBills
