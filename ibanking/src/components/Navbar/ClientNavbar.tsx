import React, { useState } from 'react';
import { BsPiggyBank } from "react-icons/bs";
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { 
  CiLogout, 
  CiUser, 
  CiSettings,
  CiCreditCard1,
  CiBank,
  CiMoneyBill,
  CiLock,
  CiBellOn,
  CiHome
} from "react-icons/ci";
import { IoStatsChart, IoCardOutline } from "react-icons/io5";
import { TbTransfer } from "react-icons/tb";
import { navbarTexts } from '../../translations/navbarTexts';
import { clientTexts } from '../../translations/clientNavbar';

// Interface para as props
interface ClientNavbarProps {
  language: 'PT' | 'EN';
  toggleLanguage: () => void;
  isOpen: boolean;
  onToggle: () => void;
  userName?: string;
  userAccount?: string;
}

const ClientNavbar: React.FC<ClientNavbarProps> = ({ 
  language, 
  toggleLanguage, 
  isOpen, 
  onToggle,
  userName = "Darken Machava",
  userAccount = "PT50 0000 0000 0000 0000 0000"
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = () => {
    // Lógica de logout aqui
    navigate('/');
  };

  const currentTexts = navbarTexts[language];

  const currentClientTexts = clientTexts[language];

  const menuItems = [
    { path: '/mypanel', icon: CiHome, label: currentClientTexts.dashboard },
    { path: '/client/accounts', icon: CiBank, label: currentClientTexts.accounts },
    { path: '/client/transfers', icon: TbTransfer, label: currentClientTexts.transfers },
    { path: '/client/payments', icon: CiMoneyBill, label: currentClientTexts.payments },
    { path: '/client/cards', icon: CiCreditCard1, label: currentClientTexts.cards },
    { path: '/client/loans', icon: IoCardOutline, label: currentClientTexts.loans },
    { path: '/client/investments', icon: BsPiggyBank, label: currentClientTexts.investments },
    { path: '/client/insurance', icon: IoStatsChart, label: currentClientTexts.insurance },
  ];

  const settingsItems = [
    { path: '/client/profile', icon: CiUser, label: currentClientTexts.profile },
    { path: '/client/security', icon: CiLock, label: currentClientTexts.security },
    { path: '/client/settings', icon: CiSettings, label: currentClientTexts.settings },
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
              alt="Your Bank" 
            />
            <span className="text-lg font-bold text-red-600">
              Your Bank
            </span>
          </div>
          
          {/* Botão para fechar no mobile */}
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-linear-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {userName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {userName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {userAccount}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => navigate('/client/profile')}
              className="flex-1 bg-red-50 text-red-600 text-xs font-medium py-2 px-3 rounded-lg hover:bg-red-100 transition-colors"
            >
              {currentClientTexts.viewProfile}
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
          <nav className="p-4 space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {currentClientTexts.quickAccess}
            </p>
            
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && onToggle()}
                  className={`
                    flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-red-50 text-red-600 border-r-2 border-red-600' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
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
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && onToggle()}
                  className={`
                    flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-red-50 text-red-600 border-r-2 border-red-600' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
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
            <span>{currentClientTexts.logout}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export { ClientNavbar };