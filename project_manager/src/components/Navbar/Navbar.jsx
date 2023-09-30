import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../Assets/logo-white.png";
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

  const [userdata, setUserData] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getEmp-dataOne?email=${userEmail}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userEmail]);

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
    <Navbar bg="dark" expand="lg" className="justify-content-start">
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
      <div className="p-2 ms-auto">
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          variant="light"
          style={{
            backgroundColor: "white", // Change to your desired background color
            borderColor: "white", // Change to your desired border color
          }}
        />
      </div>
      <Navbar.Collapse id="basic-navbar-nav" bg="light">
        <Nav className="me-auto ms-3">
          <Nav.Link as={NavLink} to="/" className="nav-link text-white">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/aboutus" className="nav-link text-white">
            About Us
          </Nav.Link>
          <Nav.Link as={NavLink} to="/contact" className="nav-link text-white">
            Contact Us
          </Nav.Link>
        </Nav>
        <Nav className="align-items-start ">
          {userFound ? (
            <div className="d-flex align-items-center">
              <img
                src={`http://localhost:3001/images/${userdata.Profile}`}
                className="rounded-circle mt-2 me-2 ms-3 "
                id="avatar"
                alt="Avatar"
                width="40"
                height="40"
              />
              <button
                className="btn btn-link nav-link p-3 text-danger"
                onClick={handleLogout}
              >
                <strong>Logout</strong>
              </button>
            </div>
          ) : (
            <Nav.Link as={NavLink} to="/login" className="nav-link me-5 ms-3">
              <strong>Login</strong>
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
