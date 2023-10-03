import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import {Link} from "react-router-dom"
import { useProjectContext } from '../../context/ProjectContext';

const YourProject = () => {
  const user = sessionStorage.getItem('user');
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const [tasks, setTasks] = useState([]);
  const { setProjectData } = useProjectContext();

  useEffect(() => {
    axios.get(`http://localhost:3001/get-assignedtasks-pm?userEmail=${userEmail}`)
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userEmail]);
  const handleClick = (task) => {
    console.log(task); // Add this line to check the task object
    setProjectData({
      projectTitle: task.projectTitle,
      projectDescription: task.projectDescription,
      clientName:task.clientName,
      clientEmail:task.clientEmail,
      clientSkypeId:task.clientSkypeId
    });
    console.log(task.projectTitle,task.clientName,task.clientEmail,task.clientSkypeId);
  };
  

  return (
    <div>
      <h4 className='ms-3 mt-3'>Your Project</h4>
      <div className="row">
        {tasks.map((task, index) => (
          <div key={index} className="col-md-4">
            <div className="card ms-3 mt-3"   style={{ height: '100%',width:"100%" }}>
              <div className="card-body pb-3">
              <h5 className="card-title">Task {index + 1}</h5>
              <p className="card-text">Project Title: {task.projectTitle}</p>
              <p className="card-text">Project Description: {task.projectDescription}</p>
              <p className="card-text">Project Manager: {task.projectManager}</p>
              <p className="card-text">UnitHeadEmail: {task.UnitHeadEmail}</p>
              <p className="card-text">ManagerEmail: {task.managerEmail}</p>
              <p className="card-text">Client Name: {task.clientName}</p>
                <p className="card-text">Client Email: {task.clientEmail}</p>
                <p className="card-text">Client SkypeID: {task.clientSkypeId}</p>
             
              </div>
              <Link to="/addproject" className="btn add-employeebtn text-white w-50 mb-3 ms-2" onClick={()=>handleClick(task)}>AddProject</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourProject;
