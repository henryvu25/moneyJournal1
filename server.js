const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

//middleware
app.use(express.json());
app.use(cors()); 

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "client/build")))
}


//ROUTES


//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route (displays accounts)
app.use("/dashboard", require("./routes/dashboard"));

//bills route
app.use("/bills", require("./routes/bills"));

//plans route
app.use("/plans", require("./routes/plans"));


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})