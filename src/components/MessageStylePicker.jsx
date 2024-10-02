// src/components/MessageStylePicker.jsx
import React from 'react';
import ColorPicker from './ColorPicker';

/**
 * MessageStylePicker Component
 * Allows customization of user and assistant message styles.
 */
function MessageStylePicker({
  userMessageBgColor,
  userMessageTextColor,
  assistantMessageBgColor,
  assistantMessageTextColor,
  setUserMessageBgColor,
  setUserMessageTextColor,
  setAssistantMessageBgColor,
  setAssistantMessageTextColor,
  title,
}) {
  return (
    <div className="message-style-picker" title={title}>
      <h4>User Message Style</h4>
      <ColorPicker
        label="Background Color:"
        color={userMessageBgColor}
        onChange={(e) => setUserMessageBgColor(e.target.value)}
        title="Select the background color of user messages"
      />
      <ColorPicker
        label="Text Color:"
        color={userMessageTextColor}
        onChange={(e) => setUserMessageTextColor(e.target.value)}
        title="Select the text color of user messages"
      />
      <h4>Assistant Message Style</h4>
      <ColorPicker
        label="Background Color:"
        color={assistantMessageBgColor}
        onChange={(e) => setAssistantMessageBgColor(e.target.value)}
        title="Select the background color of assistant messages"
      />
      <ColorPicker
        label="Text Color:"
        color={assistantMessageTextColor}
        onChange={(e) => setAssistantMessageTextColor(e.target.value)}
        title="Select the text color of assistant messages"
      />
    </div>
  );
}

export default MessageStylePicker;
