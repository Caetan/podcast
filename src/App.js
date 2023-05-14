import React from 'react'
import 'semantic-ui-css/semantic.min.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from './pages/MainPage';
import PodcastPage from './pages/PodcastPage';
import HeaderComponent from './components/Common/HeaderComponent';


function App() {
  return (
    <>
      <HeaderComponent />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/podcast/:podcastId" element={<PodcastPage />} />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<PodcastPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
