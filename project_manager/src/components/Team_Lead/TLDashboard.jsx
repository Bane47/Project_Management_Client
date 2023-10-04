import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faClipboardList,
  faChartBar,
  faGear,
  // Unique icon for "Calendar"
  faBell,
  faNewspaper, // Unique icon for "Notifications"
  // Unique icon for "Profile"
} from "@fortawesome/free-solid-svg-icons";

const TLDashboard = () => {
  return (
    <div className="container mt-5 table-report">
      <div className="row">
        {/* My Projects */}
        <div className="col-md-4 mb-4">
          <Link to="/myprojects" className="link-no-underline">
            <div className="card text-center">
              <div className="card-body">
                <span className="text-primary">
                  <FontAwesomeIcon icon={faTasks} size="2x" className="mb-2" />
                </span>
                <h5 className="card-title">My Projects</h5>
                <p className="card-text">View your projects.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Assign Tasks */}
        <div className="col-md-4 mb-4">
          <Link to="/tlassigntasks" className="link-no-underline">
            <div className="card text-center">
              <div className="card-body">
                <span className="text-primary">
                  <FontAwesomeIcon
                    icon={faClipboardList}
                    size="2x"
                    className="mb-2"
                  />
                </span>
                <h5 className="card-title">Assign Tasks</h5>
                <p className="card-text">Assign tasks to team members.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Notifications */}
        <div className="col-md-4 mb-4">
          <Link to="/taskstatus" className="link-no-underline">
            <div className="card text-center">
              <div className="card-body">
                <span className="text-primary">
                  <FontAwesomeIcon icon={faBell} size="2x" className="mb-2" />
                </span>
                <h5 className="card-title">Task Status</h5>
                <p className="card-text">Stay updated with task Updates.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Report Manager */}
        <div className="col-md-4 mb-4">
          <Link to="/reportmanager" className="link-no-underline">
            <div className="card text-center">
              <div className="card-body">
                <span className="text-primary">
                  <FontAwesomeIcon
                    icon={faChartBar}
                    size="2x"
                    className="mb-2"
                  />
                </span>
                <h5 className="card-title">Report Manager</h5>
                <p className="card-text">View and manage reports.</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4 mb-4">
          <Link to="/settings" className="link-no-underline">
            <div className="card text-center">
              <div className="card-body">
                <span className="text-primary">
                  <FontAwesomeIcon icon={faGear} size="2x" className="mb-2" />
                </span>
                <h5 className="card-title">Settings</h5>
                <p className="card-text">Click Here</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4 mb-4">
        <Link to="/currentannouncements" className="link-no-underline">
          <div className="card text-center">
            <div className="card-body">
            <span className="text-primary"> <FontAwesomeIcon icon={faNewspaper} size="2x" className="mb-2" /></span>
              <h5 className="card-title">Announcements</h5>
              <p className="card-text">Click here&gt;&gt;</p>
            </div>
          </div>
        </Link>
      </div> 
      </div>
    </div>
  );
};

export default TLDashboard;
