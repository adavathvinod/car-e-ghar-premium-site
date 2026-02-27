import { useState, useEffect, useCallback } from "react";
import type { CompanyProfile, LineItem } from "@/lib/invoice-utils";

const STORAGE_KEY = "invoice_history";

export interface SavedInvoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  clientName: string;
  clientAddress: string;
  clientGst: string;
  items: LineItem[];
  company: CompanyProfile;
  total: number;
  savedAt: string;
}

export function useInvoiceHistory() {
  const [history, setHistory] = useState<SavedInvoice[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setHistory(JSON.parse(stored));
    } catch {}
  }, []);

  const saveInvoice = useCallback((invoice: Omit<SavedInvoice, "id" | "savedAt">) => {
    const newInvoice: SavedInvoice = {
      ...invoice,
      id: crypto.randomUUID(),
      savedAt: new Date().toISOString(),
    };
    setHistory(prev => {
      const updated = [newInvoice, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    return newInvoice;
  }, []);

  const deleteInvoice = useCallback((id: string) => {
    setHistory(prev => {
      const updated = prev.filter(i => i.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { history, saveInvoice, deleteInvoice };
}
