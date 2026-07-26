import React from "react";
import "./Contact.css";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-sidebar">
          <h2>Get in Touch</h2>
          <p>Have questions? We'd love to hear from you.</p>

          <div className="contact-details">
            <div className="detail-row">
              <Mail className="detail-icon" />
              <span>contact@store.com</span>
            </div>
            <div className="detail-row">
              <Phone className="detail-icon" />
              <span>+1 (234) 567-890</span>
            </div>
            <div className="detail-row">
              <MapPin className="detail-icon" />
              <span>123 Commerce Ave, Suite 100</span>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Your Name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Email Address" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea rows="5" placeholder="How can we help?"></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Send Message <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
