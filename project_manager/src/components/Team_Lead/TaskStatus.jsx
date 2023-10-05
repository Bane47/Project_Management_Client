import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

const TaskStatus = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    const decoded = jwtDecode(user);
    const TeamLeadEmail = decoded.email;

    axios
      .get(
        `http://localhost:3001/get-task-status?TeamLeadEmail=${TeamLeadEmail}`
      )
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
        toast.success("Task Deleted Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTaskData((prevTaskData) =>
          prevTaskData.filter((task) => task._id !== taskId)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
      <Tooltip id="my-tooltip" />
      <div className="row">
        <div className="col-7">
          <h1 className="ms-3 mt-3">Task Status</h1>
        </div>
        <div className="col-5 mt-3">
          <Link
            to="/completedtasks"
            className="btn add-employeebtn text-white float-end me-5"
          >
            Completed Tasks
          </Link>
        </div>
      </div>
      {taskData.length === 0 ? (
        <p className="ms-3 mt-3">No Tasks Available</p>
      ) : (
        <table className="table table-bordered table-report ms-3 mt-3">
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
                  {task.status === "Completed" ? ( // Conditionally render the button
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(task._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger btn-sm"
                      data-tooltip-id="my-tooltip" data-tooltip-content="Hello world!"
                      disabled // Disable the button
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskStatus;
