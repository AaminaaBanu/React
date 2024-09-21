import React, { useState } from 'react';
import SettingsPanel from './SettingsPanel';
import WelcomeScreen from './WelcomeScreen';
import EmailScreen from './EmailScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [welcomeSettings, setWelcomeSettings] = useState({
    title: 'Welcome to Our App',
    description: 'This is the welcome description.',
    image: '',
  });
  const [emailSettings, setEmailSettings] = useState({
    email: 'user@example.com',
  });

  const handleWelcomeChange = (newSettings) => {
    setWelcomeSettings(newSettings);
  };

  const handleEmailChange = (newEmail) => {
    setEmailSettings({ email: newEmail });
  };

  return (
    <div style={{ display: 'flex' }}>
      <SettingsPanel
      currentScreen={currentScreen} 
        setCurrentScreen={setCurrentScreen}
        welcomeSettings={welcomeSettings}
        setWelcomeSettings={handleWelcomeChange}
        emailSettings={emailSettings}
        setEmailSettings={handleEmailChange}
      />
      <div style={{ marginLeft: '20px', flex: 1 }}>
        {currentScreen === 'welcome' && (
          <WelcomeScreen settings={welcomeSettings} />
        )}
        {currentScreen === 'email' && (
          <EmailScreen settings={emailSettings} />
        )}
      </div>
    </div>
  );
};

export default App;
