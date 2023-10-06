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
      <h4 className=' mb-3 mt-3 text-center'>Your Projects</h4>
      {projects.length === 0 ? (
        <p className=' mt-3'>No Projects Available</p>
      ) : (
        <div className="row mx-3 mt-3">
          {projects.map((project, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="project-card">
                <div className="project-card-inner">
                  <div className="project-card-front">
                    <h5 className="project-card-title px-5"><strong>Project Title:</strong> {project.projectTitle}</h5>
                    <p className="project-card-text project-description"><strong>Project Description:</strong> {project.projectDescription}</p>
                    
                  </div>
                  <div className="project-card-back">
                    <p className="project-card-text"><strong>Team Lead:</strong> {project.teamLead}</p>
                    <p className="project-card-text"><strong>Status: </strong>{project.status}</p>
                    <p className="project-card-text"><strong>Client Name:</strong> {project.clientName}</p>
                    <p className="project-card-text"><strong>Client Email:</strong> {project.clientEmail}</p>
                    <p className="project-card-text"><strong>Client Skype ID:</strong> {project.clientSkypeId}</p>
                    <p className="project-card-text"><strong>Project Domain:</strong> {project.projectDomain}</p>
                    <p className="project-card-text"><strong>Project Category:</strong> {project.projectCategory}</p>
                    <p className="project-card-text"><strong>Start Date:</strong> {new Date(project.startDate).toLocaleString()}</p>
                    <p className="project-card-text"><strong>End Date:</strong> {new Date(project.endDate).toLocaleString()}</p>
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
