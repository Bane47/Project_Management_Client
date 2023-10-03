import React, { useState, useEffect } from "react";
import axios from 'axios'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faChartBar } from "@fortawesome/free-solid-svg-icons";
import jwtDecode from "jwt-decode";
import "../Admin/Sidebar.css";

const TLSidebar = () => {
  const user = sessionStorage.getItem('user');
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const [projects, setProjects] = useState([]);

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


  const renderBadge = (count) => {
    if (count > 0) {
      return <span className="badge  bg-black">{count}</span>;
    }
    return null;
  };

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
            Project Details {renderBadge(projects.length)}
          </NavLink>
        </li>

        <li>
          <NavLink to="/tlassigntasks">
            <FontAwesomeIcon icon={faChartBar} />
            Assign Tasks {renderBadge(projects.length)}
          </NavLink>
        </li>
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
          <NavLink to="/settings">
            <FontAwesomeIcon icon={faChartBar} />
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default TLSidebar;
