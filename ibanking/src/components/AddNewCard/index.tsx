// components/AddNewCard.tsx
import React from 'react';

interface AddNewCardProps {
  onClick?: () => void;
  className?: string;
  title?: string;
  description?: string;
}

const AddNewCard: React.FC<AddNewCardProps> = ({ 
  onClick, 
  className = '',
  title = "Solicitar novo cartão",
  description = "Adicionar cartão à conta"
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative group
        border-2 border-dashed border-gray-300 rounded-2xl p-6 
        flex flex-col items-center justify-center text-gray-400 
        hover:border-red-300 hover:bg-red-50 hover:text-red-600
        transition-all duration-300 cursor-pointer
        min-h-[200px] h-full
        ${className}
      `}
    >
      {/* Efeito de hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-100 group-hover:scale-110 transition-all duration-300">
          <svg 
            className="w-6 h-6 transition-colors duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
            />
          </svg>
        </div>
        
        <p className="font-semibold text-base text-center mb-2 transition-colors duration-300">
          {title}
        </p>
        
        <p className="text-sm text-center transition-colors duration-300">
          {description}
        </p>
        
        {/* Indicador visual de clique */}
        <div className="mt-3 px-4 py-1 bg-gray-100 rounded-full group-hover:bg-red-100 transition-colors duration-300">
          <p className="text-xs text-gray-500 group-hover:text-red-600 transition-colors duration-300">
            Clique para adicionar
          </p>
        </div>
      </div>

      {/* Efeitos decorativos */}
      <div className="absolute top-3 right-3 w-3 h-3 bg-gray-200 rounded-full group-hover:bg-red-300 transition-colors duration-300"></div>
      <div className="absolute bottom-3 left-3 w-2 h-2 bg-gray-200 rounded-full group-hover:bg-red-300 transition-colors duration-300"></div>
    </div>
  );
};

export default AddNewCard;