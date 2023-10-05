import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faPlus, faChartLine, faChartBar, faGear } from '@fortawesome/free-solid-svg-icons';


export const Card = ({ to, icon, title, description }) => {
  return (
    <Link to={to} className="link-no-underline">
      <div className="card text-center border-0 shadow-lg settingcard">
        <div className="card-body">
          <span className="fontawesome-color">
            <FontAwesomeIcon icon={icon} size="2x" className="mb-2" />
          </span>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </Link>
  );
};

const PMDashboard = () => {
  return (
    <div className="container mt-5">
      <div className="row gy-4">
        <div className="col-md-4">
          <Card
            to="/yourprojects"
            icon={faTasks}
            title="Your Projects"
            description="View your projects."
          />
        </div>

        <div className="col-md-4">
          <Card
            to="/projectstatus"
            icon={faChartLine}
            title="Project Status"
            description="View project status."
          />
        </div>

        <div className="col-md-4">
          <Card
            to="/reportlead"
            icon={faChartBar}
            title="Report Lead"
            description="View report leads."
          />
        </div>

        <div className="col-md-4">
          <Card
            to="/settings"
            icon={faGear}
            title="Settings"
            description="Click Here"
          />
        </div>

        <div className="col-md-4">
          <Card
            to="/currentannouncements"
            icon={faGear}
            title="Announcements"
            description="Click here>>"
          />
        </div>
      </div>
    </div>
  );
};

export default PMDashboard;
