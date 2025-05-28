import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Alert from '../components/Alert';
import NavigationButton from '../components/NavigationButton';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertInfo, setAlertInfo] = useState({ message: '', type: '' });
  const navigate = useNavigate();

   const showAlert = (message, type = 'info', duration = 3000) => {
      setAlertInfo({ message, type });
      setTimeout(() => setAlertInfo({ message: '', type: '' }), duration);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAlertInfo({ message: '', type: '' });

    if (password.length < 6) {
        showAlert('Password must be at least 6 characters long.', 'error');
        return;
    }

    try {
      // --- API Call ---
      const response = await axios.post('http://localhost:3001/api/users/register', { email, password });
      console.log('Signup Response:', response.data);

       if (response.status === 201) {
          showAlert('User registered successfully! Please log in.', 'success');
          navigate('/login'); // Redirect to login page on success
       } else {
           // Handle cases where backend might return 200 but with an error message
           showAlert(response.data.error || 'Registration failed.', 'error');
       }

    } catch (error) {
      console.error("Signup Error:", error);
      const errorMessage = error.response?.data?.error || 'Failed to register. Please try again.';
      showAlert(errorMessage, 'error');
    }
  };

  return (
    <div className="page">
      <h2>Sign Up</h2>
      <form id="registerForm" onSubmit={handleSubmit}>
        <input
          type="email"
          id="registerEmail"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="registerPassword"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
         />
        <button type="submit">Sign Up</button>
      </form>

      <NavigationButton to="/">Back to Landing</NavigationButton>

      {/* Alert component rendering */}
      <Alert message={alertInfo.message} type={alertInfo.type} />

    </div>
  );
}

export default SignupPage;