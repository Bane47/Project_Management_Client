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
   
    <div className="sidebar bg-light   pt-3 p-lg-2 " >
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
      </ul>
    </div>
  );
};

export default AdminSidebar;
