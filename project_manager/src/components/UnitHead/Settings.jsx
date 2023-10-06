import axios from "axios";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import "./UnitHead.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const user = sessionStorage.getItem("user");
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const [userData, setUserData] = useState(null);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getEmp-dataOne?email=${userEmail}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userEmail]);

  const handleImageChange = (e) => {
    setNewProfileImage(e.target.files[0]);
  };

  const handleProfileChange = () => {
    setIsEditingProfile(true);
  };

  const handleUpdateProfile = () => {
    if (!newProfileImage) {
      toast.error("Please select an image to update your profile.");
      return;
    }

    const formData = new FormData();
    formData.append("_id", userData._id);
    formData.append("profileImage", newProfileImage);

    axios
      .put(`http://localhost:3001/updateProfile?email=${userEmail}`, formData)
      .then((res) => {
        console.log("Profile image updated successfully");
        toast.success(`Profile updated successfully`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });

        setTimeout(() => {
          window.location.reload();
        }, 2500);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="user-profile container align-items-center d-flex flex-column mt-5">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
      />
      <h2 className="text-center">User Profile</h2>
      {userData && (
        <div className="profile-details vw-75 row justify-content-center align-items-center card d-flex flex-row p-md-5 border-0 shadow -lg">
          <div className="col-12 col-md-6 text-center ">
            <div className="profile-image-container d-flex flex-column align-items-center p-3">
              <img
                src={`http://localhost:3001/images/${userData.Profile}`}
                alt="Profile"
                className="user-pro fixed-width-profile-image"
              />
              {!isEditingProfile && (
                <button
                  className="update-profile-button text-white mt-3"
                  onClick={handleProfileChange}
                >
                  Update Profile Picture
                </button>
              )}
              {isEditingProfile && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="profile-image-input"
                  />
                  <button
                    className="update-profile-button text-white mt-3"
                    onClick={handleUpdateProfile}
                  >
                    Save Profile
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="user-info mt-4">
              <p>
                <strong>Employee Name:</strong> {userData.EmployeeName}
              </p>
              <p>
                <strong>Designation:</strong> {userData.Designation}
              </p>
              <p>
                <strong>Domain 1:</strong> {userData.Domain1 || "N/A"}
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
