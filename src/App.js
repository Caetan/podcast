import React from 'react'
import 'semantic-ui-css/semantic.min.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
