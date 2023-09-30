import React, { useState } from "react";
import axios from "axios";
import "./Authentication.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading,setLoading]=useState(false)

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    axios
      .post("http://localhost:3001/forget-password", { email })
      .then((res) => {
        if (res.data.Status === "Success") {
          // setTimeout(()=>{navigate('/login')},3000);
          setEmail("")
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center " id="forget-pass">
        <div className="col-md-5  p-4 rounded shadow">
          <h2 className="mb-4">Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email Address"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn add-employeebtn text-white" disabled={loading}>
              {loading? "Sending...":"Send email"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
