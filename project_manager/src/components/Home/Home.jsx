import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
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
      <header className="header">
        <h1>Welcome to Our World of Solutions</h1>
        <p>Your Gateway to Innovation</p>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>Unlock the Power of Technology</h2>
          <p>Discover endless possibilities with our cutting-edge solutions.</p>
          <Link to="/login" className="btn btn-primary">
            Explore More &gt;&gt;
          </Link>
        </div>
        <div className="hero-image ">
          <img
            src="https://www.useresponse.com/blog/wp-content/uploads/2020/04/featured-1024x427.png"
            alt="homepage"
            id="img1"
          />
        </div>
      </section>

      <section className="testimonial">
        <div className="testimonial-text">
          <h3>"Technology was the key to my freedom"</h3>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <div className="feature-icon">
            <FontAwesomeIcon icon={faGear} />
          </div>
          <h4>Innovative Solutions</h4>
          <p>Experience the latest in technology.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <FontAwesomeIcon icon={faPeopleGroup} />
          </div>
          <h4>Community Support</h4>
          <p>Join a vibrant community of tech enthusiasts.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <FontAwesomeIcon icon={faTerminal} />
          </div>
          <h4>Coding Made Easy</h4>
          <p>Learn to code with our user-friendly tutorials.</p>
        </div>
      </section>

      <AboutUs />
      <section className="achievements">
        <div className="container">
          <h2 className="text-center">Our Achievements</h2>
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="achievement-card mb-3">
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.EGfs9cqvFG6mNQUzYCCrFwHaHa&pid=Api&P=0&h=180"
                  alt="Achievement 1"
                  className="img-fluid rounded w-50 "
                />
                <h5 className="mt-3">Best Company 2021</h5>
                <p className="fs-6">Awarded by Rotary Club</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="achievement-card mb-3">
                <img
                  src="https://media1.tenor.com/images/c009e8f40ed27fb4b6c70d0437001d2c/tenor.gif?itemid=8965716"
                  alt="Achievement 2"
                  className="img-fluid rounded w-50"
                />
                <h5 className="mt-3">Endurance Award</h5>
                <p className="fs-6">Awarded by TN Government</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="achievement-card">
                <img
                  src="https://dickstrophies.com/images/p500x500/gold-accented-crystal-awards-32kvg7.png"
                  alt="Achievement 3"
                  className="img-fluid rounded w-50"
                />
                <h5 className="mt-3">Best Company 2022</h5>
                <p className="fs-6">Awarded by Rotary Club</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <p>Ready to embark on a tech journey?</p>
        <Link to="/login" className="btn btn-primary">
          Get Started &gt;&gt;
        </Link>
      </section>
      <footer className="footer footer-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-5">
              <p>&copy; 2023 Employees_portal</p>
            </div>
            <div className="col-md-6">
              <p className="text-end footer-contact">
                Contact Us:
                <a href="mailto:contact@example.com">cgvakindia@gmail.com</a>
              </p>
              <p className="text-end footer-contact footer-address">
                Phone: +1 (123) 456-7890
                <span>Address: 123 Street, Employee City, Coimbatore</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
