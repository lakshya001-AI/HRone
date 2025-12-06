import React, { useEffect, useState } from 'react'
import Style from "../App.module.css"
import axios from 'axios';
import toast from 'react-hot-toast';

function ShowDetails() {
  const [isEmpty, setIsEmpty] = useState(true);
  const [allUserData, setAllUserData] = useState([]);
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    // userEmail: "makodelakshya101@gmail.com"
    // userEmpID:  "TECH3660230626"
    // userPhoneNumber: "6260320663"
    // userWorkExperienceMonth: "6"
    // userWorkExperienceYear: "1"
    const getAllUsersData = async () => {
      try {
        const response = await axios.get(`${backend_url}/getAllUserData`);
        if (response.data.allUsersData) {
          console.log(response.data.allUsersData)
          setAllUserData(response.data.allUsersData);
          setIsEmpty(false);
        }
      } catch (error) {
        console.log("Error getting all the users Data", error);
        toast.error("Error getting all the users data");
      }
    }
    getAllUsersData();
  }, [allUserData]);

  const onDeleteClick = async (userEmpID) => {
    try {
      console.log(userEmpID);
      let response = await axios.post(`${backend_url}/deleteUser`, {userEmpID});
      if(response.status == 200){
        toast.success("User Deleted Successfully", {position:"bottom-center", duration:4000});
      }
    } catch (error) {
      if(error.status == 404){
        toast.error("User Not found to Delete", {position:"bottom-center", duration:4000});
      }
      console.log("Error Deleting the user", error);
      toast.error("Error deleting the user", {position:"bottom-center",duration:4000});
    }
  }
  return (
    <>
      <div className={Style.showDetailsComponent}>
        <div className={Style.showDetailsInnerComponent}>
          {
            isEmpty ? (
              <>
                <div className={Style.showDetailsEmpty}>
                  <p>We couldn’t find any data</p>
                </div>
              </>
            ) : (
              <>
                <div className={Style.ShowDetailsDataView}>
                  {
                    allUserData.map((element, index) => (
                      <div className={Style.userDetailDiv} key={index}>
                        <div style={{ width: "100%", display: "flex", flexDirection: "row", marginTop: "15px", position: "relative" }}>
                          <div style={{ border: "solid 1px black", padding: "5px", display: "flex", alignItems: "center", justifyContent: "center", width: "40px", borderRadius: "10px", marginLeft: "20px" }}>
                            <p>{element.userName.split(" ").map((ele) => ele[0]).join("").toUpperCase()}</p>
                          </div>
                          <div style={{ marginLeft: "15px" }}>
                            <p style={{ fontSize: "19px" }}>{element.userName}</p>
                            <p style={{ fontSize: "13px" }}>{element.userJobTitle}</p>
                          </div>
                          <div style={{ position: "absolute", top: "10px", left: "270px" }}>
                            <i class="fa-regular fa-trash-can" onClick={()=> onDeleteClick(element.userEmpID)}></i>
                          </div>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              width: "260px",
                              padding: "16px",
                              borderRadius: "16px",
                              backgroundColor: "#ffffff",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              fontFamily: "Poppins, sans-serif",
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                              position: "relative",
                              marginTop:"20px"
                            }}
                          >
                            <p style={{ fontWeight: "600", fontSize: "16px", color: "#333" }}>
                              {element.userEmpID}
                            </p>

                            <p style={{ fontSize: "14px", color: "#555" }}>
                              {element.userEmail}
                            </p>

                            <p style={{ fontSize: "14px", color: "#555" }}>
                              {element.userPhoneNumber}
                            </p>

                            <p style={{ fontSize: "14px", color: "#222", marginTop: "4px" }}>
                              {`${element.userWorkExperienceYear} Years ${element.userWorkExperienceMonth} Months`}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </>
            )
          }
        </div>
      </div>
    </>
  )
}

export default ShowDetails