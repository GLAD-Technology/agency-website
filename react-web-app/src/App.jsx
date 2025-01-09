import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useRef } from 'react';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
  faDesktop,
  faGlobe,
  faHandshake,
  faClipboardCheck,
} from '@fortawesome/free-solid-svg-icons';

import './App.css';
import client from '../../react-web-app/src/lib/sanity'; // Adjust the path to your `sanity.js`

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
      behavior: 'smooth',
      block: 'center',
    });
  };
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await client.fetch(
        `*[_type == "service"]{
          title,
          description,
          "imageUrl": image.asset->url
        }`,
      );
      setServices(data);
    };

    fetchServices();
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    inquiry: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true); // Show the thank-you message
        setErrorMessage(''); // Clear any previous errors

        // Clear form fields
        setFormData({
          email: '',
          firstName: '',
          lastName: '',
          phone: '',
          company: '',
          inquiry: '',
        });

        // Automatically hide the thank-you message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 1800);
      } else {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.message || 'Failed to send the email.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
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
        }`,
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
        }`,
      );
      setCards(data);
    };
    fetchCardsData();
  }, []);

  if (isSubmitted) {
    return (
      <section
        ref={contactRef}
        id='contact'
        style={{ paddingTop: '60px' }}
        className='contact-section'
      >
        <div className='contact-form-container'>
          <div className='contact-grid'>
            <div>
              <h1 className='contact-title'>Let&apos;s Connect</h1>
              <h2 className='contact-subtitle'>
                Contact GLAD Technology today to bring your ideas to life while making a lasting
                impact.
              </h2>
            </div>
            {isSubmitted ? (
              <div className='thank-you-message'>
                Thank you for reaching out! We'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='contact-form'>
                <div className='form-grid'>
                  <input
                    type='email'
                    name='email'
                    placeholder='Email*'
                    required
                    onChange={handleChange}
                    className='input-field'
                  />
                  <div className='form-grid-row'>
                    <input
                      type='text'
                      name='firstName'
                      placeholder='First Name*'
                      required
                      onChange={handleChange}
                      className='input-field'
                    />
                    <input
                      type='text'
                      name='lastName'
                      placeholder='Last Name'
                      onChange={handleChange}
                      className='input-field'
                    />
                  </div>
                  <input
                    type='text'
                    name='phone'
                    placeholder='Phone Number'
                    onChange={handleChange}
                    className='input-field'
                  />
                  <input
                    type='text'
                    name='company'
                    placeholder='Company Name'
                    onChange={handleChange}
                    className='input-field'
                  />
                  <textarea
                    name='inquiry'
                    placeholder='Inquiry*'
                    required
                    onChange={handleChange}
                    className='input-field textarea'
                  />
                </div>
                <button type='submit' className='submit-button'>
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className='navbar-container'>
        <nav className='navbar flex items-center justify-between px-4 py-10 bg-white-100 mb-6'>
          {/* Logo Section */}
          <div className='navbar-logo'>
            <img id='navbar-logo' src='/GLAD_logo.png' alt='logo' />
          </div>

          {/* Navigation Links */}
          <div className='navbar-links'>
            <button className='contact-button' onClick={handleScrollToContact}>
              Contact
            </button>
          </div>
        </nav>
      </div>

      <div className='homepage-container'>
        {/* Hero Section */}
        <div
          className='hero-section relative bg-cover bg-center h-[80vh] flex items-center justify-center'
          style={{
            backgroundImage: `url(${heroData?.backgroundImage || ''})`,
          }}
        >
          <div className='hero-overlay absolute inset-0 bg-black bg-opacity-50'></div>
          <div className='hero-text text-left text-white z-10 ml-10 mr-11'>
            <h1 className='empower-text text-4xl md:text-6xl font-bold mb-4'>
              {heroData?.titleLine1 || 'Empower Your Brand,'}
            </h1>
            <h1 className='text-4xl md:text-6xl font-bold mb-4'>
              {heroData?.titleLine2 || 'Empower Lives'}
            </h1>
            <h3 className='text-lg md:text-2xl'>
              {heroData?.description ||
                'High-quality digital services that elevate your business while transforming lives in underserved communities. Partner with us to make an impact.'}
            </h3>
          </div>
        </div>

        <br />

        {/* Why GLAD Technology Section */}
        <div className='why-glad px-4 py-8'>
          <h1 className=' glad text-3xl mb-8'>Why GLAD Technology?</h1>
          <div className='cards-container1 grid grid-cols-1 md:grid-cols-3 gap-6'>
            {cards.length > 0 ? (
              cards.map((card, index) => (
                <div key={index} className='card1 bg-white p-6 shadow-md rounded-md text-center'>
                  <div className='icon-container mb-4'>
                    <FontAwesomeIcon icon={icons[card.icon]} className='text-4xl' />
                  </div>
                  <h2 className='text-xl font-semibold mb-2'>{card.heading}</h2>
                  <p>{card.description}</p>
                </div>
              ))
            ) : (
              <div className='empty-message text-center text-gray-500'>
                No content available. Add cards in Sanity Studio.
              </div>
            )}
          </div>
        </div>
        {/* Contact button */}
        <section className='contactus-btn text-center py-4'>
          <button
            id='contact-us'
            onClick={handleScrollToContact}
            className='bg-blue-500 text-white px-8 py-4 rounded-md text-lg md:text-xl lg:text-2xl sm:px-6 sm:py-3 sm:text-base transition'
          >
            Contact Us
          </button>
        </section>

        <br />

        {/* Services Section */}
        <section className='services px-4 py-8 bg-white'>
          <div id='center' className='mb-8'>
            <h1 className='text-3xl mb-8 lg:text-left lg:ml-0 text-center'>Our Services</h1>
          </div>
          <div className='cards-container grid grid-cols-1 md:grid-cols-3 gap-6'>
            {services.length > 0 ? (
              services.map((service, index) => (
                <div key={index} className='card relative shadow-md rounded-md'>
                  <div className='card-overlay  flex items-center justify-center transition'>
                    <div className='text-center p-4'>
                      <h2 className='text-xl font-semibold'>{service.title}</h2>
                      <p>{service.description}</p>
                    </div>
                  </div>
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className='card-image w-full h-64 object-cover rounded-md'
                  />
                </div>
              ))
            ) : (
              <p className='text-center text-gray-500'>Loading services...</p>
            )}
          </div>
        </section>
        <br />

        {/* Newsletter Signup Section */}
        <section className='secNewsletter text-white py-10 px-6 md:px-12 rounded-md border mx-auto my-8'>
          <div className='flex flex-col md:flex-row justify-between items-center md:items-start space-x-4'>
            <div className='new-letter-text mb-6 md:mb-0 md:w-1/2'>
              <h2 className='stayinfo text-xl md:text-2xl text-center md:text-left'>
                Stay inspired by stories of how GLAD Technology is creating opportunities and
                transforming lives globally. Sign up for our email newsletter.
              </h2>
            </div>

            <div id='mc_embed_signup' className='max-w-lg w-full md:w-1/2 mt-6 md:mt-0'>
              <form
                action='https://gladtech.us11.list-manage.com/subscribe/post?u=11e6d08daf1ee202a943d36ec&amp;id=f84e0d7487&amp;f_id=000c0ee0f0'
                method='post'
                id='mc-embedded-subscribe-form'
                name='mc-embedded-subscribe-form'
                className='validate'
                target='_blank'
              >
                <div id='mc_embed_signup_scroll'>
                  <div className='mc-field-group mb-4'>
                    <label htmlFor='mce-FNAME' className='block text-left text-white'>
                      First Name <span className='text-white-500'>*</span>
                    </label>
                    <input
                      type='text'
                      name='FNAME'
                      id='mce-FNAME'
                      placeholder='Enter your first name'
                      className='w-full border border-blue-600 px-4 py-3'
                      style={{ borderRadius: '1px' }}
                    />
                  </div>
                  <div className='mc-field-group mb-4'>
                    <label htmlFor='mce-LNAME' className='block text-left text-white'>
                      Last Name <span className='text-white-500'>*</span>
                    </label>
                    <input
                      type='text'
                      name='LNAME'
                      id='mce-LNAME'
                      placeholder='Enter your last name'
                      className='w-full border border-blue-600 px-4 py-3'
                      style={{ borderRadius: '1px' }}
                    />
                  </div>
                  <div className='mc-field-group mb-4'>
                    <label htmlFor='mce-EMAIL' className='block text-left text-white'>
                      Email Address <span className='text-white-500'>*</span>
                    </label>
                    <input
                      type='email'
                      name='EMAIL'
                      id='mce-EMAIL'
                      placeholder='Enter your email address'
                      required
                      className='w-full border border-blue-600 px-4 py-3'
                      style={{ borderRadius: '1px' }}
                    />
                  </div>
                  <div className='foot'>
                    <input
                      type='submit'
                      name='subscribe'
                      id='mc-embedded-subscribe'
                      className='button bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition'
                      value='Subscribe'
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* Contact Section */}
      <section
        ref={contactRef}
        id='contact'
        className='contact-section px-4 py-11 text-white'
        style={{ paddingTop: '50px' }}
      >
        <div className='contact-form-container max-w-full mx-auto'>
          <div className='contact-grid grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='contact-infor'>
              <h1 className='contact-title text-3xl font-bold mb-4 text-white'>
                Let&apos;s Connect
              </h1>
              <h2 className='contact-subtitle text-lg text-white'>
                Contact GLAD Technology today to bring your ideas to life while making a lasting
                impact.
              </h2>
            </div>
            {isSubmitted ? (
              <div className='thank-you-message text-center text-white'>
                Thank you for reaching out! We'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='contact-form'>
                <div className='form-grid grid gap-4'>
                  <input
                    type='email'
                    name='email'
                    placeholder='Email*'
                    required
                    onChange={handleChange}
                    className='input-field w-full border border-white px-4 py-2 text-black'
                    style={{ borderRadius: '1px' }} // Set border radius to 1px
                  />
                  <div className='form-grid-row grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <input
                      type='text'
                      name='firstName'
                      placeholder='First Name*'
                      required
                      onChange={handleChange}
                      className='input-field w-full border border-white px-4 py-2 text-black'
                      style={{ borderRadius: '1px' }} // Set border radius to 1px
                    />
                    <input
                      type='text'
                      name='lastName'
                      placeholder='Last Name'
                      onChange={handleChange}
                      className='input-field w-full border border-white px-4 py-2 text-black'
                      style={{ borderRadius: '1px' }} // Set border radius to 1px
                    />
                  </div>
                  <input
                    type='text'
                    name='phone'
                    placeholder='Phone Number'
                    onChange={handleChange}
                    className='input-field w-full border border-white px-4 py-2 text-black'
                    style={{ borderRadius: '1px' }} // Set border radius to 1px
                  />
                  <input
                    type='text'
                    name='company'
                    placeholder='Company Name'
                    onChange={handleChange}
                    className='input-field w-full border border-white px-4 py-2 text-black'
                    style={{ borderRadius: '1px' }} // Set border radius to 1px
                  />
                  <textarea
                    name='inquiry'
                    placeholder='Inquiry*'
                    required
                    onChange={handleChange}
                    className='input-field textarea w-full border border-white px-4 py-2 text-black'
                    style={{ height: '100px', borderRadius: '1px' }} // Set border radius to 1px and increased height
                  />
                </div>
                <div className='flex justify-start mt-4'>
                  <button
                    type='submit'
                    className='submit-button px-4 py-2 rounded-md transition'
                    style={{ width: '200px', backgroundColor: '#1772bd' }} // Set width of submit button to 150px
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-white text-gray-900 py-8'>
        <div className='container mx-auto px-4'>
          <div className='footer flex flex-wrap items-start lg:flex-nowrap'>
            {/* Footer Logo */}
            <div className='footer-logo w-full lg:w-[30%] md:w-[25%] mb-6 lg:mb-0'>
              <img src='/GLAD_logo.png' alt='GLAD Logo' className='mx-auto lg:mx-0' />
            </div>

            {/* Footer Content */}
            <div className='footer-content flex flex-col lg:flex-row w-full lg:w-[70%] md:w-[75%] justify-between items-center'>
              {/* Email Info and About GLAD */}
              <div className='footer-details w-full lg:w-[50%] text-center lg:text-left mb-6 lg:mb-0'>
                <p className='mb-4'>
                  Email us at:{' '}
                  <a href='mailto:services@gladtech.io' className='hover:underline'>
                    services@gladtech.io
                  </a>
                </p>
                <p>
                  For information about our non-profit educational branch:{' '}
                  <a
                    href='https://www.gladtech.org'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:underline'
                  >
                    www.gladtech.org
                  </a>
                </p>
              </div>

              {/* Social Icons */}
              <div className='social-icons w-full lg:w-[20%] flex justify-center lg:justify-end mt-4 lg:mt-0'>
                <a
                  href='https://www.facebook.com/p/GLAD-Technology-100090154329991/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 hover:text-blue-400 mx-2'
                >
                  <FontAwesomeIcon icon={faFacebook} size='2x' />
                </a>
                <a
                  href='https://www.instagram.com/gladtechnology/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-pink-400 mx-2'
                >
                  <FontAwesomeIcon icon={faInstagram} size='2x' />
                </a>
                <a
                  href='https://www.linkedin.com/company/glad-technology'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 hover:text-blue-300 mx-2'
                >
                  <FontAwesomeIcon icon={faLinkedin} size='2x' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
