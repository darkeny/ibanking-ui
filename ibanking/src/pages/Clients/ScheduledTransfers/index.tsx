// components/ScheduledTransfers.tsx
import React, { useState } from 'react';
import {
    CiCalendar,
    CiTrash,
    CiWarning,
    CiCircleCheck,
    CiClock2
} from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { ClientLayout } from '../../../components/ClientLayout';

interface ScheduledTransfer {
    id: string;
    type: 'wallet' | 'bank' | 'international' | 'supplier';
    description: string;
    totalAmount: number;
    provider?: 'mpesa' | 'emola' | 'mkesh';
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    nextExecution: string;
    status: 'active' | 'deleted';
    createdAt: string;
    recipients: number;
    deletedAt?: string;
    transactions?: Transaction[];
    bankName?: string;
    accountNumber?: string;
    iban?: string;
    beneficiary?: string;
}

interface Transaction {
    id: string;
    phoneNumber?: string;
    accountNumber?: string;
    beneficiary?: string;
    amount: number;
    provider?: 'mpesa' | 'emola' | 'mkesh';
    bankName?: string;
    status: 'pending' | 'completed' | 'failed';
}

interface ScheduledTransfersProps {
    language: 'PT' | 'EN';
}

const ScheduledTransfers: React.FC<ScheduledTransfersProps> = ({ language }) => {
    const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
    const [selectedTransfer, setSelectedTransfer] = useState<ScheduledTransfer | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [transferToDelete, setTransferToDelete] = useState<string | null>(null);

    // Dados de exemplo para transferências agendadas
    const [scheduledTransfers, setScheduledTransfers] = useState<ScheduledTransfer[]>([
        {
            id: 'ST001',
            type: 'wallet',
            description: 'Pagamento Mensal - Fornecedor',
            totalAmount: 15000,
            provider: 'mpesa',
            frequency: 'monthly',
            nextExecution: '2024-02-15',
            status: 'active',
            createdAt: '2024-01-15',
            recipients: 1,
            transactions: [
                {
                    id: 'T001',
                    phoneNumber: '82 123 4567',
                    amount: 15000,
                    provider: 'mpesa',
                    status: 'pending'
                }
            ]
        },
        {
            id: 'ST002',
            type: 'bank',
            description: 'Salários - Equipe',
            totalAmount: 75000,
            frequency: 'monthly',
            nextExecution: '2024-02-28',
            status: 'active',
            createdAt: '2024-01-20',
            recipients: 5,
            bankName: 'Standard Bank',
            transactions: [
                {
                    id: 'T002',
                    accountNumber: '1234567890',
                    beneficiary: 'João Silva',
                    amount: 25000,
                    bankName: 'Standard Bank',
                    status: 'pending'
                },
                {
                    id: 'T003',
                    accountNumber: '0987654321',
                    beneficiary: 'Maria Santos',
                    amount: 20000,
                    bankName: 'Standard Bank',
                    status: 'pending'
                }
            ]
        },
        {
            id: 'ST003',
            type: 'international',
            description: 'Pagamento Fornecedor Internacional',
            totalAmount: 50000,
            frequency: 'monthly',
            nextExecution: '2024-02-10',
            status: 'active',
            createdAt: '2024-01-10',
            recipients: 1,
            bankName: 'Deutsche Bank',
            iban: 'DE89370400440532013000',
            beneficiary: 'Global Suppliers GmbH'
        },
        {
            id: 'ST004',
            type: 'supplier',
            description: 'Pagamento Fornecedor Local',
            totalAmount: 30000,
            frequency: 'weekly',
            nextExecution: '2024-02-05',
            status: 'active',
            createdAt: '2024-01-08',
            recipients: 1,
            bankName: 'BCI',
            accountNumber: '1122334455',
            beneficiary: 'Fornecedor ABC Lda'
        },
        {
            id: 'ST005',
            type: 'wallet',
            description: 'Transferência para Funcionário',
            totalAmount: 8000,
            provider: 'emola',
            frequency: 'daily',
            nextExecution: '2024-01-25',
            status: 'deleted',
            createdAt: '2024-01-20',
            deletedAt: '2024-01-22',
            recipients: 1
        },
        {
            id: 'ST006',
            type: 'bank',
            description: 'Pagamento Aluguel',
            totalAmount: 25000,
            frequency: 'monthly',
            nextExecution: '2024-01-30',
            status: 'deleted',
            createdAt: '2023-12-15',
            deletedAt: '2024-01-10',
            recipients: 1,
            bankName: 'Millennium BIM',
            accountNumber: '9988776655',
            beneficiary: 'Senhorio Imobiliária'
        }
    ]);

    const texts = {
        PT: {
            title: 'Transferências Agendadas',
            subtitle: 'Visualize e gerencie todas as suas transferências agendadas',
            active: 'Ativas',
            history: 'Histórico',
            noTransfers: 'Nenhuma transferência encontrada',
            createNew: 'Nova Transferência',
            transferDetails: 'Detalhes da Transferência',
            description: 'Descrição',
            type: 'Tipo',
            wallet: 'Carteira Digital',
            bank: 'Transferência Bancária',
            international: 'Transferência Internacional',
            supplier: 'Pagamento Fornecedor',
            totalAmount: 'Valor Total',
            provider: 'Operadora',
            frequency: 'Frequência',
            nextExecution: 'Próxima Execução',
            status: 'Status',
            createdAt: 'Criada em',
            deletedAt: 'Eliminada em',
            recipients: 'Destinatários',
            actions: 'Ações',
            viewDetails: 'Ver Detalhes',
            delete: 'Eliminar',
            confirmDelete: 'Confirmar Eliminação',
            deleteMessage: 'Tem certeza que deseja eliminar esta transferência agendada? Esta ação não pode ser desfeita.',
            confirm: 'Confirmar',
            cancelDelete: 'Cancelar',
            deleteSuccess: 'Transferência eliminada com sucesso!',
            daily: 'Diária',
            weekly: 'Semanal',
            monthly: 'Mensal',
            yearly: 'Anual',
            activeStatus: 'Ativa',
            deletedStatus: 'Eliminada',
            mpesa: 'MPesa',
            emola: 'E-mola',
            mkesh: 'M-Kesh',
            transactions: 'Transações',
            phoneNumber: 'Número de Telemóvel',
            accountNumber: 'Número de Conta',
            beneficiary: 'Beneficiário',
            amount: 'Valor',
            transactionStatus: 'Estado',
            pending: 'Pendente',
            completed: 'Concluída',
            failed: 'Falhada',
            bankName: 'Nome do Banco',
            iban: 'IBAN',
            activeTransfers: 'Transferências Ativas',
            deletedTransfers: 'Transferências Eliminadas'
        },
        EN: {
            title: 'Scheduled Transfers',
            subtitle: 'View and manage all your scheduled transfers',
            active: 'Active',
            history: 'History',
            noTransfers: 'No transfers found',
            createNew: 'New Transfer',
            transferDetails: 'Transfer Details',
            description: 'Description',
            type: 'Type',
            wallet: 'Digital Wallet',
            bank: 'Bank Transfer',
            international: 'International Transfer',
            supplier: 'Supplier Payment',
            totalAmount: 'Total Amount',
            provider: 'Provider',
            frequency: 'Frequency',
            nextExecution: 'Next Execution',
            status: 'Status',
            createdAt: 'Created At',
            deletedAt: 'Deleted At',
            recipients: 'Recipients',
            actions: 'Actions',
            viewDetails: 'View Details',
            delete: 'Delete',
            confirmDelete: 'Confirm Deletion',
            deleteMessage: 'Are you sure you want to delete this scheduled transfer? This action cannot be undone.',
            confirm: 'Confirm',
            cancelDelete: 'Cancel',
            deleteSuccess: 'Transfer deleted successfully!',
            daily: 'Daily',
            weekly: 'Weekly',
            monthly: 'Monthly',
            yearly: 'Yearly',
            activeStatus: 'Active',
            deletedStatus: 'Deleted',
            mpesa: 'MPesa',
            emola: 'E-mola',
            mkesh: 'M-Kesh',
            transactions: 'Transactions',
            phoneNumber: 'Phone Number',
            accountNumber: 'Account Number',
            beneficiary: 'Beneficiary',
            amount: 'Amount',
            transactionStatus: 'Status',
            pending: 'Pending',
            completed: 'Completed',
            failed: 'Failed',
            bankName: 'Bank Name',
            iban: 'IBAN',
            activeTransfers: 'Active Transfers',
            deletedTransfers: 'Deleted Transfers'
        }
    };

    const t = texts[language];

    // Filtrar transferências por aba
    const filteredTransfers = scheduledTransfers.filter(transfer => 
        activeTab === 'active' ? transfer.status === 'active' : transfer.status === 'deleted'
    );

    // Obter texto do status
    const getStatusText = (status: string) => {
        switch (status) {
            case 'active': return t.activeStatus;
            case 'deleted': return t.deletedStatus;
            default: return status;
        }
    };

    // Obter cor do status
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'deleted': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Obter ícone do status
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <CiCircleCheck className="text-green-600" size={16} />;
            case 'deleted': return <CiTrash className="text-red-600" size={16} />;
            default: return <CiClock2 className="text-gray-600" size={16} />;
        }
    };

    // Obter texto da frequência
    const getFrequencyText = (frequency: string) => {
        switch (frequency) {
            case 'daily': return t.daily;
            case 'weekly': return t.weekly;
            case 'monthly': return t.monthly;
            case 'yearly': return t.yearly;
            default: return frequency;
        }
    };

    // Obter texto do tipo
    const getTypeText = (type: string) => {
        switch (type) {
            case 'wallet': return t.wallet;
            case 'bank': return t.bank;
            case 'international': return t.international;
            case 'supplier': return t.supplier;
            default: return type;
        }
    };

    // Obter texto do provedor
    const getProviderText = (provider: string) => {
        switch (provider) {
            case 'mpesa': return t.mpesa;
            case 'emola': return t.emola;
            case 'mkesh': return t.mkesh;
            default: return provider;
        }
    };

    // Obter ícone para o tipo de transferência
    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'wallet': return '📱';
            case 'bank': return '🏦';
            case 'international': return '🌍';
            case 'supplier': return '👥';
            default: return '💸';
        }
    };

    // Obter cor do card baseado no tipo (agora usando cores mais suaves)
    const getCardColor = (type: string) => {
        switch (type) {
            case 'wallet': return 'border border-blue-200 bg-white';
            case 'bank': return 'border border-green-200 bg-white';
            case 'international': return 'border border-purple-200 bg-white';
            case 'supplier': return 'border border-orange-200 bg-white';
            default: return 'border border-gray-200 bg-white';
        }
    };

    const handleDelete = (transferId: string) => {
        setTransferToDelete(transferId);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (transferToDelete) {
            setScheduledTransfers(prev =>
                prev.map(transfer =>
                    transfer.id === transferToDelete 
                        ? { ...transfer, status: 'deleted', deletedAt: new Date().toISOString().split('T')[0] }
                        : transfer
                )
            );
            setShowDeleteModal(false);
            setTransferToDelete(null);
            alert(t.deleteSuccess);
        }
    };

    const handleCreateNew = () => {
        window.location.href = '/business/transfers/digital-wallet';
    };

    return (
        <ClientLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-gray-100 rounded-xl">
                                <CiCalendar size={32} className="text-gray-700" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
                                <p className="text-gray-600 text-lg">{t.subtitle}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleCreateNew}
                            className="bg-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            {t.createNew}
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            {(['active', 'history'] as const).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-3 px-4 border-b-2 font-semibold text-lg transition-all duration-200 ${
                                        activeTab === tab
                                            ? 'border-red-500 text-red-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {t[tab]}
                                    <span className={`ml-3 py-1 px-3 rounded-full text-sm font-medium ${
                                        activeTab === tab
                                            ? 'bg-red-100 text-red-600'
                                            : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {scheduledTransfers.filter(t => 
                                            tab === 'active' ? t.status === 'active' : t.status === 'deleted'
                                        ).length}
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Conteúdo das Abas */}
                <div>
                    {/* Cabeçalho da Seção */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {activeTab === 'active' ? t.activeTransfers : t.deletedTransfers}
                        </h2>
                        <p className="text-gray-600">
                            {activeTab === 'active' 
                                ? (language === 'PT' 
                                    ? 'Transferências agendadas ativas no sistema'
                                    : 'Active scheduled transfers in the system')
                                : (language === 'PT'
                                    ? 'Histórico de transferências agendadas eliminadas'
                                    : 'History of deleted scheduled transfers')
                            }
                        </p>
                    </div>

                    {/* Lista de Transferências */}
                    <div className="grid gap-6">
                        {filteredTransfers.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-16 text-center">
                                <CiCalendar size={64} className="text-gray-300 mx-auto mb-6" />
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    {t.noTransfers}
                                </h3>
                                <p className="text-gray-500 text-lg max-w-md mx-auto">
                                    {activeTab === 'active'
                                        ? (language === 'PT'
                                            ? 'Não há transferências agendadas ativas no momento.'
                                            : 'There are no active scheduled transfers at the moment.')
                                        : (language === 'PT'
                                            ? 'Nenhuma transferência foi eliminada ainda.'
                                            : 'No transfers have been deleted yet.')
                                    }
                                </p>
                            </div>
                        ) : (
                            filteredTransfers.map(transfer => (
                                <div 
                                    key={transfer.id} 
                                    className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:shadow-md ${getCardColor(transfer.type)}`}
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex-1">
                                            {/* Header do Card */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center space-x-4">
                                                    <span className="text-3xl">{getTypeIcon(transfer.type)}</span>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900">
                                                            {transfer.description}
                                                        </h3>
                                                        <div className="flex items-center space-x-2 mt-1">
                                                            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(transfer.status)}`}>
                                                                {getStatusIcon(transfer.status)}
                                                                <span>{getStatusText(transfer.status)}</span>
                                                            </span>
                                                            <span className="text-sm text-gray-500">
                                                                {getTypeText(transfer.type)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-gray-900 mb-1">
                                                        {transfer.totalAmount.toLocaleString()} MT
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {getFrequencyText(transfer.frequency)}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Informações Principais */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                                                <div className="space-y-2">
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-500">{t.nextExecution}:</span>
                                                        <p className="text-lg font-semibold text-gray-900">
                                                            {new Date(transfer.nextExecution).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-500">{t.recipients}:</span>
                                                        <p className="text-lg font-semibold text-gray-900">{transfer.recipients}</p>
                                                    </div>
                                                </div>

                                                {transfer.provider && (
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-500">{t.provider}:</span>
                                                        <p className="text-lg font-semibold text-gray-900">{getProviderText(transfer.provider)}</p>
                                                    </div>
                                                )}

                                                {transfer.bankName && (
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-500">{t.bankName}:</span>
                                                        <p className="text-lg font-semibold text-gray-900">{transfer.bankName}</p>
                                                    </div>
                                                )}

                                                <div>
                                                    <span className="text-sm font-medium text-gray-500">{t.createdAt}:</span>
                                                    <p className="text-lg font-semibold text-gray-900">
                                                        {new Date(transfer.createdAt).toLocaleDateString()}
                                                    </p>
                                                    {transfer.deletedAt && (
                                                        <>
                                                            <span className="text-sm font-medium text-gray-500 mt-2 block">{t.deletedAt}:</span>
                                                            <p className="text-lg font-semibold text-gray-900">
                                                                {new Date(transfer.deletedAt).toLocaleDateString()}
                                                            </p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Informações Adicionais */}
                                            {(transfer.beneficiary || transfer.accountNumber || transfer.iban) && (
                                                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                        {transfer.beneficiary && (
                                                            <div>
                                                                <span className="text-sm font-medium text-gray-500">{t.beneficiary}:</span>
                                                                <p className="font-semibold text-gray-900">{transfer.beneficiary}</p>
                                                            </div>
                                                        )}
                                                        {transfer.accountNumber && (
                                                            <div>
                                                                <span className="text-sm font-medium text-gray-500">{t.accountNumber}:</span>
                                                                <p className="font-semibold text-gray-900">{transfer.accountNumber}</p>
                                                            </div>
                                                        )}
                                                        {transfer.iban && (
                                                            <div>
                                                                <span className="text-sm font-medium text-gray-500">{t.iban}:</span>
                                                                <p className="font-semibold text-gray-900">{transfer.iban}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Ações */}
                                        <div className="flex items-center space-x-2 ml-6">
                                            <button
                                                onClick={() => setSelectedTransfer(selectedTransfer?.id === transfer.id ? null : transfer)}
                                                className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all duration-200"
                                                title={t.viewDetails}
                                            >
                                                <MdOutlineKeyboardArrowDown size={24} />
                                            </button>

                                            {activeTab === 'active' && (
                                                <button
                                                    onClick={() => handleDelete(transfer.id)}
                                                    className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                                                    title={t.delete}
                                                >
                                                    <CiTrash size={24} />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Detalhes Expandidos */}
                                    {selectedTransfer?.id === transfer.id && transfer.transactions && (
                                        <div className="border-t border-gray-200 pt-6 mt-6">
                                            <h4 className="text-lg font-bold text-gray-900 mb-4">{t.transactions}</h4>
                                            <div className="space-y-4">
                                                {transfer.transactions.map(transaction => (
                                                    <div key={transaction.id} className="bg-white border border-gray-200 rounded-xl p-4">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                                            {transaction.phoneNumber && (
                                                                <div>
                                                                    <span className="text-sm font-medium text-gray-500">{t.phoneNumber}:</span>
                                                                    <p className="font-semibold text-gray-900">{transaction.phoneNumber}</p>
                                                                </div>
                                                            )}
                                                            {transaction.accountNumber && (
                                                                <div>
                                                                    <span className="text-sm font-medium text-gray-500">{t.accountNumber}:</span>
                                                                    <p className="font-semibold text-gray-900">{transaction.accountNumber}</p>
                                                                </div>
                                                            )}
                                                            {transaction.beneficiary && (
                                                                <div>
                                                                    <span className="text-sm font-medium text-gray-500">{t.beneficiary}:</span>
                                                                    <p className="font-semibold text-gray-900">{transaction.beneficiary}</p>
                                                                </div>
                                                            )}
                                                            <div>
                                                                <span className="text-sm font-medium text-gray-500">{t.amount}:</span>
                                                                <p className="font-semibold text-gray-900">{transaction.amount.toLocaleString()} MT</p>
                                                            </div>
                                                            {transaction.provider && (
                                                                <div>
                                                                    <span className="text-sm font-medium text-gray-500">{t.provider}:</span>
                                                                    <p className="font-semibold text-gray-900">{getProviderText(transaction.provider)}</p>
                                                                </div>
                                                            )}
                                                            {transaction.bankName && (
                                                                <div>
                                                                    <span className="text-sm font-medium text-gray-500">{t.bankName}:</span>
                                                                    <p className="font-semibold text-gray-900">{transaction.bankName}</p>
                                                                </div>
                                                            )}
                                                            <div>
                                                                <span className="text-sm font-medium text-gray-500">{t.transactionStatus}:</span>
                                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                                    transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                                    transaction.status === 'failed' ? 'bg-red-100 text-red-800' :
                                                                    'bg-yellow-100 text-yellow-800'
                                                                }`}>
                                                                    {transaction.status === 'completed' ? t.completed :
                                                                     transaction.status === 'failed' ? t.failed : t.pending}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Modal de Confirmação de Eliminação */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="p-3 bg-red-100 rounded-xl">
                                    <CiWarning className="text-red-600" size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {t.confirmDelete}
                                    </h3>
                                    <p className="text-gray-600 mt-2">
                                        {t.deleteMessage}
                                    </p>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 bg-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 transition-all duration-200"
                                >
                                    {t.confirm}
                                </button>
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                                >
                                    {t.cancelDelete}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ClientLayout>
    );
};

export default ScheduledTransfers;