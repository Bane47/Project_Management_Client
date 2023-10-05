import React from 'react'
import aboutimg from '../Assets/aboutimg.jpg'

const AboutUs = () => {
  return (
    <div>
        <section className="about-us bg-white" id="about-us">
        <div className="container mt-5 mb-5 " id="about-scroll">
          <div className="row">
            <div className="col-md-6 ">
              <h2>About Us</h2>
              <p>CG-VAK is a multimillion-dollar public limited organization, with over two decades of time-tested experience for clients across the globe. As a leading offshore software development company headquartered in India, CG-VAK employs over 525+ professionals across the globe.</p>
              <p>
                We are a passionate team of technology experts dedicated to
                providing innovative solutions to our clients. Our mission is to
                empower individuals and businesses with cutting-edge technology.
              </p>
              <p>
                Our journey began with a simple yet profound idea: technology
                has the power to shape the future. With this belief at our core,
                we have dedicated ourselves to providing innovative solutions
               
              </p>
            </div>
            <div className="col-md-6 mt-5">
              <img
                src={aboutimg}
                alt="About Us"
                className="img-fluid rounded w-100"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default AboutUs