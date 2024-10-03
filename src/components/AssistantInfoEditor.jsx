// src/components/AssistantInfoEditor.jsx

import React from 'react';
import HelpIcon from './HelpIcon';
import './AssistantInfoEditor.css';

/**
 * AssistantInfoEditor Component
 * Allows customization of assistant's name, description, logo, avatar image, and project ID.
 */
function AssistantInfoEditor({
  assistantName,
  setAssistantName,
  assistantDescription,
  setAssistantDescription,
  assistantLogo,
  setAssistantLogo,
  assistantAvatarImage,
  setAssistantAvatarImage,
  projectID,
  setProjectID,
}) {
  return (
    <div className="assistant-info-editor">
      <h3>Assistant Information</h3>
      <div className="assistant-info-input">
        <label>
          Name:
          <HelpIcon text="Enter the assistant's name" />
        </label>
        <input
          type="text"
          value={assistantName}
          onChange={(e) => setAssistantName(e.target.value)}
        />
      </div>
      <div className="assistant-info-input">
        <label>
          Description:
          <HelpIcon text="Enter a description for the assistant" />
        </label>
        <input
          type="text"
          value={assistantDescription}
          onChange={(e) => setAssistantDescription(e.target.value)}
        />
      </div>
      <div className="assistant-info-input">
        <label>
          Logo URL:
          <HelpIcon text="Enter the URL for the assistant's logo" />
        </label>
        <input
          type="text"
          value={assistantLogo}
          onChange={(e) => setAssistantLogo(e.target.value)}
          placeholder="Enter logo image URL"
        />
      </div>
      <div className="assistant-info-input">
        <label>
          Avatar Image URL:
          <HelpIcon text="Set a custom avatar image for the assistant" />
        </label>
        <input
          type="text"
          value={assistantAvatarImage}
          onChange={(e) => setAssistantAvatarImage(e.target.value)}
          placeholder="Enter avatar image URL"
        />
      </div>
      <div className="assistant-info-input">
        <label>
          Project ID:
          <HelpIcon text="Enter your Voiceflow Project ID" />
        </label>
        <input
          type="text"
          value={projectID}
          onChange={(e) => setProjectID(e.target.value)}
          placeholder="Enter Voiceflow Project ID"
        />
      </div>
    </div>
  );
}

export default AssistantInfoEditor;
