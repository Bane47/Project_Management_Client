import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarker,
  faClock,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

const ContactUs = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Contact Us</h1>
      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Contact Information</h5>
              <div className="mb-3">
                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                <strong>Email:</strong> cgvakindia@gmail.com
              </div>
              <div className="mb-3">
                <FontAwesomeIcon icon={faPhone} className="me-2" />
                <strong>Phone:</strong> +1 (123) 456-7890
              </div>
              <div className="mb-3">
                <FontAwesomeIcon icon={faMapMarker} className="me-2" />
                <strong>Address:</strong> 171, Mettupalayam Road, Coimbatore,
                Tamil Nadu, India 641043.
              </div>
              <div className="mb-3">
                <FontAwesomeIcon icon={faClock} className="me-2" />
                <strong>Business Hours:</strong> Mon-Fri: 9:00 AM - 6:00 PM
              </div>
              <div className="mb-3">
                <FontAwesomeIcon icon={faGlobe} className="me-2" />
                <strong>Website:</strong>www.cgvakindia.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
