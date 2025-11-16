// pages/Business/CheckManagement.tsx
import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { TbCheck, TbCheckbox, TbChecklist } from "react-icons/tb";
import { BusinessLayout } from '../../../components/BusinessLayout';

interface Check {
  id: string;
  number: string;
  amount: number;
  beneficiary: string;
  issueDate: string;
  status: 'cleared' |'stopped';
  account: string;
}

interface CheckManagementProps {
  language: 'PT' | 'EN';
}

const CheckManagement: React.FC<CheckManagementProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'all'| 'cleared' >('all');
  const [searchTerm, setSearchTerm] = useState('');

  const texts = {
    PT: {
      title: 'Gestão de Cheques',
      subtitle: 'Gerencie os seus cheques empresariais',
      allChecks: 'Todos os Cheques',
      clearedChecks: 'Compensados',
      issueNewCheck: 'Requisitar novo livro',
      checkNumber: 'Número do Check',
      amount: 'Valor',
      beneficiary: 'Beneficiário',
      issueDate: 'Data de Emissão',
      status: 'Estado',
      account: 'Conta',
      actions: 'Ações',
      viewDetails: 'Ver Detalhes',
      stopCheck: 'Stop Payment',
      printCheck: 'Imprimir',
      searchPlaceholder: 'Pesquisar por número, beneficiário...',
      totalChecks: 'Cheques Totais',
      clearedAmount: 'Valor Compensado',
      stopPayment: 'Stop Payment',
      checkDetails: 'Detalhes do Check',
      newCheck: 'Novo Check'
    },
    EN: {
      title: 'Check Management',
      subtitle: 'Manage your business checks',
      allChecks: 'All Checks',
      clearedChecks: 'Cleared',
      issueNewCheck: 'Request a new book',
      checkNumber: 'Check Number',
      amount: 'Amount',
      beneficiary: 'Beneficiary',
      issueDate: 'Issue Date',
      status: 'Status',
      account: 'Account',
      actions: 'Actions',
      viewDetails: 'View Details',
      stopCheck: 'Stop Payment',
      printCheck: 'Print',
      searchPlaceholder: 'Search by number, beneficiary...',
      totalChecks: 'Total Checks',
      clearedAmount: 'Cleared Amount',
      stopPayment: 'Stop Payment',
      checkDetails: 'Check Details',
      newCheck: 'New Check'
    }
  };

  const t = texts[language];

  // Dados de exemplo
  const [checks, setChecks] = useState<Check[]>([
    {
      id: '1',
      number: '00012345',
      amount: 15000.00,
      beneficiary: 'Tech Supplies LDA',
      issueDate: '2024-01-15',
      status: 'cleared',
      account: 'PT50 1234 5678 9012 3456 7890'
    },
    {
      id: '2',
      number: '00012346',
      amount: 8500.50,
      beneficiary: 'Office Solutions SA',
      issueDate: '2024-01-10',
      status: 'cleared',
      account: 'PT50 1234 5678 9012 3456 7890'
    },
    {
      id: '3',
      number: '00012347',
      amount: 25000.00,
      beneficiary: 'Marketing Pro LDA',
      issueDate: '2024-01-08',
      status: 'cleared',
      account: 'PT50 1234 5678 9012 3456 7891'
    },
    {
      id: '4',
      number: '00012348',
      amount: 12000.75,
      beneficiary: 'Logistics Express',
      issueDate: '2024-01-05',
      status: 'cleared',
      account: 'PT50 1234 5678 9012 3456 7890'
    }
  ]);

  const filteredChecks = checks.filter(check => {
    const matchesSearch = searchTerm === '' ||
      check.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      check.beneficiary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab = activeTab === 'all' || check.status === activeTab;

    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'cleared': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'cleared': return language === 'PT' ? 'Compensado' : 'Cleared';
      default: return status;
    }
  };

  const handleStopPayment = (checkId: string) => {
    if (window.confirm(language === 'PT'
      ? 'Tem certeza que deseja colocar stop payment neste check?'
      : 'Are you sure you want to stop payment on this check?')) {
      setChecks(checks.map(check =>
        check.id === checkId ? { ...check, status: 'stopped' } : check
      ));
    }
  };

  const stats = {
    total: checks.length,
    cleared: checks.filter(c => c.status === 'cleared').length,
    clearedAmount: checks.filter(c => c.status === 'cleared').reduce((sum, c) => sum + c.amount, 0)
  };

  return (
    <BusinessLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <TbCheck size={24} className="text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center space-x-2">
              <TbCheckbox size={20} />
              <span>{t.issueNewCheck}</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.totalChecks}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <TbChecklist size={24} className="text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {(['all', 'cleared', ] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab
                    ? 'bg-white text-red-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {t[`${tab}Checks` as keyof typeof t]}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 w-full lg:w-80"
              />
            </div>
          </div>
        </div>

        {/* Tabela de Checks */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.checkNumber}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.beneficiary}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.amount}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.issueDate}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.status}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredChecks.map((check) => (
                  <tr key={check.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{check.number}</div>
                      <div className="text-sm text-gray-500">{check.account.slice(0, 8)}...</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{check.beneficiary}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {check.amount.toLocaleString('pt-PT', { style: 'currency', currency: 'MZN' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(check.issueDate).toLocaleDateString('pt-PT')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(check.status)}`}>
                        {getStatusText(check.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-red-600 hover:text-red-900">
                        {t.viewDetails}
                      </button>
                      {check.status !== 'cleared' && (
                        <button
                          onClick={() => handleStopPayment(check.id)}
                          className="text-orange-600 hover:text-orange-900 ml-2"
                        >
                          {t.stopPayment}
                        </button>
                      )}
                      <button className="text-gray-600 hover:text-gray-900 ml-2">
                        <CiSearch size={16} className="inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredChecks.length === 0 && (
            <div className="text-center py-12">
              <TbCheck size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">
                {language === 'PT' ? 'Nenhum check encontrado' : 'No checks found'}
              </p>
            </div>
          )}
        </div>
      </div>
    </BusinessLayout>
  );
};

export default CheckManagement; 