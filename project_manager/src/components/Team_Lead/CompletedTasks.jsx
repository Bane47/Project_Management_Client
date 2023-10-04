import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    const decoded = jwtDecode(user);
    const TeamLeadEmail = decoded.email;

    axios
      .get(`http://localhost:3001/get-task-status?TeamLeadEmail=${TeamLeadEmail}`)
      .then((response) => {
        const { taskData } = response.data;

        const completedTasks = taskData.filter((task) => task.deleted);

        setCompletedTasks(completedTasks);
        console.log(completedTasks);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h3 className="ms-3 mt-2">Completed Tasks</h3>
      {completedTasks.length === 0 ? (
        <p>No completed tasks available.</p>
      ) : (
        <table className="table table-bordered table-report ms-3 mt-3">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Project Name</th>
              <th>Assigned To (Employee Name)</th>
              <th>Due Date</th>
              <th>Task Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {completedTasks.map((task) => (
              <tr key={task._id}>
                <td>{task.taskName}</td>
                <td>{task.projectName}</td>
                <td>{task.employeeName}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td> {/* Display only the date */}
                <td>{task.taskDescription}</td>
                <td>{task.status}</td> {/* Place the status at the end */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CompletedTasks;
