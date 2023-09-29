import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const ProjectStatus = () => {
  const user = sessionStorage.getItem("accessToken");
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/get-project-data?userEmail=${userEmail}`)
      .then((res) => {
        setProjectData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching project data: ", error);
      });
  }, []);

  return (
    <div>
      <h1>Project Status</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Project Title</th>
            <th>Client</th>
            <th>Category</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Project Manager</th>
            <th>Team Lead</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projectData.map((project, index) => (
            <tr key={index}>
              <td>{project.projectTitle}</td>
              <td>{project.clientName}</td>
              <td>{project.projectCategory}</td>
              <td>{project.projectDescription}</td>
              <td>{new Date(project.startDate).toLocaleDateString()}</td>
              <td>{new Date(project.endDate).toLocaleDateString()}</td>
              <td>{project.projectManagerEmail}</td>
              <td>{project.teamLead}</td>
              <td>{project.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectStatus;
