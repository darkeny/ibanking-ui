// pages/BusinessMyAccountsTransfers.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BusinessLayout } from '../../../components/BusinessLayout';

interface TransferData {
    fromAccount: string;
    toAccount: string;
    amount: string;
    description: string;
    scheduled: boolean;
    scheduleDate: string;
    repeatTransfer: boolean;
    repeatFrequency: string;
    repeatEndDate: string;
}

const BusinessMyAccountsTransfers: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [transferData, setTransferData] = useState<TransferData>({
        fromAccount: '',
        toAccount: '',
        amount: '',
        description: '',
        scheduled: false,
        scheduleDate: '',
        repeatTransfer: false,
        repeatFrequency: 'monthly',
        repeatEndDate: ''
    });
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailData, setEmailData] = useState({
        email: '',
        subject: 'Comprovativo de Transferência entre Contas',
        message: ''
    });
    const [, setEmailSent] = useState(false);

    const accounts = [
        { 
            id: '1', 
            name: 'Conta Principal Empresa', 
            number: 'PT50 1234 5678 9012 3456 7890', 
            balance: 25420.15, 
            currency: 'MZN',
            type: 'current'
        },
        { 
            id: '2', 
            name: 'Conta Operações', 
            number: 'PT50 1234 5678 9012 3456 7891', 
            balance: 125000.75, 
            currency: 'MZN',
            type: 'current'
        },
        { 
            id: '3', 
            name: 'Conta Poupança Empresa', 
            number: 'PT50 1234 5678 9012 3456 7892', 
            balance: 50000.00, 
            currency: 'MZN',
            type: 'savings'
        },
        { 
            id: '4', 
            name: 'Conta USD Empresa', 
            number: 'PT50 1234 5678 9012 3456 7893', 
            balance: 25000.00, 
            currency: 'USD',
            type: 'foreign'
        },
        { 
            id: '5', 
            name: 'Conta EUR Empresa', 
            number: 'PT50 1234 5678 9012 3456 7894', 
            balance: 15000.00, 
            currency: 'EUR',
            type: 'foreign'
        },
    ];

    // Frequências de repetição
    const repeatFrequencies = [
        { value: 'daily', label: 'Diariamente' },
        { value: 'weekly', label: 'Semanalmente' },
        { value: 'monthly', label: 'Mensalmente' },
        { value: 'quarterly', label: 'Trimestralmente' },
        { value: 'yearly', label: 'Anualmente' },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setTransferData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEmailData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateStep1 = () => {
        return transferData.fromAccount && 
               transferData.toAccount && 
               transferData.amount && 
               transferData.fromAccount !== transferData.toAccount &&
               parseFloat(transferData.amount) > 0;
    };

    const getTotalAmount = () => {
        return parseFloat(transferData.amount || '0');
    };

    const getFromAccount = () => {
        return accounts.find(acc => acc.id === transferData.fromAccount);
    };

    const getToAccount = () => {
        return accounts.find(acc => acc.id === transferData.toAccount);
    };

    const isSameCurrency = () => {
        const fromAccount = getFromAccount();
        const toAccount = getToAccount();
        return fromAccount && toAccount && fromAccount.currency === toAccount.currency;
    };

    const getExchangeRate = () => {
        // Taxas de câmbio simuladas
        const rates: { [key: string]: number } = {
            'MZN': 1,
            'USD': 64.5,
            'EUR': 70.2
        };
        return rates;
    };

    const getConvertedAmount = () => {
        const fromAccount = getFromAccount();
        const toAccount = getToAccount();
        
        if (!fromAccount || !toAccount || fromAccount.currency === toAccount.currency) {
            return getTotalAmount();
        }

        const rates = getExchangeRate();
        const amountInMZN = getTotalAmount() * rates[fromAccount.currency];
        return amountInMZN / rates[toAccount.currency];
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) {
            setStep(2);
        } else if (step === 2) {
            // Simular processamento da transferência
            setTimeout(() => {
                setStep(3);
            }, 1500);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleNewTransfer = () => {
        setStep(1);
        setTransferData({
            fromAccount: '',
            toAccount: '',
            amount: '',
            description: '',
            scheduled: false,
            scheduleDate: '',
            repeatTransfer: false,
            repeatFrequency: 'monthly',
            repeatEndDate: ''
        });
        setEmailSent(false);
        setEmailData({
            email: '',
            subject: 'Comprovativo de Transferência entre Contas',
            message: ''
        });
    };

    const generateTransferReference = () => {
        return `TRF_CTA_${Date.now()}`;
    };

    const getFrequencyLabel = (value: string) => {
        const frequency = repeatFrequencies.find(freq => freq.value === value);
        return frequency ? frequency.label : 'Não repetir';
    };

    const downloadPDFExtract = () => {
        const transferRef = generateTransferReference();
        const totalAmount = getTotalAmount();
        const fromAccount = getFromAccount();
        const toAccount = getToAccount();
        
        const pdfContent = `
            COMPROVATIVO DE TRANSFERÊNCIA ENTRE CONTAS
            ==========================================
            
            Referência: ${transferRef}
            Data: ${new Date().toLocaleDateString('pt-PT')} ${new Date().toLocaleTimeString('pt-PT')}
            
            CONTA DE ORIGEM:
            ${fromAccount?.name}
            ${fromAccount?.number}
            Saldo antes: ${fromAccount?.balance.toLocaleString('pt-PT', { minimumFractionDigits: 2 })} ${fromAccount?.currency}
            
            CONTA DE DESTINO:
            ${toAccount?.name}
            ${toAccount?.number}
            Saldo antes: ${toAccount?.balance.toLocaleString('pt-PT', { minimumFractionDigits: 2 })} ${toAccount?.currency}
            
            VALOR TRANSFERIDO:
            ${fromAccount?.currency} ${totalAmount.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            
            ${!isSameCurrency() ? `
            VALOR RECEBIDO:
            ${toAccount?.currency} ${getConvertedAmount().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            
            TAXA DE CÂMBIO:
            1 ${fromAccount?.currency} = ${(getConvertedAmount() / totalAmount).toLocaleString('pt-PT', { minimumFractionDigits: 4 })} ${toAccount?.currency}
            ` : ''}
            
            DESCRIÇÃO:
            ${transferData.description || 'Transferência entre contas próprias'}
            
            ${transferData.scheduled ? `
            DATA PROGRAMADA:
            ${new Date(transferData.scheduleDate).toLocaleDateString('pt-PT')}
            ` : ''}
            
            ${transferData.repeatTransfer ? `
            REPETIÇÃO:
            ${getFrequencyLabel(transferData.repeatFrequency)}
            Até: ${transferData.repeatEndDate ? new Date(transferData.repeatEndDate).toLocaleDateString('pt-PT') : 'Indefinidamente'}
            ` : ''}
            
            ==========================================
            Your Bank Business - Luwali Technologies
        `;

        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `comprovativo_transferencia_contas_${transferRef}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('Comprovativo PDF descarregado com sucesso!');
    };

    const handleSendEmail = () => {
        if (!emailData.email) {
            alert('Por favor, insira um endereço de email válido.');
            return;
        }

        // Simular envio de email
        setTimeout(() => {
            setEmailSent(true);
            setShowEmailModal(false);
            alert(`Comprovativo enviado com sucesso para: ${emailData.email}`);
        }, 2000);
    };

    // Componente Modal Reutilizável
    const Modal = ({ isOpen, onClose, title, children }: { 
        isOpen: boolean; 
        onClose: () => void; 
        title: string; 
        children: React.ReactNode;
    }) => {
        if (!isOpen) return null;

        return (
            <div
                className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-[rgba(0,0,0,0.35)] backdrop-blur-sm"
                onClick={onClose}
            >
                <div
                    className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        );
    };

    return (
        <BusinessLayout>
           <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Transferência entre Minhas Contas</h1>
                            <p className="text-gray-600 mt-1">Transfira valores entre as suas contas de forma rápida e segura</p>
                        </div>
                        <button
                            onClick={() => navigate('/panel')}
                            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                        >
                            Voltar ao Dashboard
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Conteúdo Principal */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            {/* Progress Steps */}
                            <div className="flex items-center justify-between mb-8">
                                {[1, 2, 3].map((stepNumber) => (
                                    <div key={stepNumber} className="flex items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= stepNumber
                                            ? 'bg-red-600 text-white'
                                            : 'bg-gray-200 text-gray-500'
                                            }`}>
                                            {stepNumber}
                                        </div>
                                        {stepNumber < 3 && (
                                            <div className={`w-16 h-1 mx-2 ${step > stepNumber ? 'bg-red-600' : 'bg-gray-200'
                                                }`} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Step 1: Dados da Transferência */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Dados da Transferência</h2>

                                    <div className="space-y-4">
                                        {/* Conta de Origem */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Conta de Origem *
                                            </label>
                                            <select
                                                name="fromAccount"
                                                value={transferData.fromAccount}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                            >
                                                <option value="">Selecione a conta de origem</option>
                                                {accounts.map(account => (
                                                    <option key={account.id} value={account.id}>
                                                        {account.name} - {account.currency} {account.balance.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Conta de Destino */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Conta de Destino *
                                            </label>
                                            <select
                                                name="toAccount"
                                                value={transferData.toAccount}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                            >
                                                <option value="">Selecione a conta de destino</option>
                                                {accounts
                                                    .filter(account => account.id !== transferData.fromAccount)
                                                    .map(account => (
                                                        <option key={account.id} value={account.id}>
                                                            {account.name} - {account.currency} {account.balance.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        {/* Valor */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Valor *
                                            </label>
                                            <input
                                                type="number"
                                                name="amount"
                                                value={transferData.amount}
                                                onChange={handleInputChange}
                                                placeholder="0,00"
                                                step="0.01"
                                                min="0.01"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                            />
                                        </div>

                                        {/* Conversão de Moeda */}
                                        {transferData.fromAccount && transferData.toAccount && !isSameCurrency() && (
                                            <div className="bg-blue-50 rounded-xl p-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-blue-700 font-medium">Conversão de Moeda</span>
                                                    <span className="text-blue-600 text-sm">
                                                        {getFromAccount()?.currency} → {getToAccount()?.currency}
                                                    </span>
                                                </div>
                                                <div className="mt-2 text-sm text-blue-600">
                                                    <div className="flex justify-between">
                                                        <span>Valor enviado:</span>
                                                        <span>{getFromAccount()?.currency} {getTotalAmount().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</span>
                                                    </div>
                                                    <div className="flex justify-between font-semibold">
                                                        <span>Valor recebido:</span>
                                                        <span>{getToAccount()?.currency} {getConvertedAmount().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</span>
                                                    </div>
                                                    <div className="flex justify-between text-xs mt-1">
                                                        <span>Taxa de câmbio:</span>
                                                        <span>1 {getFromAccount()?.currency} = {(getConvertedAmount() / getTotalAmount()).toLocaleString('pt-PT', { minimumFractionDigits: 4 })} {getToAccount()?.currency}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Descrição */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Descrição (Opcional)
                                            </label>
                                            <input
                                                type="text"
                                                name="description"
                                                value={transferData.description}
                                                onChange={handleInputChange}
                                                placeholder="Ex: Transferência para poupança, Capitalização, etc."
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                            />
                                        </div>

                                        {/* Agendamento */}
                                        <div className="space-y-3 p-4 border border-gray-200 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <input
                                                    type="checkbox"
                                                    name="scheduled"
                                                    checked={transferData.scheduled}
                                                    onChange={handleInputChange}
                                                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                                />
                                                <label className="text-sm font-medium text-gray-700">
                                                    Programar transferência
                                                </label>
                                            </div>

                                            {transferData.scheduled && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Data de Execução
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="scheduleDate"
                                                        value={transferData.scheduleDate}
                                                        onChange={handleInputChange}
                                                        min={new Date().toISOString().split('T')[0]}
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Repetição */}
                                        <div className="space-y-3 p-4 border border-gray-200 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <input
                                                    type="checkbox"
                                                    name="repeatTransfer"
                                                    checked={transferData.repeatTransfer}
                                                    onChange={handleInputChange}
                                                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                                />
                                                <label className="text-sm font-medium text-gray-700">
                                                    Repetir esta transferência
                                                </label>
                                            </div>

                                            {transferData.repeatTransfer && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Frequência
                                                        </label>
                                                        <select
                                                            name="repeatFrequency"
                                                            value={transferData.repeatFrequency}
                                                            onChange={handleInputChange}
                                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                                                        >
                                                            {repeatFrequencies.map(freq => (
                                                                <option key={freq.value} value={freq.value}>
                                                                    {freq.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Data de Término
                                                        </label>
                                                        <input
                                                            type="date"
                                                            name="repeatEndDate"
                                                            value={transferData.repeatEndDate}
                                                            onChange={handleInputChange}
                                                            min={transferData.scheduleDate || new Date().toISOString().split('T')[0]}
                                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex space-x-4 pt-6 border-t border-gray-200">
                                        <button
                                            onClick={() => navigate('/panel')}
                                            className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            disabled={!validateStep1()}
                                            className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Continuar
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Confirmação */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Confirmar Transferência</h2>

                                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Conta de Origem:</span>
                                            <span className="font-semibold">
                                                {getFromAccount()?.name}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Conta de Destino:</span>
                                            <span className="font-semibold">{getToAccount()?.name}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Valor:</span>
                                            <span className="font-semibold text-red-600 text-lg">
                                                {getFromAccount()?.currency} {getTotalAmount().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                        {!isSameCurrency() && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Valor recebido:</span>
                                                <span className="font-semibold text-green-600">
                                                    {getToAccount()?.currency} {getConvertedAmount().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                                                </span>
                                            </div>
                                        )}
                                        {transferData.description && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Descrição:</span>
                                                <span className="font-semibold">{transferData.description}</span>
                                            </div>
                                        )}
                                        {transferData.scheduled && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Data programada:</span>
                                                <span className="font-semibold">
                                                    {new Date(transferData.scheduleDate).toLocaleDateString('pt-PT')}
                                                </span>
                                            </div>
                                        )}
                                        {transferData.repeatTransfer && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Repetição:</span>
                                                <span className="font-semibold">
                                                    {getFrequencyLabel(transferData.repeatFrequency)}
                                                    {transferData.repeatEndDate && ` até ${new Date(transferData.repeatEndDate).toLocaleDateString('pt-PT')}`}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex space-x-4">
                                        <button
                                            onClick={handleBack}
                                            className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                        >
                                            Voltar
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                        >
                                            Confirmar Transferência
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Sucesso */}
                            {step === 3 && (
                                <div className="text-center space-y-6">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Transferência Processada!</h2>
                                        <p className="text-gray-600">
                                            A transferência de <strong>{getFromAccount()?.currency} {getTotalAmount().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</strong> {' '}
                                            da conta <strong>{getFromAccount()?.name}</strong> para a conta{' '}
                                            <strong>{getToAccount()?.name}</strong> foi processada com sucesso.
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Referência:</span>
                                            <span className="font-mono">{generateTransferReference()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Data:</span>
                                            <span>{new Date().toLocaleDateString('pt-PT')} {new Date().toLocaleTimeString('pt-PT')}</span>
                                        </div>
                                        {!isSameCurrency() && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Conversão:</span>
                                                <span>{getFromAccount()?.currency} → {getToAccount()?.currency}</span>
                                            </div>
                                        )}
                                        {transferData.scheduled && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Tipo:</span>
                                                <span>Transferência Programada</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Opções de Comprovativo */}
                                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Opções de Comprovativo</h3>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Download PDF */}
                                            <button
                                                onClick={downloadPDFExtract}
                                                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors text-left"
                                            >
                                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">Download PDF</div>
                                                    <div className="text-sm text-gray-600">Baixar comprovativo em PDF</div>
                                                </div>
                                            </button>

                                            {/* Enviar por Email */}
                                            <button
                                                onClick={() => setShowEmailModal(true)}
                                                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                                            >
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">Enviar por Email</div>
                                                    <div className="text-sm text-gray-600">Receber comprovativo por email</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => navigate('/panel')}
                                            className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                        >
                                            Voltar ao Dashboard
                                        </button>
                                        <button
                                            onClick={handleNewTransfer}
                                            className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                        >
                                            Nova Transferência
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Informações Úteis */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vantagens</h3>
                            <div className="space-y-3 text-sm text-gray-600">
                                <p>• Transferência instantânea</p>
                                <p>• Sem taxas de transferência</p>
                                <p>• Conversão automática de moeda</p>
                                <p>• Agendamento e repetição</p>
                                <p>• Histórico completo</p>
                            </div>
                        </div>

                        {/* Resumo Rápido */}
                        {step === 1 && transferData.amount && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Valor:</span>
                                        <span className="font-semibold">
                                            {getFromAccount()?.currency} {getTotalAmount().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                    {!isSameCurrency() && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Recebido:</span>
                                            <span className="font-semibold">
                                                {getToAccount()?.currency} {getConvertedAmount().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Taxa:</span>
                                        <span className="font-semibold text-green-600">Grátis</span>
                                    </div>
                                    <div className="border-t pt-3">
                                        <div className="flex justify-between text-lg">
                                            <span className="font-semibold">Total:</span>
                                            <span className="font-bold text-red-600">
                                                {getFromAccount()?.currency} {getTotalAmount().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de Email */}
            <Modal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} title="Enviar Comprovativo por Email">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email de Destino
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={emailData.email}
                            onChange={handleEmailChange}
                            placeholder="seu@email.com"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Assunto
                        </label>
                        <input
                            type="text"
                            name="subject"
                            value={emailData.subject}
                            onChange={handleEmailChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mensagem (Opcional)
                        </label>
                        <textarea
                            name="message"
                            value={emailData.message}
                            onChange={handleEmailChange}
                            placeholder="Adicione uma mensagem personalizada..."
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={() => setShowEmailModal(false)}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSendEmail}
                            disabled={!emailData.email}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            Enviar Email
                        </button>
                    </div>
                </div>
            </Modal>
        </BusinessLayout>
    );
};

export default BusinessMyAccountsTransfers;