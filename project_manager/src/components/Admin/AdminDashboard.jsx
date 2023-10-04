import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faMicrophone,
  faNewspaper,
  faUserPlus,
  faUsers,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

const AdminDashboard = () => {
  const [numEmployees,setNumEmployees]=useState("")

  useEffect(()=>{
    axios.get("http://localhost:3001/getEmp-data")
    .then((res)=>{
      setNumEmployees(res.data.length)
      console.log(res.data.length);
    })
    .catch((err)=>{
      console.log(err)
    })
  })



  return (
    <div className="container mt-5">
      <div className="row table-report">
        <div className="col-md-4 mb-4">
          <Link to="/addemployee" className="link-no-underline">
            <div className="card text-center">
              <div className="card-body">
              <span className="text-primary"> <FontAwesomeIcon icon={faUserPlus} size="2x" className="mb-2" /></span>
                <h5 className="card-title">Add New Employee</h5>
                <p className="card-text">Click here&gt;&gt;</p>
              </div>
            </div>
          </Link>
        </div>

       
        <div className="col-md-4 mb-4">
          <Link to="/employees">
            {" "}
            <div className="card text-center">
              <div className="card-body">
               <span className="text-primary"><FontAwesomeIcon icon={faUsers} size="2x" className="mb-2" /></span> 
                <h5 className="card-title">Number of Employees</h5>
                <p className="card-text">{numEmployees}</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4 mb-4">
          <Link to="/settings">
            {" "}
            <div className="card text-center">
              <div className="card-body">
               <span className="text-primary"><FontAwesomeIcon icon={faGear} size="2x" className="mb-2" /></span> 
                <h5 className="card-title">Number of Employees</h5>
                <p className="card-text">{numEmployees}</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4 mb-4">
          <Link to="/announcement">
            {" "}
            <div className="card text-center">
              <div className="card-body">
               <span className="text-primary"><FontAwesomeIcon icon={faNewspaper} size="2x" className="mb-2" /></span> 
                <h5 className="card-title">Make Announcement</h5>
                <p className="card-text">Click Here &gt;&gt;</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
