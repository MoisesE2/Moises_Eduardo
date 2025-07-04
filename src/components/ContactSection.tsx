import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { useThemeStyles } from '../hooks/useThemeStyles';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import {
  FaWhatsapp,
  FaLinkedin,
  FaGithub
} from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

type SubmissionStatus = 'idle' | 'sending' | 'success' | 'error';

const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  const { isDark, getCardClasses, getInputClasses } = useThemeStyles();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      label: t('contact.info.email'),
      value: 'moises.eduardogc@gmail.com',
      href: 'mailto:moises.eduardogc@gmail.com'
    },
    {
      icon: PhoneIcon,
      label: t('contact.info.whatsapp'),
      value: '+55 (85) 99844-4203',
      href: 'https://wa.me/5585998444203'
    },
    {
      icon: MapPinIcon,
      label: t('contact.info.location'),
      value: t('contact.info.locationValue'),
      href: '#'
    },
    {
      icon: ClockIcon,
      label: t('contact.info.hours'),
      value: t('contact.info.hoursValue'),
      href: '#'
    }
  ];

  // Validação de email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validação de telefone
  const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  // Validação do formulário
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    // Validar email se fornecido
    if (formData.email.trim() && !isValidEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    // Validar telefone se fornecido
    if (formData.phone.trim() && !isValidPhone(formData.phone)) {
      newErrors.phone = 'Telefone inválido (mínimo 10 dígitos)';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Método para enviar via WhatsApp
  const sendWhatsAppMessage = (data: FormData): void => {
    const phone = '5585998444203'; // Seu número do WhatsApp
    
    // Construir informações de contato
    let contactInfo = '';
    if (data.email.trim()) {
      contactInfo += `Email: ${data.email.trim()}`;
    }
    if (data.phone.trim()) {
      if (contactInfo) contactInfo += '\n';
      contactInfo += `Telefone: ${data.phone.trim()}`;
    }
    
    // Construir mensagem
    let messageText = `Olá! Meu nome é ${data.name.trim()}.`;
    
    if (contactInfo) {
      messageText += `\n\n${contactInfo}`;
    }
    
    messageText += `\n\nMensagem: ${data.message.trim()}`;
    
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  // Método para enviar via Email como backup
  const sendEmailBackup = (data: FormData): void => {
    const subject = encodeURIComponent(`Contato do site - ${data.name}`);
    let contactInfo = '';
    if (data.email.trim()) {
      contactInfo += `Email: ${data.email.trim()}`;
    }
    if (data.phone.trim()) {
      if (contactInfo) contactInfo += '\n';
      contactInfo += `Telefone: ${data.phone.trim()}`;
    }
    
    let bodyText = `Nome: ${data.name}`;
    if (contactInfo) {
      bodyText += `\n${contactInfo}`;
    }
    bodyText += `\n\nMensagem:\n${data.message}`;
    
    const body = encodeURIComponent(bodyText);
    const mailtoUrl = `mailto:moises.eduardogc@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_blank');
  };

  // Envio do formulário (agora via WhatsApp)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmissionStatus('sending');
    setErrorMessage('');

    try {
      // Executar diretamente sem delay para evitar popup blocker
      sendWhatsAppMessage(formData);
      
      // Aguardar um pouco para mostrar o feedback
      setTimeout(() => {
        setSubmissionStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
      }, 500);
    } catch (error) {
      console.error('Erro ao redirecionar para WhatsApp:', error);
      setSubmissionStatus('error');
      setErrorMessage('Erro ao abrir WhatsApp. Tente uma das opções alternativas abaixo.');
    }
  };

  // Mudança nos inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Reset do formulário
  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setErrors({});
    setSubmissionStatus('idle');
    setErrorMessage('');
  };

  // Envio via WhatsApp direto
  const handleWhatsAppDirect = () => {
    if (!validateForm()) return;
    sendWhatsAppMessage(formData);
  };

  // Envio via Email backup
  const handleEmailBackup = () => {
    if (!validateForm()) return;
    sendEmailBackup(formData);
  };

  return (
    <section id="contato" className={`relative py-24 overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-b from-black to-gray-900' 
        : 'bg-gradient-to-b from-gray-50 to-white'
    }`} ref={ref}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {t('contact.title')}
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className={`transition-all duration-1000 delay-200 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className={`rounded-3xl p-8 ${
              isDark 
                ? 'bg-gray-900/50 border border-gray-700/50' 
                : 'bg-white/80 border border-gray-200 shadow-lg'
            }`}>
              <h3 className={`text-2xl font-bold mb-8 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>{t('contact.info.title')}</h3>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className={`flex items-center p-4 rounded-xl transition-colors ${
                      isDark 
                        ? 'bg-gray-800/50 hover:bg-gray-800' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <info.icon className="w-6 h-6 text-purple-400 mr-4" />
                    <div>
                      <div className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>{info.label}</div>
                      <div className={`${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>{info.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="flex space-x-4">
                <a href="https://wa.me/5585998444203" className="p-3 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                  <FaWhatsapp className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/moises-e2/" className="p-3 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
                  <FaLinkedin className="w-6 h-6" />
                </a>
                <a href="https://github.com/MoisesE2" className="p-3 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-colors">
                  <FaGithub className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-400 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className={`rounded-3xl p-8 ${
              isDark 
                ? 'bg-gray-900/50 border border-gray-700/50' 
                : 'bg-white/80 border border-gray-200 shadow-lg'
            }`}>
              {submissionStatus === 'success' ? (
                <div className="text-center">
                  <FaWhatsapp className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>{t('contact.form.success')}</h3>
                  <p className={`mb-6 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>{t('contact.form.successMessage')}</p>
                  <button
                    onClick={resetForm}
                    className={`px-6 py-2 rounded-lg transition-colors ${
                      isDark 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                    }`}
                  >
                    {t('contact.form.newMessage')}
                  </button>
                </div>
              ) : (
                <>
                  <h3 className={`text-2xl font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>{t('contact.form.title')}</h3>
                  
                  {submissionStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <ExclamationTriangleIcon className="w-5 h-5 text-red-400 mr-2" />
                        <span className="text-red-400 font-medium">{t('contact.form.error')}</span>
                      </div>
                      <p className="text-red-300 text-sm mb-4">{errorMessage}</p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={handleWhatsAppDirect}
                          className="flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                        >
                          <FaWhatsapp className="w-4 h-4 mr-2" />
                          {t('contact.form.tryAgain')}
                        </button>
                        <button
                          onClick={handleEmailBackup}
                          className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                        >
                          <EnvelopeIcon className="w-4 h-4 mr-2" />
                          {t('contact.form.useEmail')}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t('contact.form.namePlaceholder')}
                        className={`w-full px-4 py-3 rounded-lg focus:outline-none transition-colors ${
                          isDark 
                            ? 'bg-gray-800/50 text-white placeholder-gray-400' 
                            : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                        } ${
                          errors.name 
                            ? 'border border-red-500 focus:border-red-400' 
                            : isDark 
                              ? 'border border-gray-600 focus:border-purple-500' 
                              : 'border border-gray-300 focus:border-purple-500'
                        }`}
                        required
                      />
                      {errors.name && (
                        <p className="mt-1 text-red-400 text-sm">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t('contact.form.emailPlaceholder')}
                        className={`w-full px-4 py-3 rounded-lg focus:outline-none transition-colors ${
                          isDark 
                            ? 'bg-gray-800/50 text-white placeholder-gray-400' 
                            : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                        } ${
                          errors.email 
                            ? 'border border-red-500 focus:border-red-400' 
                            : isDark 
                              ? 'border border-gray-600 focus:border-purple-500' 
                              : 'border border-gray-300 focus:border-purple-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-red-400 text-sm">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={t('contact.form.phonePlaceholder')}
                        className={`w-full px-4 py-3 rounded-lg focus:outline-none transition-colors ${
                          isDark 
                            ? 'bg-gray-800/50 text-white placeholder-gray-400' 
                            : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                        } ${
                          errors.phone 
                            ? 'border border-red-500 focus:border-red-400' 
                            : isDark 
                              ? 'border border-gray-600 focus:border-purple-500' 
                              : 'border border-gray-300 focus:border-purple-500'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-red-400 text-sm">{errors.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t('contact.form.messagePlaceholder')}
                        rows={5}
                        className={`w-full px-4 py-3 rounded-lg focus:outline-none resize-none transition-colors ${
                          isDark 
                            ? 'bg-gray-800/50 text-white placeholder-gray-400' 
                            : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                        } ${
                          errors.message 
                            ? 'border border-red-500 focus:border-red-400' 
                            : isDark 
                              ? 'border border-gray-600 focus:border-purple-500' 
                              : 'border border-gray-300 focus:border-purple-500'
                        }`}
                        required
                      />
                      {errors.message && (
                        <p className="mt-1 text-red-400 text-sm">{errors.message}</p>
                      )}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={submissionStatus === 'sending'}
                      className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:opacity-50"
                    >
                      {submissionStatus === 'sending' ? (
                        <>
                          <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                          {t('contact.form.sending')}
                        </>
                      ) : (
                        <>
                          <FaWhatsapp className="w-5 h-5 mr-2" />
                          {t('contact.form.send')}
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 