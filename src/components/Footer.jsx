// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

/**
 * Footer Component
 * Displays the footer with copyright information.
 */
function Footer() {
  return (
    <footer className="footer" title="Voiceflow Widget Customizer Footer">
      <p>© {new Date().getFullYear()} ✨Made with Voiceflowers in mind by Sven</p>
    </footer>
  );
}

export default Footer;
