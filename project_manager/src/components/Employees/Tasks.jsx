import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const Tasks = () => {
  const user = sessionStorage.getItem("user");
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const [taskData, setTaskData] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false); // New state

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

  const handleShowCompletedTasks = () => {
    setShowCompletedTasks(true);
  };

  const handleShowCurrentTasks = () => {
    setShowCompletedTasks(false);
  };

  return (
    <div>
      <h2 className="mt-2 text-center">Tasks List</h2>
      <div className="container table-report mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-md-end">
              {showCompletedTasks ? (
                <button className="btn btn-secondary" onClick={handleShowCurrentTasks}>
                  Current Tasks
                </button>
              ) : (
                <button className="btn add-employeebtn text-white" onClick={handleShowCompletedTasks}>
                  Completed Tasks
                </button>
              )}
            </div>
            {showCompletedTasks ? (
              <h4>Completed Tasks</h4>
            ) : (
              <h4>Current Tasks</h4>
            )}
            {showCompletedTasks
              ? completedTasks.length === 0 ? (
                  <p>No completed tasks assigned.</p>
                ) : (
                  completedTasks.map((task, index) => (
                    <div key={index} className="card mb-4">
                      <div className="card-body">
                        <h5 className="card-title">{task.taskName}</h5>
                        <p className="card-text"><strong>Project Name:</strong> {task.projectName}</p>
                        <p className="card-text"><strong>Status:</strong> {task.status}</p>
                        <p className="card-text"><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                        <p className="card-text"><strong>Team Lead Email:</strong> {task.TeamLeadEmail}</p>
                        <p className="card-text"><strong>Team Status:</strong> {task.status}</p>
                      </div>
                    </div>
                  ))
                )
              : currentTasks.length === 0 ? (
                  <p>No current tasks assigned.</p>
                ) : (
                  currentTasks.map((task, index) => (
                    <div key={index} className="card mb-4">
                      <div className="card-body">
                        <h5 className="card-title">{task.taskName}</h5>
                        <p className="card-text"><strong>Project Name:</strong> {task.projectName}</p>
                        <p className="card-text"><strong>Status:</strong> {task.status}</p>
                        <p className="card-text"><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                        <p className="card-text"><strong>Team Lead Email:</strong> {task.TeamLeadEmail}</p>
                      </div>
                    </div>
                  ))
                )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
