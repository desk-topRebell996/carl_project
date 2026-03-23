import React from 'react';

const Footer = () => {
  return (
    <footer style={footerContainer}>
      <div style={footerContent}>
        {/* About Section */}
        <div style={footerSection}>
          <h3 style={sectionTitle}>About Us</h3>
          <p style={sectionText}>
            We are a company dedicated to providing the best products and services to our customers. 
            Our mission is to deliver quality and excellence in everything we do.
          </p>
        </div>

        {/* Quick Links */}
        <div style={footerSection}>
          <h3 style={sectionTitle}>Quick Links</h3>
          <ul style={linkList}>
            <li><a href="/" style={linkStyle}>Home</a></li>
            <li><a href="/about" style={linkStyle}>About Us</a></li>
            <li><a href="/products" style={linkStyle}>Products</a></li>
            <li><a href="/contact" style={linkStyle}>Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div style={footerSection}>
          <h3 style={sectionTitle}>Contact</h3>
          <p style={sectionText}>Email: info@yourcompany.com</p>
          <p style={sectionText}>Phone: +254 700 000 000</p>
          <p style={sectionText}>Location: Nairobi, Kenya</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div style={footerBottom}>
        <p style={{ margin: 0 }}>©️ {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Inline styles
const footerContainer = {
  backgroundColor: '#1c1c1c',
  color: '#f0f0f0',
  padding: '40px 20px 20px 20px',
  fontFamily: 'Arial, sans-serif',
};

const footerContent = {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  maxWidth: '1200px',
  margin: '0 auto',
};

const footerSection = {
  flex: '1 1 250px',
  margin: '10px',
};

const sectionTitle = {
  fontSize: '18px',
  marginBottom: '10px',
  fontWeight: 'bold',
};

const sectionText = {
  fontSize: '14px',
  lineHeight: '1.6',
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
};

const footerBottom = {
  textAlign: 'center',
  marginTop: '30px',
  borderTop: '1px solid #333',
  paddingTop: '15px',
  fontSize: '12px',
};

export default Footer;