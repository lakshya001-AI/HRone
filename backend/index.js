import express from "express";
import CORS from "cors";
import dotenv from "dotenv";
import { connectMongoDbDatabase } from "./MongoDB/connection.js";
import { userModel } from "./MongoDB/userSchema.js";


const app = express();
dotenv.config();
connectMongoDbDatabase();

app.use(express.json());
app.use(CORS());

app.get("/", (req, res)=>{
    res.send("Hello this is a HRone Server!");
});

// First we need to store the user data using post method

app.post("/storeUserData", async (req, res)=>{

    try {
        const {userObj} = req.body;
        // here we want to find the user is already there or not , by its name, email, number, EmpID
        const isUserExist = await userModel.findOne({$or:[{userName: userObj.userName},{userEmail: userObj.userEmail},{userPhoneNumber: userObj.userPhoneNumber},{userEmpID: userObj.userEmpID}]});
        if(isUserExist){
            return res.status(400).json({message:"User Already Exits", existingUser:isUserExist});
        }
        const newUser = await userModel.create({
            userName: userObj.userName,
            userEmail: userObj.userEmail,
            userPhoneNumber: userObj.userPhoneNumber,
            userJobTitle: userObj.userJobTitle,
            userWorkExperienceYear: userObj.userWorkExperienceYear,
            userWorkExperienceMonth: userObj.userWorkExperienceMonth,
            userEmpID: userObj.userEmpID
        });
        if(newUser){
            res.status(200).send({message:"New user Created Successfully"});
        }
    } catch (error) {
        console.log("Error is receiving Data", error);
        res.status(500).send({message:"Error in Storing the Data"});
    }
});


// Second we need to get the user Data using get method
app.get("/getAllUserData", async (req , res)=>{ 
    try {
        const allUsersData = await userModel.find();
        if(!allUsersData){
            return res.status(404).send({message:"All users Data is empty"});
        }
        res.status(200).json({allUsersData:allUsersData});
    } catch (error) {
        console.log("Error in getting the users data");
        res.status(500).send({message:"Error in getting all the users Data"});
    }
});

app.post("/deleteUser", async (req, res)=>{
    try {
        const {userEmpID} = req.body;
        const userToDelete = await userModel.findOneAndDelete({userEmpID:userEmpID});
        if(!userToDelete){
            return res.status(404).send({message:"User Not found to delete"});
        }
        res.status(200).send({message:"User Deleted Successfully!"});
    } catch (error) {
        console.log("Error in deleting the User", error);
        res.status(500).send({message:"Error in deleting the user"});
    }
})

const PORT = 5000;
app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
});
