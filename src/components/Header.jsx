// src/components/Header.jsx
import React from 'react';
import './Header.css';
import logo from '../assets/styleflow.png';

/**
 * Header Component
 * Displays the logo and a brief description.
 */
function Header() {
  return (
    <header className="header">
      {/* Logo Image */}
      <img src={logo} alt="Styleflow Logo" className="logo" title="Styleflow Logo" />
      {/* Header Description */}
      <p title="Easily customize your Voiceflow widget's appearance">
        Easily customize your Voiceflow widget's appearance
      </p>
    </header>
  );
}

export default Header;
