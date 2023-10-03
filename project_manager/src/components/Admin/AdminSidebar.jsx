import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  // faBriefcase,
  // faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import "../Admin/Sidebar.css";

const AdminSidebar = () => {
  return (
    <div className="sidebar bg-light pt-3 p-lg-2 w-75">
      <ul>
        <li>
          <NavLink to="/dashboard" activeClassName="active-link">
            <FontAwesomeIcon icon={faHome} />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/employees" activeClassName="active-link">
            <FontAwesomeIcon icon={faUsers} />
            Employees
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName="active-link">
            <FontAwesomeIcon icon={faUsers} />
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
