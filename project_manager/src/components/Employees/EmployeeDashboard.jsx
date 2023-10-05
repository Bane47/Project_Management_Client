import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faBell, faGear, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../Project_Manager/PMDashboard";

const EmployeeDashboard = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 mb-4">
          <Card
            to="/tasks"
            icon={faClipboardList}
            title="My Tasks"
            description="Assign tasks to team members."
          />
        </div>

        <div className="col-md-4 mb-4">
          <Card
            to="/updatestatus"
            icon={faBell}
            title="Task Status"
            description="Stay updated with task updates."
          />
        </div>

        <div className="col-md-4 mb-4">
          <Card
            to="/settings"
            icon={faGear}
            title="Settings"
            description="Click Here"
          />
        </div>

        <div className="col-md-4 mb-4">
          <Card
            to="/currentannouncements"
            icon={faNewspaper}
            title="Announcements"
            description="Click here>>"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
