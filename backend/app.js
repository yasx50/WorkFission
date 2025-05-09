import dotenv from "dotenv";
dotenv.config({
    path:'./env'
})


import express from 'express'
import cors from 'cors'
import { connectDB } from './Database/DbConnection.js'

const app = express()
app.use('/uploads', express.static('uploads'));
app.use(express.json())
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))



// routes declaration

import userRouter from './api/Item-Routes.js'
import { json } from "sequelize";
app.use("/api/v1/",userRouter)

connectDB()
.then(()=>{
    console.log('connection successfull');
    app.listen(process.env.PORT,()=>{
        console.log('the app is listining at port ',process.env.PORT);
        
    })
    
})
.catch((err)=>{
    console.log('conection failed !!!',err);
    
})