const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo")
const authorization = require("../middleware/authorization");

//registering
router.post("/register", validInfo, async (req, res) => {
    try {
        //1. destructure req.body (name, email, password)
        const {name, email, password} = req.body;

        //2. check if user exists (if exists, throw error)
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email])
        if(user.rows.length !== 0){
            return res.status(401).json("Email already exists")
        }

        //3. bcrypt user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        //4. enter user to db
        const newUser = await pool.query("INSERT INTO users (first_name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword])

        //res.json(newUser.rows[0]); 


        //5. generate jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({token})
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error")
    }
})

//login
router.post("/login", validInfo, async (req, res) => {
    try {
        //1. destructure req.body
        const {email, password} = req.body;

        //2. check if user is in database, throw error if not
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if(user.rows.length === 0){
            return res.status(401).json("Email or Password incorrect")
        }

        //3. match password
        const validPassword = await bcrypt.compare(password, user.rows[0].password); //returns boolean to the variable
        //console.log(validPassword)
        if(!validPassword){
            res.status(401).json("Email or Password incorrect")
        }

        //4. give user jwt token
        const token = jwtGenerator(user.rows[0].user_id)
        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

//verify private pages
router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router
