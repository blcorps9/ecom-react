import React from "react";
import { Link } from "react-router-dom";

export default function InfoSection() {
  return (
    <div className="footer-info-section">
      <div className="contact-us">
        <div className="addr-ln-1">Address: Line 1, Line 2</div>
        <div className="addr-city">Bangalore, Karnataka</div>

        <div className="social-links">Bangalore, Karnataka</div>
      </div>
      <div className="infomation">
        <Link className="about-us d-block" to="/about-us">
          About Us
        </Link>
        <Link className="contact-us d-block" to="/contact-us">
          Contact Us
        </Link>
        <div className="delivery-info">Delivery Information</div>
        <div className="privacy-policy">Privacy Policy</div>
        <div className="faqs">FAQs</div>
      </div>
      <div className="my-account">
        <div className="addresses">My Addresses</div>
        <div className="orders">My Orders</div>
        <div className="cart">My Cart</div>
      </div>
    </div>
  );
}
