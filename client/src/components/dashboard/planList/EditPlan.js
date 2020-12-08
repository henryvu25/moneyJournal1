import React, { useState } from 'react'

const EditPlan = ({ plan, setAccountsChange }) => {
    const [nickname, setNickname] = useState(plan.nickname)
    const [goal_amount, setGoalAmount] = useState(plan.goal_amount)
    const [goal_date, setGoalDate] = useState(plan.goal_date)

    const editPlan = async (id) => {
        try {

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            await fetch(`http://localhost:5000/plans/${id}`, {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify({nickname, goal_amount, goal_date})
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
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${plan.plan_id}`} onClick={() => {setNickname(plan.nickname); setGoalAmount(plan.goal_amount); setGoalDate(plan.goal_date)}}>
                Edit
            </button>

            <div className="modal" id={`id${plan.plan_id}`} onClick={() => {setNickname(plan.nickname); setGoalAmount(plan.goal_amount); setGoalDate(plan.goal_date)}}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Plan</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={() => {setNickname(plan.nickname); setGoalAmount(plan.goal_amount); setGoalDate(plan.goal_date)}}>&times;</button>
                        </div>

                        <div className="modal-body">
                            <input type="text" className="form-control" value={nickname} onChange={e => setNickname(e.target.value)}/>

                            <input type="number" className="form-control mt-3" placeholder={goal_amount} onChange={e => setGoalAmount(e.target.value)}/>

                            <input type="date" className="form-control mt-3" value={goal_date} onChange={e => setGoalDate(e.target.value)}/>
                        </div>

                        <div className="modal-footer">
                            <button onClick={() => editPlan(plan.plan_id)} type="button" className="btn btn-warning" data-dismiss="modal">Edit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => {setNickname(plan.nickname); setGoalAmount(plan.goal_amount); setGoalDate(plan.goal_date)}}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPlan
