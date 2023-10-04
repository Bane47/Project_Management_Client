import React from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faPlus, faUpload,
} from "@fortawesome/free-solid-svg-icons";

const UnitHeadDashboard = () => {
  return (
    <div className="container mt-5">
    <div className="row">
      <div className="col-md-4 mb-4">
        <Link to="/assignproject" className="link-no-underline">
          <div className="card text-center">
            <div className="card-body">
            <span className="text-primary"> <FontAwesomeIcon icon={faPlus} size="2x" className="mb-2" /></span>
              <h5 className="card-title">Assign New Project</h5>
              <p className="card-text">Click here&gt;&gt;</p>
            </div>
          </div>
        </Link>
      </div> 
      <div className="col-md-4 mb-4">
        <Link to="/status" className="link-no-underline">
          <div className="card text-center">
            <div className="card-body">
            <span className="text-primary"> <FontAwesomeIcon icon={faUpload} size="2x" className="mb-2" /></span>
              <h5 className="card-title">ProjectStatus</h5>
              <p className="card-text">Click here&gt;&gt;</p>
            </div>
          </div>
        </Link>
      </div> 
      <div className="col-md-4 mb-4">
        <Link to="/settings" className="link-no-underline">
          <div className="card text-center">
            <div className="card-body">
            <span className="text-primary"> <FontAwesomeIcon icon={faGear} size="2x" className="mb-2" /></span>
              <h5 className="card-title">Settings</h5>
              <p className="card-text">Click here&gt;&gt;</p>
            </div>
          </div>
        </Link>
      </div> 
      <div className="col-md-4 mb-4">
        <Link to="/currentannouncements" className="link-no-underline">
          <div className="card text-center">
            <div className="card-body">
            <span className="text-primary"> <FontAwesomeIcon icon={faGear} size="2x" className="mb-2" /></span>
              <h5 className="card-title">Announcements</h5>
              <p className="card-text">Click here&gt;&gt;</p>
            </div>
          </div>
        </Link>
      </div> 
      
      </div>
</div>
  )
}

export default UnitHeadDashboard