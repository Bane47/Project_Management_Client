import React, { useEffect, useState } from "react";
import "../src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Authentication/Login";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AddEmployee from "./components/Admin/AddEmployee";
import EmployeeDashboard from "./components/Employees/EmployeeDashboard";
import ForgetPassword from "./components/Authentication/ForgetPassword";
import ResetPassword from "./components/Authentication/ResetPassword";
import Home from "./components/Home/Home";
import AboutUs from "./components/Home/AboutUs";
import ContactUs from "./components/Home/ContactUs";
import AdminSidebar from "./components/Admin/AdminSidebar";
import PMSidebar from "./components/Project_Manager/PMSidebar";
import PMDashboard from "./components/Project_Manager/PMDashboard";
import Employees from "./components/Admin/Employees";
import Designation from "./components/Admin/Designation";
import TLDashboard from "./components/Team_Lead/TLDashboard";
import TLSidebar from "./components/Team_Lead/TLSidebar";
import EmployeeSidebar from "./components/Employees/EmployeeSidebar";
import UnitHeadSidebar from "./components/UnitHead/UnitHeadSidebar";
import UnitHeadDashboard from "./components/UnitHead/UnitHeadDashboard";
import AssignProject from "./components/UnitHead/AssignProject";
import Status from "./components/UnitHead/Status";
import YourProject from "./components/Project_Manager/YourProject";
import AddProject from "./components/Project_Manager/AddProject";
import ReportLead from "./components/Project_Manager/ReportLead";
import ProjectStatus from "./components/Project_Manager/ProjectStatus";
import MyProjects from "./components/Team_Lead/MyProjects";
import TLAssignTasks from "./components/Team_Lead/TLAssignTasks";
import ReportManager from "./components/Team_Lead/ReportManager";
import EmployeesList from "./components/Team_Lead/EmployeesList";
import { UserContextProvider } from "./context/userContext";
import TaskStatus from "./components/Team_Lead/TaskStatus";
import Tasks from "./components/Employees/Tasks";
import UpdateStatus from "./components/Employees/UpdateStatus";

function App() {
  const [userRole,setUserRole]=useState(null);

  useEffect(() => {
    const role=localStorage.getItem("roleId")
    if(role){
      const decodedToken=jwt_decode(role)
      setUserRole(decodedToken.roleId)
    }
  }, []);

  // Define a common layout for all user types
  const CommonLayout = (
    <div className="container-breakpoint overflow-hidden">
      <div className="row">
        <div className="col-md-2">
          {userRole === "07" && <AdminSidebar />}

          {userRole === "01" && <UnitHeadSidebar />}

          {userRole === "02" && <PMSidebar />}

          {userRole === "03" && <TLSidebar />}

          {["04", "05", "06"].includes(userRole) && (
            <EmployeeSidebar />
          )}
        </div>
        <div className="col-md-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            {userRole === "07" && (
              <>
                <Route path="/employees" element={<Employees />} />
                <Route path="/designation" element={<Designation />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/addemployee" element={<AddEmployee />} />
              </>
            )}
            {userRole === "01" && (
              <>
                <Route path="/dashboard" element={<UnitHeadDashboard />} />
                <Route path="/assignproject" element={<AssignProject />} />
                <Route path="/status" element={<Status />} />
              </>
            )}
            {userRole === "02" && (
              <>
                <Route path="/yourprojects" element={<YourProject />} />
                <Route path="/addproject" element={<AddProject />} />
                <Route path="/dashboard" element={<PMDashboard />} />
                <Route path="/projectstatus" element={<ProjectStatus />} />
                <Route path="/reportlead" element={<ReportLead />} />
              </>
            )}
            {userRole === "03" && (
              <>
                <Route path="/dashboard" element={<TLDashboard />} />
                <Route path="/myprojects" element={<MyProjects />} />
                <Route path="/tlassigntasks" element={<TLAssignTasks />} />
                <Route path="/employeelist" element={<EmployeesList />} />
                <Route path="/taskstatus" element={<TaskStatus />} />
                <Route path="/reportmanager" element={<ReportManager />} />
              </>
            )}
            {["04", "05", "06"].includes(userRole) && (
              <>
              <Route path="/dashboard" element={<EmployeeDashboard />} />
              <Route path="/tasks" element={<Tasks/>}/>
              <Route path="/updatestatus" element={<UpdateStatus/>}/>
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Navbar />
        {!userRole && (
          <div className="col-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
            </Routes>
          </div>
        )}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route
            path="/reset_password/:id/:token"
            element={<ResetPassword />}
          />
        </Routes>
        {userRole && CommonLayout}
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
