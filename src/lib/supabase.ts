import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

export let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn('Supabase client initialization warning:', error);
  }
}

export interface QuoteRecord {
  id: string;
  created_at: string;
  service_id: string;
  sub_type: string;
  quantity: number;
  express: boolean;
  premium_finish: boolean;
  client_name: string;
  island: string;
  phone: string;
  email: string;
  notes?: string;
  estimated_total: number;
  status: 'nuevo' | 'contactado' | 'en_produccion';
}

export interface ContactRecord {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  island: string;
  service: string;
  budget: string;
  message: string;
}

// Durable local backup in case Supabase credentials are not yet configured in env
const LOCAL_QUOTES_KEY = 'designcanarias_quotes_db';
const LOCAL_CONTACTS_KEY = 'designcanarias_contacts_db';

export async function saveQuoteInquiry(quote: Omit<QuoteRecord, 'id' | 'created_at' | 'status'>): Promise<{ success: boolean; id: string; error?: string }> {
  const record: QuoteRecord = {
    ...quote,
    id: 'quote_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    created_at: new Date().toISOString(),
    status: 'nuevo',
  };

  // Try real Supabase first if configured
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .insert([record])
        .select();

      if (!error && data && data.length > 0) {
        return { success: true, id: data[0].id || record.id };
      }
    } catch (e) {
      console.warn('Supabase insert failed, falling back to local persistence:', e);
    }
  }

  // Fallback to durable local storage
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_QUOTES_KEY) || '[]');
    existing.unshift(record);
    localStorage.setItem(LOCAL_QUOTES_KEY, JSON.stringify(existing));
    return { success: true, id: record.id };
  } catch (err: any) {
    return { success: false, id: record.id, error: err?.message || 'Error guardando solicitud' };
  }
}

export async function saveContactMessage(contact: Omit<ContactRecord, 'id' | 'created_at'>): Promise<{ success: boolean; id: string; error?: string }> {
  const record: ContactRecord = {
    ...contact,
    id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    created_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([record])
        .select();

      if (!error && data && data.length > 0) {
        return { success: true, id: data[0].id || record.id };
      }
    } catch (e) {
      console.warn('Supabase lead insert fallback:', e);
    }
  }

  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_CONTACTS_KEY) || '[]');
    existing.unshift(record);
    localStorage.setItem(LOCAL_CONTACTS_KEY, JSON.stringify(existing));
    return { success: true, id: record.id };
  } catch (err: any) {
    return { success: false, id: record.id, error: err?.message || 'Error guardando contacto' };
  }
}
