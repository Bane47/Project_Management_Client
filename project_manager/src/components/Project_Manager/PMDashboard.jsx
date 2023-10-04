import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faPlus, faChartLine, faChartBar, faGear } from '@fortawesome/free-solid-svg-icons';

const PMDashboard = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 mb-4">
          <Link to="/yourprojects" className="link-no-underline">
            <div className="card text-center">
              <div className="card-body">
                <span className="text-primary">
                  <FontAwesomeIcon icon={faTasks} size="2x" className="mb-2" />
                </span>
                <h5 className="card-title">Your Projects</h5>
                <p className="card-text">View your projects.</p>
              </div>
            </div>
          </Link>
        </div>

        
        {/* Project Status */}
        <div className="col-md-4 mb-4">
          <Link to="/projectstatus" className="link-no-underline">
            <div className="card text-center">
              <div className="card-body">
                <span className="text-primary">
                  <FontAwesomeIcon icon={faChartLine} size="2x" className="mb-2" />
                </span>
                <h5 className="card-title">Project Status</h5>
                <p className="card-text">View project status.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Report Lead */}
        <div className="col-md-4 mb-4">
          <Link to="/reportlead" className="link-no-underline">
            <div className="card text-center">
              <div className="card-body">
                <span className="text-primary">
                  <FontAwesomeIcon icon={faChartBar} size="2x" className="mb-2" />
                </span>
                <h5 className="card-title">Report Lead</h5>
                <p className="card-text">View report leads.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Add Project */}
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
            <span className="text-primary"> <FontAwesomeIcon icon={faGear} size="2x" className="mb-2" /></span>
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

export default PMDashboard;
