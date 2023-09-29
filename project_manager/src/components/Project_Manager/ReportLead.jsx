import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

const ReportLead = () => {
  const user = sessionStorage.getItem('accessToken');
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const [tasks, setTasks] = useState([]);

  const handleStatusChange = (taskId, newStatus) => {
    // Send a request to update the status in the database
    axios.put(`http://localhost:3001/update-task-status/${taskId}`, { status: newStatus })
      .then((res) => {
        // Update the tasks state with the updated data
        setTasks((prevTasks) => prevTasks.map((task) => {
          if (task._id === taskId) {
            return { ...task, status: newStatus };
          }
          return task;
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
      <h4>Project Status</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Project Title</th>
            <th>Project Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.projectTitle}</td>
              <td>{task.projectDescription}</td>
              <td>
                <select
                  className="form-select"
                  value={task.status || ''}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                >
                  <option value="Received">Received</option>
                  <option value="Started">Started</option>
                  <option value="InProgress">InProgress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportLead;