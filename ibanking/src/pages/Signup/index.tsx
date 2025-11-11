// components/Signup.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  CiUser,
  CiLock,
  CiMail,
  CiMobile3,
  CiCalendar,
  CiMapPin,
  CiBank,
  CiCircleCheck,
  CiWarning
} from "react-icons/ci";
import { TbBuildingBank } from "react-icons/tb";

interface SignupProps {
  language: 'PT' | 'EN';
}

const Signup: React.FC<SignupProps> = ({ language }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState<'individual' | 'business'>('individual');

  // Estado do formulário
  const [formData, setFormData] = useState({
    // Informações Pessoais
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    nif: '',
    nationality: '',
    
    // Endereço
    address: '',
    city: '',
    province: '',
    postalCode: '',
    
    // Informações da Empresa (se aplicável)
    companyName: '',
    companyNuit: '',
    companyActivity: '',
    companyAddress: '',
    
    // Informações da Conta
    accountType: 'current',
    initialDeposit: '',
    currency: 'MZN',
    
    // Segurança
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const texts = {
    PT: {
      title: 'Abrir Conta Bancária',
      subtitle: 'Junte-se a nós e tenha acesso a serviços bancários completos',
      individualAccount: 'Conta Individual',
      businessAccount: 'Conta Empresarial',
      step1: 'Tipo de Conta',
      step2: 'Informações Pessoais',
      step3: 'Endereço',
      step4: 'Informações da Conta',
      step5: 'Segurança',
      next: 'Próximo',
      previous: 'Anterior',
      createAccount: 'Criar Conta',
      loading: 'Processando...',
      success: 'Conta criada com sucesso!',
      
      // Tipos de conta
      accountType: 'Tipo de Conta',
      currentAccount: 'Conta Corrente',
      savingsAccount: 'Conta Poupança',
      individualDescription: 'Para uso pessoal e gestão financeira individual',
      businessDescription: 'Para empresas e profissionais independentes',
      
      // Informações pessoais
      personalInfo: 'Informações Pessoais',
      firstName: 'Nome',
      lastName: 'Apelido',
      email: 'Email',
      phone: 'Telemóvel',
      birthDate: 'Data de Nascimento',
      nif: 'Número de Identificação Fiscal (NIF)',
      nationality: 'Nacionalidade',
      mozambican: 'Moçambicana',
      foreign: 'Estrangeira',
      
      // Endereço
      addressInfo: 'Informações de Endereço',
      address: 'Morada',
      city: 'Cidade',
      province: 'Província',
      postalCode: 'Código Postal',
      
      // Informações da empresa
      companyInfo: 'Informações da Empresa',
      companyName: 'Nome da Empresa',
      companyNuit: 'NUIT da Empresa',
      companyActivity: 'Actividade Principal',
      companyAddress: 'Morada da Empresa',
      
      // Informações da conta
      accountInfo: 'Informações da Conta',
      initialDeposit: 'Depósito Inicial',
      currency: 'Moeda',
      mzn: 'Metical (MZN)',
      usd: 'Dólar Americano (USD)',
      
      // Segurança
      security: 'Segurança',
      password: 'Palavra-passe',
      confirmPassword: 'Confirmar Palavra-passe',
      terms: 'Aceito os termos e condições',
      termsLink: 'Ver termos e condições',
      
      // Validações
      requiredField: 'Campo obrigatório',
      invalidEmail: 'Email inválido',
      invalidPhone: 'Número de telemóvel inválido',
      passwordMismatch: 'As palavras-passe não coincidem',
      minPassword: 'A palavra-passe deve ter pelo menos 8 caracteres',
      minDeposit: 'Depósito mínimo: 500 MT',
      invalidNIF: 'NIF inválido',
      invalidNUIT: 'NUIT inválido',
      
      // Províncias de Moçambique
      provinces: {
        maputo: 'Maputo Cidade',
        maputoProvince: 'Maputo Província',
        gaza: 'Gaza',
        inhambane: 'Inhambane',
        sofala: 'Sofala',
        manica: 'Manica',
        tete: 'Tete',
        zambezia: 'Zambézia',
        nampula: 'Nampula',
        caboDelgado: 'Cabo Delgado',
        niassa: 'Niassa'
      },
      
      // Mensagens de sucesso
      successTitle: 'Conta Criada com Sucesso!',
      successMessage: 'Sua conta foi criada com sucesso. Em breve receberá um email com as instruções para ativar sua conta.',
      goToLogin: 'Ir para o Login'
    },
    EN: {
      title: 'Open Bank Account',
      subtitle: 'Join us and get access to complete banking services',
      individualAccount: 'Individual Account',
      businessAccount: 'Business Account',
      step1: 'Account Type',
      step2: 'Personal Information',
      step3: 'Address',
      step4: 'Account Information',
      step5: 'Security',
      next: 'Next',
      previous: 'Previous',
      createAccount: 'Create Account',
      loading: 'Processing...',
      success: 'Account created successfully!',
      
      // Account types
      accountType: 'Account Type',
      currentAccount: 'Current Account',
      savingsAccount: 'Savings Account',
      individualDescription: 'For personal use and individual financial management',
      businessDescription: 'For companies and independent professionals',
      
      // Personal information
      personalInfo: 'Personal Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      birthDate: 'Birth Date',
      nif: 'Tax Identification Number (NIF)',
      nationality: 'Nationality',
      mozambican: 'Mozambican',
      foreign: 'Foreign',
      
      // Address
      addressInfo: 'Address Information',
      address: 'Address',
      city: 'City',
      province: 'Province',
      postalCode: 'Postal Code',
      
      // Company information
      companyInfo: 'Company Information',
      companyName: 'Company Name',
      companyNuit: 'Company NUIT',
      companyActivity: 'Main Activity',
      companyAddress: 'Company Address',
      
      // Account information
      accountInfo: 'Account Information',
      initialDeposit: 'Initial Deposit',
      currency: 'Currency',
      mzn: 'Metical (MZN)',
      usd: 'US Dollar (USD)',
      
      // Security
      security: 'Security',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      terms: 'I accept the terms and conditions',
      termsLink: 'View terms and conditions',
      
      // Validations
      requiredField: 'Required field',
      invalidEmail: 'Invalid email',
      invalidPhone: 'Invalid phone number',
      passwordMismatch: 'Passwords do not match',
      minPassword: 'Password must be at least 8 characters',
      minDeposit: 'Minimum deposit: 500 MT',
      invalidNIF: 'Invalid NIF',
      invalidNUIT: 'Invalid NUIT',
      
      // Mozambique provinces
      provinces: {
        maputo: 'Maputo City',
        maputoProvince: 'Maputo Province',
        gaza: 'Gaza',
        inhambane: 'Inhambane',
        sofala: 'Sofala',
        manica: 'Manica',
        tete: 'Tete',
        zambezia: 'Zambezia',
        nampula: 'Nampula',
        caboDelgado: 'Cabo Delgado',
        niassa: 'Niassa'
      },
      
      // Success messages
      successTitle: 'Account Created Successfully!',
      successMessage: 'Your account has been created successfully. You will soon receive an email with instructions to activate your account.',
      goToLogin: 'Go to Login'
    }
  };

  const t = texts[language];

  // Províncias de Moçambique
  const provinces = Object.values(t.provinces);

  // Validações
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^8[2-7][0-9]{7}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateNIF = (nif: string) => {
    return nif.length === 9 && /^\d+$/.test(nif);
  };

  const validateNUIT = (nuit: string) => {
    return nuit.length === 9 && /^\d+$/.test(nuit);
  };

  // Atualizar dados do formulário
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Validar passo atual
  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return true; // Tipo de conta sempre válido
        
      case 2:
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.birthDate || !formData.nif || !formData.nationality) {
          alert(t.requiredField);
          return false;
        }
        if (!validateEmail(formData.email)) {
          alert(t.invalidEmail);
          return false;
        }
        if (!validatePhone(formData.phone)) {
          alert(t.invalidPhone);
          return false;
        }
        if (!validateNIF(formData.nif)) {
          alert(t.invalidNIF);
          return false;
        }
        return true;
        
      case 3:
        if (!formData.address || !formData.city || !formData.province || !formData.postalCode) {
          alert(t.requiredField);
          return false;
        }
        if (accountType === 'business' && (!formData.companyName || !formData.companyNuit || !formData.companyActivity || !formData.companyAddress)) {
          alert(t.requiredField);
          return false;
        }
        if (accountType === 'business' && !validateNUIT(formData.companyNuit)) {
          alert(t.invalidNUIT);
          return false;
        }
        return true;
        
      case 4:
        if (!formData.initialDeposit || parseFloat(formData.initialDeposit) < 500) {
          alert(t.minDeposit);
          return false;
        }
        return true;
        
      case 5:
        if (!formData.password || !formData.confirmPassword) {
          alert(t.requiredField);
          return false;
        }
        if (formData.password.length < 8) {
          alert(t.minPassword);
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          alert(t.passwordMismatch);
          return false;
        }
        if (!formData.termsAccepted) {
          alert(language === 'PT' ? 'Deve aceitar os termos e condições' : 'You must accept the terms and conditions');
          return false;
        }
        return true;
        
      default:
        return true;
    }
  };

  // Navegação entre passos
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Submeter formulário
  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    setIsLoading(true);
    
    try {
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Aqui você integraria com a API real do banco
      console.log('Dados da conta:', {
        // accountType,
        // ...formData
      });
      
      setCurrentStep(6); // Tela de sucesso
      
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      alert(language === 'PT' ? 'Erro ao criar conta' : 'Error creating account');
    } finally {
      setIsLoading(false);
    }
  };

  // Tela de sucesso
  if (currentStep === 6) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center py-8 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CiCircleCheck size={40} className="text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {t.successTitle}
            </h1>
            
            <p className="text-gray-600 mb-8">
              {t.successMessage}
            </p>
            
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              {t.goToLogin}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-600 to-gray-50 flex items-center justify-center py-8 px-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-red-600 p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <TbBuildingBank size={32} />
              <div>
                <h1 className="text-2xl font-bold">{t.title}</h1>
                <p className="text-red-100">{t.subtitle}</p>
              </div>
            </div>
            
            {/* Progress Steps */}
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4, 5].map(step => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === currentStep 
                      ? 'bg-white text-red-600' 
                      : step < currentStep 
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                  }`}>
                    {step < currentStep ? <CiCircleCheck size={16} /> : step}
                  </div>
                  {step < 5 && (
                    <div className={`w-12 h-1 mx-2 ${
                      step < currentStep ? 'bg-green-500' : 'bg-red-400'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Conteúdo do Formulário */}
          <div className="p-8">
            {/* Passo 1: Tipo de Conta */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.step1}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button
                    onClick={() => setAccountType('individual')}
                    className={`p-6 border-2 rounded-xl text-left transition-all ${
                      accountType === 'individual'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <CiUser size={32} className="mb-3" />
                    <h3 className="font-semibold text-lg mb-2">{t.individualAccount}</h3>
                    <p className="text-sm text-gray-600">{t.individualDescription}</p>
                  </button>
                  
                  <button
                    onClick={() => setAccountType('business')}
                    className={`p-6 border-2 rounded-xl text-left transition-all ${
                      accountType === 'business'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <TbBuildingBank size={32} className="mb-3" />
                    <h3 className="font-semibold text-lg mb-2">{t.businessAccount}</h3>
                    <p className="text-sm text-gray-600">{t.businessDescription}</p>
                  </button>
                </div>
              </div>
            )}

            {/* Passo 2: Informações Pessoais */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.personalInfo}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.firstName} *
                    </label>
                    <div className="relative">
                      <CiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.lastName} *
                    </label>
                    <div className="relative">
                      <CiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.email} *
                    </label>
                    <div className="relative">
                      <CiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.phone} *
                    </label>
                    <div className="relative">
                      <CiMobile3 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="82 123 4567"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.birthDate} *
                    </label>
                    <div className="relative">
                      <CiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.nif} *
                    </label>
                    <div className="relative">
                      <CiBank className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        value={formData.nif}
                        onChange={(e) => handleInputChange('nif', e.target.value)}
                        placeholder="123456789"
                        maxLength={9}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.nationality} *
                    </label>
                    <select
                      value={formData.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">{language === 'PT' ? 'Selecionar nacionalidade' : 'Select nationality'}</option>
                      <option value="mozambican">{t.mozambican}</option>
                      <option value="foreign">{t.foreign}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Passo 3: Endereço e Informações da Empresa */}
            {currentStep === 3 && (
              <div className="space-y-8">
                {/* Endereço Pessoal */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.addressInfo}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.address} *
                      </label>
                      <div className="relative">
                        <CiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.city} *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.province} *
                      </label>
                      <select
                        value={formData.province}
                        onChange={(e) => handleInputChange('province', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="">{language === 'PT' ? 'Selecionar província' : 'Select province'}</option>
                        {provinces.map(province => (
                          <option key={province} value={province}>{province}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.postalCode} *
                      </label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Informações da Empresa (apenas para conta empresarial) */}
                {accountType === 'business' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.companyInfo}</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.companyName} *
                        </label>
                        <div className="relative">
                          <TbBuildingBank className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.companyNuit} *
                        </label>
                        <div className="relative">
                          <CiBank className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            value={formData.companyNuit}
                            onChange={(e) => handleInputChange('companyNuit', e.target.value)}
                            placeholder="123456789"
                            maxLength={9}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.companyActivity} *
                        </label>
                        <input
                          type="text"
                          value={formData.companyActivity}
                          onChange={(e) => handleInputChange('companyActivity', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.companyAddress} *
                        </label>
                        <div className="relative">
                          <CiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            value={formData.companyAddress}
                            onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Passo 4: Informações da Conta */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.accountInfo}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.accountType} *
                    </label>
                    <select
                      value={formData.accountType}
                      onChange={(e) => handleInputChange('accountType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="current">{t.currentAccount}</option>
                      <option value="savings">{t.savingsAccount}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.currency} *
                    </label>
                    <select
                      value={formData.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="MZN">{t.mzn}</option>
                      <option value="USD">{t.usd}</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.initialDeposit} *
                    </label>
                    <div className="relative">
                      <CiBank className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="number"
                        value={formData.initialDeposit}
                        onChange={(e) => handleInputChange('initialDeposit', e.target.value)}
                        min="500"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{t.minDeposit}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Passo 5: Segurança */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.security}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.password} *
                    </label>
                    <div className="relative">
                      <CiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{t.minPassword}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.confirmPassword} *
                    </label>
                    <div className="relative">
                      <CiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700">
                        {t.terms}{' '}
                        <Link to="/terms" className="text-red-600 hover:text-red-700 underline">
                          {t.termsLink}
                        </Link>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navegação */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {t.previous}
              </button>

              {currentStep < 5 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  {t.next}
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>{t.loading}</span>
                    </>
                  ) : (
                    <span>{t.createAccount}</span>
                  )}
                </button>
              )}
            </div>

            {/* Link para login */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                {language === 'PT' ? 'Já tem uma conta?' : 'Already have an account?'}{' '}
                <Link to="/login" className="text-red-600 hover:text-red-700 font-medium">
                  {language === 'PT' ? 'Faça login' : 'Login'}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;