import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { IoBusinessOutline } from "react-icons/io5";
import { CiLogin, CiGlobe, CiUser } from "react-icons/ci";
import { navbarTexts } from '../../translations/navbarTexts';

// Interface para as props
interface NavbarProps {
    language: 'PT' | 'EN';
    toggleLanguage: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ language, toggleLanguage }) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleRedirect = () => navigate('#');
    const toggleMenu = () => setMenuOpen(!menuOpen);


    const currentTexts = navbarTexts[language];

    return (
        <>
            <nav className="bg-white border-b-4 border-red-400 shadow-lg">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    {/* Top Bar - Agora usa a toggleLanguage da prop */}
                    <div className="flex justify-end items-center h-8 bg-gray-100 px-4 rounded-b-2xl">
                        <div className="flex items-center space-x-4 text-xs">
                            <button
                                onClick={toggleLanguage} // ← Agora usa a função do pai
                                className="flex items-center gap-1 text-gray-600 hover:text-red-400 transition-colors duration-300"
                            >
                                <CiGlobe size={14} />
                                <span className="font-medium">{language}</span>
                            </button>
                            <NavLink to="#" className="text-gray-600 hover:text-red-400 transition-colors duration-300">
                                {currentTexts.login}
                            </NavLink>
                        </div>
                    </div>


                    {/* Main Navigation */}
                    <div className="relative flex h-20 items-center justify-between">
                        {/* Logo */}
                        <div className="flex flex-1 items-center justify-start">
                            <a href='#' className="flex items-center">
                                <div className="flex flex-shrink-0 items-center">
                                    <img className="h-5 w-auto mb-1" src="/bank-logo.png" alt="Vista Bank" />
                                    <span className='ml-3 block text-xl font-bold text-red-400 whitespace-nowrap'>
                                        {currentTexts.company}
                                    </span>
                                </div>
                            </a>
                        </div>

                        {/* Main navigation for larger screens */}
                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
                            <div className="flex space-x-1 flex-nowrap whitespace-nowrap">
                                {/* Particulares Dropdown */}
                                <div className="relative group">
                                    <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors duration-300">
                                        <CiUser size={18} />
                                        {currentTexts.personal}
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div className="absolute left-0 mt-2 w-64 bg-white shadow-2xl border border-gray-200 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                        <div className="py-2">
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.accounts}
                                            </NavLink>
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.cards}
                                            </NavLink>
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.loans}
                                            </NavLink>
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.investments}
                                            </NavLink>
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.insurance}
                                            </NavLink>
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.digital}
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>

                                {/* Empresas Dropdown */}
                                <div className="relative group">
                                    <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors duration-300">
                                        <IoBusinessOutline size={18} />
                                        {currentTexts.business}
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div className="absolute left-0 mt-2 w-72 bg-white shadow-2xl border border-gray-200 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                        <div className="py-2">
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.businessAccounts}
                                            </NavLink>
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.businessLoans}
                                            </NavLink>
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.treasury}
                                            </NavLink>
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.trade}
                                            </NavLink>
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.cardsBusiness}
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>

                                {/* Links diretos */}
                                <NavLink to="#" className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors duration-300">
                                    {currentTexts.private}
                                </NavLink>
                                <NavLink to="#" className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors duration-300">
                                    {currentTexts.simulator}
                                </NavLink>
                                <NavLink to="#" className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors duration-300">
                                    {currentTexts.about}
                                </NavLink>
                                <NavLink to="#" className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors duration-300">
                                    {currentTexts.contact}
                                </NavLink>
                            </div>
                        </div>

                        {/* CTA Button and Mobile menu */}
                        <div className="flex items-center space-x-4">
                            {/* Sign Up Button */}
                            <div className="hidden sm:flex">
                                <button
                                    onClick={handleRedirect}
                                    className='flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors duration-300'
                                >
                                    <CiLogin size={18} />
                                    {currentTexts.signup}
                                </button>
                            </div>

                            {/* Mobile menu button */}
                            <div className="lg:hidden">
                                <button
                                    type="button"
                                    onClick={toggleMenu}
                                    className="relative inline-flex items-center justify-center rounded-lg p-2 text-red-400 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition-colors duration-300"
                                    aria-controls="mobile-menu"
                                    aria-expanded={menuOpen}
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {menuOpen ? (
                                        <svg className="block h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <svg className="block h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="lg:hidden border-t border-red-200 bg-white" id="mobile-menu">
                        <div className="px-2 pb-3 pt-2 space-y-1">
                            {/* Mobile Navigation Items */}
                            <div className="space-y-1">
                                <div className="px-3 py-2 text-sm font-semibold text-gray-500 border-b">
                                    {currentTexts.personal}
                                </div>
                                <NavLink to="/particulares/contas" onClick={() => setMenuOpen(false)} className="block px-6 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-400 transition-colors duration-300">
                                    {currentTexts.accounts}
                                </NavLink>
                                <NavLink to="/particulares/cartoes" onClick={() => setMenuOpen(false)} className="block px-6 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-400 transition-colors duration-300">
                                    {currentTexts.cards}
                                </NavLink>
                                <NavLink to="/particulares/creditos" onClick={() => setMenuOpen(false)} className="block px-6 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-400 transition-colors duration-300">
                                    {currentTexts.loans}
                                </NavLink>
                                <NavLink to="/particulares/investimentos" onClick={() => setMenuOpen(false)} className="block px-6 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-400 transition-colors duration-300">
                                    {currentTexts.investments}
                                </NavLink>
                            </div>

                            <div className="space-y-1">
                                <div className="px-3 py-2 text-sm font-semibold text-gray-500 border-b">
                                    {currentTexts.business}
                                </div>
                                <NavLink to="/empresas/contas" onClick={() => setMenuOpen(false)} className="block px-6 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-400 transition-colors duration-300">
                                    {currentTexts.businessAccounts}
                                </NavLink>
                                <NavLink to="/empresas/financiamento" onClick={() => setMenuOpen(false)} className="block px-6 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-400 transition-colors duration-300">
                                    {currentTexts.businessLoans}
                                </NavLink>
                                <NavLink to="/empresas/tesouraria" onClick={() => setMenuOpen(false)} className="block px-6 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-400 transition-colors duration-300">
                                    {currentTexts.treasury}
                                </NavLink>
                            </div>

                            {/* Other links */}
                            <NavLink to="/private" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-400 transition-colors duration-300">
                                {currentTexts.private}
                            </NavLink>
                            <NavLink to="/simulador" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-400 transition-colors duration-300">
                                {currentTexts.simulator}
                            </NavLink>
                            <NavLink to="/about" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-400 transition-colors duration-300">
                                {currentTexts.about}
                            </NavLink>
                            <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-400 transition-colors duration-300">
                                {currentTexts.contact}
                            </NavLink>

                            <button
                                onClick={() => {
                                    handleRedirect();
                                    setMenuOpen(false);
                                }}
                                className='flex items-center gap-2 w-full text-left rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors duration-300 mt-4'
                            >
                                <CiLogin size={18} />
                                {currentTexts.signup}
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export { Navbar };