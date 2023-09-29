import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import "../Admin/Sidebar.css";

const UnitHeadSidebar = () => {
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
          <NavLink to="/assignproject" >
           
              <FontAwesomeIcon icon={faUsers} />
               AssignProject
          
          </NavLink>
        </li>

        <li>
          <NavLink to="/status" >
            
              <FontAwesomeIcon icon={faChartBar} />
             Status
            
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UnitHeadSidebar;
