import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const TaskStatus = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const user = sessionStorage.getItem('accessToken');
    const decoded = jwtDecode(user);
    const TeamLeadEmail = decoded.email;
  
    axios
      .get(`http://localhost:3001/get-task-status?TeamLeadEmail=${TeamLeadEmail}`)
      .then((response) => {
        const { taskData } = response.data;
        const filteredTasks = taskData.filter((task) => !task.deleted);
        setTaskData(filteredTasks);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  

  const handleDelete = (taskId) => {
    axios
      .delete(`http://localhost:3001/delete-task/${taskId}`)
      .then(() => {
        // After successful deletion, update the taskData state
        setTaskData((prevTaskData) => prevTaskData.filter((task) => task._id !== taskId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Task Status</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Project Name</th>
            <th>Assigned To (Employee Name)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taskData.map((task, index) => (
            <tr key={index}>
              <td>{task.taskName}</td>
              <td>{task.projectName}</td>
              <td>{task.employeeName}</td>
              <td>{task.status}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(task._id)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskStatus;
