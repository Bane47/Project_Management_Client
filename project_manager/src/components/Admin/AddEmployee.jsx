import React, { useState } from "react";
import axios from "axios";

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    EmployeeName: "",
    EmployeeId: "",
    Designation: "",
    SpecializedRole: "",
    Domain1: "",
    Domain2: "",
    Gender: "",
    OtherDomains: "",
    Email: "",
    SkypeId: "",
    DesignationId: null,
  });
  const [loading, setLoading] = useState(false);

  const designationOptions = [
    "UnitHead",
    "ProjectManager",
    "TeamLead",
    "Developer",
    "Designer",
    "Tester",
  ];
  const genderOptions = ["Male", "Female"];

  const domainOptions = [
    "OpenSource",
    "DotNet",
    "UIUX",
    "Testing",
    "React",
    "Angular",
    "Vue",
    "Php",
    "Python",
    "Node",
  ];

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });

    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!/^[A-Za-z ]{1,30}$/.test(employeeData.EmployeeName)) {
      newErrors.EmployeeName =
        "Employee name can only contain letters, maximum length of 30 characters";
    }

    if (!/^\d{4}$/.test(employeeData.EmployeeId)) {
      newErrors.EmployeeId = "Employee ID must contain exactly 4 digits";
    }

    if (!/^[A-Za-z ]{1,15}$/.test(employeeData.Designation)) {
      newErrors.Designation =
        "Field can only contain letters, maximum length of 15 characters";
    }

    if (!/^[A-Za-z ]{1,15}$/.test(employeeData.Domain1)) {
      newErrors.Domain1 =
        "Field can only contain letters, maximum length of 15 characters";
    }

    if (!/\S+@\S+\.\S+/.test(employeeData.Email)) {
      newErrors.Email = "Please enter a valid email address";
    }

    setErrors(newErrors);

    // Check if there are any validation errors
    return Object.keys(newErrors).length === 0;
  };

  const fetchDesignationId = (selectedDesignation) => {
    const designationIdMapping = {
      UnitHead: "01",
      ProjectManager: "02",
      TeamLead: "03",
      Developer: "04",
      Designer: "05",
      Tester: "06",
    };

    return designationIdMapping[selectedDesignation];
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    if (validateForm()) {
      // Fetch the designation ID based on the selected designation
      const designationId = fetchDesignationId(employeeData.Designation);

      // Include the designation ID in the employeeData object
      const updatedEmployeeData = {
        ...employeeData,
        DesignationId: designationId,
      };

      axios
        .post("http://localhost:3001/add-employee", updatedEmployeeData)
        .then((response) => {
          setEmployeeData({
            EmployeeName: "",
            EmployeeId: "",
            Designation: "",
            SpecializedRole: "",
            Domain1: "",
            Domain2: "",
            Email: "",
            OtherDomains: "",
            SkypeId: "",
            Gender:"",
            DesignationId: null, // Reset the DesignationId
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error sending employee data:", error);
        });
    } else {
      console.error("Form has validation errors");
    }
  };

  return (
    <div className="container mt-5">
      <div className="">
        {" "}
        {/* Apply the CSS class to center the form */}
        <div className="border rounded p-4 w-50">
          <h2>Add New Employee</h2>
          <form onSubmit={handleSubmit} className="w-100">
            <div className="mb-3">
              <label htmlFor="EmployeeName" className="form-label">
                Employee Name*
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.EmployeeName ? "is-invalid" : ""
                }`}
                id="EmployeeName"
                name="EmployeeName"
                value={employeeData.EmployeeName}
                onChange={handleInputChange}
                required
              />
              {errors.EmployeeName && (
                <div className="invalid-feedback">{errors.EmployeeName}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="EmployeeId" className="form-label">
                Employee ID*
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.EmployeeId ? "is-invalid" : ""
                }`}
                id="EmployeeId"
                name="EmployeeId"
                value={employeeData.EmployeeId}
                onChange={handleInputChange}
                required
              />
              {errors.EmployeeId && (
                <div className="invalid-feedback">{errors.EmployeeId}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email*
              </label>
              <input
                type="email"
                className={`form-control ${errors.Email ? "is-invalid" : ""}`}
                id="Email"
                name="Email"
                value={employeeData.Email}
                onChange={handleInputChange}
                required
              />
              {errors.Email && (
                <div className="invalid-feedback">{errors.Email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Gender" className="form-label">
                Gender*
              </label>
              <select
                className={`form-select ${errors.Gender ? "is-invalid" : ""}`}
                id="Gender"
                name="Gender"
                value={employeeData.Gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                {genderOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.Gender && (
                <div className="invalid-feedback">{errors.Gender}</div>
              )}
            </div>

            
            <div className="mb-3">
              <label htmlFor="Designation" className="form-label">
                Designation*
              </label>
              <select
                className={`form-select ${
                  errors.Designation ? "is-invalid" : ""
                }`}
                id="Designation"
                name="Designation"
                value={employeeData.Designation}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Designation</option>
                {designationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.Designation && (
                <div className="invalid-feedback">{errors.Designation}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Specialized Role" className="form-label">
                Specialized Role
              </label>
              <input
                type="text"
                className="form-control "
                id="Specialized Role"
                name="SpecializedRole"
                placeholder="ExSr Developer"
                value={employeeData.SpecializedRole}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Domain1" className="form-label">
                Domain1*
              </label>
              <select
                className={`form-select ${errors.Domain1 ? "is-invalid" : ""}`}
                id="Domain1"
                name="Domain1"
                value={employeeData.Domain1}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Domain1</option>
                {domainOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.Domain1 && (
                <div className="invalid-feedback">{errors.Domain1}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Domain2" className="form-label">
                Domain2
              </label>
              <select
                className="form-select"
                id="Domain2"
                name="Domain2"
                value={employeeData.Domain2}
                onChange={handleInputChange}
              >
                <option value="">Select Domain2</option>
                {domainOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="otherDomains" className="form-label">
                Other Domains
              </label>
              <input
                type="text"
                className="form-control"
                id="OtherDomains"
                name="OtherDomains"
                value={employeeData.OtherDomains}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="SkypeId" className="form-label">
                Skype ID
              </label>
              <input
                type="text"
                className="form-control"
                id="SkypeId"
                name="SkypeId"
                value={employeeData.SkypeId}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary add-employeebtn"
              id="login-btn"
              disabled={loading}
            >
              {loading?"Adding...":"Add Employee"}
              
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
