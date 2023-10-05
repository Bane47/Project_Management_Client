import React, { useEffect, useState } from "react";
import axios from 'axios'
import {faGear, faNewspaper,faUserPlus,faUsers,} from "@fortawesome/free-solid-svg-icons";
import { Card } from "../Project_Manager/PMDashboard";




const AdminDashboard = () => {
  const [numEmployees, setNumEmployees] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3001/getEmp-data")
      .then((res) => {
        setNumEmployees(res.data.length)
        console.log(res.data.length);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="container justify-content-center mt-5">
      <div className="row table-report me-md-3 ms-2">
        <div className="col-md-4 mb-4">
          <Card
            to="/addemployee"
            icon={faUserPlus}
            title="Add New Employee"
            description="Click here >>"
          />
        </div>

        <div className="col-md-4 mb-4">
          <Card
            to="/employees"
            icon={faUsers}
            title="Number of Employees"
            description={numEmployees}
            count={numEmployees}
          />
        </div>

        <div className="col-md-4 mb-4">
          <Card
            to="/settings"
            icon={faGear}
            title="Settings"
            description="Click Here >>"
          />
        </div>

        <div className="col-md-4 mb-4">
          <Card
            to="/announcements"
            icon={faNewspaper}
            title="Make Announcement"
            description="Click Here >>"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
