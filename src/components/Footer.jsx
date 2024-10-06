import React from 'react';
import './Footer.css';

/**
 * Footer Component
 * Displays the footer with copyright information and contributors section.
 */
function Footer() {
  // Sample contributors; you can replace or expand this list as needed
  const contributors = [
    'Winston - He made the dark mode and more, like changing the input placeholder'
  ];

  return (
    <footer className="footer" title="Voiceflow Widget Customizer Footer">
      <p>© {new Date().getFullYear()} ✨ Made with Voiceflowers in mind by Sven</p>

      {/* Contributors Section */}
      <div className="contributors">
        <h4>Contributors:</h4>
        <ul>
          {contributors.map((contributor, index) => (
            <li key={index}>{contributor}</li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
