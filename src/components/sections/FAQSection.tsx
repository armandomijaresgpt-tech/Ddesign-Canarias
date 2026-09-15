import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  ChevronDown, 
  Copy, 
  Check, 
  Mail, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  Calculator, 
  ShieldCheck, 
  Layers, 
  Search, 
  Clock, 
  Truck, 
  FileCheck,
  Building2,
  ArrowRight
} from 'lucide-react';
import { NavSection } from '../../types';
import { useSound } from '../../context/SoundContext';
import { useToast } from '../../context/ToastContext';
import { SideScrollMenu } from '../ui/SideScrollMenu';

interface FAQItem {
  id: string;
  category: 'servicios' | 'proceso' | 'taller' | 'envios';
  categoryLabel: string;
  question: string;
  answer: string;
  keyPoints?: string[];
  ctaType?: 'cotizador' | 'whatsapp' | 'email';
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'servicios',
    categoryLabel: 'Diseño & Branding',
    question: '¿Qué entregables incluye el servicio de Diseño Gráfico y Branding?',
    answer: 'Entregamos un ecosistema gráfico completo listo para imprenta y entornos digitales. Incluye archivos vectoriales maestros (.AI, .EPS, .SVG), versiones en alta definición (.PDF/X y .PNG con transparencia), código de paleta cromática (CMYK, RGB, HEX y Pantone), tipografías con licencias y un Brandbook o Manual de Identidad de 15+ páginas con normas de convivencia visual y casos de aplicación.',
    keyPoints: [
      'Formatos vectoriales escalables al infinito sin pérdida de resolución.',
      'Perfiles de color adaptados a cuatricromía y pantallas retina.',
      'Manual de uso para rótulos, uniformes, vehículos y papelería.'
    ],
    ctaType: 'cotizador'
  },
  {
    id: 'faq-2',
    category: 'proceso',
    categoryLabel: 'Proceso de Contratación',
    question: '¿Cómo funciona el proceso de reserva y contratación de un proyecto?',
    answer: 'El flujo de trabajo consta de 4 fases simplificadas: 1) Configuras y calculas tu presupuesto en nuestro Cotizador Express (o nos envías tu briefing). 2) Te emitimos factura proforma oficial con desglose IGIC del 7% y confirmamos las especificaciones. 3) Con el abono del 50% en concepto de anticipo, asignamos tu orden al equipo de diseño o taller. 4) Presentamos las propuestas o pruebas de preimpresión para tu validación antes del pase a producción final.',
    keyPoints: [
      'Presupuesto cerrado sin costes ocultos ni sorpresas.',
      'Pruebas digitales de preimpresión siempre incluidas antes de imprimir.',
      'Garantía de entrega con calendario fijado desde el primer día.'
    ],
    ctaType: 'cotizador'
  },
  {
    id: 'faq-3',
    category: 'taller',
    categoryLabel: 'Taller & Producción',
    question: '¿Cuáles son los plazos estándar de fabricación en taller?',
    answer: 'Al contar con taller propio en Santa Cruz de Tenerife y delegación en Las Palmas de Gran Canaria, controlamos el 100% de la cadena sin intermediarios externos. Los plazos habituales son: Papelería corporativa y tarjetas: 48-72 horas. Textil técnico DTF y bordados: 3-5 días laborables. Rótulos corpóreos y cajas de luz: 5-8 días laborables. Disponemos además de servicio Fast-Track 24h para tiradas urgentes.',
    keyPoints: [
      'Producción 100% en las islas, eliminando semanas de aduanas marítimas.',
      'Servicio de corte y confección textil en taller propio.',
      'Turno de emergencia Fast-Track para eventos y aperturas inminentes.'
    ],
    ctaType: 'whatsapp'
  },
  {
    id: 'faq-4',
    category: 'envios',
    categoryLabel: 'Envíos & Logística',
    question: '¿Realizan envíos y montaje de rótulos en todas las Islas Canarias?',
    answer: 'Sí. Cubrimos el 100% del archipiélago: Tenerife, Gran Canaria, Lanzarote, Fuerteventura, La Palma, La Gomera y El Hierro. Los envíos se gestionan mediante paquetería express interinsular con trazabilidad en 24/48 horas. Para rótulos corpóreos, rotulación de flotas y escaparates comerciales, disponemos de brigadas propias de instaladores homologados que se desplazan a tu local.',
    keyPoints: [
      'Entregas de mercancía en 24h entre Tenerife y Gran Canaria.',
      'Embalajes reforzados para soportar transporte marítimo y aéreo.',
      'Montadores propios con seguro de responsabilidad civil y trabajo en altura.'
    ],
    ctaType: 'whatsapp'
  },
  {
    id: 'faq-5',
    category: 'proceso',
    categoryLabel: 'Fiscalidad & Facturación',
    question: '¿La facturación aplica régimen canario con IGIC oficial?',
    answer: 'Absolutamente. Emitimos Factura Electrónica y Factura Oficial con Registro de Operadores Económicos Canarios aplicando el IGIC reglamentario (7% general, o tipo reducido si aplica según actividad empresarial). Evitas trámites de DUA continental, aranceles imprevistos de importación o retenciones aduaneras.',
    keyPoints: [
      'Factura deducible con desglose oficial de IGIC.',
      'Cero incidencias aduaneras: mercancía fabricada íntegramente en Canarias.',
      'Acceso instantáneo a tus facturas y albaranes en Mi Panel PRO.'
    ],
    ctaType: 'email'
  },
  {
    id: 'faq-6',
    category: 'taller',
    categoryLabel: 'Calidad & Clima Canario',
    question: '¿Cómo garantizan que los materiales resistan el sol y el salitre costero de las islas?',
    answer: 'El clima canario impone una radiación ultravioleta muy elevada y una alta salinidad marina en zonas turísticas. En Sasorilabs empleamos exclusivamente vinilos poliméricos y fundición de alta durabilidad (Avery / 3M) con sobrelaminado UV anti-cristalización, tintas solventes/látex ecológicas resistentes a la decoloración y perfiles de aluminio marino con lacado al horno inoxidable.',
    keyPoints: [
      'Tintas certificadas Greenguard resistentes a 5+ años de intemperie.',
      'Tornillería en acero inoxidable A4 calidad marina contra el óxido.',
      'Laminado mate o brillo con filtro de bloqueo solar ultravioleta.'
    ],
    ctaType: 'cotizador'
  },
  {
    id: 'faq-7',
    category: 'servicios',
    categoryLabel: 'Archivos & Preimpresión',
    question: 'Si ya tengo mi propio diseño o logotipo, ¿en qué formato debo enviarlo?',
    answer: 'Aceptamos archivos en PDF de alta resolución (estándar PDF/X-1a o PDF/X-4), Adobe Illustrator (.AI), EPS o TIFF a escala 1:1 con un mínimo de 300 DPI y espacio de color CMYK. Los textos deben estar convertidos a curvas o trazados y con un sangrado perimetral de al menos 3 mm. Si tu logotipo actual tiene baja calidad o es un JPG pixelado, nuestro estudio puede vectorizarlo y redibujarlo con precisión matemática.',
    keyPoints: [
      'Revisión técnica de archivos sin coste adicional previo a la impresión.',
      'Servicio opcional de vectorización y restauración de logotipos antiguos.',
      'Envío de prueba digital rip de preimpresión para tu visto bueno formal.'
    ],
    ctaType: 'email'
  },
  {
    id: 'faq-8',
    category: 'proceso',
    categoryLabel: 'Pagos & Facilidades',
    question: '¿Cuáles son las formas de pago aceptadas y condiciones para empresas?',
    answer: 'Aceptamos transferencia bancaria, Bizum profesional y tarjeta de crédito/débito con TPV virtual seguro. Para pedidos estándar se abona un 50% a la confirmación de la orden y el 50% restante a la notificación de fin de fabricación. Para empresas registradas y clientes corporativos con cuenta PRO recurrente, habilitamos pago diferido a 30 días previa validación crediticia.',
    keyPoints: [
      'Pasarela de pago cifrada con validación 3D Secure.',
      'Bizum profesional instantáneo para acelerar la entrada a máquinas.',
      'Línea de facturación mensual consolidada para clientes habituales.'
    ],
    ctaType: 'whatsapp'
  }
];

