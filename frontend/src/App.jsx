import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';

import Navbar from './landing_page/Navbar';

function App() {
  return(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  )
}
export default App;
