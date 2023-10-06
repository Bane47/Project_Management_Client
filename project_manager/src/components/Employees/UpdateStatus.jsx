import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateStatus = () => {
  const user = sessionStorage.getItem("user");
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const [taskData, setTaskData] = useState([]);
  const [showSendReportModal, setShowSendReportModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [reportText, setReportText] = useState("");
  const [teamLeadEmails, setTeamLeadEmails] = useState({}); // Store TeamLeadEmails as an object

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/getTask-Data?userEmail=${userEmail}&deleted=false`
      ) // Add the deleted=false query parameter
      .then((res) => {
        // Filter out tasks where deleted is true
        const filteredTaskData = res.data.taskData.filter(
          (task) => !task.deleted
        );
        setTaskData(filteredTaskData);
        const teamLeadEmailsObj = {};
        filteredTaskData.forEach((task) => {
          teamLeadEmailsObj[task._id] = task.TeamLeadEmail;
        });
        setTeamLeadEmails(teamLeadEmailsObj);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userEmail]);

  const handleStatusChange = async (taskId, status) => {
    try {
      // Send a PUT request to update the task status in the backend
      await axios.put(`http://localhost:3001/updateTaskStatus/${taskId}`, {
        status: status,
      });
      toast('Task Status Updated to Team Lead!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      // Update the UI with the new status
      const updatedTaskData = taskData.map((task) => {
        if (task._id === taskId) {
          return { ...task, status: status };
        }
        return task;
      });

      setTaskData(updatedTaskData);
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  const openSendReportModal = (taskId) => {
    setSelectedTaskId(taskId);
    setShowSendReportModal(true);
  };

  const closeSendReportModal = () => {
    setSelectedTaskId("");
    setReportText("");
    setShowSendReportModal(false);
  };

  const handleSendReport = async () => {
    try {
      toast('Sent Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      await axios.post(`http://localhost:3001/sendReport`, {
        taskId: selectedTaskId,
        reportText: reportText,
        teamLeadEmail: teamLeadEmails[selectedTaskId], 
        userEmail: userEmail,
        
      });

      closeSendReportModal();
    } catch (err) {
      console.error("Error sending report:", err);
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h2 className="ms-3 mt-3">Update Status</h2>
      {taskData.length === 0 ? (
        <p className="ms-3 mt-3">No Projects Found</p>
      ) : (
        <table className="table custom-table table-bordered table-report ms-3 mt-3">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Task Description</th>
              <th>Project Name</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {taskData.map((task, index) => (
              <tr key={index}>
                <td>{task.taskName}</td>
                <td>{task.taskDescription}</td>
                <td>{task.projectName}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td>
                  <div className="form-group">
                    <select
                      className="form-control"
                      onChange={(e) =>
                        handleStatusChange(task._id, e.target.value)
                      }
                      value={task.status}
                    >
                      <option value="Started">Started</option>
                      <option value="On Progress">On Progress</option>
                      <option value="Delayed in Progress">
                        Delayed in Progress
                      </option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </td>
                <td>
                  <button
                    className="btn add-employeebtn text-white"
                    onClick={() => openSendReportModal(task._id)}
                  >
                    <FontAwesomeIcon icon={faEnvelope} /> Send Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* SendReport Modal */}
      {showSendReportModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Send Report</h5>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="reportText">Report Text</label>
                  <textarea
                    id="reportText"
                    className="form-control"
                    rows="4"
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeSendReportModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn add-employeebtn text-white"
                  onClick={handleSendReport}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateStatus;
