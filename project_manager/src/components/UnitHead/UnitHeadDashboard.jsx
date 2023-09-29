import React from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
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
              <p className="card-text">Click here.</p>
            </div>
          </div>
        </Link>
      </div> 
      </div>
</div>
  )
}

export default UnitHeadDashboard