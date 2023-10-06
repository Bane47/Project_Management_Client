import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faPeopleGroup,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import AboutUs from "./AboutUs";

const HomePage = () => {
  return (
    <div className="homepage">
     
      <section className="hero ">
        <div className="hero-content text-center">
          <h2>Unlock the Power of Technology</h2>
          <p>Discover endless possibilities with our cutting-edge solutions.</p>
          <p>Learn, innovate, and grow with us!</p>
          <p>Join our community of tech enthusiasts today.</p>
          <Link to="/login" className="btn add-employeebtn text-white">
            Explore More &gt;&gt;
          </Link>
        </div>
      </section>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-4">
            <h3>Project Management</h3>
            <p className="mt-5">
              Effective project management is the key to successful project
              execution. Our experts are here to help you plan, organize, and
              execute your projects efficiently.
            </p>
            <p>
              The CGVAK team as a part of its CSR activities visited the Udavum
              Karangal premises in Chennai which was devastated by the floods.
            </p>
            <p>
              As a part of the CSR activity, the team at CGVAK were privileged
              to celebrate this special Diwali of 2015 with some wonderful
              children from a nearby home in Coimbatore.
            </p>
          </div>

          <div className="col-lg-8">
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://img.freepik.com/free-vector/set-anniversary-logotype-emblem-set_1017-17937.jpg?w=996&t=st=1696520620~exp=1696521220~hmac=78b16819cb8b7e68370f53db88a1875165b48febcf681d52389395bd6cfd2695"
                  alt="Third slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://images.pexels.com/photos/7439129/pexels-photo-7439129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Fourth slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>

      <section className="features">
        <div className="feature mt-4 d-sm-none d-md-block d-none d-sm-block">
          <div className="feature-icon">
            <FontAwesomeIcon icon={faGear} className="big-icon" />
          </div>
          <h4>Innovative Solutions</h4>
          <p>Experience the latest in technology.</p>
        </div>
        <div className="feature d-sm-none d-md-block d-none d-sm-block">
          <div className="feature-icon">
            <FontAwesomeIcon icon={faPeopleGroup} className="big-icon" />
          </div>
          <h4>Community Support</h4>
          <p>Join a vibrant community of tech enthusiasts.</p>
        </div>
        <div className="feature d-sm-none d-md-block d-none d-sm-block">
          <div className="feature-icon">
            <FontAwesomeIcon icon={faTerminal} className="big-icon" />
          </div>
          <h4>Coding Made Easy</h4>
          <p>Learn to code with our user-friendly tutorials.</p>
        </div>
      </section>

      <section className="company-cards">
        <div className="container-md">
          <h2 className="text-center mb-5">Our Products</h2>
          <div className="row justify-content-start gy-4">
            <div className="col-md-6 col-lg-4">
              <div className="card company-card card-1">
                <img
                  src="https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Company 1"
                  className="card-img-top company-card-img"
                />
                <div className="card-body">
                  <h5 className="card-title">Company Name 1</h5>
                  <p className="card-text">Description of Company 1</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card company-card card-2">
                <img
                  src="https://images.pexels.com/photos/16129728/pexels-photo-16129728/free-photo-of-man-coding-on-pc.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Company 2"
                  className="card-img-top company-card-img"
                />
                <div className="card-body">
                  <h5 className="card-title">Company Name 2</h5>
                  <p className="card-text">Description of Company 2</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card company-card card-3">
                <img
                  src="https://images.pexels.com/photos/12899188/pexels-photo-12899188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Company 3"
                  className="card-img-top company-card-img"
                />
                <div className="card-body">
                  <h5 className="card-title">Company Name 3</h5>
                  <p className="card-text">Description of Company 3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer text-center mt-5">
        <p>&copy; 2023 CG-VAK Offshore Software Development Company</p>
      </footer>
    </div>
  );
};

export default HomePage;
