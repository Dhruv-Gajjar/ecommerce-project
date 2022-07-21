import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Nabvar';
import SignUp from './components/Signup/Signup';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer'
import { Container } from '@mui/material'

const App = () => {
  return (
    <Container maxWidth='lg'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='login' element={<Login />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
