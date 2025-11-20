// pages/ClientInvestments.tsx
import React, { useState, useEffect } from 'react';
import { ClientLayout } from '../../../components/ClientLayout';

interface ClientInvestmentsProps {
  language: 'PT' | 'EN';
}

interface Stock {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  sector: string;
  logo?: string;
}

interface PortfolioItem {
  id: string;
  stock: Stock;
  quantity: number;
  averagePrice: number;
  totalInvested: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercent: number;
}

const ClientInvestments: React.FC<ClientInvestmentsProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'market' | 'portfolio' | 'external'>('market');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [quantity, setQuantity] = useState<string>('');
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [availableBalance, setAvailableBalance] = useState<number>(50000);
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);
  const [showExternalPlatform, setShowExternalPlatform] = useState<boolean>(false);

  // Dados simulados do mercado
  const marketStocks: Stock[] = [
    {
      id: '1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      currentPrice: 185.43,
      change: 2.15,
      changePercent: 1.17,
      volume: 45218900,
      marketCap: '2.89T',
      sector: 'Technology',
      logo: '🍎'
    },
    {
      id: '2',
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      currentPrice: 378.85,
      change: -1.23,
      changePercent: -0.32,
      volume: 28945600,
      marketCap: '2.81T',
      sector: 'Technology',
      logo: '💻'
    },
    {
      id: '3',
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      currentPrice: 248.42,
      change: 8.76,
      changePercent: 3.66,
      volume: 125678900,
      marketCap: '789.5B',
      sector: 'Automotive',
      logo: '🚗'
    },
    {
      id: '4',
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      currentPrice: 154.65,
      change: 0.85,
      changePercent: 0.55,
      volume: 5678900,
      marketCap: '1.59T',
      sector: 'E-commerce',
      logo: '📦'
    },
    {
      id: '5',
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      currentPrice: 138.21,
      change: -0.42,
      changePercent: -0.30,
      volume: 3456700,
      marketCap: '1.74T',
      sector: 'Technology',
      logo: '🔍'
    },
    {
      id: '6',
      symbol: 'MZN',
      name: 'Moçambique Bonds',
      currentPrice: 102.50,
      change: 0.25,
      changePercent: 0.24,
      volume: 123400,
      marketCap: '15.2B',
      sector: 'Government',
      logo: '🇲🇿'
    }
  ];

  const currentTexts = {
    PT: {
      title: 'Investimentos',
      subtitle: 'Invista no mercado global de ações e títulos',
      market: 'Mercado',
      portfolio: 'Minha Carteira',
      externalPlatform: 'Plataforma Externa',
      availableBalance: 'Saldo Disponível',
      totalPortfolio: 'Valor Total da Carteira',
      todayProfit: 'Lucro/Prejuízo Hoje',
      buy: 'Comprar',
      sell: 'Vender',
      symbol: 'Símbolo',
      name: 'Nome',
      price: 'Preço',
      change: 'Variação',
      volume: 'Volume',
      marketCap: 'Cap. de Mercado',
      sector: 'Setor',
      actions: 'Ações',
      quantity: 'Quantidade',
      orderValue: 'Valor da Ordem',
      totalCost: 'Custo Total',
      placeOrder: 'Efetuar Ordem',
      cancel: 'Cancelar',
      buyOrder: 'Ordem de Compra',
      sellOrder: 'Ordem de Venda',
      orderSuccess: 'Ordem Executada com Sucesso!',
      orderSuccessMessage: 'Sua ordem foi executada com sucesso.',
      viewPortfolio: 'Ver Carteira',
      continueTrading: 'Continuar a Negociar',
      noStocks: 'Nenhuma ação na carteira',
      noStocksMessage: 'Comece a investir comprando sua primeira ação.',
      startInvesting: 'Começar a Investir',
      shares: 'ações',
      profit: 'Lucro',
      loss: 'Prejuízo',
      openExternal: 'Abrir Plataforma Externa',
      externalDescription: 'Acesso a mais opções de investimento através da nossa plataforma parceira',
      integratedTrading: 'Negociação Integrada',
      realTimeData: 'Dados em Tempo Real',
      advancedCharts: 'Gráficos Avançados',
      connectPlatform: 'Conectar à Plataforma',
      loadingPlatform: 'Carregando plataforma...',
      returnToApp: 'Voltar ao App',
      totalInvested: 'Total Investido',
      currentValue: 'Valor Atual',
      profitLoss: 'Lucro/Prejuízo',
      averagePrice: 'Preço Médio'
    },
    EN: {
      title: 'Investments',
      subtitle: 'Invest in the global stock market and bonds',
      market: 'Market',
      portfolio: 'My Portfolio',
      externalPlatform: 'External Platform',
      availableBalance: 'Available Balance',
      totalPortfolio: 'Total Portfolio Value',
      todayProfit: "Today's P&L",
      buy: 'Buy',
      sell: 'Sell',
      symbol: 'Symbol',
      name: 'Name',
      price: 'Price',
      change: 'Change',
      volume: 'Volume',
      marketCap: 'Market Cap',
      sector: 'Sector',
      actions: 'Actions',
      quantity: 'Quantity',
      orderValue: 'Order Value',
      totalCost: 'Total Cost',
      placeOrder: 'Place Order',
      cancel: 'Cancel',
      buyOrder: 'Buy Order',
      sellOrder: 'Sell Order',
      orderSuccess: 'Order Executed Successfully!',
      orderSuccessMessage: 'Your order has been executed successfully.',
      viewPortfolio: 'View Portfolio',
      continueTrading: 'Continue Trading',
      noStocks: 'No stocks in portfolio',
      noStocksMessage: 'Start investing by buying your first stock.',
      startInvesting: 'Start Investing',
      shares: 'shares',
      profit: 'Profit',
      loss: 'Loss',
      openExternal: 'Open External Platform',
      externalDescription: 'Access more investment options through our partner platform',
      integratedTrading: 'Integrated Trading',
      realTimeData: 'Real-time Data',
      advancedCharts: 'Advanced Charts',
      connectPlatform: 'Connect to Platform',
      loadingPlatform: 'Loading platform...',
      returnToApp: 'Return to App',
      totalInvested: 'Total Invested',
      currentValue: 'Current Value',
      profitLoss: 'Profit/Loss',
      averagePrice: 'Average Price'
    }
  }[language];

  // Calcular totais da carteira
  const portfolioTotal = portfolio.reduce((sum, item) => sum + item.currentValue, 0);
  const totalInvested = portfolio.reduce((sum, item) => sum + item.totalInvested, 0);
  const totalProfitLoss = portfolioTotal - totalInvested;
  const todayProfitLoss = portfolio.reduce((sum, item) => {
    const stock = marketStocks.find(s => s.id === item.stock.id);
    return stock ? sum + (stock.change * item.quantity) : sum;
  }, 0);

  // Simular execução de ordem
  const executeOrder = () => {
    if (!selectedStock || !quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      return;
    }

    const qty = Number(quantity);
    const totalCost = selectedStock.currentPrice * qty;

    if (orderType === 'buy' && totalCost > availableBalance) {
      alert(language === 'PT' ? 'Saldo insuficiente' : 'Insufficient balance');
      return;
    }

    if (orderType === 'sell') {
      const portfolioItem = portfolio.find(item => item.stock.id === selectedStock.id);
      if (!portfolioItem || portfolioItem.quantity < qty) {
        alert(language === 'PT' ? 'Quantidade insuficiente na carteira' : 'Insufficient quantity in portfolio');
        return;
      }
    }

    // Atualizar carteira e saldo
    if (orderType === 'buy') {
      const existingItem = portfolio.find(item => item.stock.id === selectedStock.id);
      
      if (existingItem) {
        // Atualizar item existente
        const newQuantity = existingItem.quantity + qty;
        const newTotalInvested = existingItem.totalInvested + totalCost;
        const newAveragePrice = newTotalInvested / newQuantity;
        
        setPortfolio(portfolio.map(item => 
          item.stock.id === selectedStock.id 
            ? {
                ...item,
                quantity: newQuantity,
                averagePrice: newAveragePrice,
                totalInvested: newTotalInvested,
                currentValue: newQuantity * selectedStock.currentPrice,
                profitLoss: (newQuantity * selectedStock.currentPrice) - newTotalInvested,
                profitLossPercent: ((newQuantity * selectedStock.currentPrice) - newTotalInvested) / newTotalInvested * 100
              }
            : item
        ));
      } else {
        // Adicionar novo item
        const newItem: PortfolioItem = {
          id: Date.now().toString(),
          stock: selectedStock,
          quantity: qty,
          averagePrice: selectedStock.currentPrice,
          totalInvested: totalCost,
          currentValue: totalCost,
          profitLoss: 0,
          profitLossPercent: 0
        };
        setPortfolio([...portfolio, newItem]);
      }
      
      setAvailableBalance(prev => prev - totalCost);
    } else {
      // Venda
      const portfolioItem = portfolio.find(item => item.stock.id === selectedStock.id)!;
      const saleValue = selectedStock.currentPrice * qty;
      
      if (portfolioItem.quantity === qty) {
        // Remover item completamente
        setPortfolio(portfolio.filter(item => item.stock.id !== selectedStock.id));
      } else {
        // Reduzir quantidade
        setPortfolio(portfolio.map(item => 
          item.stock.id === selectedStock.id 
            ? {
                ...item,
                quantity: item.quantity - qty,
                totalInvested: item.averagePrice * (item.quantity - qty),
                currentValue: (item.quantity - qty) * selectedStock.currentPrice,
                profitLoss: ((item.quantity - qty) * selectedStock.currentPrice) - (item.averagePrice * (item.quantity - qty)),
                profitLossPercent: (((item.quantity - qty) * selectedStock.currentPrice) - (item.averagePrice * (item.quantity - qty))) / (item.averagePrice * (item.quantity - qty)) * 100
              }
            : item
        ));
      }
      
      setAvailableBalance(prev => prev + saleValue);
    }

    setShowOrderModal(false);
    setQuantity('');
    setSelectedStock(null);
  };

  // Abrir modal de ordem
  const openOrderModal = (stock: Stock, type: 'buy' | 'sell') => {
    setSelectedStock(stock);
    setOrderType(type);
    setQuantity('');
    setShowOrderModal(true);
  };

  // Simular plataforma externa
  const openExternalPlatform = () => {
    setShowExternalPlatform(true);
  };

  if (showExternalPlatform) {
    return (
      <ClientLayout>
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{currentTexts.externalPlatform}</h1>
                <p className="text-gray-600">{currentTexts.externalDescription}</p>
              </div>
              <button
                onClick={() => setShowExternalPlatform(false)}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                {currentTexts.returnToApp}
              </button>
            </div>
          </div>

          {/* Plataforma Externa Simulada */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">📈</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {currentTexts.integratedTrading}
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                {language === 'PT' 
                  ? 'Conectando à nossa plataforma parceira de investimentos...'
                  : 'Connecting to our partner investment platform...'
                }
              </p>

              {/* Simulação de loading */}
              <div className="flex justify-center mb-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 text-xl">⚡</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{currentTexts.realTimeData}</h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'PT' 
                      ? 'Cotações em tempo real do mercado global'
                      : 'Real-time quotes from global markets'
                    }
                  </p>
                </div>

                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 text-xl">📊</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{currentTexts.advancedCharts}</h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'PT' 
                      ? 'Análise técnica com ferramentas profissionais'
                      : 'Technical analysis with professional tools'
                    }
                  </p>
                </div>

                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 text-xl">🌍</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{currentTexts.integratedTrading}</h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'PT' 
                      ? 'Acesso a mercados internacionais'
                      : 'Access to international markets'
                    }
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300">
                <p className="text-gray-600 mb-4">
                  {language === 'PT'
                    ? 'Em desenvolvimento: Integração com plataforma externa de investimentos'
                    : 'Under development: Integration with external investment platform'
                  }
                </p>
                <button
                  onClick={() => setShowExternalPlatform(false)}
                  className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  {currentTexts.returnToApp}
                </button>
              </div>
            </div>
          </div>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{currentTexts.title}</h1>
              <p className="text-gray-600 mt-1">{currentTexts.subtitle}</p>
            </div>
            <div className="mt-4 lg:mt-0 flex flex-wrap gap-3">
              <button
                onClick={openExternalPlatform}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                {currentTexts.openExternal}
              </button>
            </div>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <p className="text-green-100">{currentTexts.availableBalance}</p>
            <p className="text-3xl font-bold mt-2">MZN {availableBalance.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</p>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <p className="text-blue-100">{currentTexts.totalPortfolio}</p>
            <p className="text-3xl font-bold mt-2">MZN {portfolioTotal.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</p>
          </div>

          <div className={`rounded-2xl p-6 text-white ${
            todayProfitLoss >= 0 
              ? 'bg-gradient-to-r from-green-500 to-green-600' 
              : 'bg-linear-to-r from-red-500 to-red-600'
          }`}>
            <p className="text-white/90">{currentTexts.todayProfit}</p>
            <p className="text-3xl font-bold mt-2">
              {todayProfitLoss >= 0 ? '+' : ''}MZN {Math.abs(todayProfitLoss).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('market')}
                className={`flex-1 py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'market'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {currentTexts.market}
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`flex-1 py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'portfolio'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {currentTexts.portfolio}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Mercado */}
            {activeTab === 'market' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">{currentTexts.symbol}</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">{currentTexts.name}</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">{currentTexts.price}</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">{currentTexts.change}</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">{currentTexts.volume}</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">{currentTexts.marketCap}</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">{currentTexts.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketStocks.map((stock) => (
                      <tr key={stock.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                              {stock.logo}
                            </div>
                            <span className="font-semibold text-gray-900">{stock.symbol}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{stock.name}</p>
                            <p className="text-sm text-gray-500">{stock.sector}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-gray-900">
                          MZN {stock.currentPrice.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                        </td>
                        <td className={`py-3 px-4 text-right font-semibold ${
                          stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stock.change >= 0 ? '+' : ''}{stock.change.toLocaleString('pt-PT', { minimumFractionDigits: 2 })} 
                          ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}%)
                        </td>
                        <td className="py-3 px-4 text-right text-gray-600">
                          {stock.volume.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-600">
                          {stock.marketCap}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => openOrderModal(stock, 'buy')}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                            >
                              {currentTexts.buy}
                            </button>
                            <button
                              onClick={() => openOrderModal(stock, 'sell')}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                            >
                              {currentTexts.sell}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Carteira */}
            {activeTab === 'portfolio' && (
              <div>
                {portfolio.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-gray-400 text-2xl">📈</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {currentTexts.noStocks}
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      {currentTexts.noStocksMessage}
                    </p>
                    <button
                      onClick={() => setActiveTab('market')}
                      className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      {currentTexts.startInvesting}
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">{currentTexts.symbol}</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">{currentTexts.name}</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">{currentTexts.quantity}</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">{currentTexts.averagePrice}</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">{currentTexts.totalInvested}</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">{currentTexts.currentValue}</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">{currentTexts.profitLoss}</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">{currentTexts.actions}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {portfolio.map((item) => (
                          <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                                  {item.stock.logo}
                                </div>
                                <span className="font-semibold text-gray-900">{item.stock.symbol}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <p className="font-medium text-gray-900">{item.stock.name}</p>
                            </td>
                            <td className="py-3 px-4 text-right text-gray-600">
                              {item.quantity} {currentTexts.shares}
                            </td>
                            <td className="py-3 px-4 text-right text-gray-600">
                              MZN {item.averagePrice.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="py-3 px-4 text-right text-gray-600">
                              MZN {item.totalInvested.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="py-3 px-4 text-right font-semibold text-gray-900">
                              MZN {item.currentValue.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                            </td>
                            <td className={`py-3 px-4 text-right font-semibold ${
                              item.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {item.profitLoss >= 0 ? '+' : ''}MZN {Math.abs(item.profitLoss).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                              <br />
                              <span className="text-sm">
                                ({item.profitLoss >= 0 ? '+' : ''}{item.profitLossPercent.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}%)
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => openOrderModal(item.stock, 'sell')}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                              >
                                {currentTexts.sell}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Ordem */}
      {showOrderModal && selectedStock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {orderType === 'buy' ? currentTexts.buyOrder : currentTexts.sellOrder}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{selectedStock.symbol}</p>
                  <p className="text-gray-600 text-sm">{selectedStock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    MZN {selectedStock.currentPrice.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                  </p>
                  <p className={`text-sm ${
                    selectedStock.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change} ({selectedStock.change >= 0 ? '+' : ''}{selectedStock.changePercent}%)
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentTexts.quantity}
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="0"
                  min="1"
                />
              </div>

              {quantity && !isNaN(Number(quantity)) && Number(quantity) > 0 && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">{currentTexts.orderValue}:</span>
                    <span className="font-semibold">
                      MZN {(selectedStock.currentPrice * Number(quantity)).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{currentTexts.totalCost}:</span>
                    <span className="font-semibold">
                      MZN {(selectedStock.currentPrice * Number(quantity)).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={executeOrder}
                  disabled={!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0}
                  className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {orderType === 'buy' ? currentTexts.buy : currentTexts.sell}
                </button>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  {currentTexts.cancel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ClientLayout>
  );
};

export default ClientInvestments;