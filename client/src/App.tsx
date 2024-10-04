import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingScreen from "./presentation/screen/landing/LandingScreen";
import './App.css';

function App() {
  return (
      <div className={'App'}>
          <BrowserRouter>
              <Routes>
                  <Route path={'/'} element={<LandingScreen/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
