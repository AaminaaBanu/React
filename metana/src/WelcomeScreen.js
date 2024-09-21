import React from 'react';
import './WelcomeScreen.css'; // Adjust the path as necessary

const WelcomeScreen = ({ settings }) => {
  return (
    <div className="welcome-screen">
      <h1>{settings.title}</h1>
      <p>{settings.description}</p>
      {settings.image && <img src={settings.image} alt="Welcome" />}
    </div>
  );
};

export default WelcomeScreen;
