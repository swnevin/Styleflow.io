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
import HelpIcon from './components/HelpIcon';
import templates from './templates';
import './App.css';

function App() {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#1F2428');
  const [brandColor, setBrandColor] = useState('#4375F5');
  const [fontFamily, setFontFamily] = useState('sans-serif');
  const [theme, setTheme] = useState('Light');
  const [selectedTemplate, setSelectedTemplate] = useState('Default');

  const [embedMode, setEmbedMode] = useState('overlay');
  const [chatWidth, setChatWidth] = useState(380);
  const [autoOpen, setAutoOpen] = useState(true);

  const [assistantName, setAssistantName] = useState('Assistant');
  const [assistantDescription, setAssistantDescription] = useState('How can I assist you today?');
  const [assistantLogo, setAssistantLogo] = useState('https://i.postimg.cc/Bn95VC86/Styleflow-VF.png');
  const [assistantAvatarImage, setAssistantAvatarImage] = useState('');
  const [assistantDescriptionTextColor, setAssistantDescriptionTextColor] = useState('#000000');

  const [proactiveMessages, setProactiveMessages] = useState([]);

  const [projectID, setProjectID] = useState('66fa5d8dd6785bb2984c7cfb');

  const [userMessageBgColor, setUserMessageBgColor] = useState('#E0F7FA');
  const [userMessageTextColor, setUserMessageTextColor] = useState('#006064');
  const [assistantMessageBgColor, setAssistantMessageBgColor] = useState('#FFF3E0');
  const [assistantMessageTextColor, setAssistantMessageTextColor] = useState('#E65100');

  const [headerColor, setHeaderColor] = useState(brandColor);
  const [footerColor, setFooterColor] = useState('');
  const [titleTextColor, setTitleTextColor] = useState('#1F2428');
  const [endChatTextColor, setEndChatTextColor] = useState('#000000');
  const [userInputPlaceholderText, setUserInputPlaceholderText] = useState('Message...');

  const [launcherColor, setLauncherColor] = useState('#4375F5');
  const [launcherSize, setLauncherSize] = useState(60);
  const [launcherImage, setLauncherImage] = useState('');

  const widgetInitialized = useRef(false);

  const [expandedSections, setExpandedSections] = useState({
    themeSettings: false,
    messageStyles: false,
    launcherSettings: false,
    assistantInfo: false,
    proactiveMessages: false,
    embedOptions: false,
    interfaceSettings: false,
  });

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
      setBackgroundColor('#1F2428');
      setTextColor('#FFFFFF');
      setFooterColor('#4375F5');
      setHeaderColor(brandColor);
      setEndChatTextColor('#FFFFFF');
      setAssistantDescriptionTextColor('#FFFFFF');
      setTheme('Dark');
    } else if (selectedTheme === 'Light') {
      setBackgroundColor('#FFFFFF');
      setTextColor('#1F2428');
      setFooterColor('');
      setHeaderColor(brandColor);
      setEndChatTextColor('#000000');
      setAssistantDescriptionTextColor('#000000');
      setTheme('Light');
    }
  };

  /**
   * Applies a preset template by updating the state.
   *
   * @param {string} templateName - The name of the template to apply.
   */
  const applyTemplate = (templateName) => {
    const template = templates[templateName];
    if (template) {
      setBackgroundColor(template.backgroundColor);
      setTextColor(template.textColor);
      setBrandColor(template.brandColor);
      setFontFamily(template.fontFamily);
      setHeaderColor(template.brandColor);
      setSelectedTemplate(templateName);
    }
  };

  /**
   * Update colors based on theme changes.
   */
  useEffect(() => {
    if (theme === 'Dark') {
      setFooterColor('#4375F5');
      setEndChatTextColor('#FFFFFF');
      setAssistantDescriptionTextColor('#FFFFFF');
    } else {
      setFooterColor('');
      setEndChatTextColor('#000000');
      setAssistantDescriptionTextColor('#000000');
    }
  }, [theme]);

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
        --dark-background: ${theme === 'Dark' ? '#1F2428' : '#FFFFFF'};
        --light-gray: ${theme === 'Light' ? '#F4F4F4' : '#303030'};
        --font-color: ${textColor};
        --user-message-bg-color: ${userMessageBgColor};
        --user-message-text-color: ${userMessageTextColor};
        --assistant-message-bg-color: ${assistantMessageBgColor};
        --assistant-message-text-color: ${assistantMessageTextColor};
        --chat-width: ${chatWidth}px;
        --footer-color: ${footerColor};
        --header-color: ${headerColor};
        --title-text-color: ${titleTextColor};
        --end-chat-text-color: ${endChatTextColor};
        --assistant-description-text-color: ${assistantDescriptionTextColor};
    }

    /* Launcher Styles */
    .vfrc-launcher {
        background-color: ${launcherColor} !important;
        ${launcherImage ? `background-image: url(${launcherImage});` : ''}
        width: ${launcherSize}px !important;
        height: ${launcherSize}px !important;
        /* Offset disabled, coming soon */
    }

    .vfrc-launcher:hover {
        background-color: var(--hover-color) !important;
    }

    /* Chat Styles */
    .vfrc-chat {
        background-color: ${backgroundColor} !important;
        width: var(--chat-width) !important;
    }

    .vfrc-widget--chat {
        max-height: 100% !important;
    }

    /* Header */
    .vfrc-header {
        background-color: var(--header-color) !important;
    }

    /* Footer */
    .vfrc-footer {
        background-color: var(--footer-color) !important;
    }

    /* Title Text Color */
    .vfrc-assistant-info--title {
        color: var(--title-text-color) !important;
    }

    /* Assistant Description Text Color */
    .vfrc-assistant-info--description {
        color: var(--assistant-description-text-color) !important;
    }

    /* Assistant Avatar Image */
    .vfrc-assistant-avatar {
        background-image: url(${assistantAvatarImage || assistantLogo}) !important;
    }

    /* End Chat Text Color */
    .vfrc-footer .vfrc-button {
        color: var(--end-chat-text-color) !important;
    }

    /* User Input Placeholder Text Color */
    .vfrc-input::placeholder {
        color: var(--font-color) !important;
    }

    /* Scrollbar */
    ::-webkit-scrollbar {
        border-left: 1px solid var(--brand-color) !important;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(67, 117, 245, 0.3) !important;
    }

    /* User Message */
    .vfrc-user-response .vfrc-message {
        background-color: var(--user-message-bg-color) !important;
        color: var(--user-message-text-color) !important;
    }

    /* Assistant Message */
    .vfrc-system-response .vfrc-message {
        background-color: var(--assistant-message-bg-color) !important;
        color: var(--assistant-message-text-color) !important;
    }

    /* Secondary Button */
    .vfrc-button--secondary {
        background-color: var(--light-gray) !important;
        color: var(--font-color) !important;
        border-color: var(--brand-color) !important;
    }

    .vfrc-button--secondary:hover {
        font-weight: 700 !important;
        border-color: var(--brand-color) !important;
        border: 2px !important;
    }

    /* Footer Button */
    .vfrc-footer button.vfrc-button {
        position: relative !important;
        background-color: var(--brand-color) !important;
    }

    .vfrc-footer button.vfrc-button::after {
        position: absolute !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        inset: 0 !important;
        color: var(--font-color) !important;
        border: 2px !important;
    }

    /* User Input Placeholder Customization */
    .vfrc-chat-input textarea {
        background-image: none;
    }
    .vfrc-chat-input textarea::-moz-placeholder {
        color: transparent;
    }
    .vfrc-chat-input textarea::placeholder {
        color: transparent;
    }

    .vfrc-chat-input textarea:-moz-placeholder-shown {
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='50px' width='250px'><text x='15' y='25' fill='silver' font-family='verdana' font-size='15'>${encodeURIComponent(userInputPlaceholderText)}...</text></svg>");
        background-repeat: no-repeat;
    }

    .vfrc-chat-input textarea:placeholder-shown {
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='50px' width='250px'><text x='15' y='25' fill='silver' font-family='verdana' font-size='15'>${encodeURIComponent(userInputPlaceholderText)}...</text></svg>");
        background-repeat: no-repeat;
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
    const num = parseInt(color.replace('#', ''), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = ((num >> 8) & 0x00ff) + amt,
      B = (num & 0x0000ff) + amt;
    return (
      '#' +
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
    const initializeWidget = () => {
      if (window.voiceflow && window.voiceflow.chat) {
        window.voiceflow.chat.hide();
      }

      const renderConfig =
        embedMode === 'embedded'
          ? {
              mode: 'embedded',
              target: document.getElementById('voiceflow-chat-frame'),
            }
          : {
              mode: 'overlay',
            };

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
            image:
              assistantLogo || 'https://i.postimg.cc/Bn95VC86/Styleflow-VF.png',
            stylesheet: stylesheetUrl,
          },
          render: renderConfig,
        })
        .then(() => {
          if (proactiveMessages.length > 0) {
            window.voiceflow.chat.proactive.clear();
            window.voiceflow.chat.proactive.push(
              ...proactiveMessages.map((message) => ({
                type: 'text',
                payload: { message },
              }))
            );
          }
          if (autoOpen) {
            window.voiceflow.chat.open();
            console.log('Voiceflow widget opened.');
          }
        })
        .catch((error) => {
          console.error('Error loading Voiceflow chat:', error);
        });
    };

    if (!window.voiceflow || !window.voiceflow.chat) {
      const script = document.createElement('script');
      script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
      script.type = 'text/javascript';
      script.onload = () => {
        initializeWidget();
      };
      document.head.appendChild(script);
      console.log('Voiceflow script added.');
    } else {
      initializeWidget();
    }
  };

  /**
   * Load the widget on initial render
   */
  useEffect(() => {
    if (!widgetInitialized.current) {
      handleWidgetLoad();
      widgetInitialized.current = true;
    }
  }, []);

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
                  onClick={() => applyTheme('Light')}
                  active={theme === 'Light'}
                >
                  Light Mode
                </ThemeButton>
                <ThemeButton
                  theme="Dark"
                  onClick={() => applyTheme('Dark')}
                  active={theme === 'Dark'}
                >
                  Dark Mode
                </ThemeButton>
              </div>

              {/* Preset Templates Dropdown */}
              <div className="template-dropdown">
                <label htmlFor="template-select">
                  Preset Templates:
                  <HelpIcon text="Select a preset color scheme" />
                </label>
                <select
                  id="template-select"
                  value={selectedTemplate}
                  onChange={(e) => applyTemplate(e.target.value)}
                >
                  {Object.keys(templates).map((templateName) => (
                    <option key={templateName} value={templateName}>
                      {templateName}
                    </option>
                  ))}
                </select>
              </div>

              <ColorPicker
                label={
                  <>
                    Background Color:
                    <HelpIcon text="Select the background color of the widget" />
                  </>
                }
                color={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
              <ColorPicker
                label={
                  <>
                    Text Color:
                    <HelpIcon text="Select the text color used in the widget" />
                  </>
                }
                color={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
              <ColorPicker
                label={
                  <>
                    Brand Color:
                    <HelpIcon text="Select the brand color for buttons and highlights" />
                  </>
                }
                color={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
              />
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
              {/* Title Text Color */}
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
                launcherImage={launcherImage}
                setLauncherImage={setLauncherImage}
              />
            </div>
          )}
        </div>

        {/* Interface Settings */}
        <div className="customization-section">
          <h3
            onClick={() => toggleSection('interfaceSettings')}
            className="accordion-header"
          >
            Interface Settings
          </h3>
          {expandedSections.interfaceSettings && (
            <div className="accordion-content">
              <ColorPicker
                label={
                  <>
                    Header Color:
                    <HelpIcon text="Set the background color of the header" />
                  </>
                }
                color={headerColor}
                onChange={(e) => setHeaderColor(e.target.value)}
              />
              <ColorPicker
                label={
                  <>
                    Footer Color:
                    <HelpIcon text="Set the background color of the footer" />
                  </>
                }
                color={footerColor}
                onChange={(e) => setFooterColor(e.target.value)}
              />
              <ColorPicker
                label={
                  <>
                    End Chat Text Color:
                    <HelpIcon text="Set the text color of the 'End Chat' button" />
                  </>
                }
                color={endChatTextColor}
                onChange={(e) => setEndChatTextColor(e.target.value)}
              />
              {/* Assistant Description Text Color */}
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
              {/* User Input Placeholder Text */}
              <div className="interface-settings-input">
                <label>
                  User Input Placeholder Text:
                  <HelpIcon text="Set the placeholder text in the user input field" />
                </label>
                <input
                  type="text"
                  value={userInputPlaceholderText}
                  onChange={(e) => setUserInputPlaceholderText(e.target.value)}
                  placeholder="Enter placeholder text"
                />
              </div>
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
                assistantAvatarImage={assistantAvatarImage}
                setAssistantAvatarImage={setAssistantAvatarImage}
                projectID={projectID}
                setProjectID={setProjectID}
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
              />
              <ChatWidthSlider
                chatWidth={chatWidth}
                setChatWidth={setChatWidth}
              />
              {/* Auto Open Checkbox */}
              <div className="auto-open-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={autoOpen}
                    onChange={(e) => setAutoOpen(e.target.checked)}
                  />
                  Auto Open Widget
                  <HelpIcon text="Toggle whether the widget opens automatically" />
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
        assistantAvatarImage={assistantAvatarImage}
        userInputPlaceholderText={userInputPlaceholderText}
      />
      <Footer />
      {/* Add the voiceflow-chat-frame div when in embedded mode */}
      {embedMode === 'embedded' && <div id="voiceflow-chat-frame"></div>}
    </div>
  );
}

export default App;
