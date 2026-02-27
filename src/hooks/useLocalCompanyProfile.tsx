import { useState, useEffect, useCallback } from "react";
import type { CompanyProfile } from "@/lib/invoice-utils";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "company_profile";

const defaultCompany: CompanyProfile = {
  name: "", address: "", gstNumber: "", phone: "", email: "",
  bankName: "", accountNo: "", ifsc: "",
};

export function useLocalCompanyProfile() {
  const [company, setCompany] = useState<CompanyProfile>(defaultCompany);
  const [headerAlignment, setHeaderAlignment] = useState<"left" | "center" | "right">("left");
  const [loaded, setLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCompany(parsed.company ?? defaultCompany);
        setHeaderAlignment(parsed.headerAlignment ?? "left");
      }
    } catch {}
    setLoaded(true);
  }, []);

  const saveProfile = useCallback((profile: CompanyProfile, alignment: "left" | "center" | "right") => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ company: profile, headerAlignment: alignment }));
      toast({ title: "Profile saved!" });
    } catch {
      toast({ title: "Save failed", variant: "destructive" });
    }
  }, [toast]);

  return { company, setCompany, headerAlignment, setHeaderAlignment, saveProfile, loaded };
}
