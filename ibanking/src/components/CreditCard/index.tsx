// components/CreditCard.tsx
import React from 'react';

interface CreditCardProps {
  type: 'primary' | 'credit' | 'debit';
  cardNumber: string;
  holderName: string;
  expiryDate: string;
  limit?: number;
  used?: number;
  className?: string;
}

const CreditCard: React.FC<CreditCardProps> = ({
  type,
  cardNumber,
  holderName,
  expiryDate,
  limit,
  className = ''
}) => {
  const getCardStyles = () => {
    switch (type) {
      case 'primary':
        return 'bg-gradient-to-r from-gray-900 to-gray-700';
      case 'credit':
        return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'debit':
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
      default:
        return 'bg-gradient-to-r from-gray-900 to-gray-700';
    }
  };

  const getCardIcon = () => {
    switch (type) {
      case 'primary':
        return <div className="w-12 h-8 bg-yellow-400 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">VISA</span>
        </div>;
      case 'credit':
        return <div className="w-12 h-8 bg-blue-400 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">VISA</span>
        </div>;
      case 'debit':
        return <div className="w-12 h-8 bg-green-400 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">MC</span>
        </div>;
      default:
        return <div className="w-12 h-8 bg-yellow-400 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">VISA</span>
        </div>;
    }
  };

  const getCardTitle = () => {
    switch (type) {
      case 'primary':
        return 'Cartão Principal';
      case 'credit':
        return 'Cartão de Crédito';
      case 'debit':
        return 'Cartão Débito';
      default:
        return 'Cartão';
    }
  };

  const getTextColor = () => {
    return type === 'primary' ? 'text-gray-300' : 'text-red-100';
  };


  return (
    <div className={`${getCardStyles()} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className={`${getTextColor()} text-sm mb-`}>{getCardTitle()}</p>
          <p className="font-semibold text-lg tracking-wider">{cardNumber}</p>
        </div>
        {getCardIcon()}
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className={`${getTextColor()} text-sm mb-`}>Titular</p>
          <p className="font-medium text-sm tracking-wide">{holderName.toUpperCase()}</p>
        </div>

        {type === 'credit' ? (
          <div className="text-right">
            <div className="mb-0">
              <p className={`${getTextColor()} text-sm mb-`}>Limite</p>
              <p className="font-medium">€ {limit?.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        ) : (
          <div>
            <p className={`${getTextColor()} text-sm mb-`}>Válido até</p>
            <p className="font-medium">{expiryDate}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditCard;