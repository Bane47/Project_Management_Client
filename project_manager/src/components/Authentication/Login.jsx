import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Authentication.css";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // const {user,setUser} = useContext(UserContext);

  // if(true){
  //   setUser('karthi')
  // }
  // console.log("user",user);

  const navigate = useNavigate();

  const isAuthenticated = () => {
    const user = localStorage.getItem("roleId");
    return !!user;
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    const cookieFound = Cookies.get("rememberMe");

    if (cookieFound) {
      const value = jwt_decode(cookieFound);
      setEmail(value.email);
      setPassword(value.password);
    }
  }, []);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    if (!email || !password) {
      setError("Fields cannot be empty.");
      return;
    }

    axios
      .post("http://localhost:3001/login", { email, password })
      .then((res) => {
        const roleIdToken = res.data.roleIdToken;
        console.log(roleIdToken);
        localStorage.setItem("roleId", roleIdToken);
        sessionStorage.setItem("accessToken", res.data.accessToken);
        if (rememberMe) {
          Cookies.set("rememberMe", res.data.remembermeToken);
        } else {
          Cookies.remove("rememberMe");
        }

        toast.success(`Welcome Back ${res.data.userName}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });

        setTimeout(() => {
          navigate("/dashboard");
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log("Result", error.response.status);
        setError(error.response.data.message);
        console.error("Login error:", error);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center" id="forget-pass">
        <div className="card col-md-6 col-lg-4 p-5 rounded shadow" id="signin-card">
          <h2 className="mb-4 text-center">SignIn</h2>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
            theme="dark"
          />
          <form onSubmit={handleSubmit}>
            {error && <p className="text-danger mb-3">{error}</p>}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3 form-check">
              
              <div className="row justify-content-start d-flex flex-row">
                <div className="col-sm-6 col-12">
                <input
                type="checkbox"
                className="form-check-input Rem-For"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember Me
                  </label>
                </div>
                <div className="col-sm-6 col-12">
                  <Link
                    to="/forgetpassword"
                    className="text-decoration-none Rem-For"
                  >
                    Forget Password?
                  </Link>
                </div>
              </div>
            </div>
            <button
              type="submit"
              id="login-btn"
              className="btn text-white w-100"
              disabled={loading}
            >
              {loading ? "Logging in" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
