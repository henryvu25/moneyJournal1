import React, { useState } from 'react'

const InputPlans = ({setAccountsChange}) => {
    const [nickname, setNickname] = useState("");
    const [goal_amount, setGoalAmount] = useState("");
    const [goal_date, setGoalDate] = useState("");


    const addPlan = async e => {
        e.preventDefault();
        try {

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);


            const response = await fetch("/plans/", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({nickname, goal_amount, goal_date})
            })

            const parseResponse = await response.json
            console.log(parseResponse);

            setAccountsChange(true);
            setNickname("");
            setGoalAmount("");
            setGoalDate("");

            //window.location = '/'
        } catch (err) {
            console.error(err.message)
        }
    }
    
    return (
        <div>
            <h1 className="text-center my-5">My Plans</h1>
            <form className="d-flex container-lg" action="">

                <input className="form-control" type="text" placeholder="Add Plan Name" value={nickname} onChange={e => setNickname(e.target.value)}/>

                <input className="form-control ml-2" type="number" placeholder="Add Goal Amount" value={goal_amount} onChange={e => setGoalAmount(e.target.value)}/>

                <input className="form-control ml-2" type="date" placeholder="Add Goal Date" value={goal_date} onChange={e => setGoalDate(e.target.value)}/>

                <button onClick={addPlan} className="btn btn-success ml-2" >Add</button>
            </form>
        </div>
    )
}

export default InputPlans
