// pages/BusinessPanel.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Componente para o conteúdo do dashboard empresarial
const BusinessDashboardContent: React.FC = () => {
  const navigate = useNavigate();

  const [quickActions] = useState([
    {
      title: 'Transferências',
      description: 'Realizar transferências',
      icon: '↗️',
      color: 'bg-red-50 text-red-600',
      path: '/business/transfers'
    },
    {
      title: 'Pagamentos',
      description: 'Fornecedores e salários',
      icon: '💰',
      color: 'bg-green-50 text-green-600',
      path: '/business/payments'
    },
    {
      title: 'Faturação',
      description: 'Gestão de faturas',
      icon: '🧾',
      color: 'bg-purple-50 text-purple-600',
      path: '/business/invoicing'
    },
    {
      title: 'Relatórios',
      description: 'Relatórios financeiros',
      icon: '📊',
      color: 'bg-orange-50 text-orange-600',
      path: '/business/reports'
    },
  ]);

  const [recentTransactions] = useState([
    { id: 1, description: 'Pagamento Fornecedor - Tech Lda', amount: -2500.00, date: '15/12/2023', type: 'debit', category: 'supplier' },
    { id: 2, description: 'Transferência recebida - Cliente XYZ', amount: 8500.00, date: '14/12/2023', type: 'credit', category: 'revenue' },
    { id: 3, description: 'Pagamento Salários', amount: -15200.00, date: '13/12/2023', type: 'debit', category: 'salaries' },
    { id: 4, description: 'Fatura Eletricidade', amount: -450.80, date: '12/12/2023', type: 'debit', category: 'utilities' },
    { id: 5, description: 'Venda Produto A', amount: 3200.00, date: '11/12/2023', type: 'credit', category: 'revenue' },
    { id: 6, description: 'Pagamento Aluguer', amount: -1800.00, date: '10/12/2023', type: 'debit', category: 'rent' },
  ]);

  const [businessAccounts] = useState([
    { name: 'Conta Corrente Empresa', number: 'PT50 1234 5678 9012 3456 7890', balance: 85420.15, type: 'current' },
    { name: 'Conta de Investimento', number: 'PT50 1234 5678 9012 3456 7891', balance: 125000.75, type: 'investment' },
    { name: 'Fundo de Maneio', number: 'PT50 1234 5678 9012 3456 7892', balance: 25000.30, type: 'operational' },
  ]);

  const [financialOverview] = useState({
    totalRevenue: 125000,
    totalExpenses: 87500,
    pendingInvoices: 15200,
    cashFlow: 37500
  });

  const handleQuickAction = (path: string) => {
    navigate(path);
  };

  const getTransactionIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      supplier: '🏢',
      revenue: '💸',
      salaries: '👥',
      utilities: '⚡',
      rent: '🏠'
    };
    return icons[category] || '💼';
  };

  return (
    <div className="space-y-6">
      {/* Header do Dashboard Empresarial */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bem-vindo, Luwali Technologies, LDA!</h1>
            <p className="text-gray-600 mt-1">Visão geral das suas finanças empresariais</p>
          </div>
          <div className="mt-4 lg:mt-0 flex items-center space-x-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Conta ativa
            </span>
            <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
              Suporte Empresarial
            </button>
          </div>
        </div>
      </div>

      {/* Saldo Total Empresarial */}
      <div className="bg-linear-to-r from-red-500 to-red-600 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-red-100">Saldo Total Empresarial</p>
            <p className="text-3xl font-bold mt-2">MZN 235.421,20</p>
            <p className="text-red-100 text-sm mt-1">Última atualização: hoje às 14:30</p>
          </div>
          <div className="flex space-x-2">
            <button className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors">
              Extrato Detalhado
            </button>
            <button
              onClick={() => navigate('/business/transfers')}
              className="bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-800 transition-colors"
            >
              Nova Transferência
            </button>
          </div>
        </div>
      </div>

      {/* Visão Geral Financeira */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Receitas Totais</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">MZN {financialOverview.totalRevenue.toLocaleString('pt-PT')}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">+12% vs último mês</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Despesas Totais</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">MZN {financialOverview.totalExpenses.toLocaleString('pt-PT')}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📉</span>
            </div>
          </div>
          <p className="text-xs text-red-600 mt-2">-5% vs último mês</p>
        </div>

        

        
      </div>

      {/* Ações Rápidas e Contas Empresariais - Lado a Lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ações Rápidas Empresariais */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Operações Empresariais</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.path)}
                className="flex flex-col items-center p-4 rounded-xl border border-gray-100 hover:border-red-200 hover:bg-red-50 transition-all duration-200 group"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl mb-2 ${action.color}`}>
                  {action.icon}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900 group-hover:text-red-600 text-sm">{action.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Contas Empresariais */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Contas Empresariais</h2>
            <button className="text-red-600 text-sm font-medium hover:text-red-700">
              Gerir contas
            </button>
          </div>
          <div className="space-y-4">
            {businessAccounts.map((account, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${account.type === 'current' ? 'bg-red-100 text-red-600' :
                    account.type === 'investment' ? 'bg-green-100 text-green-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                    {account.type === 'current' ? '🏦' : account.type === 'investment' ? '📈' : '⚡'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{account.name}</p>
                    <p className="text-xs text-gray-500">{account.number.slice(0, 8)}...</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 text-sm">MZN {account.balance.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</p>
                  <p className="text-xs text-gray-500">Disponível</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transações Recentes Empresariais */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Movimentos Recentes</h2>
          <button className="text-red-600 text-sm font-medium hover:text-red-700">
            Ver extrato completo
          </button>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                  {getTransactionIcon(transaction.category)}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{transaction.description}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className={`font-semibold text-sm ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                {transaction.type === 'credit' ? '+' : '-'}MZN {Math.abs(transaction.amount).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operadores e Acessos */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Gestão de Operadores</h2>
          <button
            onClick={() => navigate('/business/operators')}
            className="text-red-600 text-sm font-medium hover:text-red-700"
          >
            Gerir operadores
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-red-600 text-xl">👤</span>
            </div>
            <p className="font-semibold text-gray-900">5 Operadores</p>
            <p className="text-sm text-gray-600">Ativos</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 text-xl">🔒</span>
            </div>
            <p className="font-semibold text-gray-900">3 Níveis de Acesso</p>
            <p className="text-sm text-gray-600">Configurados</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600 text-xl">📋</span>
            </div>
            <p className="font-semibold text-gray-900">Última Atividade</p>
            <p className="text-sm text-gray-600">Hoje 09:45</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboardContent;