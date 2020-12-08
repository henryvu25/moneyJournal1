const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

//get all bills and name
router.get("/", authorization, async (req, res) => {
    try {
        //req.user has the uuid payload

        const user = await pool.query("SELECT u.first_name, b.bill_id, b.nickname, b.amount_due, b.due_date FROM users AS u LEFT JOIN bills AS b ON u.user_id = b.user_id WHERE u.user_id = $1", [req.user.id]) 

        res.json(user.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error")
    }
})

//create a bill

router.post("/", authorization, async (req, res) => {
    try {
        const response = await pool.query("INSERT INTO bills (nickname, amount_due, due_date, user_id) values ($1, $2, $3, $4) RETURNING *", [req.body.nickname, req.body.amount_due, req.body.due_date, req.user.id])
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

//update a bill

router.put("/:id", authorization, async (req, res) => {
    try {
        const response = await pool.query("UPDATE bills SET nickname = $1, amount_due = $2, due_date = $3 WHERE bill_id = $4 AND user_id = $5 RETURNING *", [req.body.nickname, req.body.amount_due, req.body.due_date, req.params.id, req.user.id])

        console.log(req.body)

        if(response.rows.length === 0){
            return res.json("This bill does not belong to user.")
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

//delete a bill

router.delete("/:id", authorization, async (req, res) => {
    try {
        const response = await pool.query("DELETE FROM bills WHERE bill_id = $1 AND user_id = $2 RETURNING *", [req.params.id, req.user.id])

        if(response.rows.length ===0){
            return res.json("This bill does not belong to user.")
        }

        res.status(200).json("Bill was deleted.")
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router;