export type NavSection = 'hero' | 'servicios' | 'portfolio' | 'cotizador' | 'estudio' | 'contacto' | 'perfil' | 'faq';

export const BRAND_LOGO_URL = 'https://covndikrmfvxscuajrqp.supabase.co/storage/v1/object/public/Logo/logo.jpeg';

export interface UserProfile {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    island: string;
    additionalNotes?: string;
  };
  clientCode: string;
  verifiedTaxStatus: boolean;
  registeredDate: string;
}

export type OrderStage = 
  | 'preimpresion'
  | 'produccion'
  | 'corte_acabados'
  | 'control_calidad'
  | 'listo_entrega'
  | 'entregado';

export interface OrderItemDetail {
  id: string;
  orderNumber: string;
  serviceName: string;
  specification: string;
  quantity: string;
  finish: string;
  totalPrice: number;
  igicRate: number;
  createdAt: string;
  estimatedDelivery: string;
  status: OrderStage;
  deliveryType: 'Envío Interinsular Rápido' | 'Recogida en Taller (Santa Cruz)' | 'Recogida en Taller (Las Palmas)';
  shippingAddress: string;
  invoiceNumber?: string;
  progressPercent: number;
  trackingHistory: {
    stage: string;
    timestamp: string;
    completed: boolean;
    description: string;
  }[];
}

export interface ServiceItem {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  specs: string[];
  turnaround: string;
  startingPrice: string;
  iconName: string;
  badge?: string;
  featured?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: 'Branding' | 'Rotulación' | 'Packaging' | 'Impresión' | 'Digital';
  location: string;
  year: string;
  image: string;
  description: string;
  highlight: string;
  materials: string;
  accentColor: string;
  gradient: string;
  tags: string[];
}

export interface QuoteFormState {
  serviceId: string;
  subType: string;
  quantityTier: number;
  expressDelivery: boolean;
  premiumFinish: boolean;
  name: string;
  island: string;
  phone: string;
  email: string;
  notes: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  island: string;
  service: string;
  budget: string;
  message: string;
}
