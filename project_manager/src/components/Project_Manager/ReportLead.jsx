import axios from "axios";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import "./PM.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReportLead = () => {
  const user = sessionStorage.getItem("user");
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const [tasks, setTasks] = useState([]);

  const handleStatusChange = (taskId, newStatus) => {
    // Send a request to update the status in the database
    axios
      .put(`http://localhost:3001/update-task-status/${taskId}`, {
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

        fetchAssignedTasks();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchAssignedTasks = () => {
    axios
      .get(`http://localhost:3001/get-assignedtasks-pm?userEmail=${userEmail}`)
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchAssignedTasks();
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
      <h4 className="ms-3 mt-2 mb-3">Project Status</h4>
      {tasks.length === 0 ? (
        <p className="ms-4 mt-3">No Projects Available</p>
      ) : (
        <table className="table custom-table table-striped border table-report ms-3">
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
                    className="form-select "
                    value={task.status || ""}
                    onChange={(e) =>
                      handleStatusChange(task._id, e.target.value)
                    }
                  >
                    <option value="Received">Received</option>
                    <option value="Started">Started</option>
                    <option value="Assigned to Team_Lead">
                      Assigned to Team_Lead
                    </option>
                    <option value="InProgress">InProgress</option>
                    <option value="DeleyInProgress">Delay In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportLead;
