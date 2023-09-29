import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import "../Admin/Sidebar.css";

const EmployeeSidebar = () => {
  return (
    <div className="sidebar bg-light min-vh-100 p-0 p-lg-2">
      <ul>
        <li>
          <NavLink  to="/dashboard" ClassName="active">
          
              <FontAwesomeIcon icon={faHome} />
              Dashboard
          
          </NavLink>
        </li>
        <li>
          <NavLink to="/tasks" ClassName="active">
           
              <FontAwesomeIcon icon={faUsers} />
               My Tasks
          
          </NavLink>
        </li>

        <li>
          <NavLink to="/updatestatus" ClassName="active">
            
              <FontAwesomeIcon icon={faChartBar} />
            Update Status
            
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default EmployeeSidebar;
