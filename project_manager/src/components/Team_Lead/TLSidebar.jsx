import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import "../Admin/Sidebar.css";

const TLSidebar = () => {
  return (
    <div className="sidebar bg-light min-vh-100 p-0 p-lg-2">
      <ul>
        <li>
          <NavLink  to="/dashboard" >
          
              <FontAwesomeIcon icon={faHome} />
              Dashboard
          
          </NavLink>
        </li>
        <li>
          <NavLink to="/myprojects" >
           
              <FontAwesomeIcon icon={faUsers} />
               Project Details
          
          </NavLink>
        </li>

        <li>
          <NavLink to="/tlassigntasks" >
            
              <FontAwesomeIcon icon={faChartBar} />
             Assign Tasks
            
          </NavLink>
        </li>
        <li>
          <NavLink to="/taskstatus" >
            
              <FontAwesomeIcon icon={faChartBar} />
            Task Status
            
          </NavLink>
        </li>
        <li>
          <NavLink to="/reportmanager" >
            
              <FontAwesomeIcon icon={faChartBar} />
             Report Manager
            
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default TLSidebar;
