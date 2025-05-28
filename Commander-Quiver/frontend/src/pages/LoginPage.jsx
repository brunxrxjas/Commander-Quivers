import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Or use fetch

// Import reusable components (create these)
import Alert from '../components/Alert';
import NavigationButton from '../components/NavigationButton';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertInfo, setAlertInfo] = useState({ message: '', type: '' }); // For Alert component
  const navigate = useNavigate();

  const showAlert = (message, type = 'info', duration = 3000) => {
      setAlertInfo({ message, type });
      // Auto-hide alert (optional, Alert component could handle this)
      setTimeout(() => setAlertInfo({ message: '', type: '' }), duration);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAlertInfo({ message: '', type: '' }); // Clear previous alerts

    try {
      // --- API Call ---
      // Replace with your actual backend API call
      const response = await axios.post('http://localhost:3001/api/users/login', { email, password });
      console.log('Login Response:', response.data);

      if (response.data.message === "Login successful") {
        // Store user info/token (e.g., in localStorage or context)
        localStorage.setItem('userId', response.data.user.id); // Example persistence
        showAlert('Login successful!', 'success');
        navigate('/dashboard'); // Redirect to dashboard on success
      } else {

         showAlert(response.data.error || 'Invalid credentials.', 'error');
      }
    } catch (error) {
      console.error("Login Error:", error);
      // Extract error message from backend response if available
      const errorMessage = error.response?.data?.error || 'Failed to login. Please try again.';
      showAlert(errorMessage, 'error');
    }
  };

  return (
    <div className="page">
      <h2>Login</h2>
      <form id="loginForm" onSubmit={handleSubmit}>
        <input
          type="email"
          id="loginEmail"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="loginPassword"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <NavigationButton to="/">Back to Landing</NavigationButton>

      {/* Alert component rendering */}
      <Alert message={alertInfo.message} type={alertInfo.type} />
    </div>
  );
}

export default LoginPage;