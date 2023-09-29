import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

const ReportManager = () => {
  const user = sessionStorage.getItem('accessToken');
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const [tasks, setTasks] = useState([]);

  const handleStatusChange = (taskId, newStatus) => {
    // Send a request to update the status in the database
    axios
      .put(`http://localhost:3001/update-task-status-tl/${taskId}`, { status: newStatus })
      .then((res) => {
        // Update the tasks state with the updated data
        setTasks((prevTasks) =>
          prevTasks.map((task) => {
            if (task._id === taskId) {
              return { ...task, status: newStatus };
            }
            return task;
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/get-assignedtasks-tl?userEmail=${userEmail}`)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userEmail]);

  return (
    <div>
      <h4>Project Status</h4>
      <div className="row">
        {tasks.map((task) => (
          <div key={task._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Project Title: {task.projectTitle}</h5>
                <p className="card-text">Client Name: {task.clientName}</p>
                <p className="card-text">Team Lead: {task.teamLead}</p>
                <p className="card-text">
                  Status:
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  >
                    <option value="Assigned">Assigned</option>
                    <option value="Delay In Progress">Delay In Progress</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportManager;
