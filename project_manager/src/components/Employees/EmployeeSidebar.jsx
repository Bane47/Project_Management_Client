import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink ,Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faChartBar } from "@fortawesome/free-solid-svg-icons";
import jwtDecode from "jwt-decode";
import "../Admin/Sidebar.css";

const EmployeeSidebar = () => {
  const user = sessionStorage.getItem("user");
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

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

  const [currentTasks, setCurrentTasks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getTask-Data?userEmail=${userEmail}`)
      .then((res) => {
        const tasks = res.data.taskData;
        setCurrentTasks(tasks.filter((task) => !task.deleted));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userEmail]);

  const taskCount = currentTasks.length;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getEmp-dataOne?email=${userEmail}`)
      .then((res) => {
        setEmployeeData(res.data);
      });
  },[]);

  return (
    <div className="sidebar bg-light min-vh-100 p-2">
      <ul>
        <li>
          <NavLink to="/dashboard" ClassName="active">
            <FontAwesomeIcon icon={faHome} />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/tasks" ClassName="active">
            <FontAwesomeIcon icon={faUsers} />
            My Tasks
            {taskCount >0 &&(
              <span className="badge add-employeebtn ms-2">
              {taskCount}
            </span>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink to="/updatestatus" ClassName="active">
            <FontAwesomeIcon icon={faChartBar} />
            Update Status
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" ClassName="active">
            <FontAwesomeIcon icon={faChartBar} />
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink to="/currentannouncements">
            <FontAwesomeIcon icon={faHome} />
            Updates
            {numAnnouncements > 0 && (
              <span className="badge badge-pill badge-danger bg-primary ms-2">
                {numAnnouncements}
              </span>
            )}
          </NavLink>
        </li>
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

export default EmployeeSidebar;
