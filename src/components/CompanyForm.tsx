import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Building2, Upload, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import type { CompanyProfile } from "@/lib/invoice-utils";

interface CompanyFormProps {
  company: CompanyProfile;
  onChange: (company: CompanyProfile) => void;
  headerAlignment: "left" | "center" | "right";
  onAlignmentChange: (alignment: "left" | "center" | "right") => void;
}

export function CompanyForm({ company, onChange, headerAlignment, onAlignmentChange }: CompanyFormProps) {
  const update = (field: keyof CompanyProfile, value: string) => {
    onChange({ ...company, [field]: value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => update("logo", reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-semibold text-foreground">Company Profile</h3>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center justify-center w-20 h-20 rounded-lg border-2 border-dashed border-border bg-muted cursor-pointer hover:border-accent transition-colors overflow-hidden">
          {company.logo ? (
            <img src={company.logo} alt="Logo" className="w-full h-full object-contain" />
          ) : (
            <Upload className="h-6 w-6 text-muted-foreground" />
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
        </label>
        <div className="flex-1">
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" value={company.name} onChange={e => update("name", e.target.value)} placeholder="S.M Associates" className="font-bold text-lg" />
        </div>
      </div>

      {/* Header Alignment */}
      <div>
        <Label className="mb-1 block">Header Alignment</Label>
        <div className="flex gap-1">
          {([["left", AlignLeft], ["center", AlignCenter], ["right", AlignRight]] as const).map(([align, Icon]) => (
            <Button
              key={align}
              type="button"
              size="sm"
              variant={headerAlignment === align ? "default" : "outline"}
              onClick={() => onAlignmentChange(align)}
              className={headerAlignment === align ? "bg-accent text-accent-foreground" : ""}
            >
              <Icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Textarea id="address" value={company.address} onChange={e => update("address", e.target.value)} placeholder="1st Floor, MIG 46/A, Hyderabad" rows={2} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="gst">GST Number</Label>
          <Input id="gst" value={company.gstNumber} onChange={e => update("gstNumber", e.target.value)} placeholder="36XXXXX1234X1ZX" />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={company.phone} onChange={e => update("phone", e.target.value)} placeholder="+91 98765 43210" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={company.email} onChange={e => update("email", e.target.value)} placeholder="info@company.com" />
        </div>
      </div>

      <div className="pt-2 border-t border-border">
        <p className="text-sm font-medium text-muted-foreground mb-2">Bank Details</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <Label htmlFor="bankName">Bank Name</Label>
            <Input id="bankName" value={company.bankName} onChange={e => update("bankName", e.target.value)} placeholder="SBI Bank" />
          </div>
          <div>
            <Label htmlFor="accountNo">Account No</Label>
            <Input id="accountNo" value={company.accountNo} onChange={e => update("accountNo", e.target.value)} placeholder="62448613632" />
          </div>
          <div>
            <Label htmlFor="ifsc">IFSC Code</Label>
            <Input id="ifsc" value={company.ifsc} onChange={e => update("ifsc", e.target.value)} placeholder="SBIN0020983" />
          </div>
        </div>
      </div>
    </div>
  );
}
