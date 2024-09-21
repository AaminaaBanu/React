import React, { useState, useEffect } from 'react';
import './SettingsPanel.css'; // Adjust the path as necessary

const SettingsPanel = ({
  currentScreen,
  setCurrentScreen,
  welcomeSettings,
  setWelcomeSettings,
}) => {
  const [message, setMessage] = useState('');
  const [prevSettings, setPrevSettings] = useState(welcomeSettings);

  useEffect(() => {
    const savedWelcomeSettings = localStorage.getItem('welcomeSettings');
    if (savedWelcomeSettings) {
      const parsedSettings = JSON.parse(savedWelcomeSettings);
      setWelcomeSettings(parsedSettings);
      setPrevSettings(parsedSettings); // Save the last settings
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWelcomeSettings({ ...welcomeSettings, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('welcomeSettings', JSON.stringify(welcomeSettings));
    setPrevSettings(welcomeSettings); // Update previous settings on save
    setMessage('Settings saved successfully!');
  };

  const handleDiscard = () => {
    setWelcomeSettings(prevSettings); // Restore previous settings
    setMessage('Welcome settings discarded.');
  };

  return (
    <div className="settings-panel">
      <h3>Settings Panel</h3>
      <button onClick={() => setCurrentScreen('welcome')}>Welcome Screen</button>
      <button onClick={() => setCurrentScreen('email')}>Email Screen</button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {currentScreen === 'welcome' && (
        <div>
          <h4>Welcome Screen Settings</h4>
          <input
            type="text"
            placeholder="Title"
            value={welcomeSettings.title}
            onChange={(e) => setWelcomeSettings({ ...welcomeSettings, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={welcomeSettings.description}
            onChange={(e) => setWelcomeSettings({ ...welcomeSettings, description: e.target.value })}
          />
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="file-input"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleDiscard} className="discard-button">Discard</button>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
