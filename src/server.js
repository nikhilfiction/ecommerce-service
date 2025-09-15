const express = require("express")

const app= express()

app.get("/", (req, res) => {
    res.send("E-commerce service backend is running....")
})
app.listen(3000, ()=> {
    console.log("Server listening to port 3000.");
}) 