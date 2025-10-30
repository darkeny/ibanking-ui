import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { SignIn } from '../pages/Signin';
import ClientTransfers from '../pages/Clients/ClientTransfers';
import { ClientDashboard } from '../pages/Clients/ClientsDashboard';
import BusinessDashboard from '../pages/Business/BusinessDashboard';
import BusinessMultipleTransfers from '../pages/Business/BusinessMultipleTransfers';


const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/signin'} element={<SignIn />} />
                <Route path={'/mypanel'} element={<ClientDashboard />} />
                <Route path={'/panel'} element={<BusinessDashboard />} />
                <Route path={'/client/transfers'} element={<ClientTransfers />} />
                <Route path={'/business/transfers/multiple'} element={<BusinessMultipleTransfers />} />

            </Routes>
        </Router>
    );
};

export default AppRoutes;
