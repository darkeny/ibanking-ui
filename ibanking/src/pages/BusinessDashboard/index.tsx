import { BusinessLayout } from "../../components/BusinessLayout";
import BusinessDashboardContent from "../Panel/BusinessPanel";

// Página principal do business com Layout
const BusinessDashboard: React.FC = () => {
    return (
        <BusinessLayout>
            <BusinessDashboardContent />
        </BusinessLayout>
    );
};

export default BusinessDashboard;