import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Package, 
  History, 
  Settings, 
  CheckCircle2, 
  Clock, 
  Truck, 
  FileText, 
  MapPin, 
  Phone, 
  Mail, 
  Building2, 
  ArrowRight, 
  Download, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  Save,
  AlertCircle,
  Layers,
  ChevronRight
} from 'lucide-react';
import { UserProfile, OrderItemDetail, NavSection } from '../../types';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';

interface DashboardSectionProps {
  onNavigate: (section: NavSection) => void;
  onSelectServiceForQuote?: (serviceId: string) => void;
}

const STORAGE_USER_KEY = 'designcanarias_user_profile';

const DEFAULT_PROFILE: UserProfile = {
  id: 'usr_sasori_8941',
  fullName: 'Alejandro Mijares',
  username: 'amijares@sasorilabs.io',
  email: 'amijares@sasorilabs.io',
  phone: '+34 622 45 89 12',
  shippingAddress: {
    street: 'Calle Castillo 42, Planta 3, Oficina B',
    city: 'Santa Cruz de Tenerife',
    postalCode: '38002',
    island: 'Tenerife',
    additionalNotes: 'Horario comercial 09:00 a 18:00h. Contactar al timbre Sasorilabs.'
  },
  clientCode: 'CLI-TFE-2026',
  verifiedTaxStatus: true,
  registeredDate: 'Enero 2026'
};

const INITIAL_CURRENT_ORDER: OrderItemDetail = {
  id: 'ord_active_01',
  orderNumber: 'DC-2026-8942',
  serviceName: 'Tarjetas Ejecutivas Soft-Touch 600g',
  specification: '500 uds con Canto Tintado Rojo y Barniz 3D Selectivo',
  quantity: '500 unidades',
  finish: 'Laminado Soft-Touch mate de tacto terciopelo + stamping rojo',
  totalPrice: 165.85,
  igicRate: 7,
  createdAt: '10 Sep 2026',
  estimatedDelivery: '16 Sep 2026 (11:30h)',
  status: 'corte_acabados',
  deliveryType: 'Envío Interinsular Rápido',
  shippingAddress: 'Calle Castillo 42, Planta 3, 38002 Santa Cruz de Tenerife',
  invoiceNumber: 'FAC-2026-0894',
  progressPercent: 65,
  trackingHistory: [
    {
      stage: '1. Preimpresión & Validación',
      timestamp: '10 Sep · 09:30h',
      completed: true,
      description: 'Archivos vectoriales revisados y aprobados por jefe de taller.'
    },
    {
      stage: '2. Impresión Offset HD',
      timestamp: '11 Sep · 14:15h',
      completed: true,
      description: 'Tirada de 600g calibrada bajo perfil color FOGRA39.'
    },
    {
      stage: '3. Corte & Acabados de Lujo',
      timestamp: 'En curso',
      completed: false,
      description: 'Aplicación de canto tintado rojo carmín y curado UV de barniz.'
    },
    {
      stage: '4. Control de Calidad Canario',
      timestamp: 'Pendiente',
      completed: false,
      description: 'Inspección de tolerancias y embalaje protector anti-humedad.'
    },
    {
      stage: '5. Envío Interinsular',
      timestamp: 'Estimado 16 Sep',
      completed: false,
      description: 'Mensajería prioritaria con entrega garantizada en mano.'
    }
  ]
};

