// src/components/LauncherSettings.jsx
import React from 'react';
import ColorPicker from './ColorPicker';
import ProactiveMessageEditor from './ProactiveMessageEditor';
import HelpIcon from './HelpIcon';
import './LauncherSettings.css';

/**
 * LauncherSettings Component
 * Allows customization of the launcher button and proactive messages.
 */
function LauncherSettings({
  launcherColor,
  setLauncherColor,
  launcherSize,
  setLauncherSize,
  launcherImage,
  setLauncherImage,
  proactiveMessages,
  setProactiveMessages,
}) {
  return (
    <div className="launcher-settings">
      <ColorPicker
        label={
          <>
            Launcher Color:
            <HelpIcon text="Select the color of the launcher button" />
          </>
        }
        color={launcherColor}
        onChange={(e) => setLauncherColor(e.target.value)}
      />
      <div className="launcher-settings-input">
        <label>
          Launcher Size (px):
          <HelpIcon text="Set the size of the launcher button" />
        </label>
        <input
          type="number"
          value={launcherSize}
          onChange={(e) => setLauncherSize(parseInt(e.target.value))}
          min="30"
          max="100"
        />
      </div>
      {/* Launcher Offset Disabled */}
      <div className="launcher-settings-input">
        <label style={{ color: '#888' }}>
          Launcher Offset (Coming Soon)
          <HelpIcon text="Offset adjustment will be available soon. For now, you can change it in VoiceFlow." />
        </label>
        <input
          type="number"
          value={24}
          disabled
          style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
        />
      </div>
      <div className="launcher-settings-input">
        <label>
          Launcher Image URL:
          <HelpIcon text="Provide a URL for a custom launcher image" />
        </label>
        <input
          type="text"
          value={launcherImage}
          onChange={(e) => setLauncherImage(e.target.value)}
          placeholder="Enter image URL"
        />
      </div>
      {/* Proactive Messages Editor */}
      <ProactiveMessageEditor
        proactiveMessages={proactiveMessages}
        setProactiveMessages={setProactiveMessages}
      />
    </div>
  );
}

export default LauncherSettings;
