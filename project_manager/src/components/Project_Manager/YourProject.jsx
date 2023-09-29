import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

const YourProject = () => {
  const user = sessionStorage.getItem('accessToken');
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/get-assignedtasks-pm?userEmail=${userEmail}`)
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userEmail]);

  return (
    <div>
      <h4>Your Project</h4>
      <div className="row">
        {tasks.map((task, index) => (
          <div key={index} className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Task {index + 1}</h5>
                <p className="card-text">UnitHeadEmail: {task.UnitHeadEmail}</p>
                <p className="card-text">ManagerEmail: {task.managerEmail}</p>
                <p className="card-text">Project Description: {task.projectDescription}</p>
                <p className="card-text">Project Manager: {task.projectManager}</p>
                <p className="card-text">Project Title: {task.projectTitle}</p>
             
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourProject;