const ORDER_HISTORY: OrderItemDetail[] = [
  {
    id: 'ord_hist_01',
    orderNumber: 'DC-2026-7210',
    serviceName: 'Rotulación Integral de Furgoneta',
    specification: 'Diseño e instalación sobre Ford Transit Custom (Flota Logística)',
    quantity: '1 vehículo',
    finish: 'Vinilo fundido polimérico anti-UV con laminado protector salitre',
    totalPrice: 790.00,
    igicRate: 7,
    createdAt: '18 Jul 2026',
    estimatedDelivery: '22 Jul 2026',
    status: 'entregado',
    deliveryType: 'Recogida en Taller (Santa Cruz)',
    shippingAddress: 'Taller Central Polígono Los Majuelos, Nave 4',
    invoiceNumber: 'FAC-2026-0612',
    progressPercent: 100,
    trackingHistory: []
  },
  {
    id: 'ord_hist_02',
    orderNumber: 'DC-2026-6540',
    serviceName: 'Cápsula Textil: 100 Camisetas DTF',
    specification: 'Algodón peinado 220g negro con estampado DTF frontal y trasero',
    quantity: '100 unidades',
    finish: 'Doble pase de blanco, tacto extra-suave y planchado térmico',
    totalPrice: 850.00,
    igicRate: 7,
    createdAt: '03 Jun 2026',
    estimatedDelivery: '08 Jun 2026',
    status: 'entregado',
    deliveryType: 'Envío Interinsular Rápido',
    shippingAddress: 'Calle Castillo 42, Santa Cruz de Tenerife',
    invoiceNumber: 'FAC-2026-0489',
    progressPercent: 100,
    trackingHistory: []
  },
  {
    id: 'ord_hist_03',
    orderNumber: 'DC-2026-5120',
    serviceName: 'Lona Gran Formato Microperforada',
    specification: 'Lona de 6x3m para fachada exterior con ollaos de policarbonato',
    quantity: '1 unidad (18 m²)',
    finish: 'Resistente a ráfagas de viento y radiación solar continua',
    totalPrice: 385.00,
    igicRate: 7,
    createdAt: '12 Abr 2026',
    estimatedDelivery: '15 Abr 2026',
    status: 'entregado',
    deliveryType: 'Envío Interinsular Rápido',
    shippingAddress: 'Avenida Marítima 18, Las Palmas de Gran Canaria',
    invoiceNumber: 'FAC-2026-0310',
    progressPercent: 100,
    trackingHistory: []
  }
];

