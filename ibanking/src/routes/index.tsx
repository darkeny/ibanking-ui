import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { SignIn } from '../pages/Signin';
import ClientTransfers from '../pages/Clients/ClientTransfers';
import { ClientDashboard } from '../pages/Clients/ClientsDashboard';
import BusinessDashboard from '../pages/Business/BusinessDashboard';
import BusinessMultipleTransfers from '../pages/Business/BusinessMultipleTransfers';
import NotFound from '../pages/NotFound';
import NotificationPreferences from '../components/NotificationPreferences';
import DigitalWalletPayment from '../components/DigitalWalletPayment';
import TransactionAuthorization from '../components/TransactionAuthorization';
import BusinessDashboardContent from '../pages/Panel/BusinessPanel';
import Signup from '../pages/Signup';


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
                <Route path="/business/notifications" element={<NotificationPreferences language={"PT"} />} />
                <Route path="/business/transfers/digital-wallet" element={<DigitalWalletPayment language={"PT"} />} />
                <Route path="/panel" element={<BusinessDashboardContent />} />
                <Route path="/business/authorization" element={<TransactionAuthorization language={"PT"} />} />
                <Route path="/signup" element={<Signup language={"PT"} />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
