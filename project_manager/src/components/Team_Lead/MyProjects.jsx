import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

import '../Project_Manager/PM.css';

const MyProject = () => {
  const user = sessionStorage.getItem('user');
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/get-assignedtasks-tl?userEmail=${userEmail}`)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userEmail]);

  return (
    <div>
      <h4 className='ms-4 mb-3 mt-3 text-center'>Your Projects</h4>
      {projects.length === 0 ? (
        <p className='ms-4 mt-3'>No Projects Available</p>
      ) : (
        <div className="row ms-4 mt-3">
          {projects.map((project, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="project-card">
                <div className="project-card-inner">
                  <div className="project-card-front">
                    <h5 className="project-card-title">Project Title: {project.projectTitle}</h5>
                    <p className="project-card-text project-description">Project Description: {project.projectDescription}</p>
                    
                  </div>
                  <div className="project-card-back">
                    <p className="project-card-text">Team Lead: {project.teamLead}</p>
                    <p className="project-card-text">Status: {project.status}</p>
                    <p className="project-card-text">Client Name: {project.clientName}</p>
                    <p className="project-card-text">Client Email: {project.clientEmail}</p>
                    <p className="project-card-text">Client Skype ID: {project.clientSkypeId}</p>
                    <p className="project-card-text">Project Domain: {project.projectDomain}</p>
                    <p className="project-card-text">Project Category: {project.projectCategory}</p>
                    <p className="project-card-text">Start Date: {new Date(project.startDate).toLocaleString()}</p>
                    <p className="project-card-text">End Date: {new Date(project.endDate).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProject;
