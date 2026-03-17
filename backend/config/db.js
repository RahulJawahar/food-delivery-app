import mongoose from "mongoose";

export const connectDB=async ()=>{
    await mongoose.connect('mongodb+srv://rahuljawahar22_db_user:Smily&22@cluster0.ugwxblk.mongodb.net/food-del').then(()=>console.log("DB connected"));

}