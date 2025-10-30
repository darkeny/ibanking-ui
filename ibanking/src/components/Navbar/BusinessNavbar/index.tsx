// components/BusinessNavbar.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { BsPiggyBank } from "react-icons/bs";
import { 
  CiLogout, 
  CiSettings,
  CiBank,
  CiMoneyBill,
  CiLock,
  CiBellOn,
  CiHome,
  CiCalendar,
  CiReceipt,
  CiWallet,
  CiCreditCard1,
} from "react-icons/ci";
import { 
  IoStatsChart, 
  IoBusinessOutline,
  IoPeopleOutline,
  IoDocumentTextOutline,
  IoCardOutline
} from "react-icons/io5";
import { TbTransfer, TbReportAnalytics, TbUsers } from "react-icons/tb";
import { MdOutlineAccountBalance, MdOutlinePayments, MdOutlineSavings } from "react-icons/md";
import { FaWallet, FaMoneyCheckAlt } from "react-icons/fa";
import { businessTexts } from '../../../translations/businessNavbar';
import { navbarTexts } from '../../../translations/navbarTexts';

// Interface para as props
interface BusinessNavbarProps {
  language: 'PT' | 'EN';
  toggleLanguage: () => void;
  isOpen: boolean;
  onToggle: () => void;
  companyName?: string;
  companyTaxId?: string;
  userName?: string;
}

