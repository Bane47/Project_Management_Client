import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import './UnitHead.css'; // Import your CSS file for styling

const Status = () => {
  const user = sessionStorage.getItem('accessToken');
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/get-assignedtasks?userEmail=${userEmail}`) //This api is in assigned Task file
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
      <div>
        <h3>Assigned Tasks</h3>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Project Title</th>
                <th>Project Description</th>
                <th>Project Manager</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.projectTitle}</td>
                  <td>{task.projectDescription}</td>
                  <td>{task.projectManager}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Status;