export const DashboardSection: React.FC<DashboardSectionProps> = ({
  onNavigate,
  onSelectServiceForQuote,
}) => {
  const { showSuccess } = useToast();
  const { playClick, playHover } = useSound();

  const [activeTab, setActiveTab] = useState<'current' | 'history' | 'profile'>('current');
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [selectedHistoryOrder, setSelectedHistoryOrder] = useState<OrderItemDetail | null>(null);

  // Profile edit form state
  const [fullName, setFullName] = useState(DEFAULT_PROFILE.fullName);
  const [username, setUsername] = useState(DEFAULT_PROFILE.username);
  const [email, setEmail] = useState(DEFAULT_PROFILE.email);
  const [phone, setPhone] = useState(DEFAULT_PROFILE.phone);
  const [street, setStreet] = useState(DEFAULT_PROFILE.shippingAddress.street);
  const [city, setCity] = useState(DEFAULT_PROFILE.shippingAddress.city);
  const [postalCode, setPostalCode] = useState(DEFAULT_PROFILE.shippingAddress.postalCode);
  const [island, setIsland] = useState(DEFAULT_PROFILE.shippingAddress.island);
  const [notes, setNotes] = useState(DEFAULT_PROFILE.shippingAddress.additionalNotes || '');

  const [isSaving, setIsSaving] = useState(false);

  // Load saved profile on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USER_KEY);
      if (saved) {
        const parsed: UserProfile = JSON.parse(saved);
        setUserProfile(parsed);
        setFullName(parsed.fullName);
        setUsername(parsed.username);
        setEmail(parsed.email);
        setPhone(parsed.phone);
        setStreet(parsed.shippingAddress.street);
        setCity(parsed.shippingAddress.city);
        setPostalCode(parsed.shippingAddress.postalCode);
        setIsland(parsed.shippingAddress.island);
        setNotes(parsed.shippingAddress.additionalNotes || '');
      }
    } catch {
      // safe fallback
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setIsSaving(true);

    const updatedProfile: UserProfile = {
      ...userProfile,
      fullName,
      username,
      email,
      phone,
      shippingAddress: {
        street,
        city,
        postalCode,
        island,
        additionalNotes: notes,
      },
    };

    setTimeout(() => {
      setUserProfile(updatedProfile);
      try {
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(updatedProfile));
      } catch {
        // ignore
      }
      setIsSaving(false);
      showSuccess(
        'Perfil Actualizado',
        'Tus datos personales y dirección de entrega se han guardado correctamente.'
      );
    }, 600);
  };

  const handleDownloadInvoice = (invoiceNumber?: string) => {
    playClick();
    showSuccess(
      'Descargando Documento',
      `Factura oficial con IGIC desglose (${invoiceNumber || 'FAC-OFICIAL.pdf'}) generada correctamente.`
    );
  };

  const handleReorder = (order: OrderItemDetail) => {
    playClick();
    if (onSelectServiceForQuote) {
      onSelectServiceForQuote('impresion');
    }
    onNavigate('cotizador');
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
      
      {/* Top Banner Profile Summary Bar */}
      <div className="w-full p-4 sm:p-5 rounded-3xl bg-zinc-900/80 border border-white/15 backdrop-blur-2xl mb-4 sm:mb-6 shadow-xl relative overflow-hidden">
        {/* Subtle red accent glow for Sasorilabs tech identity */}
        <div className="absolute top-0 right-0 w-80 h-32 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-zinc-950 border border-white/20 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg shadow-black/80">
                {fullName.charAt(0)}
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-zinc-950 flex items-center justify-center" title="Cuenta Verificada">
                <CheckCircle2 className="w-2.5 h-2.5 text-zinc-950 stroke-[3]" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                  {fullName}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 uppercase tracking-wider font-semibold">
                  {userProfile.clientCode}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Factura Oficial IGIC (Canarias)
                </span>
              </div>
              <p className="text-xs text-zinc-400 flex items-center gap-3 mt-1">
                <span>@{username}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  {island}
                </span>
                <span>•</span>
                <span className="hidden sm:inline">{phone}</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="px-3.5 py-2 rounded-2xl bg-black/40 border border-white/10 text-left">
              <span className="text-[10px] uppercase text-zinc-400 block">Pedido Actual</span>
              <span className="font-display font-extrabold text-sm text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                En Taller (65%)
              </span>
            </div>
            <div className="px-3.5 py-2 rounded-2xl bg-black/40 border border-white/10 text-left">
              <span className="text-[10px] uppercase text-zinc-400 block">Historial</span>
              <span className="font-display font-extrabold text-sm text-white">
                3 Proyectos
              </span>
            </div>
            <button
              onClick={() => {
                playClick();
                onNavigate('cotizador');
              }}
              className="px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-red-600/30 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nuevo Pedido</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-start gap-2 mb-4 border-b border-white/10 pb-2 overflow-x-auto">
        <button
          onClick={() => {
            playClick();
            setActiveTab('current');
          }}
          onMouseEnter={playHover}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'current'
              ? 'bg-white text-zinc-950 shadow-md font-bold'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Pedido en Curso (Activo)</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </button>

        <button
          onClick={() => {
            playClick();
            setActiveTab('history');
          }}
          onMouseEnter={playHover}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'history'
              ? 'bg-white text-zinc-950 shadow-md font-bold'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Historial de Pedidos</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300">
            {ORDER_HISTORY.length}
          </span>
        </button>

        <button
          onClick={() => {
            playClick();
            setActiveTab('profile');
          }}
          onMouseEnter={playHover}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-white text-zinc-950 shadow-md font-bold'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Datos Personales & Entrega</span>
        </button>
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        
        {/* TAB 1: CURRENT ORDER IN PRODUCTION */}
        {activeTab === 'current' && (
          <motion.div
            key="tab-current"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start"
          >
            {/* Left Card: Order Spec & Live Production Timeline */}
            <div className="lg:col-span-8 p-5 sm:p-6 rounded-3xl bg-zinc-900/80 border border-white/15 backdrop-blur-xl shadow-xl flex flex-col gap-5">
              
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                      Fase 3: Corte & Acabados
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      Ref: #{INITIAL_CURRENT_ORDER.orderNumber}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                    {INITIAL_CURRENT_ORDER.serviceName}
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1">
                    {INITIAL_CURRENT_ORDER.specification}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase text-zinc-400">Total Facturado</span>
                  <div className="text-xl sm:text-2xl font-black text-white">
                    {INITIAL_CURRENT_ORDER.totalPrice.toFixed(2)}€
                    <span className="text-[10px] text-zinc-400 font-normal ml-1">(+7% IGIC)</span>
                  </div>
                </div>
              </div>

              {/* Live Production Progress Track */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-zinc-300 font-medium">Progreso Global de Fabricación:</span>
                  <span className="font-mono font-bold text-emerald-400">{INITIAL_CURRENT_ORDER.progressPercent}%</span>
                </div>
                <div className="w-full h-2.5 bg-zinc-950 rounded-full overflow-hidden border border-white/10 p-[1px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${INITIAL_CURRENT_ORDER.progressPercent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-white shadow-[0_0_12px_rgba(16,185,129,0.7)]"
                  />
                </div>
              </div>

              {/* Detailed 5-Step Interactive Timeline */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                  Línea de Vida en el Taller de Canarias
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {INITIAL_CURRENT_ORDER.trackingHistory.map((step, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-2xl border flex flex-col justify-between transition-all ${
                        step.completed
                          ? 'bg-white/5 border-emerald-500/40 text-zinc-200'
                          : idx === 2
                            ? 'bg-red-500/10 border-red-500/50 text-white shadow-lg shadow-red-500/10'
                            : 'bg-zinc-950/40 border-white/5 text-zinc-500'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider">Paso 0{idx + 1}</span>
                          {step.completed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : idx === 2 ? (
                            <Clock className="w-3.5 h-3.5 text-red-400 animate-spin" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-zinc-700" />
                          )}
                        </div>
                        <h4 className="text-xs font-bold leading-tight mb-1 text-white">
                          {step.stage.split('.')[1] || step.stage}
                        </h4>
                        <p className="text-[10px] text-zinc-400 leading-snug line-clamp-2">
                          {step.description}
                        </p>
                      </div>
                      <span className="text-[9px] font-mono text-zinc-400 mt-2 block border-t border-white/5 pt-1">
                        {step.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Card: Shipping & Logistics Box */}
            <div className="lg:col-span-4 p-5 sm:p-6 rounded-3xl bg-zinc-900/80 border border-white/15 backdrop-blur-xl shadow-xl flex flex-col justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-white" />
                  <span>Logística de Entrega Canario</span>
                </h4>

                <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-2 mb-4">
                  <div className="text-[11px] text-zinc-400 flex items-center justify-between">
                    <span>Modalidad:</span>
                    <strong className="text-white">{INITIAL_CURRENT_ORDER.deliveryType}</strong>
                  </div>
                  <div className="text-[11px] text-zinc-400 flex items-center justify-between">
                    <span>Entrega Estimada:</span>
                    <strong className="text-emerald-400">{INITIAL_CURRENT_ORDER.estimatedDelivery}</strong>
                  </div>
                  <div className="text-[11px] text-zinc-400 flex items-start justify-between gap-2 border-t border-white/5 pt-2">
                    <span className="shrink-0">Destino:</span>
                    <span className="text-white text-right text-[11px]">{street}, {city} ({island})</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => handleDownloadInvoice(INITIAL_CURRENT_ORDER.invoiceNumber)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/15 transition-all cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Descargar Factura Oficial IGIC</span>
                  </button>

                  <a
                    href="https://wa.me/34600000000?text=Hola%2C%20quisiera%20consultar%20el%20estado%20de%20mi%20pedido%20DC-2026-8942"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-semibold text-xs flex items-center justify-center gap-2 border border-emerald-500/30 transition-all cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Consultar con Taller por WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-zinc-400">
                <span className="text-white font-semibold block mb-0.5">Control de Calidad:</span>
                Garantía oficial contra decoloración por salitre y tolerancia de corte industrial inferior a 0.5mm.
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: ORDER HISTORY WITH FULL DETAILS */}
        {activeTab === 'history' && (
          <motion.div
            key="tab-history"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {ORDER_HISTORY.map((order) => (
                <div
                  key={order.id}
                  className="p-4 sm:p-5 rounded-3xl bg-zinc-900/80 border border-white/10 hover:border-white/25 transition-all backdrop-blur-xl flex flex-col justify-between gap-4 shadow-lg group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                        Entregado
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono">
                        #{order.orderNumber}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base text-white group-hover:text-zinc-200 transition-colors">
                      {order.serviceName}
                    </h4>

                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {order.specification}
                    </p>

                    <div className="mt-3 p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-zinc-300 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Fecha:</span>
                        <span>{order.createdAt}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Factura:</span>
                        <span className="font-mono text-zinc-300">{order.invoiceNumber}</span>
                      </div>
                      <div className="flex justify-between font-bold text-white border-t border-white/5 pt-1">
                        <span>Total IGIC incl.:</span>
                        <span>{order.totalPrice.toFixed(2)}€</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleDownloadInvoice(order.invoiceNumber)}
                      className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Factura</span>
                    </button>
                    <button
                      onClick={() => handleReorder(order)}
                      className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-red-600/20 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Repetir</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                Todas las facturas cumplen con el régimen fiscal canario (IGIC 7% exento de aranceles de importación).
              </span>
              <button
                onClick={() => handleDownloadInvoice('HISTORICO_COMPLETO_2026.zip')}
                className="text-white hover:underline flex items-center gap-1 font-semibold cursor-pointer shrink-0"
              >
                <span>Descargar Todas las Facturas (.ZIP)</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}

        {/* TAB 3: EDIT PERSONAL INFORMATION & DELIVERY ADDRESS */}
        {activeTab === 'profile' && (
          <motion.div
            key="tab-profile"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 sm:p-7 rounded-3xl bg-zinc-900/80 border border-white/15 backdrop-blur-xl shadow-xl max-w-3xl mx-auto w-full"
          >
            <div className="border-b border-white/10 pb-4 mb-5">
              <h3 className="font-display font-extrabold text-xl text-white">
                Información Personal y Dirección de Envío
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Actualiza tus datos para que los albaranes y entregas en cualquier isla de Canarias se efectúen sin demoras.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
              
              {/* Row 1: Nombre de la persona & Nombre de usuario / Empresa */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 block mb-1.5">
                    Nombre de la Persona (Contacto):
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej: Alejandro Mijares"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-white/15 focus:border-red-500 focus:outline-none text-white text-xs transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 block mb-1.5">
                    Nombre de Usuario / Empresa:
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Ej: Sasorilabs Canarias"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-white/15 focus:border-red-500 focus:outline-none text-white text-xs transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Correo electrónico & Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 block mb-1.5">
                    Correo Electrónico Oficial:
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="correo@empresa.com"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-white/15 focus:border-red-500 focus:outline-none text-white text-xs transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 block mb-1.5">
                    Número de Teléfono Móvil (Avisos de Taller):
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+34 600 00 00 00"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-white/15 focus:border-red-500 focus:outline-none text-white text-xs transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Dirección de Entrega & Isla */}
              <div className="border-t border-white/10 pt-3">
                <span className="text-xs font-bold uppercase tracking-wider text-white block mb-2.5">
                  Dirección de Entrega Predeterminada
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                      Calle, Número, Piso / Polígono y Nave:
                    </label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Ej: Calle Castillo 42, Planta 3"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-white/15 focus:border-red-500 focus:outline-none text-white text-xs transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                      Isla de Canarias:
                    </label>
                    <select
                      value={island}
                      onChange={(e) => setIsland(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-white/15 focus:border-red-500 focus:outline-none text-white text-xs transition-colors"
                    >
                      <option value="Tenerife">Tenerife</option>
                      <option value="Gran Canaria">Gran Canaria</option>
                      <option value="Lanzarote">Lanzarote</option>
                      <option value="Fuerteventura">Fuerteventura</option>
                      <option value="La Palma">La Palma</option>
                      <option value="La Gomera">La Gomera</option>
                      <option value="El Hierro">El Hierro</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                      Municipio / Ciudad:
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Santa Cruz de Tenerife"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-white/15 focus:border-red-500 focus:outline-none text-white text-xs transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                      Código Postal:
                    </label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="38002"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-white/15 focus:border-red-500 focus:outline-none text-white text-xs transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                    Indicaciones para el Transportista (Opcional):
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Horario de entrega, timbre, muelle de carga, etc."
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-950/80 border border-white/15 focus:border-red-500 focus:outline-none text-white text-xs transition-colors"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-red-600/30 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Guardar Modificaciones de Perfil</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};