const BusinessNavbar: React.FC<BusinessNavbarProps> = ({ 
  language, 
  toggleLanguage, 
  isOpen, 
  onToggle,
  companyName = "Luwali Technologies, LDA",
  companyTaxId = "PT123456789",
  userName = "Gestor Principal"
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    transferencias: false,
    pagamentos: false,
    empresa: false
  });

  const handleLogout = () => {
    navigate('/');
  };

  const currentTexts = navbarTexts[language];
  const currentBusinessTexts = businessTexts[language];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  // Menu de Acesso Direto
  const quickAccessItems = [
    { path: '/business/dashboard', icon: CiHome, label: currentBusinessTexts.dashboard },
    { path: '/business/operators', icon: TbUsers, label: currentBusinessTexts.operators },
    { path: '/business/products', icon: IoCardOutline, label: currentBusinessTexts.myProducts },
  ];

  // Menu de Transferências (com submenu)
  const transferItems = [
    { path: '/business/transfers', icon: TbTransfer, label: currentBusinessTexts.transfers },
    { path: '/business/wallet-transfer', icon: FaWallet, label: currentBusinessTexts.walletTransfer },
  ];

  // Submenu de Transferências
  const transferSubItems = [
    { path: '/business/transfers/national', icon: TbTransfer, label: currentBusinessTexts.nationalTransfers },
    { path: '/business/transfers/multiple', icon: TbTransfer, label: currentBusinessTexts.multipleTransfers },
    { path: '/business/transfers/scheduled', icon: CiCalendar, label: currentBusinessTexts.scheduledOperations },
    { path: '/business/transfers/debt-conversion', icon: FaMoneyCheckAlt, label: currentBusinessTexts.debtConversion },
    { path: '/business/transfers/digital-wallet', icon: FaWallet, label: currentBusinessTexts.digitalWallet },
  ];

  // Menu de Pagamentos (com submenu)
  const paymentItems = [
    { path: '/business/payments/suppliers', icon: CiReceipt, label: currentBusinessTexts.paySuppliers },
    { path: '/business/payments/salaries', icon: IoPeopleOutline, label: currentBusinessTexts.paySalaries },
    { path: '/business/payments/services', icon: MdOutlinePayments, label: currentBusinessTexts.payServices },
  ];

  // Submenu de Pagamentos
  const paymentSubItems = [
    { path: '/business/payments/state', icon: CiCalendar, label: currentBusinessTexts.statePayments },
    { path: '/business/payments/schedule', icon: CiCalendar, label: currentBusinessTexts.paymentSchedule },
    { path: '/business/payments/direct-debits', icon: CiMoneyBill, label: currentBusinessTexts.directDebits },
    { path: '/business/payments/forex', icon: CiMoneyBill, label: currentBusinessTexts.forex },
    { path: '/business/payments/bulk', icon: MdOutlinePayments, label: currentBusinessTexts.bulkPayments },
  ];

  // Menu Empresa (com submenu)
  const companyItems = [
    { path: '/business/company/management', icon: IoBusinessOutline, label: currentBusinessTexts.accountManagement },
  ];

  // Submenu Empresa
  const companySubItems = [
    { path: '/business/company/current-accounts', icon: CiBank, label: currentBusinessTexts.currentAccounts },
    { path: '/business/company/transfers', icon: TbTransfer, label: currentBusinessTexts.transfers },
  ];

  // Outros serviços
  const otherServicesItems = [
    { path: '/business/cards', icon: CiCreditCard1, label: currentBusinessTexts.cards },
    { path: '/business/savings', icon: MdOutlineSavings, label: currentBusinessTexts.savings },
    { path: '/business/financing', icon: BsPiggyBank, label: currentBusinessTexts.financing },
  ];

  // Menu de configurações
  const settingsItems = [
    { path: '/business/profile', icon: IoBusinessOutline, label: currentBusinessTexts.companyProfile },
    { path: '/business/security', icon: CiLock, label: currentBusinessTexts.security },
    { path: '/business/settings', icon: CiSettings, label: currentBusinessTexts.settings },
  ];

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Navbar Lateral */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-lg z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-80 flex flex-col
      `}>
        
        {/* Header com logo e toggle */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <img 
              className="h-6 w-auto" 
              src="/bank-logo.png" 
              alt="Vista Bank" 
            />
            <span className="text-lg font-bold text-red-600">
              Vista Bank Business
            </span>
          </div>
          
          {/* Botão para fechar no mobile */}
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Company Info */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-linear-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <IoBusinessOutline size={24} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {companyName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                NUIT: {companyTaxId}
              </p>
              <p className="text-xs text-red-600 font-medium truncate">
                {userName}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => handleNavigation('/business/profile')}
              className="flex-1 bg-red-50 text-red-600 text-xs font-medium py-2 px-3 rounded-lg hover:bg-red-100 transition-colors"
            >
              {currentBusinessTexts.companyProfile}
            </button>
            
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors relative"
            >
              <CiBellOn size={18} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </div>

        {/* Menu de Navegação Principal */}
        <div className="flex-1 overflow-y-auto">
          {/* Acesso Direto */}
          <nav className="p-4 space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {currentBusinessTexts.quickAccess}
            </p>
            
            {quickAccessItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-left
                    ${isActive 
                      ? 'bg-red-50 text-red-600' 
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Transferências */}
          <div className="border-t border-gray-100">
            <button
              onClick={() => toggleSection('transferencias')}
              className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <TbTransfer size={20} />
                <span>{currentBusinessTexts.transfers}</span>
              </div>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${expandedSections.transferencias ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedSections.transferencias && (
              <div className="pl-8 pr-3 pb-2 space-y-1">
                {transferItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`
                        flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 text-left
                        ${isActive 
                          ? 'bg-red-50 text-red-600' 
                          : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                        }
                      `}
                    >
                      <Icon size={16} />
                      <span className="text-xs">{item.label}</span>
                    </button>
                  );
                })}
                
                {/* Submenu de Transferências */}
                <div className="mt-2 space-y-1">
                  {transferSubItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <button
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        className={`
                          flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 text-left
                          ${isActive 
                            ? 'bg-red-50 text-red-600' 
                            : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                          }
                        `}
                      >
                        <Icon size={14} />
                        <span className="text-xs">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Pagamentos */}
          <div className="border-t border-gray-100">
            <button
              onClick={() => toggleSection('pagamentos')}
              className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <MdOutlinePayments size={20} />
                <span>{currentBusinessTexts.payments}</span>
              </div>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${expandedSections.pagamentos ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedSections.pagamentos && (
              <div className="pl-8 pr-3 pb-2 space-y-1">
                {paymentItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`
                        flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 text-left
                        ${isActive 
                          ? 'bg-red-50 text-red-600' 
                          : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                        }
                      `}
                    >
                      <Icon size={16} />
                      <span className="text-xs">{item.label}</span>
                    </button>
                  );
                })}
                
                {/* Submenu de Pagamentos */}
                <div className="mt-2 space-y-1">
                  {paymentSubItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <button
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        className={`
                          flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 text-left
                          ${isActive 
                            ? 'bg-red-50 text-red-600' 
                            : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                          }
                        `}
                      >
                        <Icon size={14} />
                        <span className="text-xs">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Empresa */}
          <div className="border-t border-gray-100">
            <button
              onClick={() => toggleSection('empresa')}
              className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <IoBusinessOutline size={20} />
                <span>{currentBusinessTexts.company}</span>
              </div>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${expandedSections.empresa ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedSections.empresa && (
              <div className="pl-8 pr-3 pb-2 space-y-1">
                {companyItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`
                        flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 text-left
                        ${isActive 
                          ? 'bg-red-50 text-red-600' 
                          : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                        }
                      `}
                    >
                      <Icon size={16} />
                      <span className="text-xs">{item.label}</span>
                    </button>
                  );
                })}
                
                {/* Submenu Empresa */}
                <div className="mt-2 space-y-1">
                  {companySubItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <button
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        className={`
                          flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 text-left
                          ${isActive 
                            ? 'bg-red-50 text-red-600' 
                            : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                          }
                        `}
                      >
                        <Icon size={14} />
                        <span className="text-xs">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Outros Serviços */}
          <nav className="p-4 border-t border-gray-100 space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {currentBusinessTexts.otherServices}
            </p>
            
            {otherServicesItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-left
                    ${isActive 
                      ? 'bg-red-50 text-red-600' 
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Menu de Configurações */}
          <nav className="p-4 border-t border-gray-100">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {currentTexts.settings}
            </p>
            
            {settingsItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-left
                    ${isActive 
                      ? 'bg-red-50 text-red-600' 
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer com linguagem e logout */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          {/* Selector de Linguagem */}
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-sm text-gray-600">{currentTexts.language}</span>
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              <span>{language}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Botão de Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-3 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
          >
            <CiLogout size={20} />
            <span>{currentBusinessTexts.logout}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export { BusinessNavbar };