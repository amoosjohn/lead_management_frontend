import React, { lazy, Suspense  } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
const LeadManagement = lazy(() => import('./components/LeadManagement'));

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            <Route path="/" element={<LeadManagement/>}/>
          </Routes>
        </Router>
        </Suspense>
    );
}

export default App;
