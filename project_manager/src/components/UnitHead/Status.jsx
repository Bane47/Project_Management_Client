import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import './UnitHead.css'; // Import your CSS file for styling

const Status = () => {
  const user = sessionStorage.getItem('user');
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
        <h3 className='ms-3 mt-2'>Assigned Tasks</h3>
        {tasks.length === 0 ?(
          <p>No projects Available</p>
        ):(
        <div className="table-responsive table-report  ms-3 mt-3">
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
                  <td className='text-primary'>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
};

export default Status;
