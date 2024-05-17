import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
},{timestamps:true})

const User =mongoose.models.users || mongoose.model("users",userSchema);
export default User;