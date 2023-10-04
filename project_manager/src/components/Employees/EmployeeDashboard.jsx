import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faBell,faGear,faNewspaper } from "@fortawesome/free-solid-svg-icons";

const EmployeeDashboard = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 mb-4">
          <Link to="/tasks" className="link-no-underline">
            <div className="card text-center">
              <div className="card-body">
                <span className="text-primary">
                  <FontAwesomeIcon
                    icon={faClipboardList}
                    size="2x"
                    className="mb-2"
                  />
                </span>
                <h5 className="card-title">My Tasks</h5>
                <p className="card-text">Assign tasks to team members.</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4 mb-4">
          <Link to="/updatestatus" className="link-no-underline">
            <div className="card text-center">
              <div className="card-body">
                <span className="text-primary">
                  <FontAwesomeIcon icon={faBell} size="2x" className="mb-2" />
                </span>
                <h5 className="card-title">Task Status</h5>
                <p className="card-text">Stay updated with task updates.</p>
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
                <span className="text-primary">
                  {" "}
                  <FontAwesomeIcon
                    icon={faNewspaper}
                    size="2x"
                    className="mb-2"
                  />
                </span>
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

export default EmployeeDashboard;
