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
import Signup from '../pages/Signup';
import ScheduledTransfers from '../pages/Business/ScheduledTransfers';
import ComingSoon from '../pages/ComingSoon';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Rotas Principais */}
                <Route path={'/'} element={<Home />} />
                <Route path={'/signin'} element={<SignIn />} />
                <Route path={'/signup'} element={<Signup language={"PT"} />} />
                
                {/* Rotas do Cliente - Implementadas */}
                <Route path={'/mypanel'} element={<ClientDashboard />} />
                <Route path={'/client/transfers'} element={<ClientTransfers />} />
                
                {/* Rotas do Cliente - Coming Soon */}
                <Route path="/client/accounts" element={<ComingSoon language={"PT"} />} />
                <Route path="/client/payments" element={<ComingSoon language={"PT"} />} />
                <Route path="/client/cards" element={<ComingSoon language={"PT"} />} />
                <Route path="/client/loans" element={<ComingSoon language={"PT"} />} />
                <Route path="/client/investments" element={<ComingSoon language={"PT"} />} />
                <Route path="/client/insurance" element={<ComingSoon language={"PT"} />} />
                <Route path="/client/profile" element={<ComingSoon language={"PT"} />} />
                <Route path="/client/security" element={<ComingSoon language={"PT"} />} />
                <Route path="/client/settings" element={<ComingSoon language={"PT"} />} />
                
                {/* Rotas do Business - Implementadas */}
                <Route path={'/panel'} element={<BusinessDashboard />} />
                <Route path={'/business/transfers/multiple'} element={<BusinessMultipleTransfers />} />
                <Route path="/business/notifications" element={<NotificationPreferences language={"PT"} />} />
                <Route path="/business/transfers/digital-wallet" element={<DigitalWalletPayment language={"PT"} />} />
                <Route path="/business/authorization" element={<TransactionAuthorization language={"PT"} />} />
                <Route path="/business/scheduled-transfers" element={<ScheduledTransfers language={"PT"} />} />
                
                {/* Rotas do Business - Coming Soon */}
                
                {/* Empresa */}
                <Route path="/business/company/management" element={<ComingSoon language={"PT"} />} />
                <Route path="/business/company/current-accounts" element={<ComingSoon language={"PT"} />} />
                
                {/* Transferências */}
                <Route path="/business/transfers/national" element={<ComingSoon language={"PT"} />} />
                <Route path="/business/transfers/debt-conversion" element={<ComingSoon language={"PT"} />} />
                
                {/* Pagamentos */}
                <Route path="/business/payments/suppliers" element={<ComingSoon language={"PT"} />} />
                <Route path="/business/payments/salaries" element={<ComingSoon language={"PT"} />} />
                <Route path="/business/payments/services" element={<ComingSoon language={"PT"} />} />
                <Route path="/business/payments/state" element={<ComingSoon language={"PT"} />} />
                <Route path="/business/payments/schedule" element={<ComingSoon language={"PT"} />} />
                <Route path="/business/payments/direct-debits" element={<ComingSoon language={"PT"} />} />
                <Route path="/business/payments/forex" element={<ComingSoon language={"PT"} />} />
                <Route path="/business/payments/bulk" element={<ComingSoon language={"PT"} />} />
                
                {/* Outros Serviços */}
                <Route path="/business/operators" element={<ComingSoon language={"PT"} />} />
                <Route path="/business/products" element={<ComingSoon language={"PT"} />} />
                <Route path="/business/transfers/digital-wallet" element={<ComingSoon language={"PT"} />} />
                <Route path="/business/topup" element={<ComingSoon language={"PT"} />} />
                <Route path="/business/cards" element={<ComingSoon language={"PT"} />} />
                <Route path="/business/savings" element={<ComingSoon language={"PT"} />} />
                <Route path="/business/financing" element={<ComingSoon language={"PT"} />} />
                
                {/* Configurações */}
                <Route path="/business/profile" element={<ComingSoon language={"PT"} />} />
                <Route path="/business/security" element={<ComingSoon language={"PT"} />} />
                <Route path="/business/settings" element={<ComingSoon language={"PT"} />} />
                
                {/* Rotas Adicionais do Dashboard */}
                <Route path="/business/invoicing" element={<ComingSoon language={"PT"} />} />
                <Route path="/business/reports" element={<ComingSoon language={"PT"} />} />
                
                {/* Rotas Genéricas */}
                <Route path="/business/transfers/multiple" element={<ComingSoon language={"PT"} />} />
                <Route path="/business/payments" element={<ComingSoon language={"PT"} />} />
                <Route path="/comingsoon" element={<ComingSoon language={"PT"} />} />

                {/* Rota 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;