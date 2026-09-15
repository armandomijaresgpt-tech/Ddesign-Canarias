import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  LogIn, 
  User, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  UserPlus,
  Building,
  MapPin,
  Phone,
  LayoutDashboard
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useSound } from '../context/SoundContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
  onNavigateToProfile?: () => void;
}

const CANARY_ISLANDS = [
  'Tenerife',
  'Gran Canaria',
  'Lanzarote',
  'Fuerteventura',
  'La Palma',
  'La Gomera',
  'El Hierro',
];

export const LoginModal: React.FC<LoginModalProps> = ({ 
  isOpen, 
  onClose, 
  onLoginSuccess,
  onNavigateToProfile 
}) => {
  const { showSuccess } = useToast();
  const { playClick, playHover } = useSound();

  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'profile'>('login');

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regCompany, setRegCompany] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regIsland, setRegIsland] = useState('Tenerife');

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (email.includes('@') && password.length >= 4) {
        setSuccessMessage('¡Bienvenido! Accediendo a tu panel de pedidos...');
        showSuccess('Sesión Iniciada', 'Acceso autorizado al portal de Design Canarias.');
        setTimeout(() => {
          setSuccessMessage(null);
          onClose();
          if (onNavigateToProfile) onNavigateToProfile();
          else if (onLoginSuccess) onLoginSuccess();
        }, 900);
      } else {
        setError('Introduce un correo válido y una clave de al menos 4 caracteres.');
      }
    }, 500);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!regName.trim() || !regEmail.includes('@') || regPassword.length < 4) {
      setError('Por favor completa los campos obligatorios (*).');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Save local profile data
      try {
        const profileData = {
          fullName: regName,
          company: regCompany || regName,
          phone: regPhone,
          email: regEmail,
          island: regIsland,
        };
        localStorage.setItem('designcanarias_user_profile', JSON.stringify(profileData));
      } catch {
        // local storage fallback
      }

      setSuccessMessage('¡Cuenta creada con éxito! Configurando tu panel...');
      showSuccess('Registro Completado', `Bienvenido a Design Canarias PRO, ${regName}.`);
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
        if (onNavigateToProfile) onNavigateToProfile();
        else if (onLoginSuccess) onLoginSuccess();
      }, 900);
    }, 600);
  };

  const handleDemoLogin = (role: 'cliente' | 'taller') => {
    setError(null);
    setIsLoading(true);
    if (role === 'cliente') {
      setEmail('cliente.demo@designcanarias.com');
      setPassword('demo1234');
    } else {
      setEmail('taller.canarias@sasorilabs.io');
      setPassword('master2026');
    }

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(role === 'cliente' ? 'Acceso Cliente Demo Verificado' : 'Acceso Maestro Taller Autorizado');
      showSuccess(
        role === 'cliente' ? 'Cliente Demo' : 'Maestro Taller',
        'Cargando tablero y proyectos...'
      );
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
        if (onNavigateToProfile) onNavigateToProfile();
        else if (onLoginSuccess) onLoginSuccess();
      }, 700);
    }, 450);
  };

  const handleDirectToProfile = () => {
    playClick();
    onClose();
    if (onNavigateToProfile) {
      onNavigateToProfile();
    } else if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
          {/* Backdrop click */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-lg p-5 sm:p-6 rounded-3xl bg-zinc-950 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(255,255,255,0.06)] text-left z-10 overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            {/* Ambient top light sheen */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />

            {/* Close Button */}
            <button
              id="close-login-modal-btn"
              onClick={onClose}
              className="btn-haptic-dark absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-20"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header with Title and Mode Tabs */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-white/20 flex items-center justify-center text-white shadow-inner shrink-0">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-lg text-white tracking-tight">
                    Mi Panel PRO
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-white font-bold uppercase tracking-wider border border-white/20">
                    Canarias
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  Acceso a pedidos en taller, datos fiscales y seguimiento
                </p>
              </div>
            </div>

            {/* Tabs Selector: Iniciar Sesión / Registrarse / Ver Perfil */}
            <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-zinc-900/90 border border-white/10 mb-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => { playClick(); setActiveTab('login'); setError(null); }}
                className={`py-1.5 px-2 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'login' 
                    ? 'bg-white text-zinc-950 font-bold shadow-sm' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <LogIn className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Iniciar Sesión</span>
              </button>

              <button
                type="button"
                onClick={() => { playClick(); setActiveTab('register'); setError(null); }}
                className={`py-1.5 px-2 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'register' 
                    ? 'bg-white text-zinc-950 font-bold shadow-sm' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Registrarse</span>
              </button>

              <button
                type="button"
                onClick={() => { playClick(); setActiveTab('profile'); setError(null); }}
                className={`py-1.5 px-2 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'profile' 
                    ? 'bg-white text-zinc-950 font-bold shadow-sm' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Ir al Perfil</span>
              </button>
            </div>

            {successMessage ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 flex flex-col items-center justify-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">{successMessage}</h4>
                <p className="text-xs text-zinc-400 max-w-xs">
                  Redirigiendo de forma segura a tu espacio de trabajo...
                </p>
              </motion.div>
            ) : (
              <>
                {error && (
                  <div className="mb-3 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* TAB 1: INICIAR SESIÓN */}
                {activeTab === 'login' && (
                  <form onSubmit={handleLoginSubmit} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Correo Electrónico *</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tuempresa@canarias.com"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/15 focus:border-white text-white text-xs placeholder:text-zinc-600 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Contraseña *</span>
                        </label>
                        <a 
                          href="https://wa.me/34600000000?text=Hola%20necesito%20recuperar%20mi%20clave%20de%20Mi%20Panel" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] text-zinc-400 hover:text-white transition-colors"
                        >
                          ¿Olvidaste clave?
                        </a>
                      </div>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/15 focus:border-white text-white text-xs placeholder:text-zinc-600 focus:outline-none transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-haptic w-full py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs sm:text-sm tracking-tight flex items-center justify-center gap-2 shadow-md shadow-white/20 cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? (
                        <span>Verificando...</span>
                      ) : (
                        <>
                          <span>Iniciar Sesión en Mi Panel</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    {/* Quick Demo Access Badges */}
                    <div className="pt-2.5 border-t border-white/[0.08]">
                      <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-2 text-center">
                        Acceso Rápido Demostración
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleDemoLogin('cliente')}
                          className="btn-haptic-dark px-2.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <FileCheck className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Demo Cliente</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDemoLogin('taller')}
                          className="btn-haptic-dark px-2.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Demo Taller</span>
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* TAB 2: REGISTRARSE */}
                {activeTab === 'register' && (
                  <form onSubmit={handleRegisterSubmit} className="space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1">
                          <User className="w-3 h-3 text-zinc-400" />
                          <span>Nombre Completo *</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="Ej. Carla Rodríguez"
                          className="w-full px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-white/15 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1">
                          <Building className="w-3 h-3 text-zinc-400" />
                          <span>Empresa o Marca</span>
                        </label>
                        <input
                          type="text"
                          value={regCompany}
                          onChange={(e) => setRegCompany(e.target.value)}
                          placeholder="Ej. Grupo Atlántico S.L."
                          className="w-full px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-white/15 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-zinc-400" />
                          <span>Teléfono (WhatsApp) *</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          placeholder="+34 600 000 000"
                          className="w-full px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-white/15 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-zinc-400" />
                          <span>Isla de Residencia</span>
                        </label>
                        <select
                          value={regIsland}
                          onChange={(e) => setRegIsland(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-white/15 text-white text-xs focus:outline-none focus:border-white"
                        >
                          {CANARY_ISLANDS.map((isl) => (
                            <option key={isl} value={isl} className="bg-zinc-950 text-white">
                              {isl}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-zinc-300">Correo Electrónico *</label>
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="contacto@empresa.es"
                        className="w-full px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-white/15 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-zinc-300">Crear Contraseña *</label>
                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Mínimo 4 caracteres"
                        className="w-full px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-white/15 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-haptic w-full py-2.5 mt-1 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs sm:text-sm tracking-tight flex items-center justify-center gap-2 shadow-md shadow-white/20 cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? (
                        <span>Registrando...</span>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          <span>Crear Cuenta & Abrir Mi Panel</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* TAB 3: IR DIRECTO AL PERFIL */}
                {activeTab === 'profile' && (
                  <div className="py-2 space-y-3">
                    <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Acceso Instantáneo al Perfil</span>
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                          1 Pedido Activo
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400">
                        Puedes consultar directamente tu pedido en fabricación, facturas con desglose IGIC y actualizar tus datos de envío sin esperas.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleDirectToProfile}
                      className="btn-haptic w-full py-3 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-white/20 cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-zinc-950" />
                      <span>Ir Directo a Mi Panel PRO</span>
                      <ArrowRight className="w-4 h-4 text-zinc-950" />
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Sesión persistente en este dispositivo</span>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-center gap-1 text-[11px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Conexión cifrada SSL · Taller y Servidores en Canarias</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

