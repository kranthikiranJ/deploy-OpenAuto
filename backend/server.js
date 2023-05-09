const express = require("express");
const mongoose = require("mongoose");
const Registeruser = require("./models");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://0.0.0.0:27017/openauto")
  .then(() => console.log("DB Connection establised"))
  .catch((err) => console.log("error"));

app.use(express.json());
app.use(cors({ origin: "*" }));

app.listen(PORT, () => {
  console.log(`Listening at : ${PORT}`);
});

app.post("/register", async (req, res) => {
  try {
    const { name, email } = req.body;
    let newUser = new Registeruser({
      name,
      email,
    });
    await newUser.save();
    res.status(200).send("Registered Successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

// app.post("/register",(request,response) =>{
//     const {userName,userMail} = request.body;

//     db.query(`INSERT INTO students (name,mail) VALUES ('${userName}','${userMail}')`,(error,result) =>{
//         if(!error){
//            response.send(result.rows);
//         }
//         else{
//             console.log(error);

//         }
//     })

// })
