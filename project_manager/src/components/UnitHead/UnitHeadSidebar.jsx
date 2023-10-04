import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../Admin/Sidebar.css";

const UnitHeadSidebar = () => {
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
            <FontAwesomeIcon icon={faHome} />
            Announcements
            {numAnnouncements > 0 && (
              <span className="badge badge-pill badge-danger bg-primary ms-2">
                {numAnnouncements}
              </span>
            )}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UnitHeadSidebar;
