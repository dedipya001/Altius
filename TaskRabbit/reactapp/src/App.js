// import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import TaskManager from './components/TaskManager';

function App() {
  return (
    <Router>
      <Routes>
        <Route path ='/login' element = {<Login/>}></Route>
        <Route path ='/register' element = {<Register/>}></Route>
        <Route path ='/profile' element = {<Profile/>}></Route>
        <Route path ='/taskmanager' element = {<TaskManager/>}></Route>
        <Route path ='/'element={<Login/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
