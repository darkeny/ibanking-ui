// pages/ClientRecharges.tsx
import React, { useState } from 'react';
import {
    FaMobileAlt,
    FaBolt,
    FaTv,
    FaHistory,
    FaEdit
} from 'react-icons/fa';
import { TbCreditCard } from 'react-icons/tb';
import { ClientLayout } from '../../../components/ClientLayout';

interface ClientRechargesProps {
    language: 'PT' | 'EN';
}

interface RechargeOption {
    id: string;
    name: string;
    icon: React.ReactNode;
    providers: Provider[];
}

interface Provider {
    id: string;
    name: string;
    logo: string;
    plans: Plan[];
    hasCustomAmount?: boolean;
}

interface Plan {
    id: string;
    amount: number;
    bonus?: number;
    validity?: string;
    name?: string;
    popular?: boolean;
}

const ClientRecharges: React.FC<ClientRechargesProps> = ({ language }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('telefonia');
    const [selectedProvider, setSelectedProvider] = useState<string>('');
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [meterNumber, setMeterNumber] = useState<string>('');
    const [customAmount, setCustomAmount] = useState<string>('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const currentTexts = {
        PT: {
            title: "Recargas",
            subtitle: "Carregue o seu telemóvel, electricidade e outros serviços",
            searchPlaceholder: "Pesquisar serviço...",
            categories: "Categorias",
            providers: "Operadoras",
            plans: "Planos Disponíveis",
            phoneNumber: "Número de Telemóvel",
            meterNumber: "Número do Contador",
            amount: "Valor",
            customAmount: "Valor Personalizado",
            enterCustomAmount: "Digite o valor desejado",
            total: "Total a Pagar",
            serviceFee: "Taxa de serviço",
            confirmRecharge: "Confirmar Recarga",
            processing: "Processando...",
            success: "Recarga realizada com sucesso!",
            recentRecharges: "Recargas Recentes",
            noRecentRecharges: "Nenhuma recarga recente",
            buy: "Comprar",
            popular: "Popular",
            telephoneRecharges: "Recargas de Telefonia",
            electricity: "Electricidade",
            tv: "Televisão",
            internet: "Internet",
            other: "Outros",
            vodacom: "Vodacom",
            movitel: "Movitel",
            mcel: "Mcel",
            tmcel: "Tmcel",
            credelec: "Credelec",
            edm: "EDM",
            multiChoice: "MultiChoice",
            starTimes: "StarTimes",
            dstv: "DStv",
            gotv: "GOtv",
            zap: "ZAP",
            tvcabo: "TVCABO",
            tmt: "TMT",
            confirmMessage: "Tem a certeza que deseja proceder com a recarga?",
            cancel: "Cancelar",
            confirm: "Confirmar",
            continue: "Continuar",
            selectProvider: "Selecione a operadora",
            selectPlan: "Selecione um plano",
            enterPhone: "Digite o número de telemóvel",
            enterMeter: "Digite o número do contador",
            enterAccount: "Digite o número da conta",
            chooseAmount: "Escolha o valor ou digite um valor personalizado"
        },
        EN: {
            title: "Recharges",
            subtitle: "Top up your phone, electricity and other services",
            searchPlaceholder: "Search service...",
            categories: "Categories",
            providers: "Providers",
            plans: "Available Plans",
            phoneNumber: "Phone Number",
            meterNumber: "Meter Number",
            amount: "Amount",
            customAmount: "Custom Amount",
            enterCustomAmount: "Enter desired amount",
            total: "Total to Pay",
            serviceFee: "Service fee",
            confirmRecharge: "Confirm Recharge",
            processing: "Processing...",
            success: "Recharge successful!",
            recentRecharges: "Recent Recharges",
            noRecentRecharges: "No recent recharges",
            buy: "Buy",
            popular: "Popular",
            telephoneRecharges: "Telephone Recharges",
            electricity: "Electricity",
            tv: "Television",
            internet: "Internet",
            other: "Others",
            vodacom: "Vodacom",
            movitel: "Movitel",
            mcel: "Mcel",
            tmcel: "Tmcel",
            credelec: "Credelec",
            edm: "EDM",
            multiChoice: "MultiChoice",
            starTimes: "StarTimes",
            dstv: "DStv",
            gotv: "GOtv",
            zap: "ZAP",
            tvcabo: "TVCABO",
            tmt: "TMT",
            confirmMessage: "Are you sure you want to proceed with the recharge?",
            cancel: "Cancel",
            confirm: "Confirm",
            continue: "Continue",
            selectProvider: "Select provider",
            selectPlan: "Select a plan",
            enterPhone: "Enter phone number",
            enterMeter: "Enter meter number",
            enterAccount: "Enter account number",
            chooseAmount: "Choose amount or enter a custom value"
        }
    }[language];

    const rechargeOptions: RechargeOption[] = [
        {
            id: 'telefonia',
            name: currentTexts.telephoneRecharges,
            icon: <FaMobileAlt className="text-blue-600" size={24} />,
            providers: [
                {
                    id: 'vodacom',
                    name: currentTexts.vodacom,
                    logo: '/providers/vodacom.png',
                    hasCustomAmount: true,
                    plans: [
                        { id: 'v1', amount: 50, bonus: 5, validity: '30 dias', popular: true },
                        { id: 'v2', amount: 100, bonus: 12, validity: '30 dias', popular: true },
                        { id: 'v3', amount: 200, bonus: 25, validity: '30 dias' },
                        { id: 'v4', amount: 500, bonus: 75, validity: '30 dias' },
                        { id: 'v5', amount: 1000, bonus: 150, validity: '30 dias' },
                    ]
                },
                {
                    id: 'movitel',
                    name: currentTexts.movitel,
                    logo: '/providers/movitel.png',
                    hasCustomAmount: true,
                    plans: [
                        { id: 'm1', amount: 50, bonus: 10, validity: '30 dias', popular: true },
                        { id: 'm2', amount: 100, bonus: 20, validity: '30 dias', popular: true },
                        { id: 'm3', amount: 200, bonus: 45, validity: '30 dias' },
                        { id: 'm4', amount: 500, bonus: 120, validity: '30 dias' },
                        { id: 'm5', amount: 1000, bonus: 250, validity: '30 dias' },
                    ]
                },
                {
                    id: 'mcel',
                    name: currentTexts.mcel,
                    logo: '/providers/tmcel.png',
                    hasCustomAmount: true,
                    plans: [
                        { id: 'mc1', amount: 50, bonus: 8, validity: '30 dias', popular: true },
                        { id: 'mc2', amount: 100, bonus: 15, validity: '30 dias', popular: true },
                        { id: 'mc3', amount: 200, bonus: 35, validity: '30 dias' },
                        { id: 'mc4', amount: 500, bonus: 90, validity: '30 dias' },
                        { id: 'mc5', amount: 1000, bonus: 200, validity: '30 dias' },
                    ]
                }
            ]
        },
        {
            id: 'electricidade',
            name: currentTexts.electricity,
            icon: <FaBolt className="text-yellow-500" size={24} />,
            providers: [
                {
                    id: 'credelec',
                    name: currentTexts.credelec,
                    logo: '/providers/edm.png',
                    hasCustomAmount: true,
                    plans: [
                        { id: 'c1', amount: 100, validity: 'Pré-pago' },
                        { id: 'c2', amount: 200, validity: 'Pré-pago' },
                        { id: 'c3', amount: 500, validity: 'Pré-pago', popular: true },
                        { id: 'c4', amount: 1000, validity: 'Pré-pago', popular: true },
                        { id: 'c5', amount: 2000, validity: 'Pré-pago' },
                    ]
                }
            ]
        },
        {
            id: 'tv',
            name: currentTexts.tv,
            icon: <FaTv className="text-purple-500" size={24} />,
            providers: [
                {
                    id: 'dstv',
                    name: 'DStv',
                    logo: '/providers/dstv.jpeg',
                    plans: [
                        { id: 'dstv1', amount: 599, validity: '30 dias', name: 'DStv Premium', popular: true },
                        { id: 'dstv2', amount: 399, validity: '30 dias', name: 'DStv Compact Plus' },
                        { id: 'dstv3', amount: 249, validity: '30 dias', name: 'DStv Compact' },
                        { id: 'dstv4', amount: 149, validity: '30 dias', name: 'DStv Family' },
                        { id: 'dstv5', amount: 99, validity: '30 dias', name: 'DStv Access' },
                    ]
                },
                {
                    id: 'gotv',
                    name: 'GOtv',
                    logo: '/providers/gotv.png',
                    plans: [
                        { id: 'gotv1', amount: 450, validity: '30 dias', name: 'GOtv Max', popular: true },
                        { id: 'gotv2', amount: 300, validity: '30 dias', name: 'GOtv Plus' },
                        { id: 'gotv3', amount: 210, validity: '30 dias', name: 'GOtv Value' },
                        { id: 'gotv4', amount: 120, validity: '30 dias', name: 'GOtv Lite' },
                        { id: 'gotv5', amount: 60, validity: '7 dias', name: 'GOtv SUPA' },
                    ]
                },
                {
                    id: 'zap',
                    name: 'ZAP',
                    logo: '/providers/ZAP.jpg',
                    plans: [
                        { id: 'zap1', amount: 799, validity: '30 dias', name: 'ZAP Total', popular: true },
                        { id: 'zap2', amount: 549, validity: '30 dias', name: 'ZAP Grand' },
                        { id: 'zap3', amount: 399, validity: '30 dias', name: 'ZAP Family' },
                        { id: 'zap4', amount: 249, validity: '30 dias', name: 'ZAP Basic' },
                        { id: 'zap5', amount: 149, validity: '30 dias', name: 'ZAP Mini' },
                    ]
                },
                {
                    id: 'tvcabo',
                    name: 'TVCABO',
                    logo: '/providers/tvcabo.png',
                    plans: [
                        { id: 'tv1', amount: 850, validity: '30 dias', name: 'TVCABO Total', popular: true },
                        { id: 'tv2', amount: 650, validity: '30 dias', name: 'TVCABO Max' },
                        { id: 'tv3', amount: 450, validity: '30 dias', name: 'TVCABO Plus' },
                        { id: 'tv4', amount: 300, validity: '30 dias', name: 'TVCABO Basic' },
                        { id: 'tv5', amount: 200, validity: '30 dias', name: 'TVCABO Light' },
                    ]
                },
                {
                    id: 'tmt',
                    name: 'TMT',
                    logo: '/providers/tmt.png',
                    plans: [
                        { id: 'tmt1', amount: 500, validity: '30 dias', name: 'TMT Premium', popular: true },
                        { id: 'tmt2', amount: 350, validity: '30 dias', name: 'TMT Sports' },
                        { id: 'tmt3', amount: 250, validity: '30 dias', name: 'TMT Entertainment' },
                        { id: 'tmt4', amount: 150, validity: '30 dias', name: 'TMT Basic' },
                    ]
                }
            ]
        }
    ];

    const recentRecharges = [
        { id: 1, service: 'Vodacom', number: '+258 84 123 4567', amount: 100, date: '2024-01-15', status: 'Concluída' },
        { id: 2, service: 'Credelec', number: '123456789', amount: 500, date: '2024-01-14', status: 'Concluída' },
        { id: 3, service: 'Movitel', number: '+258 82 987 6543', amount: 200, date: '2024-01-13', status: 'Concluída' },
    ];

    const selectedCategoryData = rechargeOptions.find(opt => opt.id === selectedCategory);
    const selectedProviderData = selectedCategoryData?.providers.find(p => p.id === selectedProvider);

    const handleRecharge = () => {
        setIsProcessing(true);
        // Simular processamento
        setTimeout(() => {
            setIsProcessing(false);
            setShowConfirmation(false);
            // Aqui iria a lógica real de processamento
            alert(currentTexts.success);
        }, 2000);
    };

    const getFinalAmount = () => {
        if (customAmount && selectedProviderData?.hasCustomAmount) {
            return parseFloat(customAmount) || 0;
        }
        return selectedPlan ? selectedPlan.amount : 0;
    };

    const finalAmount = getFinalAmount();
    const serviceFee = finalAmount * 0.02; // 2% de taxa
    const totalAmount = finalAmount + serviceFee;



    const isCustomAmountSelected = !selectedPlan && customAmount !== '';

    return (
        <ClientLayout>
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
                        {/* Left Column - Categories and Providers */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Categories */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">{currentTexts.categories}</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {rechargeOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => {
                                                setSelectedCategory(option.id);
                                                setSelectedProvider('');
                                                setSelectedPlan(null);
                                                setCustomAmount('');
                                            }}
                                            className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 ${selectedCategory === option.id
                                                ? 'border-red-500 bg-red-50'
                                                : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                                                }`}
                                        >
                                            {option.icon}
                                            <span className="mt-2 text-sm font-medium text-gray-700 text-center">
                                                {option.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Providers */}
                            {selectedCategoryData && (
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">{currentTexts.providers}</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {selectedCategoryData.providers.map((provider) => (
                                            <button
                                                key={provider.id}
                                                onClick={() => {
                                                    setSelectedProvider(provider.id);
                                                    setSelectedPlan(null);
                                                    setCustomAmount('');
                                                }}
                                                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 ${selectedProvider === provider.id
                                                    ? 'border-red-500 bg-red-50'
                                                    : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                                                    }`}
                                            >
                                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                                                    <img
                                                        src={provider.logo}
                                                        alt={provider.name}
                                                        className="w-8 h-8 object-contain"
                                                        onError={(e) => {
                                                            // Fallback para ícone genérico se a imagem não carregar
                                                            (e.target as HTMLImageElement).style.display = 'none';
                                                            const parent = (e.target as HTMLImageElement).parentElement;
                                                            if (parent) {
                                                                parent.innerHTML = `
                                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                  <span class="text-xs font-bold text-gray-600">${provider.name.substring(0, 2)}</span>
                                </div>
                              `;
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 text-center">
                                                    {provider.name}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Plans */}
                            {selectedProviderData && (
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">{currentTexts.plans}</h2>

                                    {/* Campo de valor personalizado para telefonia e electricidade */}
                                    {selectedProviderData.hasCustomAmount && (
                                        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <FaEdit className="text-blue-600" />
                                                <h3 className="text-md font-semibold text-gray-900">{currentTexts.customAmount}</h3>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-3">{currentTexts.chooseAmount}</p>
                                            <div className="flex space-x-3">
                                                <input
                                                    type="number"
                                                    value={customAmount}
                                                    onChange={(e) => {
                                                        setCustomAmount(e.target.value);
                                                        setSelectedPlan(null);
                                                    }}
                                                    placeholder={currentTexts.enterCustomAmount}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    min="1"
                                                />
                                                <span className="flex items-center px-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600">
                                                    MT
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {selectedProviderData.plans.map((plan) => (
                                            <button
                                                key={plan.id}
                                                onClick={() => {
                                                    setSelectedPlan(plan);
                                                    setCustomAmount('');
                                                }}
                                                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${selectedPlan?.id === plan.id
                                                    ? 'border-red-500 bg-red-50'
                                                    : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                                                    } ${plan.popular ? 'ring-2 ring-yellow-400' : ''}`}
                                            >
                                                {plan.popular && (
                                                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mb-2">
                                                        {currentTexts.popular}
                                                    </span>
                                                )}
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-lg font-bold text-gray-900">
                                                        {plan.amount} MT
                                                    </span>
                                                    {plan.bonus && (
                                                        <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                                                            +{plan.bonus} MT
                                                        </span>
                                                    )}
                                                </div>
                                                {plan.name && (
                                                    <p className="text-sm font-medium text-gray-900 mb-1">
                                                        {plan.name}
                                                    </p>
                                                )}
                                                {plan.validity && (
                                                    <p className="text-sm text-gray-600">
                                                        Validade: {plan.validity}
                                                    </p>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Checkout and Recent Recharges */}
                        <div className="space-y-6">
                            {/* Checkout Panel */}
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">{currentTexts.confirmRecharge}</h2>

                                {/* Service Selection Summary */}
                                {selectedCategoryData && selectedProviderData && (
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                <img
                                                    src={selectedProviderData.logo}
                                                    alt={selectedProviderData.name}
                                                    className="w-6 h-6 object-contain"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                        const parent = (e.target as HTMLImageElement).parentElement;
                                                        if (parent) {
                                                            parent.innerHTML = `
                              <div class="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                                <span class="text-xs font-bold text-gray-600">${selectedProviderData.name.substring(0, 2)}</span>
                              </div>
                            `;
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{selectedProviderData.name}</p>
                                                <p className="text-sm text-gray-600">{selectedCategoryData.name}</p>
                                            </div>
                                        </div>

                                        {/* Phone/Meter Number Input */}
                                        {selectedCategory === 'telefonia' ? (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {currentTexts.phoneNumber}
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    placeholder={currentTexts.enterPhone}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {currentTexts.meterNumber}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={meterNumber}
                                                    onChange={(e) => setMeterNumber(e.target.value)}
                                                    placeholder={currentTexts.enterMeter}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                />
                                            </div>
                                        )}

                                        {/* Selected Amount */}
                                        {(selectedPlan || isCustomAmountSelected) && (
                                            <div className="p-3 bg-green-50 rounded-lg">
                                                <p className="font-semibold text-gray-900">{currentTexts.amount}:</p>
                                                <p className="text-2xl font-bold text-green-600">{finalAmount} MT</p>
                                                {selectedPlan?.bonus && (
                                                    <p className="text-sm text-green-600">
                                                        Bónus: +{selectedPlan.bonus} MT
                                                    </p>
                                                )}
                                                {selectedPlan?.name && (
                                                    <p className="text-sm text-gray-600">
                                                        Plano: {selectedPlan.name}
                                                    </p>
                                                )}
                                                {isCustomAmountSelected && (
                                                    <p className="text-sm text-blue-600">
                                                        ✓ Valor personalizado
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {/* Total */}
                                        {(selectedPlan || isCustomAmountSelected) && (
                                            <div className="border-t pt-4">
                                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                                    <span>{currentTexts.amount}:</span>
                                                    <span>{finalAmount} MT</span>
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

                                        {/* Action Button */}
                                        <button
                                            onClick={() => setShowConfirmation(true)}
                                            disabled={!finalAmount || !(phoneNumber || meterNumber) || isProcessing}
                                            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                                        >
                                            {isProcessing ? currentTexts.processing : currentTexts.continue}
                                        </button>
                                    </div>
                                )}

                                {(!selectedCategoryData || !selectedProviderData) && (
                                    <div className="text-center text-gray-500 py-8">
                                        <FaMobileAlt className="mx-auto text-gray-300 mb-2" size={32} />
                                        <p>{currentTexts.selectProvider}</p>
                                    </div>
                                )}
                            </div>

                            {/* Recent Recharges */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-gray-900">{currentTexts.recentRecharges}</h2>
                                    <FaHistory className="text-gray-400" />
                                </div>

                                {recentRecharges.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentRecharges.map((recharge) => (
                                            <div key={recharge.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                                <div>
                                                    <p className="font-medium text-gray-900">{recharge.service}</p>
                                                    <p className="text-sm text-gray-600">{recharge.number}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-gray-900">{recharge.amount} MT</p>
                                                    <p className="text-xs text-gray-500">{recharge.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-4">{currentTexts.noRecentRecharges}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Confirmation Modal */}
                {showConfirmation && finalAmount > 0 && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-md w-full p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentTexts.confirmRecharge}</h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Serviço:</span>
                                    <span className="font-medium">{selectedProviderData?.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        {selectedCategory === 'telefonia' ? 'Número:' : 'Contador:'}
                                    </span>
                                    <span className="font-medium">{phoneNumber || meterNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Valor:</span>
                                    <span className="font-medium">{finalAmount} MT</span>
                                </div>
                                {selectedPlan?.name && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Plano:</span>
                                        <span className="font-medium">{selectedPlan.name}</span>
                                    </div>
                                )}
                                {isCustomAmountSelected && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tipo:</span>
                                        <span className="font-medium text-blue-600">Valor Personalizado</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Taxa:</span>
                                    <span className="font-medium">{serviceFee.toFixed(2)} MT</span>
                                </div>
                                <div className="flex justify-between border-t pt-2">
                                    <span className="font-semibold">Total:</span>
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
                                    onClick={handleRecharge}
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
        </ClientLayout>
    );
};

export default ClientRecharges;