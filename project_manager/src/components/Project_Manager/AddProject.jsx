import axios from "axios";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProjectContext } from "../../context/ProjectContext";

const AddProject = () => {
  const user = sessionStorage.getItem("user");
  const decoded = jwtDecode(user);
  const userEmail = decoded.email;

  const today = new Date().toISOString().split("T")[0];

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
  const [errors, setErrors] = useState({}); 

  // Use the useProjectContext hook to access projectData from context
  const { projectData } = useProjectContext();

  // Prefill the projectTitle and projectDescription fields with context data
  useEffect(() => {
    if (projectData.projectTitle) {
      setProjectTitle(projectData.projectTitle);
    }
    if (projectData.projectDescription) {
      setProjectDescription(projectData.projectDescription);
    }
    if (projectData.clientName) {
      setClientName(projectData.clientName);
    }
    if (projectData.clientEmail) {
      setClientEmail(projectData.clientEmail);
    }
    if (projectData.clientSkypeId) {
      setClientSkypeId(projectData.clientSkypeId);
    }
  }, [projectData]);

  console.log("prot", projectTitle);

  useEffect(() => {
    axios.get("http://localhost:3001/getEmp-data").then((res) => {
      setEmployeeData(res.data);
    });
  }, []);

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!projectTitle) {
      errors.projectTitle = "Project Title is required";
      isValid = false;
    }
    if (!startDate) {
      errors.startDate = "Start Date is required";
      isValid = false;
    }
    if (!endDate) {
      errors.endDate = "End Date is required";
      isValid = false;
    }
    if (!projectCategory) {
      errors.projectCategory = "Project Category is required";
      isValid = false;
    }
    if (!projectDomain) {
      errors.projectDomain = "Project Domain is required";
      isValid = false;
    }

    // You can add more validation rules here for other fields if needed

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Validation passed, proceed with form submission

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

      axios
        .post("http://localhost:3001/add-project", newProject)
        .then((response) => {
          toast.success("Project Added Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle the error, e.g., show an error message
        })
        .finally(() => {
          // Clear the form fields and errors regardless of success or error
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
          setErrors({});
        });
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <h2 className="mb-5 ms-3 mt-2">Add Project</h2>
      <div className="row border table-report ms-3">
        <form onSubmit={handleSubmit} className="col-6 ">
          <div className="mb-3">
            <label htmlFor="projectTitle" className="form-label">
              Project Title
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.projectTitle ? "is-invalid" : ""
              }`}
              id="projectTitle"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              disabled
            />
            {errors.projectTitle && (
              <div className="invalid-feedback">{errors.projectTitle}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">
              Start Date
            </label>
            <input
              type="date"
              className={`form-control`}
              id="startDate"
              value={startDate}
              min={today} // Set the minimum date to today
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">
              End Date
            </label>
            <input
              type="date"
              className={`form-control ${errors.endDate ? "is-invalid" : ""}`}
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {errors.endDate && (
              <div className="invalid-feedback">{errors.endDate}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="projectCategory" className="form-label">
              Project Category
            </label>
            <select
              className={`form-control ${
                errors.projectCategory ? "is-invalid" : ""
              }`}
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
            {errors.projectCategory && (
              <div className="invalid-feedback">{errors.projectCategory}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="projectDomain" className="form-label">
              Project Domain
            </label>
            <select
              className={`form-control ${
                errors.projectDomain ? "is-invalid" : ""
              }`}
              id="projectDomain"
              value={projectDomain}
              onChange={(e) => setProjectDomain(e.target.value)}
            >
              <option value="">-- Select Project Domain --</option>
              <option value="Dotnet">Dotnet</option>
              <option value="OpenSource">OpenSource</option>
            </select>
            {errors.projectDomain && (
              <div className="invalid-feedback">{errors.projectDomain}</div>
            )}
          </div>
        </form>
        {/* Second Column */}
        <form onSubmit={handleSubmit} className="col-6">
          <div className="mb-3">
            <label htmlFor="projectDescription" className="form-label">
              Project Description
            </label>
            <textarea
              className={`form-control ${
                errors.projectDescription ? "is-invalid" : ""
              }`}
              id="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              disabled
            />
            {errors.projectDescription && (
              <div className="invalid-feedback">
                {errors.projectDescription}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="teamLead" className="form-label">
              Select TeamLead
            </label>
            <select
              className={`form-control ${errors.teamLead ? "is-invalid" : ""}`}
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
            {errors.teamLead && (
              <div className="invalid-feedback">{errors.teamLead}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="clientName" className="form-label">
              Client Name
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.clientName ? "is-invalid" : ""
              }`}
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              disabled
            />
            {errors.clientName && (
              <div className="invalid-feedback">{errors.clientName}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="clientEmail" className="form-label">
              Client Email
            </label>
            <input
              type="email"
              className={`form-control ${
                errors.clientEmail ? "is-invalid" : ""
              }`}
              id="clientEmail"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              disabled
            />
            {errors.clientEmail && (
              <div className="invalid-feedback">{errors.clientEmail}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="clientSkypeId" className="form-label">
              Client Skype ID
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.clientSkypeId ? "is-invalid" : ""
              }`}
              id="clientSkypeId"
              value={clientSkypeId}
              onChange={(e) => setClientSkypeId(e.target.value)}
              disabled
            />
            {errors.clientSkypeId && (
              <div className="invalid-feedback">{errors.clientSkypeId}</div>
            )}
          </div>
        </form>
      </div>

      <div className="text-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddProject;
