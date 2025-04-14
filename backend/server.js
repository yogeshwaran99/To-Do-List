const express=require("express");
const mongoose =require("mongoose");
const cors =require("cors");
const dotenv =require("dotenv");

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());

const connectdb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    }catch(e){
        console.error("Connection failed",e);
        process.exit(1);
    }
};
 connectdb();

 const task = require("./routes/tasks");
 app.use("/api/tasks",task);

 const PORT = process.env.PORT||5000;
 app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
 });