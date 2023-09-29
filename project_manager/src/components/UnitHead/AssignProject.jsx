import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UnitHead.css";
import jwtDecode from "jwt-decode";

const AssignProject = () => {
  const token = sessionStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);

  // Now you can access the decoded information
  const AssignedHeadEmail = decodedToken.email; // Replace 'email' with the actual key in your JWT payload


  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [projectManagers, setProjectManagers] = useState([]);

  useEffect(() => {
    // Fetch project managers from the server when the component mounts
    axios
      .get("http://localhost:3001/getEmp-data")
      .then((res) => {
        // Filter employees with Designation "ProjectManager"
        const managers = res.data.filter(
          (employee) => employee.Designation === "ProjectManager"
        );
        setProjectManagers(managers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAssignProject = () => {
    // Find the selected project manager's email based on the value in projectManager
    const selectedManager = projectManagers.find(
      (manager) => manager.EmployeeName === projectManager
    );
    const managerEmail = selectedManager ? selectedManager.Email : "";

    // Prepare the data to be sent to the server
    const data = {
      projectTitle,
      projectDescription,
      projectManager: projectManager,
      managerEmail: managerEmail,
      UnitHeadEmail:AssignedHeadEmail,
    };

    // Send a POST request to the server to save the project data and send an email
    axios
      .post("http://localhost:3001/assignProject", data)
      .then((res) => {
        // Handle the success response if needed
        console.log(res.data);
        // Clear the form fields after successful submission
        setProjectTitle("");
        setProjectDescription("");
        setProjectManager("");
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <div className="assign-project container">
      <h2>Assign Project</h2>
      <div className="form">
        <div className="mb-3">
          <label htmlFor="project-title" className="form-label">
            Project Title
          </label>
          <input
            type="text"
            id="project-title"
            className="form-control"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="project-description" className="form-label">
            Project Description
          </label>
          <textarea
            id="project-description"
            className="form-control"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            rows="4"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="project-manager" className="form-label">
            Project Manager
          </label>
          <select
            className="form-select"
            id="project-manager"
            value={projectManager}
            onChange={(e) => setProjectManager(e.target.value)}
          >
            <option value="">Select Manager</option>
            {projectManagers.map((manager) => (
              <option key={manager._id} value={manager.EmployeeName}>
                {manager.EmployeeName}
              </option>
            ))}
          </select>
        </div>
        <button
          className="btn add-employeebtn text-white"
          onClick={handleAssignProject}
        >
          Assign Project
        </button>
      </div>
    </div>
  );
};

export default AssignProject;
