import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../Assets/logo-blue.png";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavBar = () => {
  const userFound = localStorage.getItem("roleId");
  const userToLogout = sessionStorage.getItem("user");
  let userEmail = "";

  if (userToLogout) {
    const userToLogoutDecode = jwt_decode(userToLogout);
    userEmail = userToLogoutDecode.email;
  }
  console.log(userEmail);

  const navigate = useNavigate();

  const [userdata, setUserData] = useState("");

  useEffect(() => {
    if (!userEmail) {
      setUserData({});
      return;
    }

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
        sessionStorage.removeItem("user");

        console.log("i came here");
        toast.info("See You Soon!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
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
    <div className="nav-bar">
      <Navbar bg="light" expand="lg" className="justify-content-start">
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
          theme="dark"
        />
        <Link className="text-decoration-none">
          <div className="ps-2">
            <Navbar.Brand>
              <img id="logo-img" src={logo} alt="logo" className="w-75" />
            </Navbar.Brand>
          </div>
        </Link>
        <div className="p-2 ms-auto">
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            variant="light"
            style={{
              backgroundColor: "white",
              borderColor: "white",
            }}
          />
        </div>
        <Navbar.Collapse id="basic-navbar-nav" bg="light">
          <Nav className="me-auto ms-3">
            {!userFound && (
              <Nav.Link as={NavLink} to="/" className="nav-link text-black">
                Home
              </Nav.Link>
            )}
            <Nav.Link
              as={NavLink}
              to="/aboutus"
              className="nav-link text-black"
            >
              About Us
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/contact"
              className="nav-link text-black"
            >
              Contact Us
            </Nav.Link>
          </Nav>
          <Nav className="align-items-start ">
            {userFound ? (
              <div className="d-flex align-items-center">
                <Link to="/settings">
                  {" "}
                  <img
                    src={`http://localhost:3001/images/${userdata.Profile}`}
                    className="rounded-circle mt-2 me-4 ms-3 "
                    id="avatar"
                    alt="Avatar"
                    width="40"
                    height="40"
                  />
                </Link>

                <button
                  className="btn btn-link nav-link p-3 text-danger"
                  onClick={handleLogout}
                >
                  <strong>Logout</strong>
                </button>
              </div>
            ) : (
              <Nav.Link
                as={NavLink}
                to="/login"
                className="nav-link me-5 ms-3 text-black"
              >
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
