import React,{useState,useEffect} from "react";
import { NavLink} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import "../Admin/Sidebar.css";
import jwtDecode from "jwt-decode";
import axios from "axios";

const PMSidebar = () => {
  const user = sessionStorage.getItem('user');
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;


  const [tasks, setTasks] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/Get-Message")
      .then((res) => {
        const filteredMessages = res.data.filter(
          (message) => message.deleted === "false"
        );
        setReceivedMessages(filteredMessages);
        console.log(filteredMessages);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  const numAnnouncements = receivedMessages.length;

  useEffect(() => {
    axios.get(`http://localhost:3001/get-assignedtasks-pm?userEmail=${userEmail}`)
      .then((res) => {
        console.log(res.data);
        setTasks(res.data.length);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userEmail]);
  const taskLength=tasks

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
              Yourprojects{tasks>0 && (
                 <span className="badge badge-pill badge-danger bg-primary ms-2">
                 {tasks}
               </span>
              )
              }
          
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
        <li>
          <NavLink to="/settings" >
           
              <FontAwesomeIcon icon={faUsers} />
               Settings
          
          </NavLink>
        </li>
        <li>
          <NavLink to="/currentannouncements">
            <FontAwesomeIcon icon={faHome} />
            Announcements
            {numAnnouncements > 0 && (
              <span className="badge badge-pill badge-danger bg-primary ms-2">
                {numAnnouncements}
              </span>
            )}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default PMSidebar;
