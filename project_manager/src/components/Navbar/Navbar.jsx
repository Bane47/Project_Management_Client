import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../Assets/logo2.png";
import "./Navbar.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavBar = () => {
  const userFound = localStorage.getItem("roleId");
  const userToLogout = sessionStorage.getItem("accessToken");
  let userEmail = "";

  if (userToLogout) {
    const userToLogoutDecode = jwt_decode(userToLogout);
    userEmail = userToLogoutDecode.email;
  }

  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("http://localhost:3001/logout", { email: userEmail })
      .then((res) => {
        localStorage.removeItem("roleId");
        sessionStorage.removeItem("accessToken");
        Cookies.remove("rememberMe");

        toast.info("Logged out :( Come back chief!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setTimeout(() => {
          navigate("/login");
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <Navbar bg="light" expand="lg">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Link className="text-decoration-none">
        <div className="ps-2">
          <Navbar.Brand>
            <img id="logo-img" src={logo} alt="logo" className="w-50" />
          </Navbar.Brand>
        </div>
      </Link>
      <div className="p-2">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </div>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/" className="nav-link">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/aboutus" className="nav-link">
            About Us
          </Nav.Link>
          <Nav.Link as={NavLink} to="/contact" className="nav-link">
            Contact Us
          </Nav.Link>
        </Nav>
        <Nav>
          {userFound ? (
            <button
              className="btn btn-link nav-link me-5"
              onClick={handleLogout}
            >
              <strong>Logout</strong>
            </button>
          ) : (
            <Nav.Link as={NavLink} to="/login" className="nav-link me-5">
              <strong>Login</strong>
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
