// pages/ClientTransfers.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientLayout } from '../../../components/ClientLayout';

const ClientTransfers: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fromAccount: '',
    toNib: '',
    amount: '',
    description: '',
    scheduled: false,
    scheduleDate: ''
  });

  const accounts = [
    { id: '1', name: 'Conta Ordenado', number: 'PT50 1234 5678 9012 3456 7890', balance: 5420.15 },
    { id: '2', name: 'Conta Poupança', number: 'PT50 1234 5678 9012 3456 7891', balance: 12500.75 },
  ];

  const recentContacts = [
    { name: 'Maria Silva', nib: 'PT50 9876 5432 1098 7654 3210', bank: 'Vista Bank' },
    { name: 'Carlos Santos', nib: 'PT50 1111 2222 3333 4444 5555', bank: 'Outro Banco' },
    { name: 'Ana Costa', nib: 'PT50 6666 7777 8888 9999 0000', bank: 'Vista Bank' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleNext = () => {
    if (step === 1 && formData.fromAccount && formData.toNib && formData.amount) {
      setStep(2);
    } else if (step === 2) {
      // Simular processamento da transferência
      setTimeout(() => {
        setStep(3);
      }, 2000);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleNewTransfer = () => {
    setStep(1);
    setFormData({
      fromAccount: '',
      toNib: '',
      amount: '',
      description: '',
      scheduled: false,
      scheduleDate: ''
    });
  };

  return (
    <ClientLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Transferências</h1>
              <p className="text-gray-600 mt-1">Transfira dinheiro entre contas ou para outros bancos</p>
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
          {/* Formulário de Transferência */}
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Conta de Origem
                    </label>
                    <select
                      name="fromAccount"
                      value={formData.fromAccount}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Selecione a conta</option>
                      {accounts.map(account => (
                        <option key={account.id} value={account.id}>
                          {account.name} - {account.number} (€ {account.balance.toLocaleString('pt-PT', { minimumFractionDigits: 2 })})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NIB de Destino
                    </label>
                    <input
                      type="text"
                      name="toNib"
                      value={formData.toNib}
                      onChange={handleInputChange}
                      placeholder="PT50 XXXX XXXX XXXX XXXX XXXX"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valor
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500"></span>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder="0,00"
                        step="0.01"
                        className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição (opcional)
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Adicione uma descrição para esta transferência"
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="scheduled"
                      checked={formData.scheduled}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <label className="text-sm text-gray-700">
                      Programar transferência
                    </label>
                  </div>

                  {formData.scheduled && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data de Transferência
                      </label>
                      <input
                        type="date"
                        name="scheduleDate"
                        value={formData.scheduleDate}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  )}

                  <button
                    onClick={handleNext}
                    disabled={!formData.fromAccount || !formData.toNib || !formData.amount}
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Continuar
                  </button>
                </div>
              )}

              {/* Step 2: Confirmação */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900">Confirmar Transferência</h2>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">De:</span>
                      <span className="font-semibold">
                        {accounts.find(acc => acc.id === formData.fromAccount)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Para:</span>
                      <span className="font-semibold text-right">{formData.toNib}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valor:</span>
                      <span className="font-semibold text-red-600"> {parseFloat(formData.amount).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</span>
                    </div>
                    {formData.description && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Descrição:</span>
                        <span className="font-semibold">{formData.description}</span>
                      </div>
                    )}
                    {formData.scheduled && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Data programada:</span>
                        <span className="font-semibold">
                          {new Date(formData.scheduleDate).toLocaleDateString('pt-PT')}
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Transferência Realizada!</h2>
                    <p className="text-gray-600">
                      A sua transferência no valor de <strong> {parseFloat(formData.amount).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</strong> foi processada com sucesso.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Referência:</span>
                      <span className="font-mono">TRF{Date.now()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Data:</span>
                      <span>{new Date().toLocaleDateString('pt-PT')} {new Date().toLocaleTimeString('pt-PT')}</span>
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


          {/* Contactos Recentes */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contactos Recentes</h3>
              <div className="space-y-3">
                {recentContacts.map((contact, index) => (
                  <button
                    key={index}
                    onClick={() => setFormData(prev => ({ ...prev, toNib: contact.nib }))}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-100 hover:border-red-200 hover:bg-red-50 transition-all duration-200 text-left"
                  >
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-semibold text-sm">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{contact.name}</p>
                      <p className="text-sm text-gray-500 truncate">{contact.nib}</p>
                    </div>
                  </button>
                ))}
              </div>

              <button className="w-full mt-4 flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-red-300 hover:text-red-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Adicionar Contacto</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientTransfers;