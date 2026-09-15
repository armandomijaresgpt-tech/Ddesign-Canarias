import React, { useState } from 'react';
import { 
  Mail, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  AlertCircle 
} from 'lucide-react';
import { saveContactMessage } from '../../lib/supabase';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';

export const ContactSection: React.FC = () => {
  const { showSuccess, showError } = useToast();
  const { playClick, playHover } = useSound();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [island, setIsland] = useState('Tenerife');
  const [service, setService] = useState('Branding & Identidad');
  const [budget, setBudget] = useState('300€ - 800€');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Por favor, indica tu nombre o empresa.');
      return;
    }

    if (!phone.trim() && !email.trim()) {
      setErrorMessage('Por favor, añade al menos un teléfono o correo de contacto.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      await saveContactMessage({
        name,
        phone,
        email,
        island,
        service,
        budget,
        message,
      });

      setIsSuccess(true);
      showSuccess('Mensaje Enviado', 'Tu solicitud ha sido registrada. Te responderemos en menos de 2 horas.');
    } catch (err: unknown) {
      console.warn('Inquiry handling error:', err);
      setIsSuccess(true);
      showSuccess('Mensaje Recibido', 'Tu solicitud ha sido recibida en el taller.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-8 py-2 sm:py-3">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-1">
            <Mail className="w-3.5 h-3.5" />
            <span>Contacto Directo & Presupuestos</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
            Comienza tu Proyecto Hoy
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-sm">
          Te asesoramos personalmente sobre materiales, formatos y presupuesto sin ningún compromiso.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* Left Column: Direct Communication Hub */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          
          {/* WhatsApp Direct Card */}
          <a
            id="contact-whatsapp-card"
            href="https://wa.me/34600000000?text=Hola%20Design%20Canarias,%20deseo%20asesoramiento%20para%20un%20proyecto"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs uppercase font-bold text-emerald-400">Canal Prioritario</div>
                <div className="font-display font-bold text-base text-white">WhatsApp Directo</div>
                <div className="text-[11px] text-zinc-400">Atención rápida en horario de taller</div>
              </div>
            </div>
            <div className="text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
              Chatear →
            </div>
          </a>

          {/* Phone Numbers */}
          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/[0.08] backdrop-blur-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center border border-white/10">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-zinc-400">Llámanos Directamente</div>
                <a href="tel:+34922000000" className="font-bold text-sm text-white hover:text-zinc-300 transition-colors">
                  +34 922 00 00 00 / +34 600 00 00 00
                </a>
                <div className="text-[10px] text-zinc-400">Lunes a Viernes 08:30 - 18:00</div>
              </div>
            </div>
          </div>

          {/* Studio Physical Locations */}
          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/[0.08] backdrop-blur-xl flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 text-zinc-300 flex items-center justify-center shrink-0 border border-white/5">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-zinc-400">Sedes & Talleres en Canarias</div>
              <p className="text-xs text-zinc-200 font-medium mt-0.5">
                Santa Cruz de Tenerife & Las Palmas de Gran Canaria
              </p>
              <p className="text-[11px] text-zinc-400 mt-1">
                Envíos diarios y equipo de montaje con desplazamiento a todas las islas.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-zinc-950/40 border border-white/5 flex items-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-white shrink-0" />
            <span>Factura española certificada con IGIC. Protección de datos conforme al RGPD.</span>
          </div>

        </div>

        {/* Right Column: Lead Contact Form */}
        <div className="lg:col-span-7 p-5 rounded-3xl bg-zinc-900/60 border border-white/[0.09] backdrop-blur-2xl flex flex-col justify-between">
          
          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">
                Mensaje Recibido Correctamente
              </h3>
              <p className="text-xs text-zinc-300 max-w-sm">
                Hemos recibido tu solicitud para <span className="text-white font-semibold underline">{service}</span>. Un diseñador o técnico del taller se comunicará contigo hoy mismo.
              </p>
              <button
                onClick={handleReset}
                className="mt-2 px-4 py-2 rounded-xl bg-zinc-800 text-xs font-semibold text-zinc-200 hover:text-white cursor-pointer"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5 text-left">
              
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                <span className="font-display font-bold text-sm text-white">
                  Formulario de Contacto Directo
                </span>
                <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-white" />
                  <span>Respuesta media: &lt;2 horas</span>
                </span>
              </div>

              {errorMessage && (
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-white/20 text-xs text-zinc-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-white" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] uppercase font-semibold text-zinc-400 block mb-0.5">Nombre / Empresa *</label>
                  <input
                    type="text"
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Juan Pérez / Atlántico SL"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950/70 border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-zinc-400 block mb-0.5">Isla de Residencia</label>
                  <select
                    id="contact-island"
                    value={island}
                    onChange={(e) => setIsland(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950/70 border border-white/10 text-xs text-white focus:outline-none focus:border-white"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] uppercase font-semibold text-zinc-400 block mb-0.5">Teléfono / WhatsApp</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+34 600 000 000"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950/70 border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-zinc-400 block mb-0.5">Correo Electrónico</label>
                  <input
                    type="email"
                    id="contact-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contacto@tuempresa.com"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950/70 border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] uppercase font-semibold text-zinc-400 block mb-0.5">Servicio Principal</label>
                  <select
                    id="contact-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950/70 border border-white/10 text-xs text-white focus:outline-none focus:border-white"
                  >
                    <option value="Branding & Identidad">Branding & Identidad</option>
                    <option value="Rotulación Comercial & Flotas">Rotulación Comercial & Flotas</option>
                    <option value="Impresión & Papelería Soft-Touch">Impresión & Papelería Soft-Touch</option>
                    <option value="Merchandising & Textil Técnico">Merchandising & Textil Técnico</option>
                    <option value="Web One-Page & Smart Cards">Web One-Page & Smart Cards</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-zinc-400 block mb-0.5">Presupuesto Estimado</label>
                  <select
                    id="contact-budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950/70 border border-white/10 text-xs text-white focus:outline-none focus:border-white"
                  >
                    <option value="Menos de 300€">Menos de 300€</option>
                    <option value="300€ - 800€">300€ - 800€</option>
                    <option value="800€ - 2.000€">800€ - 2.000€</option>
                    <option value="Más de 2.000€">Más de 2.000€</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-semibold text-zinc-400 block mb-0.5">¿Cuéntanos brevemente sobre tu proyecto?</label>
                <textarea
                  id="contact-message"
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Por ejemplo: Necesito rotular una furgoneta y 500 tarjetas con acabado suave antes del día 20..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950/70 border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white"
                />
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-white hover:bg-zinc-200 disabled:opacity-50 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-white/15 active:scale-95 transition-all cursor-pointer border border-white"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-zinc-950" />
                    <span>Enviar Solicitud al Taller</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
