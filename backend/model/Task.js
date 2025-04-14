const { default: mongoose } = require("mongoose");
const mongose = require("mongoose");

const taskSchema=new mongoose.Schema({
    title:{type: String,required : true},
    completed:{type:Boolean,default: false},
});
 
module.exports=mongoose.model("Task",taskSchema);