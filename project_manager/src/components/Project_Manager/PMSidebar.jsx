import React from "react";
import { NavLink} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import "../Admin/Sidebar.css";

const PMSidebar = () => {
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
          <NavLink  to="/Yourprojects" >
          
              <FontAwesomeIcon icon={faHome} />
              Yourprojects
          
          </NavLink>
        </li>
        <li>
          <NavLink to="/addproject" >
           
              <FontAwesomeIcon icon={faUsers} />
               Add Projects
          
          </NavLink>
        </li>
        <li>
          <NavLink to="/projectstatus" >
           
              <FontAwesomeIcon icon={faUsers} />
               ProjectStatus
          
          </NavLink>
        </li>

        <li>
          <NavLink to="/reportlead" >
            
              <FontAwesomeIcon icon={faChartBar} />
             Report Lead
            
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default PMSidebar;
