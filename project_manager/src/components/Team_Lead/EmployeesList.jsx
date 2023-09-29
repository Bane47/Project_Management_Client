import React, { useState } from 'react';
import axios from 'axios';
import TaskModal from './TaskModal';

const EmployeesList = ({ selectedProject, userEmail, selectedEmployee, selectedEmployeeEmail, employeeData, formData, setFormData }) => {
  const [showModal, setShowModal] = useState(false);

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
  
    axios.post('http://localhost:3001/add-task', taskData)
      .then((res) => {
        console.log('Task added successfully:', res.data);
        setFormData({
          projectName:formData.ProjectName,
          taskName: '',
          taskDescription: '',
          dueDate: '',
          employeeName: '',
          employeeEmail: '',
        });
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });


  
    closeModal();
  };
  

  return (
    <div>
      <h4>Employees List</h4>
      <div className="row">
        {employeeData.map((employee, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Name: {employee.EmployeeName}</h5>
                <p className="card-text">Designation: {employee.Designation}</p>
                <p className="card-text">Domain: {employee.Domain1}</p>
                <button
                  onClick={() => {
                    openModal();
                    // Set the employee name and email in the formData
                    setFormData({
                      ...formData,
                      employeeName: employee.EmployeeName || '', // Ensure it's not null or undefined
                      employeeEmail: employee.Email || '', // Ensure it's not null or undefined
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
      />
    </div>
  );
};

export default EmployeesList;
