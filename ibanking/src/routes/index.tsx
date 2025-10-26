import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { SignIn } from '../pages/Signin';


const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/signin'} element={<SignIn />} />

            </Routes>
        </Router>
    );
};

export default AppRoutes;
