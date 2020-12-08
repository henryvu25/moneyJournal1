const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors()); 

//ROUTES


//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route (displays accounts)
app.use("/dashboard", require("./routes/dashboard"));

//bills route
app.use("/bills", require("./routes/bills"));

//plans route
app.use("/plans", require("./routes/plans"));




const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})