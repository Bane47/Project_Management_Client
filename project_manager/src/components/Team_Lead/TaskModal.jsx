import React from 'react';

const TaskModal = ({ showModal, closeModal, formData, handleInputChange, handleAddTask,loading }) => {
  
  return (
    <div
      className={`modal ${showModal ? 'show' : ''}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: showModal ? 'block' : 'none' }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Task</h5>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                className="form-control"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                disabled
              />
            </div>
             <div className="form-group">
              <label htmlFor="employeeName">Employee Name</label>
              <input
                type="text"
                className="form-control"
                id="employeeName"
                name="employeeName"
                value={formData.employeeName}
                readOnly 
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="employeeEmail">Employee Email</label>
              <input
                type="text"
                className="form-control"
                id="employeeEmail"
                name="employeeEmail"
                value={formData.employeeEmail}
                readOnly
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskName">Task Name</label>
              <input
                type="text"
                className="form-control"
                id="taskName"
                name="taskName"
                value={formData.taskName}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskDescription">Task Description</label>
              <textarea
                className="form-control"
                id="taskDescription"
                name="taskDescription"
                value={formData.taskDescription}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                className="form-control"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
           
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn add-employeebtn text-white"
              onClick={handleAddTask}
              disabled={loading}
            >
              {loading? "Assigning" : "Assign"}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={closeModal}
              disabled={loading}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
