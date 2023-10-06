import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import TaskModal from "./TaskModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeesList = ({
  userEmail,
  employeeData,
  formData,
  setFormData,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [loading,setLoading]=useState(false)

  const navigate=useNavigate()

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddTask = () => {
    const taskData = {
      projectName: formData.projectName, // Include projectName in taskData
      taskName: formData.taskName,
      taskDescription: formData.taskDescription,
      dueDate: formData.dueDate,
      TeamLeadEmail: userEmail,
      employeeName: formData.employeeName,
      employeeEmail: formData.employeeEmail,
    };

    axios
      .post("http://localhost:3001/add-task", taskData)
      .then((res) => {

        setLoading(true)
        toast.success("Task Assigned SuccessFully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setFormData({
          projectName: "",
          taskName: "",
          taskDescription: "",
          dueDate: "",
          employeeName: "",
          employeeEmail: "",
        });
        closeModal();
        navigate('/taskstatus')
      })
      .catch((error) => {
        setLoading(false)
        console.error("Error adding task:", error);
      })
      .finally(()=>{
        setLoading(false)
      });
  };

  return (
    <div>
      <h4 className="ms-3">Employees List</h4>
      <p className="alert alert-info w-75 ms-3">The Tasks Will Be Also Sent to the Employee MailID Also!</p>
      <div className="row me-3">
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
        {employeeData.map((employee, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card  ms-4 mt-3">
              <div className="card-body">
                <h5 className="card-title">Name: {employee.EmployeeName}</h5>
                <p className="card-text">Designation: {employee.Designation}</p>
                <p className="card-text">Domain: {employee.Domain1}</p>
                <button
                  onClick={() => {
                    openModal();
                    setFormData({
                      ...formData,
                      employeeName: employee.EmployeeName || "", 
                      employeeEmail: employee.Email || "",
                    });
                  }}
                  className="btn add-employeebtn text-white"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <TaskModal
        showModal={showModal}
        closeModal={closeModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleAddTask={handleAddTask}
        loading={loading}
      />
    </div>
  );
};

export default EmployeesList;