interface FAQSectionProps {
  onNavigate?: (section: NavSection) => void;
  onSelectServiceForQuote?: (serviceId: string) => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  onNavigate,
  onSelectServiceForQuote
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': true
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { playClick, playHover } = useSound();
  const { showSuccess } = useToast();

  const toggleItem = (id: string) => {
    playClick();
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedField(label);
      showSuccess(
        `¡${label} copiado con éxito!`,
        `${text} se ha copiado al portapapeles listo para usar.`
      );
      setTimeout(() => setCopiedField(null), 2500);
    } catch (err) {
      showSuccess(`Copiado: ${text}`, 'Listo en tu portapapeles');
    }
  };

  const categories = [
    { id: 'todas', label: 'Todas las Preguntas' },
    { id: 'servicios', label: 'Diseño & Branding' },
    { id: 'proceso', label: 'Proceso & Reserva' },
    { id: 'taller', label: 'Taller & Producción' },
    { id: 'envios', label: 'Envíos & Logística' }
  ];

  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'todas' || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div 
      id="faq-section-container"
      className="w-full min-h-full flex flex-col justify-start sm:justify-center max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 sm:py-2.5"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5">
        <div>
          <h2 className="font-display font-extrabold text-base sm:text-xl lg:text-2xl text-white tracking-tight">
            Preguntas Frecuentes
          </h2>
        </div>

        {/* Studio Direct Contact Quick Copy Pill */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            id="faq-copy-email-top-btn"
            type="button"
            onClick={() => copyToClipboard('info@designcanarias.com', 'Email del Estudio')}
            onMouseEnter={playHover}
            className="btn-haptic-dark flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-[10.5px] sm:text-xs text-zinc-200 hover:text-white transition-all cursor-pointer shadow-sm"
            title="Copiar correo: info@designcanarias.com"
          >
            {copiedField === 'Email del Estudio' ? (
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-400" />
            )}
            <span className="font-semibold">Copiar Email</span>
            <span className="text-[10px] text-zinc-400 hidden md:inline">info@designcanarias.com</span>
          </button>

          <button
            id="faq-copy-phone-top-btn"
            type="button"
            onClick={() => copyToClipboard('+34 922 00 00 00', 'Teléfono del Taller')}
            onMouseEnter={playHover}
            className="btn-haptic-dark hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-xs text-zinc-200 hover:text-white transition-all cursor-pointer shadow-sm"
            title="Copiar teléfono: +34 922 00 00 00"
          >
            {copiedField === 'Teléfono del Taller' ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
            )}
            <span className="font-semibold">+34 922 00 00 00</span>
          </button>
        </div>
      </div>

      {/* Main Container Grid: Accordion Column + Quick Support Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-4 items-start">
        
        {/* Left / Primary Column: Filters + Accordion */}
        <div className="lg:col-span-8 flex flex-col gap-2 sm:gap-2.5">
          
          {/* Controls Bar: Category Filter Pills & Search Input */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-zinc-900/60 border border-white/[0.08] backdrop-blur-xl">
            {/* Category Filter Pills with High-End Side Scrolling & Branded Red Scrollbar */}
            <div className="w-full sm:flex-1 min-w-0">
              <SideScrollMenu
                id="faq-categories-scroller"
                showArrows={true}
                showScrollbar={true}
                className="pb-1"
              >
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    id={`faq-cat-btn-${cat.id}`}
                    onClick={() => {
                      playClick();
                      setActiveCategory(cat.id);
                    }}
                    onMouseEnter={playHover}
                    className={`btn-haptic-dark px-2.5 sm:px-3 py-1 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                      activeCategory === cat.id
                        ? 'bg-white text-zinc-950 font-bold shadow-sm shadow-white/10'
                        : 'bg-zinc-950/60 text-zinc-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </SideScrollMenu>
            </div>

            {/* Quick Search Box */}
            <div className="relative w-full sm:w-48">
              <Search className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-400 absolute left-2 sm:left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input 
                type="text"
                placeholder="Buscar duda..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-7 sm:pl-8 pr-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl bg-zinc-950/80 border border-white/10 text-[11px] sm:text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors h-7 sm:h-8"
              />
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-2 max-h-[58vh] sm:max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-zinc-900/40 border border-white/5">
                <HelpCircle className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-white">No se encontraron resultados</p>
                <p className="text-xs text-zinc-400 mt-1">Prueba con otra palabra clave o restablece los filtros.</p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('todas');
                    setSearchQuery('');
                  }}
                  className="mt-3 px-3 py-1 rounded-xl bg-zinc-800 text-xs text-zinc-200 hover:text-white"
                >
                  Ver todas las preguntas
                </button>
              </div>
            ) : (
              filteredItems.map((item) => {
                const isOpen = !!expandedItems[item.id];
                return (
                  <div
                    key={item.id}
                    id={item.id}
                    className="rounded-2xl bg-zinc-900/70 border border-white/[0.08] hover:border-white/20 transition-all overflow-hidden backdrop-blur-xl"
                  >
                    {/* Question Trigger Bar */}
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      onMouseEnter={playHover}
                      className="w-full flex items-center justify-between p-3 sm:p-3.5 text-left cursor-pointer transition-colors hover:bg-white/[0.02]"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-2.5 pr-2">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isOpen ? 'bg-white text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-400'
                        }`}>
                          <span className="text-[11px] font-bold">?</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                              {item.categoryLabel}
                            </span>
                          </div>
                          <h3 className="text-xs sm:text-sm font-bold text-white font-display leading-snug">
                            {item.question}
                          </h3>
                        </div>
                      </div>

                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-white/15 text-white' : 'bg-zinc-800/80 text-zinc-400'
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Answer Accordion Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 sm:px-4 pb-3.5 pt-1 border-t border-white/[0.06] text-xs text-zinc-300">
                            <p className="leading-relaxed">
                              {item.answer}
                            </p>

                            {/* Key Bullet Highlights */}
                            {item.keyPoints && (
                              <div className="mt-2.5 pt-2 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {item.keyPoints.map((point, pIdx) => (
                                  <div 
                                    key={pIdx}
                                    className="flex items-start gap-1.5 p-1.5 rounded-lg bg-zinc-950/40 border border-white/5 text-[11px] text-zinc-300"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
                                    <span>{point}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Contextual Action Trigger */}
                            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5">
                              <span className="text-[11px] text-zinc-400">
                                ¿Deseas resolver esto para tu empresa?
                              </span>

                              <div className="flex items-center gap-2">
                                {onNavigate && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      playClick();
                                      onNavigate('cotizador');
                                    }}
                                    className="btn-haptic px-2.5 py-1 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-[11px] flex items-center gap-1 shadow-sm cursor-pointer"
                                  >
                                    <Calculator className="w-3 h-3" />
                                    <span>Cotizar en 60s</span>
                                  </button>
                                )}

                                <a
                                  href="https://wa.me/34600000000?text=Hola%20Design%20Canarias,%20tengo%20una%20consulta%20sobre%20el%20servicio"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={playClick}
                                  className="btn-haptic-dark px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                                >
                                  <MessageCircle className="w-3 h-3" />
                                  <span>WhatsApp</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Studio Contact Info Card & Quick Clipboard Tool */}
        <div className="lg:col-span-4 flex flex-col gap-2.5 sm:gap-3">
          
          {/* Official Contact Info Card */}
          <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900/60 border border-white/[0.09] backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08] mb-3">
                <span className="text-xs uppercase font-bold text-white flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-white" />
                  <span>Contacto Directo de Estudio</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                  Canarias
                </span>
              </div>

              <p className="text-xs text-zinc-400 mb-3.5 leading-relaxed">
                Atención preferente para empresas, agencias y profesionales en todas las islas. Copia nuestros canales oficiales en un solo clic:
              </p>

              {/* Contact Data Items with 1-Click Copy Buttons */}
              <div className="space-y-2">
                
                {/* Email Item */}
                <div className="p-2.5 rounded-2xl bg-zinc-950/50 border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-7 h-7 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 block">Correo Electrónico</span>
                      <span className="text-xs font-semibold text-white truncate block">info@designcanarias.com</span>
                    </div>
                  </div>

                  <button
                    id="faq-card-copy-email-btn"
                    type="button"
                    onClick={() => copyToClipboard('info@designcanarias.com', 'Email del Estudio')}
                    onMouseEnter={playHover}
                    className="btn-haptic px-2.5 py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs flex items-center gap-1 shrink-0 cursor-pointer shadow-sm ml-2"
                    title="Copiar email al portapapeles"
                  >
                    {copiedField === 'Email del Estudio' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="p-2.5 rounded-2xl bg-zinc-950/50 border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-7 h-7 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 block">Centralita Taller</span>
                      <span className="text-xs font-semibold text-white truncate block">+34 922 00 00 00</span>
                    </div>
                  </div>

                  <button
                    id="faq-card-copy-phone-btn"
                    type="button"
                    onClick={() => copyToClipboard('+34 922 00 00 00', 'Teléfono del Taller')}
                    onMouseEnter={playHover}
                    className="btn-haptic-dark px-2.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-semibold text-xs flex items-center gap-1 shrink-0 cursor-pointer border border-white/10 ml-2"
                    title="Copiar teléfono al portapapeles"
                  >
                    {copiedField === 'Teléfono del Taller' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>

                {/* WhatsApp Direct Item */}
                <div className="p-2.5 rounded-2xl bg-zinc-950/50 border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 block">WhatsApp de Producción</span>
                      <span className="text-xs font-semibold text-white truncate block">+34 600 000 000</span>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/34600000000?text=Hola%20Design%20Canarias,%20quiero%20hacer%20una%20consulta"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="btn-haptic px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shrink-0 cursor-pointer shadow-sm ml-2"
                  >
                    <span>Chatear</span>
                  </a>
                </div>

              </div>
            </div>

            {/* Complete Contact Sheet 1-Click Copy Button */}
            <div className="mt-4 pt-3 border-t border-white/[0.08]">
              <button
                id="faq-copy-all-contact-btn"
                type="button"
                onClick={() => {
                  const fullContact = 
`Design Canarias - Estudio Gráfico & Taller de Producción
Email: info@designcanarias.com
Teléfono: +34 922 00 00 00
WhatsApp: +34 600 000 000
Web: https://designcanarias.com
Ubicación: Santa Cruz de Tenerife & Las Palmas de Gran Canaria
Régimen Fiscal: Facturación Oficial con IGIC Canario`;
                  copyToClipboard(fullContact, 'Ficha Completa de Contacto');
                }}
                onMouseEnter={playHover}
                className="btn-haptic w-full py-2.5 px-3 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-white/10 cursor-pointer transition-all border border-white"
              >
                {copiedField === 'Ficha Completa de Contacto' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>¡Ficha de Contacto Copiada!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Ficha Completa de Contacto</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Calculator Callout */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-zinc-900/40 border border-white/[0.07] backdrop-blur-xl flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-white block">¿Sabes ya lo que necesitas?</span>
              <span className="text-[11px] text-zinc-400 block mt-0.5">Calcula costes exactos con IGIC en 60 segundos</span>
            </div>

            {onNavigate && (
              <button
                type="button"
                onClick={() => {
                  playClick();
                  onNavigate('cotizador');
                }}
                onMouseEnter={playHover}
                className="btn-haptic-red px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 border border-red-500/50 shadow-md shadow-red-600/30 shrink-0 cursor-pointer active:scale-95 transition-all"
              >
                <span>Cotizador</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
