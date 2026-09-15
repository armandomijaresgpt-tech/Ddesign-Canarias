import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Truck, 
  ArrowRight,
  Factory,
  Scale,
  FileText,
  FileCheck,
  FileSignature,
  AlertTriangle,
  ShieldAlert,
  AlertCircle,
  Lock,
  Cookie,
  Layers,
  Sliders,
  Share2,
  MessageCircle,
  Eye,
  Calculator,
  Receipt,
  RotateCcw,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  Palette,
  X,
  Printer,
  Check,
  ExternalLink
} from 'lucide-react';
import { NavSection } from '../../types';
import { useSound } from '../../context/SoundContext';
import { Tooltip } from '../Tooltip';
import { 
  DOCUMENTACION_ITEMS, 
  DOCUMENTACION_EXTRA_ITEMS, 
  DocumentationItem 
} from '../../data/documentationData';

interface StudioSectionProps {
  onNavigate: (section: NavSection) => void;
}

export const StudioSection: React.FC<StudioSectionProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'documentacion' | 'documentacion-extra'>('documentacion');
  const [selectedDocId, setSelectedDocId] = useState<string>(DOCUMENTACION_ITEMS[0].id);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const { playClick, playHover } = useSound();

  const currentList = activeTab === 'documentacion' ? DOCUMENTACION_ITEMS : DOCUMENTACION_EXTRA_ITEMS;
  
  // Find current selected doc or fallback to the first in the active list
  const selectedDoc: DocumentationItem = 
    currentList.find((d) => d.id === selectedDocId) || currentList[0];

  const handleTabChange = (tab: 'documentacion' | 'documentacion-extra') => {
    playClick();
    setActiveTab(tab);
    // Select first item of that tab
    const nextList = tab === 'documentacion' ? DOCUMENTACION_ITEMS : DOCUMENTACION_EXTRA_ITEMS;
    setSelectedDocId(nextList[0].id);
  };

  const handleSelectDoc = (id: string) => {
    playClick();
    setSelectedDocId(id);
  };

  const handleCopyLink = () => {
    playClick();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const getDocIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scale': return Scale;
      case 'Building2': return Building2;
      case 'ShieldCheck': return ShieldCheck;
      case 'CheckCircle2': return CheckCircle2;
      case 'FileCheck': return FileCheck;
      case 'FileSignature': return FileSignature;
      case 'Clock': return Clock;
      case 'Receipt': return Receipt;
      case 'AlertTriangle': return AlertTriangle;
      case 'ShieldAlert': return ShieldAlert;
      case 'Palette': return Palette;
      case 'Truck': return Truck;
      case 'AlertCircle': return AlertCircle;
      case 'Lock': return Lock;
      case 'Cookie': return Cookie;
      case 'Layers': return Layers;
      case 'Sliders': return Sliders;
      case 'MapPin': return MapPin;
      case 'Sparkles': return Sparkles;
      case 'Share2': return Share2;
      case 'MessageCircle': return MessageCircle;
      case 'Eye': return Eye;
      case 'Calculator': return Calculator;
      case 'RotateCcw': return RotateCcw;
      case 'CreditCard': return CreditCard;
      case 'Factory': return Factory;
      default: return FileText;
    }
  };

  const SelectedDocIcon = getDocIcon(selectedDoc.iconName);

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1 sm:py-2">
      
      {/* Header: Replaced text with Two-Tab Menu component as requested */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-2 sm:mb-2.5">
        <div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl text-white tracking-tight">
            Taller & Documentación Legal
          </h2>
        </div>

        {/* Dynamic Menu with two tabs: "Documentacion" and "Documentacion Extra" */}
        <div 
          id="taller-documentation-tabs"
          className="flex items-center p-1 rounded-2xl bg-zinc-900/90 border border-white/10 shadow-lg backdrop-blur-md shrink-0"
        >
          <Tooltip
            content="Ver los 6 documentos principales: Aviso Legal, Términos, Descargo, Privacidad, Cookies y Régimen Canarias"
            position="bottom"
          >
            <button
              type="button"
              id="tab-btn-documentacion"
              onClick={() => handleTabChange('documentacion')}
              onMouseEnter={playHover}
              className={`btn-haptic px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === 'documentacion'
                  ? 'bg-white text-zinc-950 shadow-md ring-1 ring-white'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Documentación</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-black tracking-wider ${
                activeTab === 'documentacion' ? 'bg-zinc-200 text-zinc-950' : 'bg-white/10 text-zinc-400'
              }`}>
                6
              </span>
            </button>
          </Tooltip>

          <Tooltip
            content="Ver los 6 documentos complementarios: Redes Sociales, Accesibilidad, Presupuestos, Precios/IGIC, Envíos y Reembolsos"
            position="bottom"
          >
            <button
              type="button"
              id="tab-btn-documentacion-extra"
              onClick={() => handleTabChange('documentacion-extra')}
              onMouseEnter={playHover}
              className={`btn-haptic px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === 'documentacion-extra'
                  ? 'bg-white text-zinc-950 shadow-md ring-1 ring-white'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Documentación Extra</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-black tracking-wider ${
                activeTab === 'documentacion-extra' ? 'bg-zinc-200 text-zinc-950' : 'bg-white/10 text-zinc-400'
              }`}>
                6
              </span>
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Main Grid: Exact 5 Cards Layout (1 Left Sidebar Card + 4 Detail Cards in 2x2 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
        
        {/* Card 1 (Left): Sidebar with documentation names */}
        <div className="lg:col-span-4 xl:col-span-5 p-3.5 sm:p-4 rounded-3xl bg-zinc-900/60 border border-white/[0.08] backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/[0.06]">
              <span className="text-xs uppercase font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-white" />
                <span>
                  {activeTab === 'documentacion' ? 'Documentación Principal' : 'Documentación Extra'}
                </span>
              </span>
              <span className="text-[10px] text-zinc-200 font-semibold bg-white/10 px-2 py-0.5 rounded border border-white/20">
                Canarias 2026
              </span>
            </div>

            {/* Sidebar list of document names from the image */}
            <div className="space-y-1 sm:space-y-1.5">
              {currentList.map((doc) => {
                const isSelected = doc.id === selectedDoc.id;
                const ItemIcon = getDocIcon(doc.iconName);

                return (
                  <button
                    key={doc.id}
                    type="button"
                    id={`doc-item-${doc.id}`}
                    onClick={() => handleSelectDoc(doc.id)}
                    onMouseEnter={playHover}
                    className={`btn-haptic-dark w-full flex items-center justify-between p-2 sm:p-2.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-white text-zinc-950 border-white shadow-lg shadow-white/10 ring-1 ring-white'
                        : 'bg-zinc-950/40 border-white/5 hover:bg-zinc-800/80 hover:border-white/15 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'bg-zinc-950 text-white' : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        <ItemIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className={`font-display font-bold text-xs sm:text-sm truncate ${
                          isSelected ? 'text-zinc-950' : 'text-white'
                        }`}>
                          {doc.title}
                        </div>
                        <div className={`text-[10px] truncate max-w-[180px] sm:max-w-[240px] ${
                          isSelected ? 'text-zinc-600' : 'text-zinc-400'
                        }`}>
                          {doc.badge}
                        </div>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-zinc-950 translate-x-0.5' : 'text-zinc-500'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Conforme a RGPD & IGIC</span>
            </div>
            <Tooltip content="Abre el visor modal para leer la totalidad de cláusulas legales y normativas" position="top">
              <button
                onClick={() => {
                  playClick();
                  setIsModalOpen(true);
                }}
                className="btn-haptic-dark px-3 py-1.5 rounded-xl bg-zinc-800 text-xs font-bold text-white hover:text-zinc-200 flex items-center gap-1 cursor-pointer border border-white/10 active:scale-95"
              >
                <span>Ver íntegro</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Cards 2, 3, 4, 5 (Right Column: 4 Cards in 2x2 Grid) */}
        <div className="lg:col-span-8 xl:col-span-7 flex flex-col justify-between gap-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {selectedDoc.cards.map((card, idx) => {
              const CardIcon = getDocIcon(card.iconName);
              return (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-2xl bg-zinc-900/50 border border-white/[0.07] backdrop-blur-xl flex flex-col justify-between relative group hover:border-white/20 transition-all duration-200"
                >
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center mb-2 group-hover:bg-white group-hover:text-zinc-950 transition-colors">
                      <CardIcon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-white">
                      {card.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                      {card.tag}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-medium">
                      Cláusula {idx + 1}.0
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action strip below the 4 cards */}
          <div className="p-3 rounded-2xl bg-zinc-900/40 border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                <SelectedDocIcon className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <span className="text-xs font-bold text-white block truncate">
                  {selectedDoc.title}
                </span>
                <span className="text-[11px] text-zinc-400 block truncate">
                  {selectedDoc.tagline}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <Tooltip content="Ver texto íntegro, articulado y descargable" position="top">
                <button
                  type="button"
                  id="doc-view-full-btn"
                  onClick={() => {
                    playClick();
                    setIsModalOpen(true);
                  }}
                  onMouseEnter={playHover}
                  className="btn-haptic flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Leer Documento Completo</span>
                </button>
              </Tooltip>

              <Tooltip content="Hablar con soporte técnico o administración del taller en Tacoronte" position="top">
                <button
                  type="button"
                  id="doc-contact-btn"
                  onClick={() => {
                    playClick();
                    onNavigate('contacto');
                  }}
                  onMouseEnter={playHover}
                  className="btn-haptic-dark flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer border border-white/10 active:scale-95 transition-all"
                >
                  <span>Consultar Taller</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>

      </div>

      {/* Full Document Reader Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl bg-[#0e1017] border border-white/15 shadow-2xl overflow-hidden z-10"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-zinc-900/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white text-zinc-950 flex items-center justify-center font-bold">
                    <SelectedDocIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-base sm:text-lg text-white">
                        {selectedDoc.title}
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20 font-bold uppercase">
                        {selectedDoc.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      dDesign Canarias · Cristina Rodríguez Yanes (NIF 43382485T) · Tacoronte, Tenerife
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={selectedDoc.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-haptic-dark hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold border border-white/10"
                    title="Abrir en designcanarias.com"
                  >
                    <span>Ver Original Web</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body: Printable Text */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                <div className="p-3 rounded-xl bg-zinc-950/70 border border-white/10 text-zinc-300 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <p>
                      <strong className="text-white">Titular Oficial:</strong> Cristina Rodríguez Yanes (dDesign Canarias) · NIF 43382485T
                    </p>
                    <p className="text-zinc-400 text-[11px] mt-0.5">
                      C/ Barranco San Juan, 28, 38350 Tacoronte, Santa Cruz de Tenerife · info@designcanarias.com · +34 641 50 17 73
                    </p>
                  </div>
                  <a
                    href={selectedDoc.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:hidden inline-flex items-center gap-1 text-[11px] font-bold text-white bg-white/10 px-2.5 py-1 rounded-lg hover:bg-white/20"
                  >
                    <span>Abrir en web</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {selectedDoc.fullText.map((section, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="font-bold text-white text-sm sm:text-base border-b border-white/10 pb-1.5 pt-1">
                      {section.sectionTitle}
                    </h4>
                    {section.paragraphs.map((p, pIdx) => {
                      if (p.startsWith('•')) {
                        return (
                          <div key={pIdx} className="flex items-start gap-2 pl-2 text-zinc-300">
                            <span className="text-white font-bold shrink-0 mt-0.5">•</span>
                            <span className="leading-relaxed">{p.replace(/^•\s*/, '')}</span>
                          </div>
                        );
                      }
                      return (
                        <p key={pIdx} className="text-zinc-300 leading-relaxed">
                          {p}
                        </p>
                      );
                    })}
                  </div>
                ))}

                {/* 4 Pillars Summary inside Modal */}
                <div className="pt-3 border-t border-white/10">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">
                    Resumen de Cláusulas Principales:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedDoc.cards.map((c, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5 text-xs">
                        <span className="font-bold text-white block mb-0.5">{c.title}</span>
                        <span className="text-zinc-400 block leading-tight">{c.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 p-3.5 sm:p-4 border-t border-white/10 bg-zinc-900/70">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-zinc-400">
                    Documento 100% conforme a normativa de Canarias y UE
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <a
                    href={selectedDoc.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-haptic-dark sm:hidden px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold flex items-center gap-1 border border-white/10"
                  >
                    <span>Web</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="btn-haptic-dark px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10 cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Printer className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Enlace Copiado' : 'Imprimir / Copiar'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-haptic px-4 py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
