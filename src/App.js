import React from 'react'
import 'semantic-ui-css/semantic.min.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from './pages/MainPage';
import PodcastPage from './pages/PodcastPage';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/podcast/:podcastId" element={<PodcastPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
