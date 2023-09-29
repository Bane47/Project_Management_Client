import React, { useState } from "react";
import axios from "axios";

const AdminForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/register", {
        email,
        password,
        role: "admin", 
      });

      // Handle success, e.g., display a success message or redirect to another page
      console.log("Admin data posted successfully:", response.data);
    } catch (error) {
      // Handle error, e.g., display an error message
      console.error("Error posting admin data:", error);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container vh-100">
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="card col-md-6 col-lg-4 p-5 rounded shadow">
          <h2 className="mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
