const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

//get all plans and name
router.get("/", authorization, async (req, res) => {
    try {
        //req.user has the uuid payload

        const user = await pool.query("SELECT u.first_name, p.plan_id, p.nickname, p.goal_amount, p.goal_date FROM users AS u LEFT JOIN plans AS p ON u.user_id = p.user_id WHERE u.user_id = $1", [req.user.id]) 

        res.json(user.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error")
    }
})

//create a plan

router.post("/", authorization, async (req, res) => {
    try {
        const response = await pool.query("INSERT INTO plans (nickname, goal_amount, goal_date, user_id) values ($1, $2, $3, $4) RETURNING *", [req.body.nickname, req.body.goal_amount, req.body.goal_date, req.user.id])
        res.status(201).json({
            status: "success",
            data: {
                bill: response.rows[0]
            }
        })
    } catch (err) {
        console.error(err.message)
    }
})

//update a plan

router.put("/:id", authorization, async (req, res) => {
    try {
        const response = await pool.query("UPDATE plans SET nickname = $1, goal_amount = $2, goal_date = $3 WHERE plan_id = $4 AND user_id = $5 RETURNING *", [req.body.nickname, req.body.goal_amount, req.body.goal_date, req.params.id, req.user.id])


        if(response.rows.length === 0){
            return res.json("This plan does not belong to user.")
        }

        res.status(200).json({
            status: "success",
            data: {
                todo: response.rows[0]
            }
        })

        

    } catch (err) {
        console.error(err.message)
    }
})

//delete a plan

router.delete("/:id", authorization, async (req, res) => {
    try {
        const response = await pool.query("DELETE FROM plans WHERE plan_id = $1 AND user_id = $2 RETURNING *", [req.params.id, req.user.id])

        if(response.rows.length ===0){
            return res.json("This plan does not belong to user.")
        }

        res.status(200).json("Plan was deleted.")
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router;