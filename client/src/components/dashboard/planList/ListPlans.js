import React, { useEffect, useState } from 'react'
import EditPlan from "./EditPlan"

const ListPlans = ({allPlans, setAccountsChange}) => {
    //console.log(allAccounts)
    const [plans, setPlans] = useState([]);


    const handleDelete = async (id) => {
        try {
            await fetch(`/plans/${id}`, {
                method: "DELETE",
                headers: {token : localStorage.token} 
            })
            //console.log(response);
            setPlans(plans.filter(plan => plan.plan_id !==id))
        } catch (err) {
            console.error(err.message)
        }
    }

    //useEffect continues running making multiple requests. when an empty array is in the second parameter, it runs it once until the list is updated
    useEffect(() => {
        setPlans(allPlans)
    }, [allPlans])
    
    
    return (
        <div>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">Plan Name</th>
                        <th scope="col">Goal Amount</th>
                        <th scope="col">Goal Date</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                {plans.length !== 0 && plans[0].plan_id !== null && plans.map(plan => (
                        <tr key={plan.plan_id}>
                            <td>{plan.nickname}</td>
                            <td>{plan.goal_amount}</td>
                            <td>{plan.goal_date.slice(0,10)}</td>
                            <td><EditPlan plan={plan} setAccountsChange={setAccountsChange}/></td>
                            <td><button onClick={() => handleDelete(plan.plan_id)} className="btn btn-danger">Delete</button></td>
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

export default ListPlans
