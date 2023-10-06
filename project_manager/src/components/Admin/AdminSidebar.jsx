import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faHome,
  faNewspaper,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import "../Admin/Sidebar.css";

const AdminSidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar bg-white flex-column">
        <ul className="flex-column p-3 w-100">
          <li>
            <NavLink to="/dashboard" active="active">
              <FontAwesomeIcon icon={faHome} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/employees" active="active">
              <FontAwesomeIcon icon={faUsers} />
              Employees
            </NavLink>
          </li>
          <li>
            <NavLink to="/announcements" active="active">
              <FontAwesomeIcon icon={faNewspaper} />
              Announce
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" active="active">
              <FontAwesomeIcon icon={faGear} />
              Settings
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
