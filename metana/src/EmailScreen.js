import React, { useState, useEffect } from 'react';
import './EmailScreen.css'; // Adjust the path as necessary

const EmailScreen = ({ settings }) => {
  // Retrieve saved email from localStorage, or use settings if not available
  const savedEmailFromStorage = localStorage.getItem('savedEmail') || '';
  const initialEmail = savedEmailFromStorage || (settings && settings.email && typeof settings.email === 'string' ? settings.email : '');

  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // Success message state

  // Save email to localStorage when the save button is clicked
  const handleSave = () => {
    if (validateEmail(email)) {
      localStorage.setItem('savedEmail', email); // Store email in localStorage
      setMessage('Email saved successfully!'); // Set success message
      setError('');
    } else {
      setError('Please enter a valid email address');
      setMessage(''); // Clear success message
    }
  };

  // Revert email to last saved email from localStorage
  const handleDiscard = () => {
    const savedEmail = localStorage.getItem('savedEmail');
    setEmail(savedEmail || '');
    setMessage('Changes discarded!'); // Set discard message
    setError('');
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="email-screen">
      <h1>Email Settings</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError(''); // Clear error when typing
        }}
        placeholder="Enter your email"
      />
      {error && <p className="error">{error}</p>} {/* Show validation error if any */}
      {message && <p className="success">{message}</p>} {/* Show success message if any */}

      <p>Email: {email || 'No email set'}</p>
      <button className="save" onClick={handleSave}>Save</button>
<button className="discard" onClick={handleDiscard}>Discard</button>

    </div>
  );
};

export default EmailScreen;
