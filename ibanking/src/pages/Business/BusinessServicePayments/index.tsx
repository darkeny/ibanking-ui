// pages/BusinessServicePayments.tsx
import React, { useState } from 'react';
import {
    FaSearch,
    FaHistory,
    FaBuilding,
    FaFileInvoice,
    FaLandmark,
    FaWifi,
    FaHome,
    FaLaptop
} from 'react-icons/fa';
import { TbCreditCard } from 'react-icons/tb';
import { BusinessLayout } from '../../../components/BusinessLayout';

interface BusinessServicePaymentsProps {
    language: 'PT' | 'EN';
}

interface ServiceProvider {
    id: string;
    name: string;
    logo: string;
    description: string;
}

const BusinessServicePayments: React.FC<BusinessServicePaymentsProps> = ({ language }) => {
    const [selectedProvider, setSelectedProvider] = useState<string>('');
    const [entity, setEntity] = useState<string>('');
    const [reference, setReference] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const currentTexts = {
        PT: {
            title: "Pagamentos de Serviços",
            subtitle: "Efetue pagamentos de serviços usando entidade e referência",
            searchPlaceholder: "Pesquisar serviço...",
            services: "Serviços Disponíveis",
            paymentDetails: "Detalhes do Pagamento",
            entity: "Entidade",
            reference: "Referência",
            amount: "Valor",
            total: "Total a Pagar",
            serviceFee: "Taxa de serviço",
            confirmPayment: "Confirmar Pagamento",
            processing: "Processando...",
            success: "Pagamento realizado com sucesso!",
            recentPayments: "Pagamentos Recentes",
            noRecentPayments: "Nenhum pagamento recente",
            continue: "Continuar",
            cancel: "Cancelar",
            confirm: "Confirmar",
            selectService: "Selecione um serviço",
            enterEntity: "Digite a entidade",
            enterReference: "Digite a referência",
            enterAmount: "Digite o valor",
            confirmMessage: "Tem a certeza que deseja proceder com o pagamento?",
            authority: "Autoridade Tributária",
            mcnet: "MCNET",
            kudumba: "KUDUMBA",
            melectronic: "Mozambique Electronic",
            paymentFor: "Pagamento para",
            description: "Descrição"
        },
        EN: {
            title: "Service Payments",
            subtitle: "Make service payments using entity and reference",
            searchPlaceholder: "Search service...",
            services: "Available Services",
            paymentDetails: "Payment Details",
            entity: "Entity",
            reference: "Reference",
            amount: "Amount",
            total: "Total to Pay",
            serviceFee: "Service fee",
            confirmPayment: "Confirm Payment",
            processing: "Processing...",
            success: "Payment successful!",
            recentPayments: "Recent Payments",
            noRecentPayments: "No recent payments",
            continue: "Continue",
            cancel: "Cancel",
            confirm: "Confirm",
            selectService: "Select a service",
            enterEntity: "Enter entity",
            enterReference: "Enter reference",
            enterAmount: "Enter amount",
            confirmMessage: "Are you sure you want to proceed with the payment?",
            authority: "Tax Authority",
            mcnet: "MCNET",
            kudumba: "KUDUMBA",
            melectronic: "Mozambique Electronic",
            paymentFor: "Payment for",
            description: "Description"
        }
    }[language];

    const serviceProviders: ServiceProvider[] = [
        {
            id: 'authority',
            name: currentTexts.authority,
            logo: '/providers/autoridade-tributaria.jpeg',
            description: 'Pagamento de impostos e taxas governamentais'
        },
        {
            id: 'mcnet',
            name: currentTexts.mcnet,
            logo: '/providers/MCnet.jpg',
            description: 'Serviços de internet e telecomunicações'
        },
        {
            id: 'kudumba',
            name: currentTexts.kudumba,
            logo: '/providers/kudumba.jpg',
            description: 'Pagamento de serviços municipais e taxas'
        },
        {
            id: 'melectronic',
            name: currentTexts.melectronic,
            logo: '/providers/mects.jpeg',
            description: 'Serviços electrónicos diversos'
        }
    ];

    const recentPayments = [
        {
            id: 1,
            service: currentTexts.authority,
            entity: '10120',
            reference: '1234567892024',
            amount: 2500,
            date: '2024-01-15',
            status: 'Concluído'
        },
        {
            id: 2,
            service: currentTexts.mcnet,
            entity: '10456',
            reference: '9876543210',
            amount: 1499,
            date: '2024-01-14',
            status: 'Concluído'
        },
        {
            id: 3,
            service: currentTexts.kudumba,
            entity: '10321',
            reference: '1122334455',
            amount: 350,
            date: '2024-01-13',
            status: 'Concluído'
        },
    ];

    const selectedProviderData = serviceProviders.find(provider => provider.id === selectedProvider);

    const handlePayment = () => {
        setIsProcessing(true);
        // Simular processamento
        setTimeout(() => {
            setIsProcessing(false);
            setShowConfirmation(false);
            // Aqui iria a lógica real de processamento
            alert(currentTexts.success);
        }, 2000);
    };

    const serviceFee = amount ? parseFloat(amount) * 0.015 : 0; // 1.5% de taxa
    const totalAmount = amount ? parseFloat(amount) + serviceFee : 0;

    const isFormValid = selectedProvider && entity && reference && amount && parseFloat(amount) > 0;

    // Função para obter ícone fallback baseado no serviço
    const getServiceIcon = (providerId: string) => {
        switch (providerId) {
            case 'authority':
                return <FaLandmark className="text-gray-600 text-lg" />;
            case 'mcnet':
                return <FaWifi className="text-gray-600 text-lg" />;
            case 'kudumba':
                return <FaHome className="text-gray-600 text-lg" />;
            case 'melectronic':
                return <FaLaptop className="text-gray-600 text-lg" />;
            default:
                return <FaBuilding className="text-gray-600 text-lg" />;
        }
    };

    return (
        <BusinessLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-sm border mb-5 border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <TbCreditCard size={24} className="text-red-600" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{currentTexts.title}</h1>
                                    <p className="text-gray-600">{currentTexts.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Services and Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Search Bar */}
                            <div className="bg-white rounded-lg shadow-sm p-4">
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder={currentTexts.searchPlaceholder}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Services */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">{currentTexts.services}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {serviceProviders.map((provider) => (
                                        <button
                                            key={provider.id}
                                            onClick={() => setSelectedProvider(provider.id)}
                                            className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all duration-200 text-left ${selectedProvider === provider.id
                                                ? 'border-red-500 bg-red-50'
                                                : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                                                }`}
                                        >
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <img
                                                    src={provider.logo}
                                                    alt={provider.name}
                                                    className="w-8 h-8 object-contain"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                        const parent = (e.target as HTMLImageElement).parentElement;
                                                        if (parent) {
                                                            const icon = getServiceIcon(provider.id);
                                                            parent.innerHTML = `
                              <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                ${icon.props.className ? `<span class="${icon.props.className}"></span>` : ''}
                              </div>
                            `;
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 truncate">{provider.name}</h3>
                                                <p className="text-sm text-gray-600 mt-1">{provider.description}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Form */}
                            {selectedProviderData && (
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">{currentTexts.paymentDetails}</h2>

                                    <div className="space-y-4">
                                        {/* Service Info */}
                                        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                                <img
                                                    src={selectedProviderData.logo}
                                                    alt={selectedProviderData.name}
                                                    className="w-6 h-6 object-contain"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                        const parent = (e.target as HTMLImageElement).parentElement;
                                                        if (parent) {
                                                            const icon = getServiceIcon(selectedProviderData.id);
                                                            parent.innerHTML = `
                              <div class="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                                ${icon.props.className ? `<span class="${icon.props.className}"></span>` : ''}
                              </div>
                            `;
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-gray-900 truncate">{selectedProviderData.name}</p>
                                                <p className="text-sm text-gray-600 truncate">{selectedProviderData.description}</p>
                                            </div>
                                        </div>

                                        {/* Entity */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {currentTexts.entity}
                                            </label>
                                            <input
                                                type="text"
                                                value={entity}
                                                onChange={(e) => setEntity(e.target.value)}
                                                placeholder={currentTexts.enterEntity}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            />
                                        </div>

                                        {/* Reference */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {currentTexts.reference}
                                            </label>
                                            <input
                                                type="text"
                                                value={reference}
                                                onChange={(e) => setReference(e.target.value)}
                                                placeholder={currentTexts.enterReference}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            />
                                        </div>

                                        {/* Amount */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {currentTexts.amount} (MT)
                                            </label>
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                placeholder={currentTexts.enterAmount}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                min="1"
                                            />
                                        </div>

                                        {/* Summary */}
                                        {amount && parseFloat(amount) > 0 && (
                                            <div className="border-t pt-4">
                                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                                    <span>{currentTexts.amount}:</span>
                                                    <span>{parseFloat(amount).toFixed(2)} MT</span>
                                                </div>
                                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                                    <span>{currentTexts.serviceFee}:</span>
                                                    <span>{serviceFee.toFixed(2)} MT</span>
                                                </div>
                                                <div className="flex justify-between font-semibold text-lg text-gray-900">
                                                    <span>{currentTexts.total}:</span>
                                                    <span>{totalAmount.toFixed(2)} MT</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Action and Recent Payments */}
                        <div className="space-y-6">
                            {/* Action Panel */}
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">{currentTexts.confirmPayment}</h2>

                                {selectedProviderData ? (
                                    <div className="space-y-4">
                                        {/* Service Summary */}
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="font-semibold text-gray-900">{currentTexts.paymentFor}:</p>
                                            <p className="text-gray-600">{selectedProviderData.name}</p>
                                            {entity && (
                                                <p className="text-sm text-gray-600 mt-1">
                                                    <strong>{currentTexts.entity}:</strong> {entity}
                                                </p>
                                            )}
                                            {reference && (
                                                <p className="text-sm text-gray-600">
                                                    <strong>{currentTexts.reference}:</strong> {reference}
                                                </p>
                                            )}
                                            {amount && parseFloat(amount) > 0 && (
                                                <p className="text-sm text-gray-600">
                                                    <strong>{currentTexts.amount}:</strong> {parseFloat(amount).toFixed(2)} MT
                                                </p>
                                            )}
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            onClick={() => setShowConfirmation(true)}
                                            disabled={!isFormValid || isProcessing}
                                            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                                        >
                                            {isProcessing ? currentTexts.processing : currentTexts.continue}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500 py-8">
                                        <FaFileInvoice className="mx-auto text-gray-300 mb-2" size={32} />
                                        <p>{currentTexts.selectService}</p>
                                    </div>
                                )}
                            </div>

                            {/* Recent Payments */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-gray-900">{currentTexts.recentPayments}</h2>
                                    <FaHistory className="text-gray-400" />
                                </div>

                                {recentPayments.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentPayments.map((payment) => (
                                            <div key={payment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-gray-900 truncate">{payment.service}</p>
                                                    <p className="text-sm text-gray-600 truncate">
                                                        {payment.entity} - {payment.reference}
                                                    </p>
                                                </div>
                                                <div className="text-right flex-shrink-0 ml-4">
                                                    <p className="font-semibold text-gray-900">{payment.amount} MT</p>
                                                    <p className="text-xs text-gray-500">{payment.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-4">{currentTexts.noRecentPayments}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Confirmation Modal */}
                {showConfirmation && isFormValid && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-md w-full p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentTexts.confirmPayment}</h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{currentTexts.paymentFor}:</span>
                                    <span className="font-medium">{selectedProviderData?.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{currentTexts.entity}:</span>
                                    <span className="font-medium">{entity}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{currentTexts.reference}:</span>
                                    <span className="font-medium">{reference}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{currentTexts.amount}:</span>
                                    <span className="font-medium">{parseFloat(amount).toFixed(2)} MT</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{currentTexts.serviceFee}:</span>
                                    <span className="font-medium">{serviceFee.toFixed(2)} MT</span>
                                </div>
                                <div className="flex justify-between border-t pt-2">
                                    <span className="font-semibold">{currentTexts.total}:</span>
                                    <span className="font-semibold text-red-600">{totalAmount.toFixed(2)} MT</span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-6">{currentTexts.confirmMessage}</p>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setShowConfirmation(false)}
                                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                                >
                                    {currentTexts.cancel}
                                </button>
                                <button
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-400 transition-colors"
                                >
                                    {isProcessing ? currentTexts.processing : currentTexts.confirm}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </BusinessLayout>
    );
};

export default BusinessServicePayments;