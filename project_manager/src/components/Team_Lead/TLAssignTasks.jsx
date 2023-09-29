import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import EmployeesList from './EmployeesList';

const  TLAssignTasks = () => {
  const user = sessionStorage.getItem('accessToken');
  const decoded = jwtDecode(user);
  const TeamLeadEmail = decoded.email;

  const [projectsData, setProjectsData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployeeEmail, setSelectedEmployeeEmail] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);

  const [formData, setFormData] = useState({
    projectName: '', // Initialize to an empty string
    taskName: '',
    taskDescription: '',
    dueDate: '',
    employeeName: '', // Initialize to an empty string
    employeeEmail: '', // Initialize to an empty string
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/get-assignedtasks-tl?userEmail=${TeamLeadEmail}`)
      .then((res) => {
        setProjectsData(res.data);
        console.log("ipo",res.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get("http://localhost:3001/getEmp-data")
      .then((res) => {
        const filteredEmployees = res.data.filter(
          (employee) =>
            employee.Designation === "Developer" ||
            employee.Designation === "Designer" ||
            employee.Designation === "Tester"
        );
        setEmployeeData(filteredEmployees);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [TeamLeadEmail]);

  const handleAddTaskClick = (projectTitle, employeeName, employeeEmail) => {
    setSelectedProject(projectTitle);
    setSelectedEmployee(employeeName);
    setSelectedEmployeeEmail(employeeEmail);

    // Set the project name, employee name, and email in the formData
    setFormData({
      ...formData,
      projectName: projectTitle || '', // Ensure it's not null or undefined
      employeeName: employeeName || '', // Ensure it's not null or undefined
      employeeEmail: employeeEmail || '', // Ensure it's not null or undefined
    });
  };

  return (
    <div>
      <h4>Your Projects</h4>
      <div className="row">
        {projectsData.map((project, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Project Title: {project.projectTitle}</h5>
                <button
                  onClick={() => handleAddTaskClick(project.projectTitle, project.employeeName, project.employeeEmail)}
                  className="btn add-employeebtn text-white"
                >
                  Assign Task
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <EmployeesList
          selectedProject={selectedProject}
          userEmail={TeamLeadEmail}
          selectedEmployee={selectedEmployee}
          selectedEmployeeEmail={selectedEmployeeEmail}
          employeeData={employeeData}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default TLAssignTasks;
