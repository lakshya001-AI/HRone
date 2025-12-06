import React, { useState } from 'react'
import Style from '../App.module.css'
import toast from 'react-hot-toast'
import axios from "axios";

function AddDetails() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userJobTitle, setJobTitle] = useState("");
  const [userWorkExperienceYear, setUserWorkExperienceYear] = useState("");
  const [userWorkExperienceMonth, setUserWorkExperienceMonth] = useState("");
  const [userEmpID, setUserEmpID] = useState("");
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const submitDetails = async () => {
    try {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!userName && !userEmail && !userPhoneNumber && !userJobTitle && !userWorkExperienceYear && !userWorkExperienceMonth) {
        toast.error("Please fill in all the required details.", { duration: 4000, position: 'bottom-center' });
        return;
      }
      if (!emailRegex.test(userEmail)) {
        toast.error("Please enter valid Email Address", { duration: 4000, position: 'bottom-center' });
        return;
      }
      const isValidMobileNum = Number.isInteger(Number(userPhoneNumber));
      if (userPhoneNumber.length < 10 || !isValidMobileNum) {
        toast.error("Please enter valid Mobile Number", { duration: 4000, position: 'bottom-center' });
        return;
      }
      // Here we need to create the emloyee ID
      // Example: TECH + reverse(modileNumber) - TECH6260320663 - TECH3660230626
      const reversedMobileNumber = userPhoneNumber.split("").reverse().join("");
      const empID = `TECH${reversedMobileNumber}`;
      setUserEmpID(empID);

      const userObj = {
        userName, userEmail, userPhoneNumber, userJobTitle, userWorkExperienceYear, userWorkExperienceMonth, userEmpID: empID
      }

      let response = await axios.post(`${backend_url}/storeUserData`, {userObj});


      if(response.status == 200){
        toast.success("Details saved successfully", { duration: 4000, position: 'bottom-center' });
      }

    } catch (error) {
       if(error.status == 400){
        toast.error("This user already exits", {
          duration:4000,
          position:'bottom-center'
        });
        return;
      }
      console.log("Error in sending Data", error);
      toast.error("Error in adding Details! Please Try again", { duration: 4000, position: 'bottom-center' });
    }

  }

  return (
    <>
      <div className={Style.addDetailsComponent}>
        <div className={Style.addDetailsInnerComponent}>
          <div className={Style.labelInputDiv}>
            <label htmlFor="">Name</label>
            <input type="text" placeholder='Enter Full Name' value={userName} onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className={Style.labelInputDiv}>
            <label htmlFor="">Email</label>
            <input type="text" placeholder='Enter Email Address' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
          </div> 
          <div className={Style.labelInputDiv}>
            <label htmlFor="">Mobile Number</label>
            <input type="text" placeholder='Enter Mobile Number' value={userPhoneNumber} onChange={(e) => setUserPhoneNumber(e.target.value)} />
          </div>
          <div className={Style.labelInputDiv}>
            <label htmlFor="">Job Title</label>
            <input type="text" placeholder='Enter Job Title' value={userJobTitle} onChange={(e) => setJobTitle(e.target.value)} />
          </div>
          <div className={Style.labelInputDiv}>
            <label htmlFor="">Work Experience</label>
            <div style={{display:"flex", gap:"5px"}}>
              <input type="text" placeholder='Years' value={userWorkExperienceYear} onChange={(e) => setUserWorkExperienceYear(e.target.value)} style={{width:"6vmax"}}/>
              <input type="text" placeholder='Months' value={userWorkExperienceMonth} onChange={(e) => setUserWorkExperienceMonth(e.target.value)} style={{width:"6vmax"}}/>
            </div>
          </div>
          <button onClick={submitDetails}>Add Details</button>
        </div>
      </div>
    </>
  )
}

export default AddDetails