const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

//get all accounts and name
router.get("/", authorization, async (req, res) => {
    try {
        //req.user has the uuid payload

        const user = await pool.query("SELECT u.first_name, a.account_id, a.nickname, a.balance FROM users AS u LEFT JOIN accounts AS a ON u.user_id = a.user_id WHERE u.user_id = $1", [req.user.id]) 

        res.json(user.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error")
    }
})

//create an account

router.post("/accounts", authorization, async (req, res) => {
    try {
        const response = await pool.query("INSERT INTO accounts (nickname, balance, user_id) values ($1, $2, $3) RETURNING *", [req.body.nickname, req.body.balance, req.user.id])
        res.status(201).json({
            status: "success",
            data: {
                account: response.rows[0]
            }
        })
    } catch (err) {
        console.error(err.message)
    }
})

//update an account

router.put("/accounts/:id", authorization, async (req, res) => {
    try {
        const response = await pool.query("UPDATE accounts SET nickname = $1, balance = $2 WHERE account_id = $3 AND user_id = $4 RETURNING *", [req.body.nickname, req.body.balance, req.params.id, req.user.id])

        if(response.rows.length === 0){
            return res.json("This account does not belong to user.")
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

//delete an account

router.delete("/accounts/:id", authorization, async (req, res) => {
    try {
        const response = await pool.query("DELETE FROM accounts WHERE account_id = $1 AND user_id = $2 RETURNING *", [req.params.id, req.user.id])

        if(response.rows.length ===0){
            return res.json("This account does not belong to user.")
        }

        res.status(200).json("Account was deleted.")
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router;