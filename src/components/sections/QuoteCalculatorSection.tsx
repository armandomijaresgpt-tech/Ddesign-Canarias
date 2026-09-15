import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Calculator, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Info, 
  AlertCircle,
  RotateCcw,
  Zap
} from 'lucide-react';
import { saveQuoteInquiry } from '../../lib/supabase';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';
import { QuoteStepper } from '../QuoteStepper';
import { Tooltip } from '../Tooltip';

interface QuoteCalculatorSectionProps {
  initialServiceId?: string;
}

interface ServicePricingConfig {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  options: { label: string; multiplier: number; turnaround: string }[];
}

const SERVICE_CONFIGS: Record<string, ServicePricingConfig> = {
  'diseno-grafico': {
    id: 'diseno-grafico',
    name: 'Diseño Gráfico Profesional',
    category: 'Diseño',
    basePrice: 95,
    options: [
      { label: 'Logotipo Vectorial + Guía de Color Básica', multiplier: 1.0, turnaround: '48h-72h' },
      { label: 'Identidad Completa: Logotipo + Manual + RRSS + Papelería', multiplier: 1.8, turnaround: '5-7 días' },
      { label: 'Diseño Urgente de Cartelería / Dossier Publicitario', multiplier: 1.3, turnaround: '24h Express' },
    ],
  },
  'impresiones': {
    id: 'impresiones',
    name: 'Impresiones Pequeño & Gran Formato',
    category: 'Impresión',
    basePrice: 49,
    options: [
      { label: '500 Flyers A6 o 250 Tarjetas de Visita 350g', multiplier: 1.0, turnaround: '24h-48h' },
      { label: 'Lona Publicitaria PVC Exterior Gran Formato (hasta 6m²)', multiplier: 2.4, turnaround: '48h-72h' },
      { label: '1.000 Folletos Dípticos Plegados Alta Definición', multiplier: 2.1, turnaround: '48h' },
    ],
  },
  'rotulacion': {
    id: 'rotulacion',
    name: 'Rotulación Comercial & Espacios',
    category: 'Rotulación',
    basePrice: 145,
    options: [
      { label: 'Vinilo Escaparate / Cristalera Comercial hasta 4m²', multiplier: 1.0, turnaround: '48h-72h' },
      { label: 'Rótulo Comercial Fachada (Bandeja aluminio o LED)', multiplier: 2.8, turnaround: '4-5 días' },
      { label: 'Rotulación Integral de Furgoneta Comercial con Montaje', multiplier: 3.8, turnaround: '3-4 días' },
    ],
  },
  'papeleria': {
    id: 'papeleria',
    name: 'Papelería Corporativa Premium',
    category: 'Papelería',
    basePrice: 39,
    options: [
      { label: '250 Tarjetas Soft-Touch 400g con Laminado Mate', multiplier: 1.0, turnaround: '48h' },
      { label: '500 Tarjetas Soft-Touch 600g + Canto Tintado / Foil', multiplier: 1.9, turnaround: '72h' },
      { label: 'Pack Corporativo: 100 Carpetas Troqueladas + 250 Hojas', multiplier: 3.2, turnaround: '4 días' },
    ],
  },
  'merchandising': {
    id: 'merchandising',
    name: 'Merchandising & Regalos Publicitarios',
    category: 'Promoción',
    basePrice: 65,
    options: [
      { label: '36 Tazas Cerámicas Sublimadas Alta Durabilidad', multiplier: 1.0, turnaround: '4-5 días' },
      { label: '100 Bolígrafos Metálicos con Grabado Láser', multiplier: 1.4, turnaround: '3-4 días' },
      { label: 'Pack Evento: 100 Lanyards + 50 Botellas Térmicas', multiplier: 3.5, turnaround: '5 días' },
    ],
  },
  'vinilos-adhesivos': {
    id: 'vinilos-adhesivos',
    name: 'Vinilos Decorativos & Pegatinas',
    category: 'Adhesivos',
    basePrice: 29,
    options: [
      { label: '100 Pegatinas Troqueladas Troquel Digital Anti-UV', multiplier: 1.0, turnaround: '24h-48h' },
      { label: 'Vinilo de Corte Decorativo Paredes o Escaparate (3m²)', multiplier: 2.2, turnaround: '48h' },
      { label: 'Vinilo Microperforado Homologado para Cristales (4m²)', multiplier: 2.9, turnaround: '48h' },
    ],
  },
  'personalizacion': {
    id: 'personalizacion',
    name: 'Personalización de Productos & Textil',
    category: 'Textil',
    basePrice: 45,
    options: [
      { label: '20 Camisetas Algodón Peinado 190g con Impresión DTF', multiplier: 1.0, turnaround: '4 días' },
      { label: '50 Camisetas DTF + 25 Gorras Bordadas Técnicas', multiplier: 2.4, turnaround: '5 días' },
      { label: 'Lote Ropa Laboral: 15 Polos Técnicos + 15 Chalecos', multiplier: 3.1, turnaround: '5 días' },
    ],
  },
  'eventos': {
    id: 'eventos',
    name: 'Invitaciones & Material para Eventos',
    category: 'Eventos',
    basePrice: 55,
    options: [
      { label: '50 Invitaciones en Papel Texturado Exclusivo + Sobres', multiplier: 1.0, turnaround: '3-4 días' },
      { label: 'Photocall Completo 2.5x2m con Estructura Desmontable', multiplier: 2.6, turnaround: '48h-72h' },
      { label: 'Pack Boda / Congreso: Minutas, Seating Plan y Roll-up', multiplier: 3.0, turnaround: '4 días' },
    ],
  },
};

