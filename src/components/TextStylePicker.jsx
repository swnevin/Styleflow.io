// src/components/TextStylePicker.jsx
import React from 'react';
import ColorPicker from './ColorPicker';
import FontSelector from './FontSelector';
import HelpIcon from './HelpIcon';
import './TextStylePicker.css';

/**
 * TextStylePicker Component
 * Allows customization of text-related styles.
 */
function TextStylePicker({
  fontFamily,
  setFontFamily,
  titleTextColor,
  setTitleTextColor,
  assistantDescriptionTextColor,
  setAssistantDescriptionTextColor,
  userMessageBgColor,
  setUserMessageBgColor,
  userMessageTextColor,
  setUserMessageTextColor,
  assistantMessageBgColor,
  setAssistantMessageBgColor,
  assistantMessageTextColor,
  setAssistantMessageTextColor,
}) {
  return (
    <div className="text-style-picker">
      <FontSelector
        font={fontFamily}
        onChange={(e) => setFontFamily(e.target.value)}
        label={
          <>
            Font Family:
            <HelpIcon text="Choose the font family for the widget" />
          </>
        }
      />
      <ColorPicker
        label={
          <>
            Title Text Color:
            <HelpIcon text="Set the color of the assistant's title text" />
          </>
        }
        color={titleTextColor}
        onChange={(e) => setTitleTextColor(e.target.value)}
      />
      <ColorPicker
        label={
          <>
            Assistant Description Text Color:
            <HelpIcon text="Set the color of the assistant's description text" />
          </>
        }
        color={assistantDescriptionTextColor}
        onChange={(e) => setAssistantDescriptionTextColor(e.target.value)}
      />
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

export default TextStylePicker;
