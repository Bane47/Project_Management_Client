import axios from "axios";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import './UnitHead.css';

const Settings = () => {
  const user = sessionStorage.getItem("accessToken");
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getEmp-dataOne?email=${userEmail}`)
      .then((res) => {
        setUserData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userEmail]);

  return (
    <div className="user-profile container">
      <h2>User Profile</h2>
      {userData && (
        <div className="profile-details row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="profile-image-container">
              <img src={`http://localhost:3001/images/${userData.Profile}`} alt="Profile" className="profile-image" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="user-info mt-4">
              <p>
                <strong>Employee Name:</strong> {userData.EmployeeName}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${userData.Email}`}>{userData.Email}</a>
              </p>
              <p>
                <strong>Domain 1:</strong> {userData.Domain1}
              </p>
              <p>
                <strong>Domain 2:</strong> {userData.Domain2 || "N/A"}
              </p>
              <p>
                <strong>Skype ID:</strong> {userData.SkypeId}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
