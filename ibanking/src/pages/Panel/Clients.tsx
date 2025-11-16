// pages/Panel.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreditCard from '../../components/CreditCard';
import AddNewCard from '../../components/AddNewCard';

// Componente para o conteúdo do dashboard
const DashboardContent: React.FC = () => {
  const navigate = useNavigate();
  const [quickActions] = useState([
    {
      title: 'Transferência Imediata',
      description: 'Envie dinheiro agora',
      icon: '↗️',
      color: 'bg-blue-50 text-blue-600',
      path: '/client/transfers'
    },
    {
      title: 'Pagamentos',
      description: 'Pague serviços',
      icon: '💰',
      color: 'bg-green-50 text-green-600',
      path: '/client/payments'
    },
    {
      title: 'Cartões',
      description: 'Gerir cartões',
      icon: '💳',
      color: 'bg-purple-50 text-purple-600',
      path: '/client/cards'
    },
    {
      title: 'Investir',
      description: 'Aplicações financeiras',
      icon: '📈',
      color: 'bg-orange-50 text-orange-600',
      path: '/client/investments'
    },
  ]);

  const [recentTransactions] = useState([
    { id: 1, description: 'Supermercado Continente', amount: -125.40, date: '15/12/2023', type: 'debit' },
    { id: 2, description: 'Transferência recebida - Maria Silva', amount: 300.00, date: '14/12/2023', type: 'credit' },
    { id: 3, description: 'Fatura Luz EDP', amount: -45.20, date: '13/12/2023', type: 'debit' },
    { id: 4, description: 'Depósito ATM', amount: 200.00, date: '12/12/2023', type: 'credit' },
    { id: 5, description: 'Netflix', amount: -15.99, date: '11/12/2023', type: 'debit' },
    { id: 6, description: 'Salário', amount: 2500.00, date: '10/12/2023', type: 'credit' },
  ]);

  const [accounts] = useState([
    { name: 'Conta Principal', number: 'PT50 1234 5678 9012 3456 7890', balance: 450920.15, type: 'current' },
  ]);

  const handleQuickAction = (path: string) => {
    navigate(path);
  };

  return (
    <div className="space-y-6">
      {/* Header do Dashboard */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta, Darken!</h1>
            <p className="text-gray-600 mt-1">Aqui está o resumo das suas finanças</p>
          </div>
          <div className="mt-4 lg:mt-0 flex items-center space-x-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Conta ativa
            </span>
            <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
              Solicitar Apoio
            </button>
          </div>
        </div>
      </div>

      {/* Saldo Total */}
      <div className="bg-linear-to-r from-red-500 to-red-600 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-red-100">Saldo Total Disponível</p>
            <p className="text-3xl font-bold mt-2">MZN 450920,15</p>
            <p className="text-red-100 text-sm mt-1">Última atualização: hoje às 08:30</p>
          </div>
          <div className="flex space-x-2">
            <button className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors">
              Ver Movimentos
            </button>
            <button
              onClick={() => navigate('/client/transfers')}
              className="bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-800 transition-colors"
            >
              Transferir
            </button>
          </div>
        </div>
      </div>

      {/* Ações Rápidas e Minhas Contas - Lado a Lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ações Rápidas */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
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

        {/* Minhas Contas */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Minhas Contas</h2>
            <button className="text-red-600 text-sm font-medium hover:text-red-700">
              Ver todas
            </button>
          </div>
          <div className="space-y-4">
            {accounts.map((account, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${account.type === 'current' ? 'bg-blue-100 text-blue-600' :
                    account.type === 'savings' ? 'bg-green-100 text-green-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                    {account.type === 'current' ? '🏦' : account.type === 'savings' ? '💰' : '📈'}
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

      {/* Transações Recentes - Largura Total */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Transações Recentes</h2>
          <button className="text-red-600 text-sm font-medium hover:text-red-700">
            Ver movimento completo
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                  {transaction.type === 'credit' ? '↓' : '↑'}
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

      {/* Cartões */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Meus Cartões</h2>
          <button className="text-red-600 text-sm font-medium hover:text-red-700">
            Gerir cartões
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Cartão Principal */}
          <CreditCard
            type="primary"
            cardNumber="•••• •••• •••• 8588"
            holderName="Darken Machava"
            expiryDate="12/26"
          />

          {/* Cartão de Crédito */}
          <CreditCard
            type="credit"
            cardNumber="•••• •••• •••• 1284"
            holderName="Darken Machava"
            expiryDate="12/27"
            limit={5000}
            used={1245.30}
          />

          {/* Novo Cartão */}
          <AddNewCard
            onClick={() => console.log('Solicitar novo cartão')}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;