import React, { useState } from "react";
import "./css/SupportPage.css"; // Make sure to create this CSS file

function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="support-page">
      <h1 className="support-title">Support Center</h1>
      
      <section className="support-info">
        <h2>Contact Us</h2>
        <p>If you need assistance, feel free to reach out to us. Our support team is here to help you.</p>
        <p><strong>Email:</strong> support@example.com</p>
        <p><strong>Phone:</strong> +123 456 7890</p>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <ul className="faq-list">
          <li><strong>How can I reset my password?</strong> Go to the login page and click on "Forgot Password".</li>
          <li><strong>How can I update my profile information?</strong> Navigate to the profile page and edit your details.</li>
          <li><strong>How do I contact support?</strong> You can fill out the form below or contact us via email.</li>
        </ul>
      </section>

      <section className="contact-form-section">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </section>
    </div>
  );
}

export default SupportPage;
