// src/components/IntegrationCode.jsx
import React from 'react';
import './IntegrationCode.css';

/**
 * IntegrationCode Component
 * Displays the code snippet for integrating the customized widget into another website.
 */
function IntegrationCode({
  embedMode,
  assistantName,
  assistantDescription,
  assistantLogo,
  stylesheetUrl,
  proactiveMessages,
  projectID,
  autoOpen,
}) {
  const renderConfig =
    embedMode === 'embedded'
      ? `
      render: {
          mode: 'embedded',
          target: document.getElementById('voiceflow-chat-frame')
      },`
      : `
      render: {
          mode: 'overlay'
      },`;

  const proactiveConfig =
    proactiveMessages.length > 0
      ? `
      proactive: {
          clear: true,
          messages: ${JSON.stringify(
            proactiveMessages.map((message) => ({
              type: 'text',
              payload: { message },
            }))
          )}
      },`
      : '';

  const autoOpenCode = autoOpen
    ? `
            window.voiceflow.chat.open();
  `
    : '';

  const codeSnippet = `
<script type="text/javascript">
  (function(d, t) {
      if (window.voiceflow && window.voiceflow.chat) {
          window.voiceflow.chat.hide();
      }
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
      v.onload = function() {
        window.voiceflow.chat.load({
          verify: { projectID: '${projectID}' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          assistant: {
            title: "${assistantName}",
            description: "${assistantDescription}",
            image: "${assistantLogo}",
            stylesheet: "${stylesheetUrl}"
          },${renderConfig}${proactiveConfig}
        }).then(function() {${autoOpenCode}});
      };
      v.src = "https://cdn.voiceflow.com/widget/bundle.mjs"; 
      v.type = "text/javascript"; 
      s.parentNode.insertBefore(v, s);
  })(document, 'script');
</script>
  `;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippet);
    alert('Integration code copied to clipboard!');
  };

  return (
    <div className="integration-code">
      <h2>Integration Code</h2>
      <textarea
        readOnly
        value={codeSnippet}
        title="This is your customized integration code"
      />
      <button
        onClick={copyToClipboard}
        title="Copy the integration code to clipboard"
      >
        Copy Integration Code
      </button>
      {embedMode === 'embedded' && (
        <p title="Add this div to your HTML where you want the chat to appear">
          Remember to add a container with id{' '}
          <code>voiceflow-chat-frame</code> in your HTML.
        </p>
      )}
    </div>
  );
}

export default IntegrationCode;
