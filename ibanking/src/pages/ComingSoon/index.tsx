// components/ComingSoon.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CiCalendar, CiMail, CiMobile3, CiLock, CiMoneyBill } from "react-icons/ci";
import { BusinessLayout } from '../../components/BusinessLayout';

interface ComingSoonProps {
    language: 'PT' | 'EN';
}

const ComingSoon: React.FC<ComingSoonProps> = ({ language }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Extrair o nome da página da URL para personalizar a mensagem
    const getPageName = () => {
        const path = location.pathname;
        const segments = path.split('/').filter(segment => segment);
        
        if (segments.length > 1) {
            // Pega o último segmento da URL
            const lastSegment = segments[segments.length - 1];
            return lastSegment.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
        }
        
        return language === 'PT' ? 'Esta Funcionalidade' : 'This Feature';
    };

    const pageName = getPageName();

    return (
        <BusinessLayout>
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <CiCalendar size={24} className="text-red-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {language === 'PT' ? 'Em Breve' : 'Coming Soon'}
                            </h1>
                            <p className="text-gray-600">
                                {pageName}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Coluna Principal */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Mensagem Principal */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CiCalendar size={32} className="text-red-600" />
                            </div>
                            
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                {language === 'PT' ? 'Estamos a Trabalhar Nisto!' : 'We\'re Working on It!'}
                            </h2>
                            
                            <p className="text-gray-600 mb-6">
                                {language === 'PT'
                                    ? 'Esta funcionalidade está em desenvolvimento e estará disponível em breve. Agradecemos a sua paciência.'
                                    : 'This feature is under development and will be available soon. We appreciate your patience.'
                                }
                            </p>

                            {/* Barra de Progresso */}
                            <div className="max-w-md mx-auto mb-6">
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span>{language === 'PT' ? 'Progresso' : 'Progress'}</span>
                                    <span>75%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div 
                                        className="bg-red-600 h-3 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: '75%' }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Informação - Ainda Sem Conteúdo */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                {language === 'PT' ? 'Informação' : 'Information'}
                            </h3>

                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CiCalendar size={24} className="text-gray-400" />
                                </div>
                                <p className="text-gray-500">
                                    {language === 'PT' 
                                        ? 'Ainda sem informação disponível' 
                                        : 'No information available yet'
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Funcionalidades que Virão */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                {language === 'PT' ? 'O que esperar' : 'What to Expect'}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <CiMail size={20} className="text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {language === 'PT' ? 'Interface Intuitiva' : 'Intuitive Interface'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {language === 'PT' ? 'Fácil de usar' : 'Easy to use'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <CiMobile3 size={20} className="text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {language === 'PT' ? 'Totalmente Responsivo' : 'Fully Responsive'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {language === 'PT' ? 'Em todos os dispositivos' : 'On all devices'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <CiMoneyBill size={20} className="text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {language === 'PT' ? 'Funcionalidades Avançadas' : 'Advanced Features'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {language === 'PT' ? 'Ferramentas poderosas' : 'Powerful tools'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg">
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <CiLock size={20} className="text-red-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {language === 'PT' ? 'Segurança Máxima' : 'Maximum Security'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {language === 'PT' ? 'Proteção total' : 'Full protection'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Timeline */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                {language === 'PT' ? 'Disponível em' : 'Available in'}
                            </h3>

                            <div className="space-y-4">
                                <div className="text-center">
                                    <div className="bg-red-600 text-white rounded-lg p-4 mb-2">
                                        <span className="text-2xl font-bold">15</span>
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        {language === 'PT' ? 'Dias' : 'Days'}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>{language === 'PT' ? 'Horas' : 'Hours'}</span>
                                    <span className="font-semibold">08</span>
                                </div>

                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>{language === 'PT' ? 'Minutos' : 'Minutes'}</span>
                                    <span className="font-semibold">45</span>
                                </div>
                            </div>
                        </div>

                        {/* Notificações */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                {language === 'PT' ? 'Ser notificado' : 'Get notified'}
                            </h3>

                            <div className="space-y-3">
                                <input
                                    type="email"
                                    placeholder={language === 'PT' ? 'Seu email' : 'Your email'}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                />
                                <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors">
                                    {language === 'PT' ? 'Notificar-me' : 'Notify me'}
                                </button>
                            </div>
                        </div>

                        {/* Ações */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="space-y-3">
                                <button
                                    onClick={() => navigate('/panel')}
                                    className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
                                >
                                    {language === 'PT' ? 'Ir para o Dashboard' : 'Go to Dashboard'}
                                </button>

                                <button
                                    onClick={() => navigate(-1)}
                                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    {language === 'PT' ? 'Voltar' : 'Go Back'}
                                </button>
                            </div>
                        </div>

                        {/* Suporte */}
                        <div className="bg-red-50 rounded-lg border border-red-200 p-6">
                            <h3 className="font-semibold text-red-900 mb-2">
                                {language === 'PT' ? 'Precisa de ajuda?' : 'Need help?'}
                            </h3>
                            <p className="text-red-800 text-sm mb-4">
                                {language === 'PT'
                                    ? 'Nossa equipa de suporte está disponível'
                                    : 'Our support team is available'
                                }
                            </p>
                            <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors">
                                {language === 'PT' ? 'Contactar Suporte' : 'Contact Support'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </BusinessLayout>
    );
};

export default ComingSoon;