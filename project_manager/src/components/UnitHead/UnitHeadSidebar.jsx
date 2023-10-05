import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faChartBar,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "../Admin/Sidebar.css";

const UnitHeadSidebar = () => {
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
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });

    // Fetch employee data based on email
    axios
      .get(`http://localhost:3001/getEmp-dataOne?email=${userEmail}`)
      .then((res) => {
        setEmployeeData(res.data);
      })
      .catch((error) => {
        console.log("Error fetching employee data:", error);
      });
  }, [userEmail]);

  const numAnnouncements = receivedMessages.length;

  return (
    <div className="sidebar-container w-75">
      <div className="sidebar bg-white flex-column">
        <ul className="flex-column p-3">
          <li>
            <NavLink to="/dashboard">
              <FontAwesomeIcon icon={faHome} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/assignproject">
              <FontAwesomeIcon icon={faUsers} />
              AssignProject
            </NavLink>
          </li>
          <li>
            <NavLink to="/status">
              <FontAwesomeIcon icon={faChartBar} />
              Status
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings">
              <FontAwesomeIcon icon={faHome} />
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/currentannouncements">
              <FontAwesomeIcon icon={faNewspaper} />
              Updates
              {numAnnouncements > 0 && (
                <span className="badge badge-pill badge-danger bg-primary ms-2">
                  {numAnnouncements}
                </span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Profile Section */}
      <div className="profile-section d-sm-none d-md-block d-none d-sm-block">
        <div className="border-top mt-auto p-3 w-75">
          <Link to="/settings" className="d-flex align-items-center">
            <img
              src={`http://localhost:3001/images/${employeeData.Profile}`}
              className="rounded-circle me-2"
              id="avatar"
              alt="Avatar"
              width="45"
              height="40"
            />
            <p className="profile-name ms-2 text-black mb-0">{employeeData.EmployeeName}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnitHeadSidebar;
