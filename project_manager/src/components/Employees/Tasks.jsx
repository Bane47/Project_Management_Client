import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const Tasks = () => {
  const user = sessionStorage.getItem("accessToken");
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getTask-Data?userEmail=${userEmail}`)
      .then((res) => {
        setTaskData(res.data.taskData);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userEmail]);

  return (
    <div>
      <h2>Tasks List</h2>
      <div className="container">
        <div className="row">
          {taskData.map((task, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{task.taskName}</h5>
                  <p className="card-text"><strong>Project Name:</strong> {task.projectName}</p>
                  <p className="card-text"><strong>Status:</strong> {task.status}</p>
                  <p className="card-text"><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                  <p className="card-text"><strong>Team Lead Email:</strong> {task.TeamLeadEmail}</p>
                  <p className="card-text"><strong>Task Name:</strong> {task.taskName}</p>
                  <p className="card-text"><strong>Task Description:</strong> {task.taskDescription}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
