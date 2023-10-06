import axios from "axios";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReportManager = () => {
  const user = sessionStorage.getItem("user");
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;
  console.log(userEmail);

  const [tasks, setTasks] = useState([]);

  const handleStatusChange = (taskId, newStatus) => {
    axios
      .put(`http://localhost:3001/update-task-status-tl/${taskId}`, {
        status: newStatus,
      })
      .then((res) => {
        toast.success("Status Updated Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        updateTaskStatus(taskId, newStatus); // Call the function to update status
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateTaskStatus = (taskId, newStatus) => {
    getAssignedTasks()
  };

  const getAssignedTasks = () => {
    axios
      .get(`http://localhost:3001/get-assignedtasks-tl?userEmail=${userEmail}`)
      .then((res) => {
        setTasks(res.data || []);
        console.log("tl data", res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAssignedTasks(); 
  }, [userEmail]);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {tasks.length === 0 ? (
        <p className="ms-3 mt-3">No Tasks Available</p>
      ) : (
        <div>
          <h4 className="ms-3 mt-3">Project Status</h4>
          <div className="row table-report ms-1 mt-3">
            {tasks.map((task) => (
              <div key={task._id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      Project Title: {task.projectTitle}
                    </h5>
                    <p className="card-text">Client Name: {task.clientName}</p>
                    <p className="card-text">Team Lead: {task.teamLead}</p>
                    <p className="card-text">
                      Status:
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task._id, e.target.value)
                        }
                      >
                        <option value="Assigned">Assigned</option>
                        <option value="Received">Received</option>
                        <option value="Tasks_Assigned">Tasks_Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Delay In Progress">
                          Delay In Progress
                        </option>
                        <option value="Completed">Completed</option>
                      </select>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportManager;
