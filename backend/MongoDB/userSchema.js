import mongoose from "mongoose";

// whenever you create the schema all add the new keyword
const userSchema = new mongoose.Schema({
    userName: {type: String}, 
    userEmail: {type: String}, 
    userPhoneNumber: {type:String}, 
    userJobTitle: {type:String}, 
    userWorkExperienceYear: {type:String}, 
    userWorkExperienceMonth: {type:String}, 
    userEmpID: {type:String} 
});

const userModel = mongoose.model("userModel", userSchema);
export {userModel};