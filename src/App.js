import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/token';
import BookPage from './pages/options';
import BookPages from './pages/pages';
import LogoutButton from './pages/logout';





function App() {

  
  
  
  return (


    
    




    <>
      
      <div className="App">
        <header className="App-header">
          <h1>Book App</h1>
        </header>
        <main>

        <div>
      <h1>Welcome to My App</h1>
        <LogoutButton />
      </div>
        </main>

      </div>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Routes>
          <Route path="/" element={<BookPage />} />
        </Routes>

        <Routes>
          <Route path="/book/:id/pages" element={<BookPages />} />
        </Routes>

      </Router></>


    

      
  );
}

export default App;