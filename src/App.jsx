import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
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
    contactRef.current.scrollIntoView({ behavior: "smooth" });
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
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
    inquiry: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
            <h1>{heroData?.titleLine1 || "Empower Your Brand,"}</h1>
            <h1>{heroData?.titleLine2 || "Empower Lives"}</h1>
            <h3>
              {heroData?.description ||
                "High-quality digital services that elevate your business while transforming lives in underserved communities. Partner with us to make an impact."}
            </h3>
          </div>
        </div>

        {/* Why GLAD Technology Section */}
        <div className="why-glad">
          <h1>Why GLAD Technology?</h1>
          <div className="cards-container1">
            {cards.length > 0 ? (
              cards.map((card, index) => (
                <div key={index} className="card1">
                  <FontAwesomeIcon
                    icon={icons[card.icon]}
                    className="card-icon"
                  />
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
        {/* contact button goes here */}

        <section className="contactus-btn">
          <button
            id="contact-us"
            className="contact-button"
            onClick={handleScrollToContact}
          >
            Contact Us
          </button>
        </section>
        {/** services page is here */}
<br />
        <section className="services">
          <h1 className="header">Our Services</h1>
          <div className="cards-container">
            {services.length > 0 ? (
              services.map((service, index) => (
                <div key={index} className="card">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="card-image"
                  />
                  <div className="card-text">
                    <h2>{service.title}</h2>
                    <h3>{service.description}</h3>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading services...</p>
            )}
          </div>
        </section>
        <br /><br /> <br /> <br /><br /> <br /> 
        {/* Newsletter Signup Section */}
       <section className="secNewsletter">
       <div className="newsletter-popup">
          <div className="newsletter-content">
            <h2>
              Stay inspired by stories of how GLAD Technology is creating
              opportunities and transforming lives globally. Sign up for our
              email newsletter.
            </h2>
            <div
              className="mailchimp-form"
              dangerouslySetInnerHTML={{
                __html: `
                  <form action="https://your-mailchimp-url" method="post" target="_blank">
                    <div>
                      <input type="email" name="EMAIL" placeholder="Your email" required />
                      <button type="submit">Sign Up</button>
                    </div>
                  </form>
                `,
              }}
            />
          </div>
        </div>
       </section>
      </div>

      {/* Contact Section */}
      <section ref={contactRef} className="contact-section">
        <div className="contact-form-container">
          <div className="contact-grid">
            {/* Text Content */}
            <div>
              <h1 className="contact-title">Let&apos;s Connect</h1>
              <h2 className="contact-subtitle">
                Contact GLAD Technology today to bring your ideas to life while
                making a lasting impact. Let&apos;s create something
                extraordinary together.
              </h2>
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit}>
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
        </div>
      </section>
    </>
  );
};

export default HomePage;
