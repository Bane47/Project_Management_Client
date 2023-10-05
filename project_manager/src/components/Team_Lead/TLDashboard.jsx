import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faClipboardList,
  faChartBar,
  faGear,
  faBell,
  faNewspaper, 
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "../Project_Manager/PMDashboard";



const TLDashboard = () => {
  return (
    <div className="container mt-5 table-report">
      <div className="row">
        <div className="col-md-4 mb-4">
          <Card
            to="/myprojects"
            icon={faTasks}
            title="My Projects"
            description="View your projects."
          />
        </div>

        <div className="col-md-4 mb-4">
          <Card
            to="/tlassigntasks"
            icon={faClipboardList}
            title="Assign Tasks"
            description="Assign tasks to team members."
          />
        </div>

        {/* Notifications */}
        <div className="col-md-4 mb-4">
          <Card
            to="/taskstatus"
            icon={faBell}
            title="Task Status"
            description="Stay updated with task Updates."
          />
        </div>


        <div className="col-md-4 mb-4">
          <Card
            to="/reportmanager"
            icon={faChartBar}
            title="Report Manager"
            description="View and manage reports."
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

        {/* Announcements */}
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

export default TLDashboard;
