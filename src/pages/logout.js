import React from 'react';
import RegistrationForm from './register';
import { useState } from 'react';

function LoginButton() {


    const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };
    
    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        // Navigate to the login page or home page
        window.location.href = '/';
        
      };
    
    
  const handleLogin = () => {
    // Navigate to the login page
    window.location.href = '/login';
    
    
    
  };

  const isLoggedIn = localStorage.getItem('access');

  if (isLoggedIn) {
    
    return (
     <div>
     <button onClick={handleLogout}>
        Logout
      </button>
      </div>
      

    );
    
  } else {
    return (
      <lu>
        <div>
      
      {showForm ? (
        <RegistrationForm />
      ) : (
        <lu>
        <button onClick={handleShowForm}>Register</button>
        <button onClick={handleLogin}>Login</button>
        </lu>
      )}
    </div>
      </lu>
    );
  }
  
};

export default LoginButton;