import React from 'react';
import { motion } from 'motion/react';
import { 
  Layers, 
  Sparkles, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Tooltip } from './Tooltip';

export interface QuoteStepperProps {
  currentStep: number;
  onStepClick?: (stepNumber: number) => void;
  step1Complete: boolean;
  step2Complete: boolean;
  step3Complete: boolean;
  step4Complete: boolean;
  progressScore: number;
  rawTotal: number;
  serviceName: string;
}

export const QuoteStepper: React.FC<QuoteStepperProps> = ({
  currentStep,
  onStepClick,
  step1Complete,
  step2Complete,
  step3Complete,
  step4Complete,
  progressScore,
  rawTotal,
  serviceName,
}) => {
  const steps = [
    {
      number: 1,
      title: 'Proyecto',
      subtitle: 'Tipo de servicio',
      icon: Layers,
      isCompleted: step1Complete,
      tooltip: 'Selecciona la categoría de diseño o imprenta',
    },
    {
      number: 2,
      title: 'Especificación',
      subtitle: 'Volumen & Acabados',
      icon: Sparkles,
      isCompleted: step2Complete,
      tooltip: 'Define el paquete, urgencia 48h y acabados premium',
    },
    {
      number: 3,
      title: 'Empresa & Isla',
      subtitle: 'Destino en Canarias',
      icon: MapPin,
      isCompleted: step3Complete,
      tooltip: 'Indica tu empresa y la isla para calcular logística',
    },
    {
      number: 4,
      title: 'Contacto & Envío',
      subtitle: 'Revisión y formalización',
      icon: Send,
      isCompleted: step4Complete,
      tooltip: 'Facilita teléfono o email para recibir el presupuesto oficial',
    },
  ];

  const isFullComplete = progressScore === 100;

  return (
    <div 
      id="quote-flow-stepper"
      className="w-full mb-2 p-2 sm:p-2.5 rounded-xl bg-zinc-900/90 border border-white/[0.12] backdrop-blur-xl shadow-md relative overflow-hidden shrink-0"
    >
      {/* Ambient background glow */}
      <div 
        className={`absolute -top-12 -right-12 w-64 h-32 blur-3xl pointer-events-none transition-all duration-700 ${
          isFullComplete ? 'bg-emerald-500/15' : 'bg-white/5'
        }`} 
      />

      {/* Top Header: Progress Status + Price Peek */}
      <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10.5px] font-semibold text-white">
            <Clock className="w-2.5 h-2.5 text-zinc-300" />
            <span>Paso {currentStep} de 4</span>
          </div>

          <div className="text-[11px] sm:text-xs text-zinc-300">
            <span className="font-semibold text-white">{steps[currentStep - 1]?.title}:</span>{' '}
            <span className="text-zinc-400 hidden sm:inline">{steps[currentStep - 1]?.subtitle}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Estimated price badge */}
          <div className="flex items-baseline gap-1.5 px-2 py-0.5 rounded-lg bg-black/50 border border-white/10">
            <span className="text-[9px] text-zinc-400 uppercase tracking-wider font-semibold">Estimado:</span>
            <span className="font-display font-extrabold text-xs text-white tabular-nums">
              ~{rawTotal}€
            </span>
            <span className="text-[8.5px] text-zinc-500 font-medium">sin IGIC</span>
          </div>

          {/* Progress Percentage Badge */}
          <div className={`px-1.5 py-0.5 rounded-md border text-[10px] font-bold tabular-nums transition-colors ${
            isFullComplete 
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
              : 'bg-white/10 border-white/15 text-white'
          }`}>
            {progressScore}%
          </div>
        </div>
      </div>

      {/* Connected Interactive Stepper Stations */}
      <div className="relative py-0.5">
        {/* Continuous Background Rail */}
        <div className="absolute top-[14px] sm:top-[15px] left-5 right-5 sm:left-8 sm:right-8 h-[2px] bg-zinc-800 rounded-full z-0 overflow-hidden">
          {/* Active progress fill line */}
          <motion.div 
            className={`h-full transition-all duration-300 ${
              isFullComplete 
                ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-white' 
                : 'bg-gradient-to-r from-white via-zinc-200 to-zinc-400'
            }`}
            style={{ width: `${Math.max(4, ((currentStep - 1) / 3) * 100)}%` }}
          />
        </div>

        {/* 4 Step Nodes */}
        <div className="relative z-10 grid grid-cols-4 gap-1 sm:gap-2">
          {steps.map((step) => {
            const isActive = currentStep === step.number;
            const isDone = step.isCompleted;
            const StepIcon = step.icon;

            return (
              <Tooltip 
                key={step.number} 
                content={step.tooltip} 
                position="top"
                delay={120}
              >
                <button
                  type="button"
                  onClick={() => onStepClick?.(step.number)}
                  className={`group w-full flex flex-col items-center text-center p-0.5 sm:p-1 rounded-lg transition-all cursor-pointer select-none ${
                    isActive 
                      ? 'bg-white/[0.07] border border-white/20 shadow-sm' 
                      : 'hover:bg-white/[0.03] border border-transparent'
                  }`}
                >
                  {/* Step Node Circle Indicator */}
                  <div className={`relative w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isDone 
                      ? 'bg-emerald-500 text-zinc-950 font-bold shadow-[0_0_10px_rgba(16,185,129,0.4)]' 
                      : isActive 
                        ? 'bg-white text-zinc-950 font-bold ring-2 ring-white/30 shadow-md shadow-white/10 scale-105' 
                        : 'bg-zinc-800 text-zinc-400 border border-white/10 group-hover:text-zinc-200 group-hover:border-white/25'
                  }`}>
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-950 stroke-[2.5]" />
                    ) : (
                      <span className="text-[11px] font-bold font-display">0{step.number}</span>
                    )}

                    {/* Subtle pulse ring for active step */}
                    {isActive && !isDone && (
                      <span className="absolute inset-0 rounded-full animate-ping opacity-25 bg-white pointer-events-none" />
                    )}
                  </div>

                  {/* Step Labels */}
                  <div className="mt-1 flex flex-col items-center w-full">
                    <span className={`text-[10px] sm:text-[10.5px] font-bold tracking-tight truncate max-w-full transition-colors ${
                      isActive ? 'text-white' : isDone ? 'text-zinc-200' : 'text-zinc-400'
                    }`}>
                      {step.title}
                    </span>
                    <span className="text-[8.5px] text-zinc-400 hidden md:block truncate max-w-full">
                      {step.subtitle}
                    </span>
                  </div>
                </button>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </div>
  );
};
