// pages/NotFound.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animação/Ilustração */}
        <div className="relative mb-8">
          <div className="w-48 h-48 mx-auto relative">
            {/* Círculo de fundo */}
            <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse"></div>
            
            {/* Ícone de erro */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                
                {/* Elementos flutuantes */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
            
            {/* Pontos decorativos */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-200 rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-red-300 rounded-full opacity-40"></div>
          </div>
        </div>

        {/* Conteúdo de texto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-8xl font-bold text-red-600 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Página Não Encontrada</h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Oops! A página que você está procurando não existe ou foi movida.
            </p>
          </div>

          {/* Informações úteis */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-md mx-auto">
            <h3 className="font-semibold text-gray-900 mb-3">O que você pode fazer:</h3>
            <ul className="text-sm text-gray-600 space-y-2 text-left">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>Verificar se o URL está correto</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>Voltar para a página anterior</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>Navegar pelo menu principal</span>
              </li>
            </ul>
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Voltar</span>
            </button>

            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Ir para o Início</span>
            </button>
          </div>

          {/* Busca rápida */}
          <div className="max-w-md mx-auto">
            <p className="text-sm text-gray-500 mb-3">Ou tente buscar o que precisa:</p>
            <div className="relative">
              <input
                type="text"
                placeholder="O que você está procurando?"
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    alert('Funcionalidade de busca seria implementada aqui!');
                  }
                }}
              />
              <button className="absolute right-3 top-3 text-gray-400 hover:text-red-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Precisa de ajuda?{' '}
            <button 
              onClick={() => navigate('/support')}
              className="text-red-600 hover:text-red-700 font-semibold transition-colors"
            >
              Contacte o suporte
            </button>
          </p>
        </div>
      </div>

      {/* Elementos decorativos de fundo */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
    </div>
  );
};

export default NotFound;