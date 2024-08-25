import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import List_input1 from './components/List_input1';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<List_input1 />} />
            </Routes>
        </Router>
    );
}

export default App;
