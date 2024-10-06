import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ColorPicker from './components/ColorPicker';
import ThemeButton from './components/ThemeButton';
import PreviewWindow from './components/PreviewWindow';
import CSSDisplay from './components/CSSDisplay';
import Footer from './components/Footer';
import TextStylePicker from './components/TextStylePicker';
import LauncherSettings from './components/LauncherSettings';
import IntegrationCode from './components/IntegrationCode';
import EmbedModeSelector from './components/EmbedModeSelector';
import ChatWidthSlider from './components/ChatWidthSlider';
import AssistantInfoEditor from './components/AssistantInfoEditor';
import HelpIcon from './components/HelpIcon';
import templates from './templates';
import './App.css';

function App() {
    const [brandColor, setBrandColor] = useState('#4375F5');
    const [theme, setTheme] = useState('Light');
    const [selectedTemplate, setSelectedTemplate] = useState('Default');

    const [assistantName, setAssistantName] = useState('Styleflow');
    const [assistantDescription, setAssistantDescription] = useState(
      'Easily customize your Voiceflow widget\'s appearance'
    );
    const [assistantLogo, setAssistantLogo] = useState(
      'https://i.postimg.cc/Bn95VC86/Styleflow-VF.png'
    );
    const [assistantAvatarImage, setAssistantAvatarImage] = useState('');
    const [projectID, setProjectID] = useState('66fa5d8dd6785bb2984c7cfb');

    const [fontFamily, setFontFamily] = useState('sans-serif');
    const [titleTextColor, setTitleTextColor] = useState('#000000E6');
    const [assistantDescriptionTextColor, setAssistantDescriptionTextColor] =
      useState('#737376');
    const [userMessageBgColor, setUserMessageBgColor] = useState('#F4F4F4');
    const [userMessageTextColor, setUserMessageTextColor] = useState('#000000E6');
    const [assistantMessageBgColor, setAssistantMessageBgColor] =
      useState('#F4F4F4');
    const [assistantMessageTextColor, setAssistantMessageTextColor] =
      useState('#000000E6');

    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
    const [headerColor, setHeaderColor] = useState(brandColor);
    const [footerColor, setFooterColor] = useState('#FFFFFF');     
    const [userInputPlaceholderText, setUserInputPlaceholderText] =
      useState('Message');

    const [launcherColor, setLauncherColor] = useState('#4375F5');
    const [launcherSize, setLauncherSize] = useState(60);
    const [launcherImage, setLauncherImage] = useState('');
    const [proactiveMessages, setProactiveMessages] = useState([]);

    const [embedMode, setEmbedMode] = useState('overlay');
    const [chatWidth, setChatWidth] = useState(380);
    const [autoOpen, setAutoOpen] = useState(true);

    const widgetInitialized = useRef(false);

    const [expandedSections, setExpandedSections] = useState({
      themeSettings: false,
      assistantInfo: false,
      textStyles: false,
      interfaceSettings: false,
      launcherSettings: false,
      embedOptions: false,
    });


    /**
     * Toggle the visibility of customization sections.
     */
    const toggleSection = (sectionName) => {
      setExpandedSections((prevState) => ({
        ...prevState,
        [sectionName]: !prevState[sectionName],
      }));
    };

    /**
     * Apply Theme Function
     */
    const applyTheme = (selectedTheme) => {
      if (selectedTheme === 'Dark') {
        setBackgroundColor('#1F2428');
        setFooterColor(brandColor); // Set footer to brand color in Dark mode
        setAssistantDescriptionTextColor('#FAFAF9CC');
        setTitleTextColor('#FAFAF9');
        setUserMessageBgColor('#303030');
        setUserMessageTextColor('#FAFAF9');
        setAssistantMessageBgColor('#303030');
        setAssistantMessageTextColor('#FAFAF9');
        setTheme('Dark');
      } else if (selectedTheme === 'Light') {
        setBackgroundColor('#FFFFFF');
        setFooterColor('#FFFFFF'); // Initially set footer to background color
        setAssistantDescriptionTextColor('#737376');
        setTitleTextColor('#000000E6');
        setUserMessageBgColor('#F4F4F4');
        setUserMessageTextColor('#000000');
        setAssistantMessageBgColor('#F4F4F4');
        setAssistantMessageTextColor('#000000');
        setTheme('Light');
      }
    };

    /**
     * Apply Template Function
     */
    const applyTemplate = (templateName) => {
      const template = templates[templateName];
      if (template) {
        setBackgroundColor(template.backgroundColor);
        setFontFamily(template.fontFamily);
        setBrandColor(template.brandColor);
        setHeaderColor(template.brandColor);
        setSelectedTemplate(templateName);
      }
    };

    /**
     * Update Header Color Based on Brand Color
     */
    useEffect(() => {
      setHeaderColor(brandColor);
    }, [brandColor]);

    /**
     * Update Footer Color Based on Theme and Background Color
     */
    useEffect(() => {
      if (theme === 'Light') {
        setFooterColor(backgroundColor);
      } else if (theme === 'Dark') {
        setFooterColor(brandColor);
      }
    }, [theme, backgroundColor, brandColor]);

    /**
     * Converts a hex color code to an RGBA string with the specified opacity.
     *
     * @param {string} hex - The hex color code (e.g., '#4375F5').
     * @param {number} alpha - The opacity value (0 to 1).
     * @returns {string} - The RGBA color string.
     */
    const hexToRGBA = (hex, alpha) => {
      let r = 0, g = 0, b = 0;

      if (hex.length === 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
      }
      else if (hex.length === 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
      }
      return `rgba(${+r}, ${+g}, ${+b}, ${alpha})`;
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
     * Generates CSS based on the current theme and customization settings.
     *
     * @returns {string} - The generated CSS string.
     */
    const generateCSS = () => {
      const fadedBrandColor = hexToRGBA(brandColor, 0.8); // Increased opacity for more vibrancy

      let buttonStyles = '';

      if (theme === 'Dark') {
        buttonStyles = `
        /* Secondary Button in Dark Mode */
        .c-dzcdPv.vfrc-button.c-jjMiVY.vfrc-button--secondary.c-kCDKCe {
            background-color: #303030 !important;
            color: var(--brand-color) !important; /* Set text color to brand color */
            border-color: ${fadedBrandColor} !important;
        }

        .c-dzcdPv.vfrc-button.c-jjMiVY.vfrc-button--secondary.c-kCDKCe:hover {
            border-color: ${brandColor} !important;
        }

        /* Footer Background in Dark Mode */
        .vfrc-footer.c-kbCYVp {
            background-color: var(--footer-color) !important;
        }
        `;
      } else if (theme === 'Light') {
        buttonStyles = `
        /* Secondary Button in Light Mode */
        .c-dzcdPv.vfrc-button.c-jjMiVY.vfrc-button--secondary.c-kCDKCe {
            background-color: transparent !important;
            color: var(--brand-color) !important; /* Set text color to brand color */
            border-color: ${fadedBrandColor} !important;
        }

        .c-dzcdPv.vfrc-button.c-jjMiVY.vfrc-button--secondary.c-kCDKCe:hover {
            border-color: var(--brand-color) !important;
        }

        /* Footer Background in Light Mode */
        .vfrc-footer.c-kbCYVp {
            background-color: var(--footer-color) !important;
        }
        `;
      }

      const primaryButtonStyles = `
      /* Primary Button Styling */
      .c-dzcdPv.vfrc-button.c-jjMiVY.vfrc-button--primary.c-bXTvXv.c-bXTvXv-lckiv-type-info {
          background-color: var(--brand-color) !important;
          color: ${theme === 'Light' ? '#FFFFFF' : '#FFFFFF'} !important; /* Set to white in both modes as per previous adjustments */
          border-color: var(--brand-color) !important;
      }

      .c-dzcdPv.vfrc-button.c-jjMiVY.vfrc-button--primary.c-bXTvXv.c-bXTvXv-lckiv-type-info:hover {
      }

      /* Subtle Text */
      .c-bXTvXv-igaDqE-type-subtle {
          color: ${theme === 'Light' ? '#000000' : '#FFFFFF'} !important; /* Black in Light mode, white in Dark mode */
      }
      `;

      return `
      :host {
          --fonts-default: ${fontFamily};
          --brand-color: ${brandColor};
          --hover-color: ${lightenColor(brandColor, 20)};
          --dark-background: ${theme === 'Dark' ? '#1F2428' : '#FFFFFF'};
          --light-gray: ${theme === 'Light' ? '#F4F4F4' : '#303030'};
          --font-color: ${theme === 'Dark' ? '#FAFAF9' : '#000000E6'};
          --user-message-bg-color: ${userMessageBgColor};
          --user-message-text-color: ${userMessageTextColor};
          --assistant-message-bg-color: ${assistantMessageBgColor};
          --assistant-message-text-color: ${assistantMessageTextColor};
          --chat-width: ${chatWidth}px;
          --footer-color: ${footerColor};
          --header-color: ${headerColor};
          --title-text-color: ${titleTextColor};
          --assistant-description-text-color: ${assistantDescriptionTextColor};
          --background-color: ${backgroundColor};
      }

      /* Launcher Styles */
      .vfrc-launcher {
          background-color: ${fadedBrandColor} !important;
          ${launcherImage ? `background-image: url(${launcherImage});` : ''}
          width: ${launcherSize}px !important;
          height: ${launcherSize}px !important;
          border: none !important;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s ease;
      }

      .vfrc-launcher:hover {
          background-color: var(--brand-color) !important;
      }

      /* Chat Styles */
      .vfrc-chat {
          background-color: var(--background-color) !important;
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
      .vfrc-footer.c-kbCYVp {
          background-color: var(--footer-color) !important;
      }

      /* Apply footer color to proactive message */
      .vfrc-prompt.c-koXsWI {
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

      ${buttonStyles}

      ${primaryButtonStyles}

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
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='50px' width='250px'><text x='15' y='25' fill='silver' font-family='verdana' font-size='15'>${encodeURIComponent(
            userInputPlaceholderText
          )}...</text></svg>");
          background-repeat: no-repeat;
      }

      .vfrc-chat-input textarea:placeholder-shown {
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='50px' width='250px'><text x='15' y='25' fill='silver' font-family='verdana' font-size='15'>${encodeURIComponent(
            userInputPlaceholderText
          )}...</text></svg>");
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

    /**
     * Function to handle Refresh Button Click
     */
    const handleRefresh = () => {
      handleWidgetLoad();
    };

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
                      Brand Color:
                      <HelpIcon text="Select the brand color for buttons and highlights" />
                    </>
                  }
                  color={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
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
                  assistantAvatarImage={assistantAvatarImage}
                  setAssistantAvatarImage={setAssistantAvatarImage}
                  projectID={projectID}
                  setProjectID={setProjectID}
                />
              </div>
            )}
          </div>

          {/* Text Styles */}
          <div className="customization-section">
            <h3
              onClick={() => toggleSection('textStyles')}
              className="accordion-header"
            >
              Text Styles
            </h3>
            {expandedSections.textStyles && (
              <div className="accordion-content">
                <TextStylePicker
                  fontFamily={fontFamily}
                  setFontFamily={setFontFamily}
                  titleTextColor={titleTextColor}
                  setTitleTextColor={setTitleTextColor}
                  assistantDescriptionTextColor={assistantDescriptionTextColor}
                  setAssistantDescriptionTextColor={
                    setAssistantDescriptionTextColor
                  }
                  userMessageBgColor={userMessageBgColor}
                  setUserMessageBgColor={setUserMessageBgColor}
                  userMessageTextColor={userMessageTextColor}
                  setUserMessageTextColor={setUserMessageTextColor}
                  assistantMessageBgColor={assistantMessageBgColor}
                  setAssistantMessageBgColor={setAssistantMessageBgColor}
                  assistantMessageTextColor={assistantMessageTextColor}
                  setAssistantMessageTextColor={setAssistantMessageTextColor}
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
                <div className="interface-subcategory">
                  <h4>Background Settings</h4>
                  <ColorPicker
                    label={
                      <>
                        Background Color:
                        <HelpIcon text="Set the background color of the widget" />
                      </>
                    }
                    color={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                  />
                </div>
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

        {/* Refresh Button */}
        <div className="refresh-button-container">
          <button className="refresh-button" onClick={handleRefresh}>
            Refresh Widget
          </button>
        </div>
      </div>
    );

}

export default App;
