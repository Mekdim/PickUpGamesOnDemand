import React from 'react';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer.js';
import HeaderWrapped from './HeaderWrapped';

function ContactUsPage({ className }) {
  return (
    <div className={className}>
      <HeaderWrapped />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default ContactUsPage;
