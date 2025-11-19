// components/BranchLocator.tsx
import React, { useState } from 'react';

// Interface para os balcões
interface Branch {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  hours: string;
  lat: number;
  lng: number;
  services: string[];
}

// Interface para as props
interface BranchLocatorProps {
  language: 'PT' | 'EN';
}

const BranchLocator: React.FC<BranchLocatorProps> = ({ language }) => {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Dados dos balcões
  const branches: Branch[] = [
    {
      id: 1,
      name: 'Balcão Central - Maputo',
      address: 'Avenida 25 de Setembro, nº 1234',
      city: 'Maputo',
      phone: '+258 84 123 4567',
      email: 'central.maputo@yourbank.co.mz',
      hours: 'Seg-Sex: 8h00-17h00, Sáb: 8h00-13h00',
      lat: -25.9689,
      lng: 32.5852,
      services: ['Depósitos', 'Saque', 'Transferências', 'Crédito', 'Investimentos']
    },
    {
      id: 2,
      name: 'Balcão Baía - Maputo',
      address: 'Avenida Marginal, nº 567',
      city: 'Maputo',
      phone: '+258 84 234 5678',
      email: 'baia.maputo@yourbank.co.mz',
      hours: 'Seg-Sex: 8h00-17h00, Sáb: 8h00-13h00',
      lat: -25.9772,
      lng: 32.5833,
      services: ['Depósitos', 'Saque', 'Transferências', 'Cartões', 'Seguros']
    },
    {
      id: 3,
      name: 'Balcão Central - Matola',
      address: 'Avenida 1º de Maio, nº 789',
      city: 'Matola',
      phone: '+258 84 345 6789',
      email: 'central.matola@yourbank.co.mz',
      hours: 'Seg-Sex: 8h00-17h00, Sáb: 8h00-13h00',
      lat: -25.9622,
      lng: 32.4589,
      services: ['Depósitos', 'Saque', 'Transferências', 'Crédito', 'Poupança']
    },
    {
      id: 4,
      name: 'Balcão Machava - Matola',
      address: 'Estrada Nacional Nº 4, nº 456',
      city: 'Matola',
      phone: '+258 84 456 7890',
      email: 'machava.matola@yourbank.co.mz',
      hours: 'Seg-Sex: 8h00-17h00, Sáb: 8h00-13h00',
      lat: -25.9389,
      lng: 32.4728,
      services: ['Depósitos', 'Saque', 'Transferências', 'Pagamentos']
    },
    {
      id: 5,
      name: 'Balcão Marracuene',
      address: 'Avenida Principal, nº 321',
      city: 'Marracuene',
      phone: '+258 84 567 8901',
      email: 'marracuene@yourbank.co.mz',
      hours: 'Seg-Sex: 8h00-16h00, Sáb: 8h00-12h00',
      lat: -25.7419,
      lng: 32.6722,
      services: ['Depósitos', 'Saque', 'Transferências', 'Consultoria']
    }
  ];

  // Textos multilíngua
  const texts = {
    PT: {
      title: 'Nossos Balcões',
      subtitle: 'Encontre o balcão mais próximo de si',
      allBranches: 'Todos os Balcões',
      services: 'Serviços Disponíveis',
      contact: 'Contactos',
      openingHours: 'Horário de Funcionamento',
      directions: 'Como Chegar',
      selectBranch: 'Selecione um balcão para ver detalhes',
      viewOnMap: 'Ver no Mapa',
      getDirections: 'Obter Direções',
      useMyLocation: 'Usar Minha Localização',
      simulatedMap: 'Mapa de Localização dos Balcões',
      distance: 'Distância Aproximada',
      km: 'km',
      myLocation: 'Minha Localização'
    },
    EN: {
      title: 'Our Branches',
      subtitle: 'Find the nearest branch to you',
      allBranches: 'All Branches',
      services: 'Available Services',
      contact: 'Contact Information',
      openingHours: 'Opening Hours',
      directions: 'How to Get There',
      selectBranch: 'Select a branch to see details',
      viewOnMap: 'View on Map',
      getDirections: 'Get Directions',
      useMyLocation: 'Use My Location',
      simulatedMap: 'Branch Location Map',
      distance: 'Approximate Distance',
      km: 'km',
      myLocation: 'My Location'
    }
  };

  const currentTexts = texts[language];

  // Simular obtenção da localização do usuário
  const handleGetUserLocation = () => {
    // Simulação - usando uma localização central em Maputo
    setUserLocation({
      lat: -25.9692,
      lng: 32.5732
    });
  };

  // Calcular distância aproximada (fórmula simplificada)
  const calculateDistance = (branch: Branch): number => {
    if (!userLocation) return 0;
    
    const R = 6371; // Raio da Terra em km
    const dLat = (branch.lat - userLocation.lat) * Math.PI / 180;
    const dLon = (branch.lng - userLocation.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(branch.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return Math.round(distance * 10) / 10; // Arredondar para 1 casa decimal
  };

  // Ordenar balcões por distância se a localização estiver disponível
  const sortedBranches = userLocation 
    ? [...branches].sort((a, b) => calculateDistance(a) - calculateDistance(b))
    : branches;

  const handleGetDirections = (branch: Branch) => {
    // Abrir Google Maps com as coordenadas do balcão
    const url = `https://www.google.com/maps?q=${branch.lat},${branch.lng}`;
    window.open(url, '_blank');
  };

  // Componente do mapa simulado
  const SimulatedMap = () => (
    <div className="relative h-80 md:h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden border border-gray-300">
      {/* Pontos de referência no mapa simulado */}
      <div className="absolute inset-0 bg-pattern bg-repeat" style={{
        backgroundImage: `radial-gradient(circle, #cbd5e1 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }} />
      
      {/* Linhas representando ruas */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2"></div>
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 transform -translate-x-1/2"></div>
      
      {/* Marcadores dos balcões */}
      {branches.map((branch, index) => {
        // Posições relativas no container do mapa
        const positions = [
          { top: '45%', left: '48%' }, // Maputo Central
          { top: '52%', left: '52%' }, // Maputo Baía
          { top: '40%', left: '35%' }, // Matola Central
          { top: '35%', left: '30%' }, // Matola Machava
          { top: '20%', left: '60%' }  // Marracuene
        ];

        const position = positions[index];
        const isSelected = selectedBranch?.id === branch.id;

        return (
          <div
            key={branch.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
              isSelected ? 'z-10 scale-125' : 'z-0'
            }`}
            style={position}
            onClick={() => setSelectedBranch(branch)}
          >
            <div className={`relative ${
              isSelected ? 'text-red-600' : 'text-red-500'
            }`}>
              <svg className="w-8 h-8 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {isSelected && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap text-xs font-medium">
                  {branch.name.split(' - ')[0]}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Marcador da localização do usuário */}
      {userLocation && (
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ top: '50%', left: '50%' }}
        >
          <div className="relative text-blue-600">
            <svg className="w-6 h-6 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
              {currentTexts.myLocation}
            </div>
          </div>
        </div>
      )}

      {/* Legenda do mapa */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-xs text-gray-700">{language === 'PT' ? 'Balcões' : 'Branches'}</span>
        </div>
        {userLocation && (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-700">{currentTexts.myLocation}</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentTexts.title}
          </h1>
          <p className="text-lg text-gray-600">
            {currentTexts.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Balcões */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {currentTexts.allBranches}
                  </h2>
                  <button
                    onClick={handleGetUserLocation}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{currentTexts.useMyLocation}</span>
                  </button>
                </div>
                {userLocation && (
                  <p className="text-xs text-green-600 mt-2">
                    {language === 'PT' 
                      ? '📍 Localização ativa - Balcões ordenados por distância' 
                      : '📍 Location active - Branches sorted by distance'
                    }
                  </p>
                )}
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {sortedBranches.map((branch) => {
                  const distance = userLocation ? calculateDistance(branch) : null;
                  
                  return (
                    <div
                      key={branch.id}
                      className={`p-4 border-b border-gray-100 cursor-pointer transition-all hover:bg-red-50 ${
                        selectedBranch?.id === branch.id ? 'bg-red-50 border-red-200' : ''
                      }`}
                      onClick={() => setSelectedBranch(branch)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {branch.name}
                        </h3>
                        {distance !== null && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                            {distance} {currentTexts.km}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        {branch.address}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {branch.city}
                        </span>
                        <span className="text-xs text-red-600 font-medium">
                          {currentTexts.viewOnMap}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mapa e Detalhes */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-8">
              {/* Mapa Simulado */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">
                    {currentTexts.simulatedMap}
                  </h3>
                </div>
                <SimulatedMap />
              </div>

              {/* Detalhes do Balcão Selecionado */}
              {selectedBranch ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                          {selectedBranch.name}
                        </h2>
                        <p className="text-gray-600 mb-1">
                          {selectedBranch.address}
                        </p>
                        <span className="inline-block bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full">
                          {selectedBranch.city}
                        </span>
                      </div>
                      <button
                        onClick={() => handleGetDirections(selectedBranch)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <span>{currentTexts.getDirections}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Informações de Contacto */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">
                          {currentTexts.contact}
                        </h3>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">📞 {language === 'PT' ? 'Telefone:' : 'Phone:'}</span> {selectedBranch.phone}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">✉️ {language === 'PT' ? 'Email:' : 'Email:'}</span> {selectedBranch.email}
                          </p>
                        </div>
                      </div>

                      {/* Horário de Funcionamento */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">
                          {currentTexts.openingHours}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {selectedBranch.hours}
                        </p>
                      </div>
                    </div>

                    {/* Serviços Disponíveis */}
                    <div className="mt-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {currentTexts.services}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedBranch.services.map((service, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {currentTexts.selectBranch}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'PT' 
                      ? 'Clique num balcão da lista ou no mapa para ver informações detalhadas' 
                      : 'Click on a branch from the list or on the map to see detailed information'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BranchLocator };