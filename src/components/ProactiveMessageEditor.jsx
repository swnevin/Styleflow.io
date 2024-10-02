// src/components/ProactiveMessageEditor.jsx
import React, { useState } from 'react';
import './ProactiveMessageEditor.css';

/**
 * ProactiveMessageEditor Component
 * Allows the user to set proactive messages.
 */
function ProactiveMessageEditor({ proactiveMessages, setProactiveMessages }) {
  const [newMessage, setNewMessage] = useState('');

  const addMessage = () => {
    if (newMessage.trim() !== '') {
      setProactiveMessages([...proactiveMessages, newMessage.trim()]);
      setNewMessage('');
    }
  };

  const removeMessage = (index) => {
    const updatedMessages = proactiveMessages.filter((_, i) => i !== index);
    setProactiveMessages(updatedMessages);
  };

  return (
    <div className="proactive-message-editor">
      <h3>Proactive Messages</h3>
      <div className="proactive-messages-list">
        {proactiveMessages.map((message, index) => (
          <div key={index} className="proactive-message-item">
            <span>{message}</span>
            <button onClick={() => removeMessage(index)} title="Remove this message">
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="proactive-message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter a proactive message"
          title="Type a proactive message to engage users"
        />
        <button onClick={addMessage} title="Add the proactive message">
          Add Message
        </button>
      </div>
    </div>
  );
}

export default ProactiveMessageEditor;
