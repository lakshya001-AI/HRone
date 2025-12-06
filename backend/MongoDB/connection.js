import mongoose from "mongoose";

export const connectMongoDbDatabase = async () =>{
    await mongoose.connect(process.env.mongoDB_url).then((res)=>{
        if(res){
            console.log("Connected to MongoDB Successfully");
        }
    }).catch((err)=>{
        if(err){
            console.log("Error Connecting to MongoDB");
            console.log("Error in mongoDB Connection: ", err);
        }
    });
}