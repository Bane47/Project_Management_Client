import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faBriefcase,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import "../Admin/Sidebar.css";



const AdminSidebar = () => {
  return (
    <div className="sidebar bg-light min-vh-100 p-0 p-lg-2">
      <ul>
        <li>
          <NavLink to="/dashboard" >
            <FontAwesomeIcon icon={faHome} />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/employees" >
            <FontAwesomeIcon icon={faUsers} />
            Employees
          </NavLink>
        </li>
        <li>
          <NavLink to="/designation" >
            <FontAwesomeIcon icon={faBriefcase} />
            Designation
          </NavLink>
        </li>
        <li>
          <NavLink to="/analytics" >
            <FontAwesomeIcon icon={faChartBar} />
             Analytics
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
