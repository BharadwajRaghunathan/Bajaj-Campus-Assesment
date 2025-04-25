import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DoctorListingPage from './pages/DoctorListingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DoctorListingPage />} />
    </Routes>
  );
}

export default App;