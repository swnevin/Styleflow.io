// src/components/AssistantInfoEditor.jsx
import React from 'react';
import './AssistantInfoEditor.css';

/**
 * AssistantInfoEditor Component
 * Allows customization of assistant's name, description, logo, and project ID.
 */
function AssistantInfoEditor({
  assistantName,
  setAssistantName,
  assistantDescription,
  setAssistantDescription,
  assistantLogo,
  setAssistantLogo,
  projectID,
  setProjectID,
  title
}) {
  return (
    <div className="assistant-info-editor" title={title}>
      <h3>Assistant Information</h3>
      <div className="assistant-info-input">
        <label>Name:</label>
        <input 
          type="text" 
          value={assistantName} 
          onChange={(e) => setAssistantName(e.target.value)}
          title="Enter the assistant's name"
        />
      </div>
      <div className="assistant-info-input">
        <label>Description:</label>
        <input 
          type="text" 
          value={assistantDescription} 
          onChange={(e) => setAssistantDescription(e.target.value)}
          title="Enter a description for the assistant"
        />
      </div>
      <div className="assistant-info-input">
        <label>Logo URL:</label>
        <input 
          type="text" 
          value={assistantLogo} 
          onChange={(e) => setAssistantLogo(e.target.value)}
          placeholder="Enter image URL"
          title="Enter the URL for the assistant's logo"
        />
      </div>
      <div className="assistant-info-input">
        <label>Project ID:</label>
        <input 
          type="text" 
          value={projectID} 
          onChange={(e) => setProjectID(e.target.value)}
          placeholder="Enter Voiceflow Project ID"
          title="Enter your Voiceflow Project ID"
        />
      </div>
    </div>
  );
}

export default AssistantInfoEditor;
