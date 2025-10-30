import { ClientLayout } from "../../components/ClientLayout";
import DashboardContent from "../Panel/Clients";

// Página principal do cliente com Layout
const ClientDashboard: React.FC = () => {
    return (
        <ClientLayout>
            <DashboardContent />
        </ClientLayout>
    );
};

export {ClientDashboard};