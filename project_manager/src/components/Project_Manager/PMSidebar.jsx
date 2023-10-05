import React, { useState, useEffect } from "react";
import { NavLink,Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faChartBar } from "@fortawesome/free-solid-svg-icons";
import "../Admin/Sidebar.css";
import jwtDecode from "jwt-decode";
import axios from "axios";

const PMSidebar = () => {
  const user = sessionStorage.getItem("user");
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const [tasks, setTasks] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [employeeData, setEmployeeData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/Get-Message")
      .then((res) => {
        const filteredMessages = res.data.filter(
          (message) => message.deleted === "false"
        );
        setReceivedMessages(filteredMessages);
        console.log(filteredMessages);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  const numAnnouncements = receivedMessages.length;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/get-assignedtasks-pm?userEmail=${userEmail}`)
      .then((res) => {
        console.log(res.data);
        setTasks(res.data.length);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userEmail]);
  

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getEmp-dataOne?email=${userEmail}`)
      .then((res) => {
        setEmployeeData(res.data);
      });
  },[]);

  return (
    <div className="sidebar bg-light min-vh-100 p-0 p-lg-2">
      <ul>
        <li>
          <NavLink to="/dashboard">
            <FontAwesomeIcon icon={faHome} />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/Yourprojects">
            <FontAwesomeIcon icon={faHome} />
            Yourprojects
            {tasks > 0 && (
              <span className="badge  add-employeebtn ms-2">
                {tasks}
              </span>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink to="/projectstatus">
            <FontAwesomeIcon icon={faUsers} />
            ProjectStatus
          </NavLink>
        </li>

        <li>
          <NavLink to="/reportlead">
            <FontAwesomeIcon icon={faChartBar} />
            Report Lead
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings">
            <FontAwesomeIcon icon={faUsers} />
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink to="/currentannouncements">
            <FontAwesomeIcon icon={faHome} />
            Announcements
            {numAnnouncements > 0 && (
              <span className="badge add-employeebtn ms-2">
                {numAnnouncements}
              </span>
            )}
          </NavLink>
        </li>
      </ul>
      {/* Profile Section */}
      <div className="profile-section">
        <div className="border-top mt-auto p-3">
          <Link to="/settings" className="d-flex align-items-center">
            <img
              src={`http://localhost:3001/images/${employeeData.Profile}`}
              className="rounded-circle me-2"
              id="avatar"
              alt="Avatar"
              width="45"
              height="40"
            />
            <p className="profile-name ms-2 text-black mb-0">
              {employeeData.EmployeeName}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PMSidebar;
