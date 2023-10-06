import axios from "axios";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { useProjectContext } from "../../context/ProjectContext";

import "./PM.css"; // Import your custom CSS file

const YourProject = () => {
  const user = sessionStorage.getItem("user");
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const [tasks, setTasks] = useState([]);
  const { setProjectData } = useProjectContext();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/get-assignedtasks-pm?userEmail=${userEmail}`)
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userEmail]);

  const handleClick = (task) => {
    console.log(task);
    setProjectData({
      projectTitle: task.projectTitle,
      projectDescription: task.projectDescription,
      clientName: task.clientName,
      clientEmail: task.clientEmail,
      clientSkypeId: task.clientSkypeId,
    });
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-4">Your Projects</h4>
      <div className="row">
        {tasks.length === 0 ? (
          <div className="col-md-12">
            <p>No Projects Available</p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="project-card table-report">
                <div className="project-card-inner">
                  <div className="project-card-front">
                    <h5 className="project-card-title text-center">
                      <span className="text-primary fs-3">
                        {task.projectTitle}
                      </span>
                    </h5>
                    <p className="project-card-description text-center">
                      <strong>Project Description: </strong> {task.projectDescription}
                    </p>
                  </div>
                  <div className="project-card-back">
                    <p className="project-card-text">
                     <strong>Project Manager:</strong>  {task.projectManager}
                    </p>
                    <p className="project-card-text">
                     <strong> UnitHeadEmail:</strong> {task.UnitHeadEmail}
                    </p>
                    <p className="project-card-text">
                    <strong> ManagerEmail: </strong> {task.managerEmail}
                    </p>
                    <p className="project-card-text">
                    <strong> Client Name: </strong> {task.clientName}
                    </p>
                    <p className="project-card-text">
                    <strong>Client Email: </strong> {task.clientEmail}
                    </p>
                    <p className="project-card-text">
                    <strong> Client SkypeID: </strong> {task.clientSkypeId}
                    </p>
                  </div>
                </div>
                <div className="project-card-footer">
                  <Link
                    to="/addproject"
                    className={`btn add-employeebtn text-white w-100 ${
                      task.status !== "Assigned" ? "disabled" : ""
                    }`}
                    onClick={() => handleClick(task)}
                  >
                    {task.status !== "Assigned" ? "Assigned" : "Assign Project"}
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default YourProject;
