import React from 'react'
import { faGear, faNewspaper, faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import { Card } from '../Project_Manager/PMDashboard';

const UnitHeadDashboard = () => {
  return (
    <div className="container mt-5">
      <div className="row me-3">
        <div className="col-md-4 mb-4">
          <Card
            to="/assignproject"
            icon={faPlus}
            title="Assign New Project"
            description="Click here >>"
          />
        </div>

        <div className="col-md-4 mb-4">
          <Card
            to="/status"
            icon={faUpload}
            title="Project Status"
            description="Click here >>"
          />
        </div>

        <div className="col-md-4 mb-4">
          <Card
            to="/settings"
            icon={faGear}
            title="Settings"
            description="Click here >>"
          />
        </div>

        <div className="col-md-4 mb-4">
          <Card
            to="/currentannouncements"
            icon={faNewspaper}
            title="Announcements"
            description="Click here >>"
          />
        </div>
      </div>
    </div>
  )
}

export default UnitHeadDashboard;
