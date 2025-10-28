import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { SignIn } from '../pages/Signin';
import ClientDashboard from '../pages/Panel';
import ClientTransfers from '../pages/ClientTransfers';


const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/signin'} element={<SignIn />} />
                <Route path={'/panel'} element={<ClientDashboard />} />
                <Route path={'/client/transfers'} element={<ClientTransfers />} />

            </Routes>
        </Router>
    );
};

export default AppRoutes;
