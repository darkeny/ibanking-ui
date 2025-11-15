// pages/BusinessMultipleTransfers.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BusinessLayout } from '../../../components/BusinessLayout';

interface TransferItem {
    id: string;
    nib: string;
    name: string;
    amount: string;
    description: string;
    status: 'pending' | 'valid' | 'error';
    error?: string;
}

const BusinessMultipleTransfers: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fromAccount: '',
        scheduled: false,
        scheduleDate: ''
    });
    const [transfers, setTransfers] = useState<TransferItem[]>([]);
    const [showImportModal, setShowImportModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);
    const [showAPIModal, setShowAPIModal] = useState(false);
    const [emailData, setEmailData] = useState({
        email: '',
        subject: 'Extrato de Transferências Múltiplas',
        message: ''
    });
    const [emailSent, setEmailSent] = useState(false);
    const [apiLink, setApiLink] = useState('');

    const accounts = [
        { id: '1', name: 'Conta Principal Empresa', number: 'PT50 1234 5678 9012 3456 7890', balance: 25420.15 },
        { id: '2', name: 'Conta Operações', number: 'PT50 1234 5678 9012 3456 7891', balance: 125000.75 },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
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

    const handleManualAdd = () => {
        const newTransfer: TransferItem = {
            id: Date.now().toString(),
            nib: '',
            name: '',
            amount: '',
            description: '',
            status: 'pending'
        };
        setTransfers(prev => [...prev, newTransfer]);
    };

    const handleTransferChange = (id: string, field: string, value: string) => {
        setTransfers(prev => prev.map(transfer => {
            if (transfer.id === id) {
                const updated = { ...transfer, [field]: value };

                if (field === 'nib' || field === 'amount') {
                    if (updated.nib && updated.amount) {
                        const nibValid = updated.nib.length === 25;
                        const amountValid = !isNaN(parseFloat(updated.amount)) && parseFloat(updated.amount) > 0;

                        if (nibValid && amountValid) {
                            updated.status = 'valid';
                            updated.error = undefined;
                        } else {
                            updated.status = 'error';
                            if (!nibValid) updated.error = 'NIB deve ter 25 caracteres';
                            else if (!amountValid) updated.error = 'Valor inválido';
                        }
                    } else {
                        updated.status = 'pending';
                        updated.error = undefined;
                    }
                }

                return updated;
            }
            return transfer;
        }));
    };

    const removeTransfer = (id: string) => {
        setTransfers(prev => prev.filter(transfer => transfer.id !== id));
    };

    const handleFileUpload = (file: File) => {
        if (!file.name.match(/\.(xlsx|xls|csv)$/)) {
            alert('Por favor, selecione um arquivo Excel ou CSV válido.');
            return;
        }

        const mockTransfers: TransferItem[] = [
            {
                id: '1',
                nib: 'PT50 9876 5432 1098 7654 3210',
                name: 'Fornecedor A LDA',
                amount: '1500.00',
                description: 'Pagamento serviços Janeiro',
                status: 'valid'
            },
            {
                id: '2',
                nib: 'PT50 1111 2222 3333 4444 5555',
                name: 'Fornecedor B SA',
                amount: '2750.50',
                description: 'Material escritório',
                status: 'valid'
            },
            {
                id: '3',
                nib: 'PT50 6666 7777 8888 9999 0000',
                name: 'Consultora C',
                amount: '4200.75',
                description: 'Consultoria Q1',
                status: 'valid'
            }
        ];

        setTransfers(mockTransfers);
        setShowImportModal(false);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const getTotalAmount = () => {
        return transfers
            .filter(t => t.status === 'valid')
            .reduce((total, transfer) => total + parseFloat(transfer.amount || '0'), 0);
    };

    const getValidTransfers = () => {
        return transfers.filter(t => t.status === 'valid');
    };

    const handleNext = () => {
        if (step === 1 && transfers.length > 0 && getValidTransfers().length > 0 && formData.fromAccount) {
            setStep(2);
        } else if (step === 2) {
            setTimeout(() => {
                setStep(3);
            }, 3000);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleNewBatch = () => {
        setStep(1);
        setTransfers([]);
        setFormData({
            fromAccount: '',
            scheduled: false,
            scheduleDate: ''
        });
        setEmailSent(false);
        setEmailData({
            email: '',
            subject: 'Extrato de Transferências Múltiplas',
            message: ''
        });
    };

    const generateBatchReference = () => {
        return `BATCH_${Date.now()}`;
    };

    const downloadPDFExtract = () => {
        const batchRef = generateBatchReference();
        const totalAmount = getTotalAmount();
        
        const pdfContent = `
            EXTRATO DE TRANSFERÊNCIAS MÚLTIPLAS
            ===================================
            
            Referência: ${batchRef}
            Data: ${new Date().toLocaleDateString('pt-PT')} ${new Date().toLocaleTimeString('pt-PT')}
            Conta Origem: ${accounts.find(acc => acc.id === formData.fromAccount)?.name}
            Total Transferências: ${getValidTransfers().length}
            Valor Total: MZN ${totalAmount.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            
            DETALHES DAS TRANSFERÊNCIAS:
            ${getValidTransfers().map((transfer, index) => `
            ${index + 1}. ${transfer.name}
               NIB: ${transfer.nib}
               Valor: MZN ${parseFloat(transfer.amount).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
               Descrição: ${transfer.description}
            `).join('')}
            
            ===================================
            Your Bank Business - Luwali Technologies
        `;

        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `extrato_transferencias_${batchRef}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('Extrato PDF descarregado com sucesso!');
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
            alert(`Extrato enviado com sucesso para: ${emailData.email}`);
        }, 2000);
    };

    const generateQRCode = () => {
        setShowQRModal(true);
    };

    const generateAPILink = () => {
        const batchRef = generateBatchReference();
        const link = `https://ibanking-ui.vercel.app/api/transfers/${batchRef}`;
        setApiLink(link);
        setShowAPIModal(true);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Link copiado para a área de transferência!');
        });
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
                            <h1 className="text-2xl font-bold text-gray-900">Transferências Múltiplas</h1>
                            <p className="text-gray-600 mt-1">Execute várias transferências de uma só vez</p>
                        </div>
                        <button
                            onClick={() => navigate('/panel')}
                            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                        >
                            Voltar ao Dashboard
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Conteúdo Principal */}
                    <div className="lg:col-span-3">
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

                            {/* Step 1: Formulário Manual */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold text-gray-900">Adicionar Transferências</h2>
                                        <button
                                            onClick={() => setShowImportModal(true)}
                                            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <span>Importar do Excel</span>
                                        </button>
                                    </div>

                                    {transfers.length === 0 ? (
                                        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-2xl">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Comece a adicionar transferências</h3>
                                            <p className="text-gray-600 mb-4">Adicione transferências manualmente ou importe de um ficheiro Excel</p>
                                            <button
                                                onClick={handleManualAdd}
                                                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                            >
                                                Adicionar Primeira Transferência
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {transfers.map((transfer, index) => (
                                                <div
                                                    key={transfer.id}
                                                    className={`p-4 rounded-xl border-2 transition-colors ${transfer.status === 'valid'
                                                        ? 'border-green-200 bg-green-50'
                                                        : transfer.status === 'error'
                                                            ? 'border-red-200 bg-red-50'
                                                            : 'border-gray-200'
                                                        }`}
                                                >
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex items-center space-x-3">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${transfer.status === 'valid'
                                                                ? 'bg-green-100 text-green-600'
                                                                : transfer.status === 'error'
                                                                    ? 'bg-red-100 text-red-600'
                                                                    : 'bg-gray-100 text-gray-600'
                                                                }`}>
                                                                {index + 1}
                                                            </div>
                                                            <div>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Nome do beneficiário"
                                                                    value={transfer.name}
                                                                    onChange={(e) => handleTransferChange(transfer.id, 'name', e.target.value)}
                                                                    className="font-semibold bg-transparent border-none focus:ring-0 p-0 placeholder-gray-400"
                                                                />
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => removeTransfer(transfer.id)}
                                                            className="text-gray-400 hover:text-red-600 transition-colors"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">NIB</label>
                                                            <input
                                                                type="text"
                                                                placeholder="PT50 XXXX XXXX XXXX XXXX XXXX"
                                                                value={transfer.nib}
                                                                onChange={(e) => handleTransferChange(transfer.id, 'nib', e.target.value)}
                                                                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 ${transfer.status === 'error' ? 'border-red-300' : 'border-gray-300'
                                                                    }`}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Valor (MZN)</label>
                                                            <input
                                                                type="number"
                                                                placeholder="0,00"
                                                                step="0.01"
                                                                value={transfer.amount}
                                                                onChange={(e) => handleTransferChange(transfer.id, 'amount', e.target.value)}
                                                                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 ${transfer.status === 'error' ? 'border-red-300' : 'border-gray-300'
                                                                    }`}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mt-3">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Descrição da transferência"
                                                            value={transfer.description}
                                                            onChange={(e) => handleTransferChange(transfer.id, 'description', e.target.value)}
                                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                                                        />
                                                    </div>

                                                    {transfer.error && (
                                                        <div className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <span>{transfer.error}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}

                                            <button
                                                onClick={handleManualAdd}
                                                className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-red-300 hover:text-red-600 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                <span className="font-semibold">Adicionar Outra Transferência</span>
                                            </button>

                                            <div className="flex space-x-4 pt-6 border-t border-gray-200">
                                                <button
                                                    onClick={() => navigate('panel')}
                                                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    onClick={handleNext}
                                                    disabled={getValidTransfers().length === 0 || !formData.fromAccount}
                                                    className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    Continuar ({getValidTransfers().length} transferências)
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 2: Confirmação */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Confirmar Transferências Múltiplas</h2>

                                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Conta de Origem:</span>
                                            <span className="font-semibold">
                                                {accounts.find(acc => acc.id === formData.fromAccount)?.name}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Número de Transferências:</span>
                                            <span className="font-semibold">{getValidTransfers().length}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Valor Total:</span>
                                            <span className="font-semibold text-red-600 text-lg">
                                                MZN {getTotalAmount().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                        {formData.scheduled && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Data programada:</span>
                                                <span className="font-semibold">
                                                    {new Date(formData.scheduleDate).toLocaleDateString('pt-PT')}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="font-semibold text-gray-900">Transferências a processar:</h3>
                                        {getValidTransfers().map((transfer) => (
                                            <div key={transfer.id} className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg">
                                                <div>
                                                    <div className="font-medium">{transfer.name}</div>
                                                    <div className="text-sm text-gray-500">{transfer.nib}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-semibold">MZN {parseFloat(transfer.amount).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</div>
                                                    <div className="text-sm text-gray-500">{transfer.description}</div>
                                                </div>
                                            </div>
                                        ))}
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
                                            Confirmar Transferências
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
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Transferências Processadas!</h2>
                                        <p className="text-gray-600">
                                            O lote com <strong>{getValidTransfers().length} transferências</strong> no valor total de{' '}
                                            <strong>MZN {getTotalAmount().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</strong> foi processado com sucesso.
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Referência do Lote:</span>
                                            <span className="font-mono">{generateBatchReference()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Data:</span>
                                            <span>{new Date().toLocaleDateString('pt-PT')} {new Date().toLocaleTimeString('pt-PT')}</span>
                                        </div>
                                    </div>

                                    {/* Novas Opções de Extrato */}
                                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Opções de Extrato</h3>
                                        
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
                                                    <div className="text-sm text-gray-600">Baixar extrato em formato PDF</div>
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
                                                    <div className="text-sm text-gray-600">Receber extrato no seu email</div>
                                                </div>
                                            </button>

                                            {/* QR Code */}
                                            <button
                                                onClick={generateQRCode}
                                                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-left"
                                            >
                                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">Gerar QR Code</div>
                                                    <div className="text-sm text-gray-600">Código para partilha rápida</div>
                                                </div>
                                            </button>

                                            {/* API Integration */}
                                            <button
                                                onClick={generateAPILink}
                                                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left"
                                            >
                                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">Integração API</div>
                                                    <div className="text-sm text-gray-600">Partilhar dados via API</div>
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
                                            onClick={handleNewBatch}
                                            className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                        >
                                            Novo Lote
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Conta de Origem */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conta de Origem</h3>
                            <select
                                name="fromAccount"
                                value={formData.fromAccount}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            >
                                <option value="">Selecione a conta</option>
                                {accounts.map(account => (
                                    <option key={account.id} value={account.id}>
                                        {account.name} - MZN {account.balance.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                                    </option>
                                ))}
                            </select>

                            <div className="mt-4 space-y-3">
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        name="scheduled"
                                        checked={formData.scheduled}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                    />
                                    <label className="text-sm text-gray-700">
                                        Programar transferências
                                    </label>
                                </div>

                                {formData.scheduled && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Data de Execução
                                        </label>
                                        <input
                                            type="date"
                                            name="scheduleDate"
                                            value={formData.scheduleDate}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Resumo */}
                        {step === 1 && transfers.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total de Transferências:</span>
                                        <span className="font-semibold">{transfers.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Válidas:</span>
                                        <span className="font-semibold text-green-600">{getValidTransfers().length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Com Erros:</span>
                                        <span className="font-semibold text-red-600">
                                            {transfers.filter(t => t.status === 'error').length}
                                        </span>
                                    </div>
                                    <div className="border-t pt-3">
                                        <div className="flex justify-between text-lg">
                                            <span className="font-semibold">Valor Total:</span>
                                            <span className="font-bold text-red-600">
                                                MZN {getTotalAmount().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de Importação */}
            <Modal isOpen={showImportModal} onClose={() => setShowImportModal(false)} title="Importar do Excel">
                <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                            Selecione um ficheiro Excel (.xlsx, .xls) ou CSV
                        </p>
                        <input
                            type="file"
                            id="file-upload-modal"
                            accept=".xlsx,.xls,.csv"
                            onChange={handleFileInput}
                            className="hidden"
                        />
                        <label
                            htmlFor="file-upload-modal"
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold cursor-pointer hover:bg-red-700 transition-colors"
                        >
                            Selecionar Ficheiro
                        </label>
                    </div>

                    <div className="bg-red-50 rounded-lg p-3">
                        <h4 className="font-semibold text-red-900 text-sm mb-1">Formato esperado:</h4>
                        <p className="text-red-700 text-xs">
                            Colunas: NIB (25 caracteres), Nome, Valor, Descrição (opcional)
                        </p>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={() => setShowImportModal(false)}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => {
                                alert('Template descarregado!');
                            }}
                            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                        >
                            Descarregar Template
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Modal de Email */}
            <Modal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} title="Enviar Extrato por Email">
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

            {/* Modal de QR Code */}
            <Modal isOpen={showQRModal} onClose={() => setShowQRModal(false)} title="QR Code de Partilha">
                <div className="space-y-4 text-center">
                    <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
                        <div className="text-center">
                            {/* Simulação de QR Code - em produção usar biblioteca como qrcode.react */}
                            <div className="w-48 h-48 bg-white border-4 border-gray-300 mx-auto mb-4 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-6xl mb-2">📱</div>
                                    <div className="text-xs text-gray-500">QR Code</div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">
                                Aponte a câmara para ler o código
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-blue-700 text-sm">
                            <strong>Link:</strong> https://ibanking-ui.vercel.app/
                        </p>
                    </div>

                    <button
                        onClick={() => copyToClipboard('https://ibanking-ui.vercel.app/')}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                        Copiar Link
                    </button>
                </div>
            </Modal>

            {/* Modal de API */}
            <Modal isOpen={showAPIModal} onClose={() => setShowAPIModal(false)} title="Integração API">
                <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-900 mb-2">Link da API</h4>
                        <p className="text-purple-700 text-sm break-all bg-white p-2 rounded border">
                            {apiLink}
                        </p>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-3">
                        <h4 className="font-semibold text-yellow-900 text-sm mb-1">Como usar:</h4>
                        <ul className="text-yellow-700 text-xs space-y-1">
                            <li>• Use este link para integração com sistemas externos</li>
                            <li>• O link contém todos os dados do lote de transferências</li>
                            <li>• Compatível com REST API</li>
                        </ul>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={() => setShowAPIModal(false)}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Fechar
                        </button>
                        <button
                            onClick={() => copyToClipboard(apiLink)}
                            className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                        >
                            Copiar Link
                        </button>
                    </div>
                </div>
            </Modal>

        </BusinessLayout>
    );
};

export default BusinessMultipleTransfers;