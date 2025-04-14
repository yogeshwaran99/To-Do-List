const express = require("express");
const Task=require("../model/Task");

const router = express.Router();

router.get("/",async(req,res)=>{
    try{
        const tasks = await Task.find();
        res.json(tasks);
    }catch(e){
        res.status(500).json({error:e.message});
    }
});


router.post("/",async(req,res)=>{
    const {title}=req.body;
    console.log("Recieved title",title);
    if(!title){
        return res.status(400).json({error:"Task title required"});
    }
    try{
        const newTask=new Task({title});
        await newTask.save();
        res.status(201).json(newTask);
    }catch(e){
        console.error(e.message);
        res.status(500).json({error:e.message});
    }
});

router.delete("/:id",async (req,res)=>{
    try{
        const{id}=req.params;
        await Task.findByIdAndDelete(id);
        res.json({message:"Task Deleted"});
    }catch(e){
        res.status(500).json({error:e.message});
    }
});

router.put("/:id", async(req,res)=>{
    try{
        const {id} =req.params;
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            req.body,
            {new:true}
        );
        res.json(updatedTask);        
    }catch(e){
        res.status(500).json({error:"Error updating Task"});
    }
});

module.exports = router;