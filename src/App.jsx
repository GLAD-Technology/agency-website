import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faDesktop,
  faGlobe,
  faHandshake,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import client from "../../glad-agency/src/lib/sanity"; // Adjust the path to your `sanity.js`

const icons = {
  faDesktop,
  faGlobe,
  faHandshake,
  faClipboardCheck,
};

const HomePage = () => {
  const contactRef = useRef(null);

  const [cards, setCards] = useState([]);
  const [heroData, setHeroData] = useState(null);

  const handleScrollToContact = () => {
    // Scroll to the contact section
    contactRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    // Adjust scroll position after a slight delay to account for the fixed navbar
    setTimeout(() => {
      window.scrollBy(0, -60);
    }, 80000);
  };
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await client.fetch(
        `*[_type == "service"]{
          title,
          description,
          "imageUrl": image.asset->url
        }`
      );
      setServices(data);
    };

    fetchServices();
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    inquiry: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.message || "Failed to send the email.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  // Fetch hero section data
  useEffect(() => {
    const fetchHeroData = async () => {
      const data = await client.fetch(
        `*[_type == "heroSection"][0]{
          titleLine1,
          titleLine2,
          description,
          "backgroundImage": backgroundImage.asset->url
        }`
      );
      setHeroData(data);
    };
    fetchHeroData();
  }, []);

  // Fetch "Why GLAD" cards data
  useEffect(() => {
    const fetchCardsData = async () => {
      const data = await client.fetch(
        `*[_type == "whyGladCard"]{
          heading,
          description,
          icon
        }`
      );
      setCards(data);
    };
    fetchCardsData();
  }, []);

  if (isSubmitted) {
    return <p>Thank you for reaching out! We'll get back to you soon.</p>;
  }

  return (
    <>
      <div className="navbar-container">
        <nav className="navbar">
          {/* Logo Section */}
          <div className="navbar-logo">
            <img src="/GLAD_logo.png" alt="logo" />
          </div>

          {/* Navigation Links */}
          <div className="navbar-links">
            <button className="contact-button" onClick={handleScrollToContact}>
              Contact
            </button>
          </div>
        </nav>
      </div>

      <div className="homepage-container">
        {/* Hero Section */}
        <div
          className="hero-section"
          style={{
            backgroundImage: `url(${heroData?.backgroundImage || ""})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-text">
            <h1 className="empower-text">
              {heroData?.titleLine1 || "Empower Your Brand,"}
            </h1>
            <h1>{heroData?.titleLine2 || "Empower Lives"}</h1>
            <h3>
              {heroData?.description ||
                "High-quality digital services that elevate your business while transforming lives in underserved communities. Partner with us to make an impact."}
            </h3>
          </div>
        </div>
        <br />
        {/* Why GLAD Technology Section */}
        <div className="why-glad">
          <h1>Why GLAD Technology?</h1>
          <div className="cards-container1">
            {cards.length > 0 ? (
              cards.map((card, index) => (
                <div key={index} className="card1">
                  <div className="icon-container">
                    <FontAwesomeIcon
                      icon={icons[card.icon]}
                      className="card-icon"
                    />
                  </div>
                  <h2>{card.heading}</h2>
                  <p>{card.description}</p>
                </div>
              ))
            ) : (
              <div className="empty-message">
                No content available. Add cards in Sanity Studio.
              </div>
            )}
          </div>
        </div>
        {/*ontact button goes here */}
        <section className="contactus-btn">
          <button id="contact-us" onClick={handleScrollToContact}>
            Contact Us
          </button>
        </section>
        <br />
        {/** services page is here */}
        <section className="services">
          <div id="center">
            <h1 className="header">Our Services</h1>
          </div>
          <hr />
          <br />
          <br />
          <br />
          <br />
          <div className="cards-container">
            {services.length > 0 ? (
              services.map((service, index) => (
                <div key={index} className="card">
                  <div className="card-overlay">
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                  </div>
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="card-image"
                  />
                </div>
              ))
            ) : (
              <p>Loading services...</p>
            )}
          </div>
        </section>
        <br />
        <br /> <br />
        {/* Newsletter Signup Section */}
        <section className="secNewsletter">
          <div className="new-letter-text">
            <h2 className="stayinfo">
              Stay inspired by stories of how GLAD Technology is creating
              opportunities and transforming lives globally. Sign up for our
              email newsletter.
            </h2>
          </div>

          <div id="mc_embed_signup">
            <form
              action="https://gladtech.us11.list-manage.com/subscribe/post?u=11e6d08daf1ee202a943d36ec&amp;id=f84e0d7487&amp;f_id=000c0ee0f0"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate"
              target="_blank"
            >
              <div id="mc_embed_signup_scroll">
                <div className="mc-field-group">
                  <label htmlFor="mce-FNAME">
                    First Name <span className="asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    name="FNAME"
                    id="mce-FNAME"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="mc-field-group">
                  <label htmlFor="mce-LNAME">
                    Last Name <span className="asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    name="LNAME"
                    id="mce-LNAME"
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="mc-field-group">
                  <label htmlFor="mce-EMAIL">
                    Email Address <span className="asterisk">*</span>
                  </label>
                  <input
                    type="email"
                    name="EMAIL"
                    id="mce-EMAIL"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div id="mce-responses" className="response">
                  <div id="mce-error-response"></div>
                  <div id="mce-success-response"></div>
                </div>
                <div className="optionalParent">
                  <div className="foot">
                    <input
                      type="submit"
                      name="subscribe"
                      id="mc-embedded-subscribe"
                      className="button"
                      value="Subscribe"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Include Mailchimp scripts */}
          <script
            type="text/javascript"
            src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
        (function($) {
          window.fnames = new Array();
          window.ftypes = new Array();
          fnames[1]='FNAME';ftypes[1]='text';
          fnames[2]='LNAME';ftypes[2]='text';
          fnames[0]='EMAIL';ftypes[0]='email';
        })(jQuery);
        var $mcj = jQuery.noConflict(true);
      `,
            }}
          />
        </section>
      </div>

      {/* Contact Section */}
      <section
        ref={contactRef}
        id="contact"
        style={{ paddingTop: "60px" }}
        className="contact-section"
      >
        <div className="contact-form-container">
          <div className="contact-grid">
            <div>
              <h1 className="contact-title">Let&apos;s Connect</h1>
              <h2 className="contact-subtitle">
                Contact GLAD Technology today to bring your ideas to life while
                making a lasting impact.
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-grid">
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  required
                  onChange={handleChange}
                  className="input-field"
                />
                <div className="form-grid-row">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name*"
                    required
                    onChange={handleChange}
                    className="input-field"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name*"
                    required
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone*"
                  required
                  onChange={handleChange}
                  className="input-field"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name (Optional)"
                  onChange={handleChange}
                  className="input-field"
                />
                <textarea
                  name="inquiry"
                  placeholder="Inquiry*"
                  required
                  onChange={handleChange}
                  className="input-field textarea"
                />
                <button type="submit" className="submit-button">
                  Let&apos;s Get Started
                </button>
              </div>
            </form>
          </div>

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      </section>
      <footer className="footer">
        <div className="footer-logo">
          <img src="/GLAD_logo.png" alt="GLAD Logo" />
        </div>
        <div className="footer-content">
          <div className="footer-details">
            <div>
              <p>
                Email us at:{" "}
                <a href="mailto:services@gladtech.io">services@gladtech.io</a>
              </p>
              <p>
                For information about our non-profit educational branch:{" "}
                <a
                  href="https://www.gladtech.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.gladtech.org
                </a>
              </p>
            </div>
            <div className="social-icons">
              <a
                href="https://www.facebook.com/p/GLAD-Technology-100090154329991/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a
                href="https://www.instagram.com/gladtechnology/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a
                href="https://www.linkedin.com/company/glad-technology"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
