import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { SignIn } from '../pages/Signin';
import ClientTransfers from '../pages/ClientTransfers';
import { ClientDashboard } from '../pages/ClientsDashboard';
import BusinessDashboard from '../pages/BusinessDashboard';


const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/signin'} element={<SignIn />} />
                <Route path={'/mypanel'} element={<ClientDashboard />} />
                <Route path={'/panel'} element={<BusinessDashboard />} />
                <Route path={'/client/transfers'} element={<ClientTransfers />} />

            </Routes>
        </Router>
    );
};

export default AppRoutes;
