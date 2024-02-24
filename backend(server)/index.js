const express=require('express');
const mongoose =require('mongoose')
const dotenv =require('dotenv').config();
const db=require('./dbConnection')
const route=require('./routes/route')
const cors=require('cors')

const app=express();

app.use(cors())
app.use(express.json())

db()

app.use('/',route)

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log("Serever is running on :"+PORT)
})

//study:
//router
//formt of http req
//axios
//mongoose
//mongodb => Crud