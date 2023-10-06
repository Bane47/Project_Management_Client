import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetMsg, setResetMsg] = useState(false);
  const [error, setError] = useState("");

  const { id, token } = useParams();

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (password === confirmPassword) {
      axios
        .post(`http://localhost:3001/reset-password/${id}/${token}`, {
          password,
        })
        .then((res) => {
          if (res.data.Status === "Success") {
            setResetMsg(true);
          
          } else {
            setError("An error occurred. Please try again."); 
            console.log(res.data.Status);
          }
        })
        .catch((error) => {
          console.error(error);
          setError("An error occurred. Please try again."); 
        });
    } else {
      setError("Passwords don't match");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Reset Password</h2>
              {resetMsg ? (
                <div>
                  <h5 className="text-success mt-3">Password reset successful!</h5>
                  <p className="mt-3">
                  <Link to="/login">Click here</Link> to go to the Login page.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      New Password:
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password:
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="form-control"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn add-employeebtn text-white"
                  >
                    Reset Password
                  </button>
                  {error && (
                    <div className="text-danger">{error}</div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
