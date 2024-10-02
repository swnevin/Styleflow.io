// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ColorPicker from './components/ColorPicker';
import FontSelector from './components/FontSelector';
import ThemeButton from './components/ThemeButton';
import PreviewWindow from './components/PreviewWindow';
import CSSDisplay from './components/CSSDisplay';
import Footer from './components/Footer';
import MessageStylePicker from './components/MessageStylePicker';
import LauncherSettings from './components/LauncherSettings';
import IntegrationCode from './components/IntegrationCode';
import EmbedModeSelector from './components/EmbedModeSelector';
import ChatWidthSlider from './components/ChatWidthSlider';
import AssistantInfoEditor from './components/AssistantInfoEditor';
import ProactiveMessageEditor from './components/ProactiveMessageEditor';
import './App.css';

function App() {
  // State variables
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF'); // Light mode background
  const [textColor, setTextColor] = useState('#1F2428'); // Dark text color
  const [brandColor, setBrandColor] = useState('#4375F5'); // Brand color
  const [fontFamily, setFontFamily] = useState('UCityPro, sans-serif'); // Font family
  const [theme, setTheme] = useState('Light'); // Theme
  const [embedMode, setEmbedMode] = useState('overlay'); // 'overlay' or 'embedded'
  const [chatWidth, setChatWidth] = useState(400); // Width in pixels
  const [assistantName, setAssistantName] = useState('Assistant'); // Assistant name
  const [assistantDescription, setAssistantDescription] = useState('How can I assist you today?'); // Description
  const [assistantLogo, setAssistantLogo] = useState('https://i.postimg.cc/Bn95VC86/Styleflow-VF.png'); // Default logo URL
  const [proactiveMessages, setProactiveMessages] = useState([]); // Array of proactive messages
  const [projectID, setProjectID] = useState('66fa5d8dd6785bb2984c7cfb'); // Default project ID
  const [autoOpen, setAutoOpen] = useState(true); // Auto-open widget

  // User and assistant message styles
  const [userMessageBgColor, setUserMessageBgColor] = useState('#E0F7FA');
  const [userMessageTextColor, setUserMessageTextColor] = useState('#006064');
  const [assistantMessageBgColor, setAssistantMessageBgColor] = useState('#FFF3E0');
  const [assistantMessageTextColor, setAssistantMessageTextColor] = useState('#E65100');

  // Launcher settings
  const [launcherColor, setLauncherColor] = useState('#4375F5');
  const [launcherSize, setLauncherSize] = useState(60); // Size in pixels
  const [launcherOffset, setLauncherOffset] = useState(20); // Offset in pixels
  const [launcherImage, setLauncherImage] = useState(''); // URL to launcher image

  // Ref to track if the widget has been initialized
  const widgetInitialized = useRef(false);

  // State to manage accordion sections
  const [expandedSections, setExpandedSections] = useState({
    themeSettings: false,
    messageStyles: false,
    launcherSettings: false,
    assistantInfo: false,
    proactiveMessages: false,
    embedOptions: false,
  });

  // Function to toggle section expansion
  const toggleSection = (sectionName) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [sectionName]: !prevState[sectionName],
    }));
  };

  /**
   * Applies the selected theme by updating the state.
   *
   * @param {string} selectedTheme - The theme to apply ('Light' or 'Dark').
   */
  const applyTheme = (selectedTheme) => {
    if (selectedTheme === 'Dark') {
      setBackgroundColor('#1F2428'); // Dark mode background
      setTextColor('#FFFFFF'); // Light text color
      setTheme('Dark');
    } else if (selectedTheme === 'Light') {
      setBackgroundColor('#FFFFFF'); // Light mode background
      setTextColor('#1F2428'); // Dark text color
      setTheme('Light');
    }
  };

  /**
   * Generates CSS based on the current theme and customization settings.
   *
   * @returns {string} - The generated CSS string.
   */
  const generateCSS = () => {
    return `
:host {
    --fonts-default: ${fontFamily};
    --brand-color: ${brandColor};
    --hover-color: ${lightenColor(brandColor, 20)};
    --dark-background: #262626;
    --light-gray: ${theme === 'Light' ? '#F4F4F4' : '#303030'};
    --font-color: ${textColor};
    --user-message-bg-color: ${userMessageBgColor};
    --user-message-text-color: ${userMessageTextColor};
    --assistant-message-bg-color: ${assistantMessageBgColor};
    --assistant-message-text-color: ${assistantMessageTextColor};
    --chat-width: ${chatWidth}px;
}

/* Launcher Styles */
.vfrc-launcher {
    background-color: ${launcherColor};
    ${launcherImage ? `background-image: url(${launcherImage});` : ''}
    width: ${launcherSize}px;
    height: ${launcherSize}px;
    bottom: ${launcherOffset}px;
    right: ${launcherOffset}px;
}

.vfrc-launcher:hover {
    background-color: var(--hover-color);
}

/* Chat Styles */
.vfrc-chat {
    background-color: ${backgroundColor};
    width: var(--chat-width);
}

.vfrc-widget--chat {
    max-height: 100% !important;
}

/* Header and Footer */
.vfrc-header,
.vfrc-footer {
    background-color: var(--brand-color);
}

/* Scrollbar */
::-webkit-scrollbar {
    border-left: 1px solid var(--brand-color);
}

::-webkit-scrollbar-thumb {
    background-color: rgba(67, 117, 245, 0.3); /* Adjusted opacity */
}

/* Assistant Info */
.vfrc-assistant-info--title {
    color: var(--font-color);
}

.vfrc-assistant-info--description {
    color: ${theme === 'Light' ? '#000000' : 'rgba(250, 250, 249, 0.8)'};
}

.vfrc-chat--session-time,
.vfrc-timestamp,
.vfrc-footer--watermark {
    color: ${theme === 'Light' ? '#000000' : 'rgba(250, 250, 249, 0.8)'};
}

.vfrc-assistant-info--description a,
.vfrc-chat--session-time a,
.vfrc-timestamp a,
.vfrc-footer--watermark a {
    color: var(--font-color);
}

/* User Message */
.vfrc-user-response .vfrc-message {
    background-color: var(--user-message-bg-color);
    color: var(--user-message-text-color);
}

/* Assistant Message */
.vfrc-system-response .vfrc-message {
    background-color: var(--assistant-message-bg-color);
    color: var(--assistant-message-text-color);
}

/* Secondary Button */
.vfrc-button--secondary {
    background-color: var(--light-gray);
    color: var(--font-color);
    border-color: var(--brand-color);
}

.vfrc-button--secondary:hover {
    font-weight: 700;
    border-color: var(--brand-color);
    border: 2px;
}

/* Footer Button */
.vfrc-footer button.vfrc-button {
    position: relative;
    background-color: var(--brand-color) !important;
}

.vfrc-footer button.vfrc-button::after {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    inset: 0;
    color: var(--font-color);
    border: 2px;
}

.vfrc-footer .vfrc-chat-input--button .vfrc-bubble {
    background-color: var(--brand-color);
}

.vfrc-prompt {
    background-color: var(--brand-color);
}

.vfrc-prompt button {
    color: var(--font-color);
}

.vfrc-prompt button:hover {
    color: #efefef;
}
        `;
  };

  /**
   * Lightens a given hex color by a specified percentage.
   *
   * @param {string} color - The hex color code.
   * @param {number} percent - The percentage to lighten the color.
   * @returns {string} - The lightened hex color code.
   */
  const lightenColor = (color, percent) => {
    const num = parseInt(color.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = ((num >> 8) & 0x00ff) + amt,
      B = (num & 0x0000ff) + amt;
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  };

  /**
   * Converts a CSS string into a Base64-encoded Data URL.
   *
   * @param {string} css - The CSS string to convert.
   * @returns {string} - The Data URL containing the Base64-encoded CSS.
   */
  const convertCSSToDataURL = (css) => {
    const base64 = btoa(unescape(encodeURIComponent(css)));
    const timestamp = new Date().getTime();
    return `data:text/css;base64,${base64}#${timestamp}`;
  };

  /**
   * Handles the widget loading process.
   */
  const handleWidgetLoad = () => {
    const stylesheet = generateCSS();
    const stylesheetUrl = convertCSSToDataURL(stylesheet);
    loadVoiceflowChat(stylesheetUrl);
  };

  /**
   * Loads the Voiceflow widget, hiding the existing one if necessary.
   *
   * @param {string} stylesheetUrl - The Data URL of the generated CSS stylesheet.
   */
  const loadVoiceflowChat = (stylesheetUrl) => {
    // Function to initialize the widget
    const initializeWidget = () => {
      // Hide the existing widget if it exists
      if (window.voiceflow && window.voiceflow.chat) {
        window.voiceflow.chat.hide();
      }

      // Construct the render configuration based on embedMode
      const renderConfig =
        embedMode === 'embedded'
          ? {
              mode: 'embedded',
              target: document.getElementById('voiceflow-chat-frame'),
            }
          : {
              mode: 'overlay',
            };

      // Ensure target is a valid HTMLElement when in 'embedded' mode
      if (embedMode === 'embedded' && !renderConfig.target) {
        console.error(
          "Error: No element with ID 'voiceflow-chat-frame' found in the DOM."
        );
        return;
      }

      window.voiceflow.chat
        .load({
          verify: { projectID: projectID },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          assistant: {
            title: assistantName,
            description: assistantDescription,
            image: assistantLogo || 'https://i.postimg.cc/Bn95VC86/Styleflow-VF.png', // Use placeholder if empty
            stylesheet: stylesheetUrl,
          },
          render: renderConfig,
        })
        .then(() => {
          // Push proactive messages if any
          if (proactiveMessages.length > 0) {
            window.voiceflow.chat.proactive.clear();
            window.voiceflow.chat.proactive.push(
              ...proactiveMessages.map((message) => ({
                type: 'text',
                payload: { message },
              }))
            );
          }
          // Auto-open the widget if autoOpen is true
          if (autoOpen) {
            window.voiceflow.chat.open();
            console.log('Voiceflow widget opened.');
          }
        })
        .catch((error) => {
          console.error('Error loading Voiceflow chat:', error);
        });
    };

    // Check if the Voiceflow script is already loaded
    if (!window.voiceflow || !window.voiceflow.chat) {
      // Load the Voiceflow script
      const script = document.createElement('script');
      script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
      script.type = 'text/javascript';
      script.onload = () => {
        initializeWidget();
      };
      document.head.appendChild(script);
      console.log('Voiceflow script added.');
    } else {
      // Script already loaded, initialize the widget
      initializeWidget();
    }
  };

  // Auto-load widget on first render
  useEffect(() => {
    if (!widgetInitialized.current) {
      handleWidgetLoad();
      widgetInitialized.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="App">
      <Header />
      <div className="customization-panel">
        <h2>Customize Your Widget</h2>

        {/* Theme Settings */}
        <div className="customization-section">
          <h3
            onClick={() => toggleSection('themeSettings')}
            className="accordion-header"
          >
            Theme Settings
          </h3>
          {expandedSections.themeSettings && (
            <div className="accordion-content">
              <div className="theme-buttons">
                <ThemeButton
                  theme="Light"
                  onClick={applyTheme}
                  active={theme === 'Light'}
                  title="Switch to Light Mode"
                >
                  Light Mode
                </ThemeButton>
                <ThemeButton
                  theme="Dark"
                  onClick={applyTheme}
                  active={theme === 'Dark'}
                  title="Switch to Dark Mode"
                >
                  Dark Mode
                </ThemeButton>
              </div>
              <ColorPicker
                label="Background Color:"
                color={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                title="Select the background color of the widget"
              />
              <ColorPicker
                label="Text Color:"
                color={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                title="Select the text color used in the widget"
              />
              <ColorPicker
                label="Brand Color:"
                color={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                title="Select the brand color for buttons and highlights"
              />
              <FontSelector
                font={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                title="Choose the font family for the widget"
              />
            </div>
          )}
        </div>

        {/* Message Styles */}
        <div className="customization-section">
          <h3
            onClick={() => toggleSection('messageStyles')}
            className="accordion-header"
          >
            Message Styles
          </h3>
          {expandedSections.messageStyles && (
            <div className="accordion-content">
              <MessageStylePicker
                userMessageBgColor={userMessageBgColor}
                userMessageTextColor={userMessageTextColor}
                assistantMessageBgColor={assistantMessageBgColor}
                assistantMessageTextColor={assistantMessageTextColor}
                setUserMessageBgColor={setUserMessageBgColor}
                setUserMessageTextColor={setUserMessageTextColor}
                setAssistantMessageBgColor={setAssistantMessageBgColor}
                setAssistantMessageTextColor={setAssistantMessageTextColor}
                title="Customize the appearance of user and assistant messages"
              />
            </div>
          )}
        </div>

        {/* Launcher Settings */}
        <div className="customization-section">
          <h3
            onClick={() => toggleSection('launcherSettings')}
            className="accordion-header"
          >
            Launcher Settings
          </h3>
          {expandedSections.launcherSettings && (
            <div className="accordion-content">
              <LauncherSettings
                launcherColor={launcherColor}
                setLauncherColor={setLauncherColor}
                launcherSize={launcherSize}
                setLauncherSize={setLauncherSize}
                launcherOffset={launcherOffset}
                setLauncherOffset={setLauncherOffset}
                launcherImage={launcherImage}
                setLauncherImage={setLauncherImage}
                title="Adjust the appearance and position of the launcher button"
              />
            </div>
          )}
        </div>

        {/* Assistant Information */}
        <div className="customization-section">
          <h3
            onClick={() => toggleSection('assistantInfo')}
            className="accordion-header"
          >
            Assistant Information
          </h3>
          {expandedSections.assistantInfo && (
            <div className="accordion-content">
              <AssistantInfoEditor
                assistantName={assistantName}
                setAssistantName={setAssistantName}
                assistantDescription={assistantDescription}
                setAssistantDescription={setAssistantDescription}
                assistantLogo={assistantLogo}
                setAssistantLogo={setAssistantLogo}
                projectID={projectID}
                setProjectID={setProjectID}
                title="Set the name, description, logo, and project ID for your assistant"
              />
            </div>
          )}
        </div>

        {/* Proactive Messages */}
        <div className="customization-section">
          <h3
            onClick={() => toggleSection('proactiveMessages')}
            className="accordion-header"
          >
            Proactive Messages
          </h3>
          {expandedSections.proactiveMessages && (
            <div className="accordion-content">
              <ProactiveMessageEditor
                proactiveMessages={proactiveMessages}
                setProactiveMessages={setProactiveMessages}
                title="Create messages that will proactively engage users"
              />
            </div>
          )}
        </div>

        {/* Embed Options */}
        <div className="customization-section">
          <h3
            onClick={() => toggleSection('embedOptions')}
            className="accordion-header"
          >
            Embed Options
          </h3>
          {expandedSections.embedOptions && (
            <div className="accordion-content">
              <EmbedModeSelector
                embedMode={embedMode}
                setEmbedMode={setEmbedMode}
                title="Choose how the widget is embedded on the page"
              />
              <ChatWidthSlider
                chatWidth={chatWidth}
                setChatWidth={setChatWidth}
                title="Adjust the width of the chat window"
              />
              {/* Auto Open Checkbox */}
              <div
                className="auto-open-checkbox"
                title="Toggle whether the widget opens automatically"
              >
                <label>
                  <input
                    type="checkbox"
                    checked={autoOpen}
                    onChange={(e) => setAutoOpen(e.target.checked)}
                  />
                  Auto Open Widget
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
      <PreviewWindow loadWidget={handleWidgetLoad} />
      <CSSDisplay
        css={generateCSS()}
        dataURL={convertCSSToDataURL(generateCSS())}
      />
      <IntegrationCode
        embedMode={embedMode}
        assistantName={assistantName}
        assistantDescription={assistantDescription}
        assistantLogo={assistantLogo}
        stylesheetUrl={convertCSSToDataURL(generateCSS())}
        proactiveMessages={proactiveMessages}
        projectID={projectID}
        autoOpen={autoOpen}
      />
      <Footer />
      {/* Add the voiceflow-chat-frame div when in embedded mode */}
      {embedMode === 'embedded' && <div id="voiceflow-chat-frame"></div>}
    </div>
  );
}

export default App;
