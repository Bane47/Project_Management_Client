import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const Tasks = () => {
  const user = sessionStorage.getItem("accessToken");
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const [taskData, setTaskData] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getTask-Data?userEmail=${userEmail}`)
      .then((res) => {
        const tasks = res.data.taskData;
        setTaskData(tasks);
        // Filter tasks based on the "deleted" status
        const current = tasks.filter((task) => !task.deleted);
        const completed = tasks.filter((task) => task.deleted);
        setCurrentTasks(current);
        setCompletedTasks(completed);
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
          <div className="col-md-6">
            <h3>Current Tasks</h3>
            {currentTasks.map((task, index) => (
              <div key={index} className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{task.taskName}</h5>
                  <p className="card-text"><strong>Project Name:</strong> {task.projectName}</p>
                  <p className="card-text"><strong>Status:</strong> {task.status}</p>
                  <p className="card-text"><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                  <p className="card-text"><strong>Team Lead Email:</strong> {task.TeamLeadEmail}</p>
                  {/* Add other relevant task details here */}
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-6">
            <h3>Completed Tasks</h3>
            {completedTasks.map((task, index) => (
              <div key={index} className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{task.taskName}</h5>
                  <p className="card-text"><strong>Project Name:</strong> {task.projectName}</p>
                  <p className="card-text"><strong>Status:</strong> {task.status}</p>
                  <p className="card-text"><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                  <p className="card-text"><strong>Team Lead Email:</strong> {task.TeamLeadEmail}</p>
                  {/* Add other relevant task details here */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
            }

export default Tasks;
