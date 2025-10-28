// components/BankValues.tsx
import React from 'react';
import { texts } from '../../translations/bankValuesTexts';

interface BankValuesProps {
  language: 'PT' | 'EN';
}

const BankValues: React.FC<BankValuesProps> = ({ language }) => {

  const currentTexts = texts[language];

  return (
    <div className="relative bg-linear-to-br from-gray-50 to-white py-24 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        
        {/* Floating Shapes */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-base font-semibold text-red-600 tracking-wide uppercase mb-4">
            {currentTexts.title}
          </h2>
          <p className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {currentTexts.subtitle}
          </p>
          <div className="w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {currentTexts.values.map((value, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-red-100"
            >
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-linear-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-linear-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg">
                  {value.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {value.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-3">
                  {value.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 text-red-500 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-gray-200">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {currentTexts.stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {stat.label}
                </div>
                {/* Animated underline on hover */}
                <div className="w-0 group-hover:w-8 h-0.5 bg-red-500 mx-auto mt-2 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
            {language === 'PT' 
              ? 'Pronto para fazer parte da nossa comunidade? Descubra como podemos transformar sua vida financeira.'
              : 'Ready to join our community? Discover how we can transform your financial life.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              {language === 'PT' ? 'Abrir Minha Conta' : 'Open My Account'}
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-red-500 hover:text-red-600 transition-all duration-300 transform hover:scale-105">
              {language === 'PT' ? 'Saber Mais' : 'Learn More'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BankValues };