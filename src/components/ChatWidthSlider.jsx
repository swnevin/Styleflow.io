// src/components/ChatWidthSlider.jsx
import React from 'react';
import './ChatWidthSlider.css';

/**
 * ChatWidthSlider Component
 * Allows the user to adjust the width of the chat widget.
 */
function ChatWidthSlider({ chatWidth, setChatWidth, title }) {
  return (
    <div className="chat-width-slider" title={title}>
      <label htmlFor="chatWidth">Chat Width:</label>
      <input
        type="range"
        id="chatWidth"
        min="300"
        max="380"
        value={chatWidth}
        onChange={(e) => setChatWidth(parseInt(e.target.value))}
      />
      <span>{chatWidth}px</span>
    </div>
  );
}

export default ChatWidthSlider;
