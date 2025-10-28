// pages/SignIn.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { texts } from '../../translations/signinTexts';

export function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState<'PT' | 'EN'>('PT');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'PT' ? 'EN' : 'PT');
    };


    const currentTexts = texts[language];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <>
            <Navbar language={language} toggleLanguage={toggleLanguage} />
            <div className="bg-linear-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden min-h-screen">
                {/* Background Image com overlay preto */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url("./background.jpg")`
                    }}
                >
                    <div className="absolute inset-0 bg-linear-to-r from-black to-black/70"></div>
                </div>

                {/* Main Content com largura aumentada */}
                <div className="relative z-10 flex items-center justify-center max-w-8xl mx-auto min-h-[calc(100vh-140px)] px-6 lg:px-12">
                    {/* Text Content - Left Side */}
                    <div className="hidden lg:block lg:w-2/5 pr-16">
                        <div className="max-w-lg">
                            {/* Hero Text com melhor hierarquia */}
                            <div className="space-y-8">


                                {/* Título Principal */}
                                <div className="space-y-4">
                                    <h1 className="text-5xl font-bold text-white leading-tight">
                                        {currentTexts.title}
                                    </h1>

                                    <div className="w-20 h-1 bg-red-500 rounded-full"></div>

                                    <p className="text-2xl text-gray-200 font-light leading-relaxed">
                                        {currentTexts.subtitle}
                                    </p>
                                </div>

                                {/* Descrição */}
                                <p className="text-lg text-gray-300 leading-relaxed font-light">
                                    {currentTexts.description}
                                </p>

                                {/* Features em Card */}
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                    <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                                        {language === 'PT' ? 'Vantagens Exclusivas' : 'Exclusive Benefits'}
                                    </h3>
                                    <div className="space-y-3">
                                        {currentTexts.features.map((feature, index) => (
                                            <div key={index} className="flex items-center space-x-3 group">
                                                <div className="shrink-0 w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors duration-300">
                                                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-gray-200 text-sm font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Container - Right Side com largura aumentada */}
                    <div className="w-full lg:w-2/5 max-w-lg">
                        {/* Glass Morphism Card refinado */}
                        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">

                            {/* Header Elegante */}
                            <div className="p-8 text-center border-b border-white/10">
                                {/* Logo Mobile apenas */}
                                <div className="lg:hidden flex justify-center mb-6">
                                    <div className="flex items-center">
                                        <img className="h-10 w-auto mr-3" src="/bank-logo.png" alt="Your Bank" />
                                        <span className="text-2xl font-bold text-white">Your Bank</span>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    {language === 'PT' ? 'Acesso Seguro' : 'Secure Access'}
                                </h2>
                                <p className="text-gray-300 text-sm">
                                    {language === 'PT' ? 'Entre na sua conta' : 'Sign in to your account'}
                                </p>
                            </div>

                            {/* Login Form */}
                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                {/* Email Field */}
                                <div className="group">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                                            placeholder=" "
                                            required
                                        />
                                        <label className="absolute left-4 top-4 text-gray-300 pointer-events-none transition-all duration-300 group-focus-within:top-2 group-focus-within:text-red-400 group-focus-within:text-sm bg-transparent px-1">
                                            {currentTexts.email}
                                        </label>
                                    </div>
                                </div>

                                {/* Password Field with Toggle */}
                                <div className="group">
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-4 pr-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                                            placeholder=" "
                                            required
                                        />
                                        <label className="absolute left-4 top-4 text-gray-300 pointer-events-none transition-all duration-300 group-focus-within:top-2 group-focus-within:text-red-400 group-focus-within:text-sm bg-transparent px-1">
                                            {currentTexts.password}
                                        </label>

                                        {/* Show/Hide Password Toggle */}
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors duration-300"
                                            title={showPassword ? currentTexts.hidePassword : currentTexts.showPassword}
                                        >
                                            {showPassword ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full group relative overflow-hidden bg-linear-to-r from-red-600 to-red-700 border border-red-500 text-white py-4 px-6 rounded-xl font-bold hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                                >
                                    <div className="relative z-10 flex items-center justify-center">
                                        {isLoading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                                                {currentTexts.signingIn}
                                            </>
                                        ) : (
                                            <>
                                                <span>{currentTexts.signIn}</span>
                                                <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </>
                                        )}
                                    </div>

                                    {/* Button Shine Effect */}
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
                                </button>

                                {/* Sign Up Link */}
                                <div className="text-center pt-6 border-t border-white/10">
                                    <p className="text-gray-400 text-sm">
                                        {currentTexts.noAccount}{' '}
                                        <button
                                            type="button"
                                            onClick={() => navigate('/signup')}
                                            className="text-red-400 hover:text-white font-semibold transition-colors duration-300 hover:underline underline-offset-4"
                                        >
                                            {currentTexts.signUp}
                                        </button>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer language={language} />
        </>
    );
}