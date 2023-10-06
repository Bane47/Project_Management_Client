import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink,Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faChartBar } from "@fortawesome/free-solid-svg-icons";
import jwtDecode from "jwt-decode";
import "../Admin/Sidebar.css";

const TLSidebar = () => {
  const user = sessionStorage.getItem("user");
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const [projects, setProjects] = useState([]);
  const [employeeData, setEmployeeData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/get-assignedtasks-tl?userEmail=${userEmail}`)
      .then((res) => {
        setProjects(res.data);
        console.log(res.data.length);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userEmail]);

  const [receivedMessages, setReceivedMessages] = useState([]);

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

  const renderBadge = (count) => {
    if (count > 0) {
      return <span className="badge  add-employeebtn">{count}</span>;
    }
    return null;
  };

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
          <NavLink to="/myprojects">
            <FontAwesomeIcon icon={faUsers} />
            Your Projects {renderBadge(projects.length)}
          </NavLink>
        </li>

        {/* <li>
          <NavLink to="/tlassigntasks">
            <FontAwesomeIcon icon={faChartBar} />
            Assign Tasks {renderBadge(projects.length)}
          </NavLink>
        </li> */}
        <li>
          <NavLink to="/taskstatus">
            <FontAwesomeIcon icon={faChartBar} />
            Task Status
          </NavLink>
        </li>
        <li>
          <NavLink to="/reportmanager">
            <FontAwesomeIcon icon={faChartBar} />
            Report Manager
          </NavLink>
        </li>

        <li>
          <NavLink to="/currentannouncements">
            <FontAwesomeIcon icon={faHome} />
            Updates
            {numAnnouncements > 0 && (
              <span className="badge add-employeebtn ms-2">
                {numAnnouncements}
              </span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings">
            <FontAwesomeIcon icon={faChartBar} />
            Settings
          </NavLink>
        </li>
        {/* Profile Section */}
      <div className="profile-section d-sm-none d-md-block d-none d-sm-block">
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
      </ul>
    </div>
  );
};

export default TLSidebar;
