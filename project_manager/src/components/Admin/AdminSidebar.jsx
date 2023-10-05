import React, { useEffect,useState, } from "react";
import axios from "axios";
import { NavLink,Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers,} from "@fortawesome/free-solid-svg-icons";
import jwtDecode from "jwt-decode";
import "../Admin/Sidebar.css";

const AdminSidebar = () => {
  const user = sessionStorage.getItem("user");
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const [employeeData, setEmployeeData] = useState({});

useEffect(()=>{
  axios
      .get(`http://localhost:3001/getEmp-dataOne?email=${userEmail}`)
      .then((res) => {
        setEmployeeData(res.data);
      })
      .catch((error) => {
        console.log("Error fetching employee data:", error);
      });
  },[userEmail]);

  
  return (
    <div className="sidebar-container ">
      <div className="sidebar bg-white flex-column">
      <ul className="flex-column p-3 w-75">
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
          <NavLink to="/announcements" activeClassName="active-link">
            <FontAwesomeIcon icon={faUsers} />
            Announce
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
      <div className="profile-section d-sm-none d-md-block d-none d-sm-block">
        <div className="border-top mt-auto p-3">
          <Link to="/settings" className="d-flex align-items-center">
            <img
              src={`http://localhost:3001/images/${employeeData.Profile}`}
              className="rounded-circle me-2"
              id="avatar"
              alt="Avatar"
              width="45"
              height="40"
            />
            <p className="profile-name ms-2 text-black mb-0">{employeeData.EmployeeName}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
