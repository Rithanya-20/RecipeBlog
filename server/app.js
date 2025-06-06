const express = require("express")
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI).then((res) => console.log('Database is connected')
).catch((Err) => console.log(Err.message)
)



const cors = require('cors')
const RegisterModel = require('./models/Register')
const router = require("./routes/router")


const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

const PORT = process.env.PORT || 3001

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// app.use("./uploads", express.static("./uploads"))


// app.post("/login", (req, res) => {
//     const {email, password} = req.body
//     RegisterModel.findOne({email, email})
//     .then(user => {
//         if(user) {
//             if(user.password == password){
//                 res.json("Success")
//             }else{
//                 res.json("The password is incorrect")
//             }
//         }else{
//             res.json("No record existed")
//         }
//     })
// })

// app.post('/register', (req, res) => {
//     const {name, email, password} = req.body;
//     RegisterModel.findOne({email:email})
//     .then(user => {
//         if(user){
//             res.json("Already have an account")
//         } else{
//             RegisterModel.create({name: name, email: email, password: password})
//             .then(result => res.json("Account created"))
//             .catch(err => res.json("Error")) 
//         }
//     })
//     .catch(err => res.json(err))

// })
    

app.listen(PORT, () => {
    console.log('server is Running');
    
})