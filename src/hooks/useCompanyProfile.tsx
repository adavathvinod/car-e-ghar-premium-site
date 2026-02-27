import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { CompanyProfile } from "@/lib/invoice-utils";
import { useToast } from "@/hooks/use-toast";

const defaultCompany: CompanyProfile = {
  name: "", address: "", gstNumber: "", phone: "", email: "",
  bankName: "", accountNo: "", ifsc: "",
};

export function useCompanyProfile(userId: string | undefined) {
  const [company, setCompany] = useState<CompanyProfile>(defaultCompany);
  const [headerAlignment, setHeaderAlignment] = useState<"left" | "center" | "right">("left");
  const [loaded, setLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!userId) return;
    supabase
      .from("company_profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setCompany({
            name: data.name,
            address: data.address,
            gstNumber: data.gst_number,
            phone: data.phone,
            email: data.email,
            bankName: data.bank_name,
            accountNo: data.account_no,
            ifsc: data.ifsc,
            logo: data.logo_url ?? undefined,
          });
          setHeaderAlignment((data.header_alignment as "left" | "center" | "right") ?? "left");
        }
        setLoaded(true);
      });
  }, [userId]);

  const saveProfile = useCallback(async (profile: CompanyProfile, alignment: "left" | "center" | "right") => {
    if (!userId) return;

    // Handle logo upload if it's a data URL
    let logoUrl = profile.logo ?? null;
    if (profile.logo?.startsWith("data:")) {
      const blob = await fetch(profile.logo).then(r => r.blob());
      const ext = blob.type.split("/")[1] || "png";
      const path = `${userId}/logo.${ext}`;
      const { error: uploadError } = await supabase.storage.from("company-logos").upload(path, blob, { upsert: true });
      if (uploadError) {
        toast({ title: "Logo upload failed", description: uploadError.message, variant: "destructive" });
      } else {
        const { data: urlData } = supabase.storage.from("company-logos").getPublicUrl(path);
        logoUrl = urlData.publicUrl;
      }
    }

    const row = {
      user_id: userId,
      name: profile.name,
      address: profile.address,
      gst_number: profile.gstNumber,
      phone: profile.phone,
      email: profile.email,
      bank_name: profile.bankName,
      account_no: profile.accountNo,
      ifsc: profile.ifsc,
      logo_url: logoUrl,
      header_alignment: alignment,
    };

    const { error } = await supabase.from("company_profiles").upsert(row, { onConflict: "user_id" });
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      // Update local logo to public URL
      if (logoUrl && profile.logo?.startsWith("data:")) {
        setCompany(prev => ({ ...prev, logo: logoUrl! }));
      }
      toast({ title: "Profile saved!" });
    }
  }, [userId, toast]);

  return { company, setCompany, headerAlignment, setHeaderAlignment, saveProfile, loaded };
}