// Primary distinct service keys from designcanarias.com/service
const PRIMARY_SERVICE_KEYS = [
  'diseno-grafico',
  'impresiones',
  'rotulacion',
  'papeleria',
  'merchandising',
  'vinilos-adhesivos',
  'personalizacion',
  'eventos',
];

// Aliases to avoid breaking existing links or initial parameters
SERVICE_CONFIGS['branding'] = SERVICE_CONFIGS['diseno-grafico'];
SERVICE_CONFIGS['impresion'] = SERVICE_CONFIGS['impresiones'];
SERVICE_CONFIGS['digital'] = SERVICE_CONFIGS['diseno-grafico'];

const CANARY_ISLANDS = [
  'Tenerife',
  'Gran Canaria',
  'Lanzarote',
  'Fuerteventura',
  'La Palma',
  'La Gomera',
  'El Hierro',
];

export const QuoteCalculatorSection: React.FC<QuoteCalculatorSectionProps> = ({
  initialServiceId = 'diseno-grafico',
}) => {
  const resolvedServiceId = SERVICE_CONFIGS[initialServiceId] ? initialServiceId : 'diseno-grafico';
  const [selectedService, setSelectedService] = useState<string>(resolvedServiceId);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number>(0);
  const [expressDelivery, setExpressDelivery] = useState<boolean>(false);
  const [premiumFinish, setPremiumFinish] = useState<boolean>(false);

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [island, setIsland] = useState('Tenerife');
  const [notes, setNotes] = useState('');

  // Status handling
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { showQuoteSaved, showError, showSuccess } = useToast();
  const { playClick, playHover } = useSound();

  const currentConfig = SERVICE_CONFIGS[selectedService] || SERVICE_CONFIGS.branding;
  const currentOption = currentConfig.options[selectedOptionIdx] || currentConfig.options[0];

  // Dynamic Price Math
  const rawTotal = Math.round(
    currentConfig.basePrice * currentOption.multiplier * (premiumFinish ? 1.25 : 1) + (expressDelivery ? 45 : 0)
  );

  // Gamification & Completion Progress Math
  const step1Service = Boolean(selectedService);
  const step2Option = selectedOptionIdx >= 0;
  const step3Client = name.trim().length >= 2;
  const step4Contact = (phone.trim().length >= 6) || (email.includes('@') && email.includes('.'));
  const hasBothContact = (phone.trim().length >= 6) && (email.includes('@') && email.includes('.'));
  const hasExtraNotes = notes.trim().length > 0;

  // Calculate percentage (0 - 100)
  let progressScore = 0;
  if (step1Service) progressScore += 25;
  if (step2Option) progressScore += 25;
  if (step3Client) progressScore += 25;
  if (step4Contact) progressScore += 25;

  const currentStepNumber = !step1Service ? 1 : !step2Option ? 2 : (!step3Client || !island) ? 3 : 4;

  const handleStepClick = (stepNum: number) => {
    playClick();
    if (stepNum === 1) {
      document.getElementById('quote-step-1-service')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (stepNum === 2) {
      document.getElementById('quote-step-2-specs')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (stepNum === 3) {
      const el = document.getElementById('quote-input-name');
      el?.focus();
      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (stepNum === 4) {
      const el = document.getElementById('quote-input-phone');
      el?.focus();
      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const isFullPrecision = progressScore === 100;

  // Gamification tier labels
  let gamificationBadge = 'Nivel 1: Configuración Inicial';
  let gamificationColor = 'text-zinc-400';
  if (progressScore === 50) {
    gamificationBadge = 'Nivel 2: Especificación Técnica Lista';
    gamificationColor = 'text-amber-400';
  } else if (progressScore === 75) {
    gamificationBadge = 'Nivel 3: Proyecto Calificado al 75%';
    gamificationColor = 'text-sky-400';
  } else if (progressScore === 100) {
    gamificationBadge = 'Nivel Maestro: Cotización 100% Completa · Prioridad Taller ⚡';
    gamificationColor = 'text-emerald-400';
  }

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedOptionIdx(0);
  };

  const handleTriggerConfetti = () => {
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#EF4444', '#DC2626', '#FFFFFF', '#10B981'],
      });
    } catch {
      // safe fallback
    }
  };

  const generateWhatsAppMessage = () => {
    const text = `*SOLICITUD DE COTIZACIÓN - DESIGN CANARIAS*
----------------------------------------
*Servicio:* ${currentConfig.name}
*Especificación:* ${currentOption.label}
*Acabados Especiales:* ${premiumFinish ? 'SÍ (Foil / Barniz 3D)' : 'Estándar'}
*Urgente 48h:* ${expressDelivery ? 'SÍ (Prioritario)' : 'Estándar'}
*Isla de Entrega:* ${island}
*Estimación Aproximada:* ~${rawTotal}€ (sin IGIC)
----------------------------------------
*Cliente:* ${name || 'Sin especificar'}
*Teléfono:* ${phone || 'Sin especificar'}
*Email:* ${email || 'Sin especificar'}
${notes ? `*Notas:* ${notes}` : ''}`;

    return encodeURIComponent(text);
  };

  const handleWhatsAppDirect = () => {
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/34600000000?text=${message}`, '_blank');
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Por favor ingresa tu nombre o el de tu empresa.');
      return;
    }
    if (!phone.trim() && !email.trim()) {
      setErrorMessage('Por favor facilítanos al menos un teléfono o correo electrónico para enviarte la propuesta formal.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await saveQuoteInquiry({
        service_id: selectedService,
        sub_type: currentOption.label,
        quantity: 1,
        express: expressDelivery,
        premium_finish: premiumFinish,
        client_name: name,
        island: island,
        phone: phone,
        email: email,
        notes: notes,
        estimated_total: rawTotal,
      });

      if (result.success) {
        setIsSuccess(true);
        handleTriggerConfetti();
        showQuoteSaved(
          'Cotización Guardada',
          `Presupuesto formal de ${currentConfig.name} registrado (~${rawTotal}€ para ${island}).`
        );
      } else {
        const err = result.error || 'Error al procesar la solicitud. Intenta por WhatsApp.';
        setErrorMessage(err);
        showError('No se pudo guardar', err);
      }
    } catch (err: any) {
      const errMsg = err?.message || 'Error de conexión. Puedes contactarnos por WhatsApp directamente.';
      setErrorMessage(errMsg);
      showError('Error de red', errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setErrorMessage(null);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1 sm:py-2">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 mb-1.5">
        <div>
          <h2 className="font-display font-extrabold text-lg sm:text-xl lg:text-2xl text-white tracking-tight">
            Cotizador Express en 60 Segundos
          </h2>
        </div>
        <p className="text-[10.5px] sm:text-xs text-zinc-400 max-w-sm">
          Calcula al instante tu inversión estimada con tarifas transparentes y envío prioritario a cualquier isla.
        </p>
      </div>

      {isSuccess ? (
        /* Success State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-white/20 text-center max-w-xl mx-auto my-auto backdrop-blur-2xl"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
            ¡Cotización Registrada con Éxito!
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1.5">
            Gracias <span className="text-white font-semibold">{name}</span>. Nuestro equipo de producción en Canarias revisará tu proyecto de <span className="text-white font-semibold underline">{currentConfig.name}</span> y te responderá en menos de 2 horas.
          </p>

          <div className="mt-3 p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-zinc-300 text-left space-y-1">
            <div><strong className="text-white">Estimación:</strong> ~{rawTotal}€</div>
            <div><strong className="text-white">Configuración:</strong> {currentOption.label}</div>
            <div><strong className="text-white">Isla:</strong> {island}</div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-2.5 justify-center">
            <button
              onClick={handleWhatsAppDirect}
              className="btn-haptic-emerald px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Agilizar por WhatsApp Directo</span>
            </button>
            <button
              onClick={handleReset}
              className="btn-haptic-dark px-5 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Hacer otra cotización</span>
            </button>
          </div>
        </motion.div>
      ) : (
        /* Main Calculator Layout */
        <div className="flex flex-col gap-1.5 sm:gap-2">
          
          {/* Interactive Stepper for Quote Progress */}
          <QuoteStepper
            currentStep={currentStepNumber}
            onStepClick={handleStepClick}
            step1Complete={step1Service}
            step2Complete={step2Option}
            step3Complete={step3Client}
            step4Complete={step4Contact}
            progressScore={progressScore}
            rawTotal={rawTotal}
            serviceName={currentConfig.name}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-3 items-start">
          
          {/* Left Column: Selectors */}
          <div className="lg:col-span-7 flex flex-col gap-2 sm:gap-2.5">
            
            {/* 1. Category Switcher */}
            <div id="quote-step-1-service">
              <label className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                1. Selecciona el Tipo de Proyecto:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-1.5">
                {PRIMARY_SERVICE_KEYS.map((key) => {
                  const svc = SERVICE_CONFIGS[key];
                  if (!svc) return null;
                  const isSelected = svc.id === selectedService;
                  return (
                    <button
                      key={svc.id}
                      id={`quote-svc-tab-${svc.id}`}
                      type="button"
                      onClick={() => handleServiceChange(svc.id)}
                      className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white border-white text-zinc-950 font-bold shadow-sm ring-1 ring-white'
                          : 'bg-zinc-950/60 border-white/5 text-zinc-400 hover:text-white hover:border-white/15'
                      }`}
                    >
                      <div className="text-[10.5px] sm:text-[11px] truncate font-semibold">{svc.name}</div>
                      <div className={`text-[8.5px] truncate ${isSelected ? 'text-zinc-700' : 'text-zinc-500'}`}>{svc.category}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Package / Volume Selector */}
            <div id="quote-step-2-specs">
              <label className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                2. Especificación / Volumen:
              </label>
              <div className="flex flex-col gap-1 sm:gap-1.5">
                {currentConfig.options.map((opt, idx) => {
                  const isSelected = selectedOptionIdx === idx;
                  return (
                    <button
                      key={idx}
                      id={`quote-option-${idx}`}
                      type="button"
                      onClick={() => setSelectedOptionIdx(idx)}
                      className={`flex items-center justify-between py-1.5 px-2.5 sm:py-2 sm:px-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white text-zinc-950 border-white shadow-md font-semibold'
                          : 'bg-zinc-950/40 border-white/5 text-zinc-300 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-zinc-950 bg-zinc-950' : 'border-zinc-700'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="text-[11px] sm:text-xs font-medium">{opt.label}</span>
                      </div>
                      <span className={`text-[9.5px] font-mono pl-2 shrink-0 ${isSelected ? 'text-zinc-700' : 'text-zinc-400'}`}>
                        {opt.turnaround}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Addon Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
              <label 
                className={`flex items-center justify-between py-1.5 px-2.5 rounded-xl border cursor-pointer select-none transition-colors ${
                  premiumFinish 
                    ? 'bg-white/10 border-white/30 text-white' 
                    : 'bg-zinc-950/40 border-white/5 text-zinc-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={premiumFinish}
                    onChange={(e) => setPremiumFinish(e.target.checked)}
                    className="accent-white w-3.5 h-3.5"
                  />
                  <div>
                    <div className="text-[11px] font-semibold text-zinc-200">Acabado Especial</div>
                    <div className="text-[9px] text-zinc-400">Foil / Relieve 3D / Tintado</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-white">+25%</span>
              </label>

              <label 
                className={`flex items-center justify-between py-1.5 px-2.5 rounded-xl border cursor-pointer select-none transition-colors ${
                  expressDelivery 
                    ? 'bg-white/10 border-white/30 text-white' 
                    : 'bg-zinc-950/40 border-white/5 text-zinc-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={expressDelivery}
                    onChange={(e) => setExpressDelivery(e.target.checked)}
                    className="accent-white w-3.5 h-3.5"
                  />
                  <div>
                    <div className="text-[11px] font-semibold text-zinc-200">Producción Express 48h</div>
                    <div className="text-[9px] text-zinc-400">Prioridad taller Canarias</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-white">+45€</span>
              </label>
            </div>

            {/* 4. Island Selector */}
            <div>
              <label className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                Isla de Entrega o Montaje:
              </label>
              <div className="flex flex-wrap gap-1">
                {CANARY_ISLANDS.map((isl) => (
                  <button
                    key={isl}
                    id={`island-btn-${isl.toLowerCase().replace(' ', '-')}`}
                    type="button"
                    onClick={() => setIsland(isl)}
                    className={`px-2 py-0.5 rounded-lg text-[10.5px] font-medium transition-all cursor-pointer ${
                      island === isl
                        ? 'bg-white text-zinc-950 font-bold shadow-sm'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {isl}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Price Card & Fast Lead Capture Form */}
          <div className="lg:col-span-5 p-3 sm:p-4 rounded-2xl bg-zinc-900/70 border border-white/[0.09] backdrop-blur-2xl shadow-xl flex flex-col justify-between">
            
            {/* Live Tally Banner */}
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 sm:pb-2.5">
                <div>
                  <span className="text-[9.5px] uppercase font-bold text-zinc-400 tracking-wider">
                    Inversión Estimada
                  </span>
                  <div className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight flex items-baseline gap-1">
                    <span>~{rawTotal}€</span>
                    <span className="text-[10px] font-normal text-zinc-400">+ IGIC</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9.5px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{expressDelivery ? '48h Express' : currentOption.turnaround}</span>
                  </span>
                  <span className="text-[9px] text-zinc-400">Garantía taller canario</span>
                </div>
              </div>

              {/* Form inputs */}
              <form onSubmit={handleSubmitInquiry} className="mt-2.5 space-y-1.5 text-left">
                
                {errorMessage && (
                  <div className="p-1.5 rounded-lg bg-zinc-900 border border-white/20 text-zinc-200 text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-white" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <input
                    type="text"
                    id="quote-input-name"
                    placeholder="Tu nombre o empresa *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-950/80 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    type="tel"
                    id="quote-input-phone"
                    placeholder="Teléfono (WhatsApp)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-950/80 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-white transition-colors"
                  />
                  <input
                    type="email"
                    id="quote-input-email"
                    placeholder="Correo corporativo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-950/80 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    id="quote-input-notes"
                    placeholder="Detalles adicionales (dimensiones, colores, etc.)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-950/80 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                {/* Direct Actions */}
                <div className="pt-1.5 flex flex-col gap-1.5">
                  {/* WhatsApp Instant 1-Click */}
                  <Tooltip content="Envía la cotización configurada por WhatsApp directo a nuestro taller en Canarias" position="top" className="w-full">
                    <button
                      type="button"
                      id="quote-btn-whatsapp"
                      onClick={handleWhatsAppDirect}
                      className="btn-haptic-emerald w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Enviar a WhatsApp Directo (1 Clic)</span>
                    </button>
                  </Tooltip>

                  {/* Save Inquiry formally */}
                  <Tooltip content="Genera solicitud oficial con cálculo de IGIC y respuesta garantizada en menos de 2h" position="top" className="w-full">
                    <button
                      type="submit"
                      id="quote-btn-submit"
                      disabled={isLoading}
                      className="btn-haptic-red w-full py-2 px-3 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/30 active:scale-95 transition-all cursor-pointer border border-red-500/50"
                    >
                      {isLoading ? (
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-3 h-3 text-white" />
                          <span>Solicitar Presupuesto Formal Oficial</span>
                        </>
                      )}
                    </button>
                  </Tooltip>
                </div>

              </form>
            </div>

            <div className="mt-2 pt-1.5 border-t border-white/5 flex items-center justify-between text-[9.5px] text-zinc-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Sin compromiso
              </span>
              <span>Respuesta en &lt;2h laborables</span>
            </div>

          </div>

        </div>
        </div>
      )}

    </div>
  );
};
