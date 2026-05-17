import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={footerContainer}>
      <div style={footerContent}>

        {/* 🚗 ABOUT SECTION (AUTO INDUSTRY FOCUSED) */}
        <div style={footerSection}>
          <h3 style={sectionTitle}>About Carl Automotive</h3>
          <p style={sectionText}>
            Carl Automotive is a trusted online marketplace for quality car parts and accessories.
            We specialize in connecting drivers, mechanics, and car enthusiasts with reliable,
            affordable, and genuine automotive products. Our goal is to keep your vehicle running
            smoothly with parts you can trust.
          </p>
        </div>

        {/* 🔗 QUICK LINKS */}
        <div style={footerSection}>
          <h3 style={sectionTitle}>Quick Links</h3>
          <ul style={linkList}>

            <li><Link to="/" style={linkStyle}>Home</Link></li>
            <li><Link to="/cart" style={linkStyle}>Cart</Link></li>
            <li><Link to="/wishlist" style={linkStyle}>Wishlist</Link></li>
            <li><Link to="/addproduct" style={linkStyle}>Sell Product</Link></li>
            <li><Link to="/mpesapayment" style={linkStyle}>Payments</Link></li>

          </ul>
        </div>

        {/* 📞 CONTACT INFO */}
        <div style={footerSection}>
          <h3 style={sectionTitle}>Contact</h3>

          <p style={sectionText}>Email: carloliver365@gmail.com</p>
          <p style={sectionText}>Phone: +254759728853</p>
          <p style={sectionText}>Location: Nairobi, Kenya</p>

        </div>

      </div>

      {/* FOOTER BOTTOM */}
      <div style={footerBottom}>
        <p style={{ margin: 0 }}>
          ©️ {new Date().getFullYear()} Carl Automotive. All rights reserved.
        </p>

        <p style={tagline}>
          Crafted with persistence & late-night code commits ⚙️
        </p>
      </div>
    </footer>
  );
};

/* 🎨 MODERNIZED STYLES (BASED ON YOUR ORIGINAL) */

const footerContainer = {
  background: "linear-gradient(135deg, #0f0f0f, #1a1a1a)",
  color: '#f0f0f0',
  padding: '40px 20px 20px 20px',
  fontFamily: 'Arial, sans-serif',
  boxShadow: "0 -10px 30px rgba(0,0,0,0.4)"
};

const footerContent = {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  maxWidth: '1200px',
  margin: '0 auto',
  gap: '25px'
};

const footerSection = {
  flex: '1 1 250px',
  margin: '10px',
};

const sectionTitle = {
  fontSize: '18px',
  marginBottom: '10px',
  fontWeight: 'bold',
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  paddingBottom: "5px"
};

const sectionText = {
  fontSize: '14px',
  lineHeight: '1.6',
  opacity: 0.85
};

const linkList = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const linkStyle = {
  color: '#f0f0f0',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '8px',
  transition: '0.3s ease',
  opacity: 0.85,
  cursor: "pointer"
};

/* hover effect via inline trick alternative is not possible directly,
   but this keeps it clean for presentation */

const footerBottom = {
  textAlign: 'center',
  marginTop: '30px',
  borderTop: '1px solid rgba(255,255,255,0.1)',
  paddingTop: '15px',
  fontSize: '12px',
  opacity: 0.8
};

const tagline = {
  margin: "5px 0 0 0",
  fontSize: "11px",
  opacity: 0.6,
  fontStyle: "italic"
};

export default Footer;