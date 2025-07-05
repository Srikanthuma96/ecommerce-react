import React from 'react';
import Navbar from './Navbar';

const Contact = () => {
  return (
    <div>
      <Navbar/>
      <div className="contact-container" id="Contact">
        <form action="https://api.web3forms.com/submit" method="POST" className="contact-left">
          <div className="contact-left-title">
            <h2>Get in touch</h2>
            <hr />
          </div>
          <input type="hidden" name="access_key" value="b552d02c-8e5a-46c1-a927-43df04ca3a81" />
          <input type="text" name="name" placeholder="Your Name" required className="contact-inputs" />
          <input type="email" name="email" placeholder="Your Email" className="contact-inputs" required />
          <textarea name="message" placeholder="Your Message" className="contact-inputs"></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
