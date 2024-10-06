// src/components/CSSDisplay.jsx
import React from 'react';
import './CSSDisplay.css';

/**
 * CSSDisplay Component
 * Displays the generated CSS and its Data URL with options to copy them.
 *
 * @param {string} css - The generated CSS string.
 * @param {string} dataURL - The Data URL of the generated CSS.
 */
function CSSDisplay({ css, dataURL }) {
  /**
   * Copies the CSS string to the clipboard.
   */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(css);
    alert('CSS copied to clipboard!');
  };

  /**
   * Copies the Data URL to the clipboard.
   */
  const copyDataURL = () => {
    navigator.clipboard.writeText(dataURL);
    alert('Data URL copied to clipboard!');
  };

  return (
    <div className="css-display">
      <h2>Generated CSS - Advanced</h2>
      <h4>Use this if you want to further customize the CSS</h4>
      <textarea readOnly value={css} />
      <button onClick={copyToClipboard} title="Copy the generated CSS to clipboard">Copy CSS</button>
      <h2>Data URL</h2>
      <h4>Use the generated data URL to apply the CSS to your bot. See how it's doen in integration code</h4>
      <textarea readOnly value={dataURL} />
      <button onClick={copyDataURL} title="Copy the Data URL to clipboard">Copy Data URL</button>
    </div>
  );
}

export default CSSDisplay;
