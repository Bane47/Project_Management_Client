import axios from "axios";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const AddProject = () => {
  const user = sessionStorage.getItem("accessToken");
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const [empdata, setEmployeeData] = useState([]);
  const [projectTitle, setProjectTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectDomain, setProjectDomain] = useState("");
  const [teamLead, setTeamLead] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientSkypeId, setClientSkypeId] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/getEmp-data").then((res) => {
      setEmployeeData(res.data);
    });
  }, [empdata]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Find the selected Team Lead's email
    const selectedTeamLead = empdata.find(
      (employee) => employee.EmployeeName === teamLead
    );

    // Create a new project object with the form data
    const newProject = {
      projectTitle,
      startDate,
      endDate,
      projectCategory,
      projectDescription,
      projectDomain,
      teamLead,
      teamLeadEmail: selectedTeamLead ? selectedTeamLead.Email : "",
      clientName,
      clientEmail,
      clientSkypeId,
      projectManagerEmail: userEmail, // Project Manager's email
    };

    try {
      // Send a POST request to save the project data
      const response = await axios.post(
        "http://localhost:3001/add-project",
        newProject
      );
      console.log("success", response.data);
    } catch (error) {
      console.error("Error posting project:", error);
    }
    setProjectTitle("");
    setStartDate("");
    setEndDate("");
    setProjectCategory("");
    setProjectDescription("");
    setTeamLead("");
    setClientName("");
    setClientEmail("");
    setClientSkypeId("");
    setProjectDomain("");
  };

  return (
    <div>
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="projectTitle" className="form-label">
            Project Title
          </label>
          <input
            type="text"
            className="form-control"
            id="projectTitle"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">
            End Date
          </label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="projectCategory" className="form-label">
            Project Category
          </label>
          <select
            className="form-control"
            id="projectCategory"
            value={projectCategory}
            onChange={(e) => setProjectCategory(e.target.value)}
          >
            <option value="">-- Select Project Category --</option>
            <option value="internal">Internal</option>
            <option value="ecommerce">Ecommerce</option>
            <option value="personalized">Personalized</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="projectDomain" className="form-label">
            Project Domain
          </label>
          <select
            className="form-control"
            id="projectDomain"
            value={projectDomain}
            onChange={(e) => setProjectDomain(e.target.value)}
          >
            <option value="">-- Select Project Domain --</option>
            <option value="Dotnet">Dotnet</option>
            <option value="OpenSource">OpenSource</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="projectDescription" className="form-label">
            Project Description
          </label>
          <textarea
            className="form-control"
            id="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="teamLead" className="form-label">
            Select TeamLead
          </label>
          <select
            className="form-control"
            id="teamLead"
            value={teamLead}
            onChange={(e) => setTeamLead(e.target.value)}
          >
            <option value="">-- Select Team Lead --</option>
            {empdata.map((employee) => {
              if (employee.Designation === "TeamLead") {
                return (
                  <option key={employee._id} value={employee.EmployeeName}>
                    {employee.EmployeeName}
                  </option>
                );
              }
              return null;
            })}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="clientName" className="form-label">
            Client Name
          </label>
          <input
            type="text"
            className="form-control"
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="clientEmail" className="form-label">
            Client Email
          </label>
          <input
            type="email"
            className="form-control"
            id="clientEmail"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="clientSkypeId" className="form-label">
            Client Skype ID
          </label>
          <input
            type="text"
            className="form-control"
            id="clientSkypeId"
            value={clientSkypeId}
            onChange={(e) => setClientSkypeId(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProject;
