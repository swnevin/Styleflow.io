// src/components/LauncherSettings.jsx
import React from 'react';
import ColorPicker from './ColorPicker';
import './LauncherSettings.css';

/**
 * LauncherSettings Component
 * Allows customization of the launcher button.
 */
function LauncherSettings({
  launcherColor,
  setLauncherColor,
  launcherSize,
  setLauncherSize,
  launcherOffset,
  setLauncherOffset,
  launcherImage,
  setLauncherImage,
  title,
}) {
  return (
    <div className="launcher-settings" title={title}>
      <h3>Launcher Settings</h3>
      <ColorPicker
        label="Launcher Color:"
        color={launcherColor}
        onChange={(e) => setLauncherColor(e.target.value)}
        title="Select the color of the launcher button"
      />
      <div className="launcher-settings-input">
        <label>Launcher Size (px):</label>
        <input
          type="number"
          value={launcherSize}
          onChange={(e) => setLauncherSize(parseInt(e.target.value))}
          min="30"
          max="100"
          title="Set the size of the launcher button"
        />
      </div>
      <div className="launcher-settings-input">
        <label>Launcher Offset (px):</label>
        <input
          type="number"
          value={launcherOffset}
          onChange={(e) => setLauncherOffset(parseInt(e.target.value))}
          min="0"
          max="100"
          title="Set the offset of the launcher button from the bottom and right edges"
        />
      </div>
      <div className="launcher-settings-input">
        <label>Launcher Image URL:</label>
        <input
          type="text"
          value={launcherImage}
          onChange={(e) => setLauncherImage(e.target.value)}
          placeholder="Enter image URL"
          title="Provide a URL for a custom launcher image"
        />
      </div>
    </div>
  );
}

export default LauncherSettings;
