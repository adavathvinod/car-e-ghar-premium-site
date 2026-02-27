import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyForm } from "@/components/CompanyForm";
import { InvoiceForm } from "@/components/InvoiceForm";
import { InvoicePreview } from "@/components/InvoicePreview";
import { AIInput } from "@/components/AIInput";
import { Button } from "@/components/ui/button";
import { Download, Printer, FileText, Eye, Save, LayoutDashboard, BookmarkPlus } from "lucide-react";
import { generateInvoiceNumber } from "@/lib/invoice-utils";
import type { LineItem } from "@/lib/invoice-utils";
import { useLocalCompanyProfile } from "@/hooks/useLocalCompanyProfile";
import { useInvoiceHistory } from "@/hooks/useInvoiceHistory";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { company, setCompany, headerAlignment, setHeaderAlignment, saveProfile, loaded } = useLocalCompanyProfile();
  const { saveInvoice } = useInvoiceHistory();
  const [invoiceNumber] = useState(generateInvoiceNumber);
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0]);
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientGst, setClientGst] = useState("");
  const [items, setItems] = useState<LineItem[]>([
    { id: crypto.randomUUID(), particulars: "", amount: 0 },
  ]);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = (canvas.height * pdfW) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
    pdf.save(`${invoiceNumber}.pdf`);
  };

  const handlePrint = () => {
    const printContent = previewRef.current;
    if (!printContent) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`
      <html><head><title>${invoiceNumber}</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ccc; padding: 8px; font-size: 13px; }
        th { background: #f5f5f5; font-weight: 600; text-align: left; }
        .amount-highlight { font-family: 'JetBrains Mono', monospace; font-weight: 600; color: #c87f2a; }
      </style>
      </head><body>${printContent.innerHTML}</body></html>
    `);
    w.document.close();
    w.print();
  };

  const handleSaveInvoice = () => {
    const total = items.reduce((sum, i) => sum + i.amount, 0);
    saveInvoice({ invoiceNumber, invoiceDate, clientName, clientAddress, clientGst, items, company, total });
    toast({ title: "Invoice saved to history!" });
  };

  const handleAIResult = (data: { clientName?: string; clientAddress?: string; items: LineItem[] }) => {
    if (data.clientName) setClientName(data.clientName);
    if (data.clientAddress) setClientAddress(data.clientAddress);
    if (data.items.length > 0) {
      setItems(prev => {
        const nonEmpty = prev.filter(i => i.particulars.trim() || i.amount > 0);
        return [...nonEmpty, ...data.items];
      });
    }
  };

  if (!loaded) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-accent" />
          <h1 className="text-xl font-bold text-foreground">AI Invoice Generator</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
            <LayoutDashboard className="h-4 w-4 mr-1" /> Dashboard
          </Button>
          <Button variant="outline" size="sm" onClick={() => saveProfile(company, headerAlignment)}>
            <Save className="h-4 w-4 mr-1" /> Save Profile
          </Button>
          <Button variant="outline" size="sm" onClick={handleSaveInvoice}>
            <BookmarkPlus className="h-4 w-4 mr-1" /> Save Invoice
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-1" /> Print
          </Button>
          <Button size="sm" onClick={handleDownloadPDF} className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Download className="h-4 w-4 mr-1" /> PDF
          </Button>
        </div>
      </header>

      {/* Mobile tab switch */}
      <div className="lg:hidden flex border-b border-border">
        <button onClick={() => setActiveTab("edit")} className={`flex-1 py-2 text-sm font-medium text-center transition-colors ${activeTab === "edit" ? "text-accent border-b-2 border-accent" : "text-muted-foreground"}`}>
          Edit
        </button>
        <button onClick={() => setActiveTab("preview")} className={`flex-1 py-2 text-sm font-medium text-center transition-colors ${activeTab === "preview" ? "text-accent border-b-2 border-accent" : "text-muted-foreground"}`}>
          <Eye className="h-4 w-4 inline mr-1" /> Preview
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-0 lg:gap-6 max-w-[1600px] mx-auto p-4 lg:p-6">
        <div className={`w-full lg:w-[420px] shrink-0 space-y-4 ${activeTab === "preview" ? "hidden lg:block" : ""}`}>
          <AIInput onResult={handleAIResult} />
          <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
            <CompanyForm company={company} onChange={setCompany} headerAlignment={headerAlignment} onAlignmentChange={setHeaderAlignment} />
          </div>
          <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
            <InvoiceForm
              invoiceNumber={invoiceNumber}
              invoiceDate={invoiceDate}
              clientName={clientName}
              clientAddress={clientAddress}
              clientGst={clientGst}
              items={items}
              onDateChange={setInvoiceDate}
              onClientNameChange={setClientName}
              onClientAddressChange={setClientAddress}
              onClientGstChange={setClientGst}
              onItemsChange={setItems}
            />
          </div>
        </div>

        <div className={`flex-1 min-w-0 ${activeTab === "edit" ? "hidden lg:block" : ""}`}>
          <div className="sticky top-16">
            <p className="text-xs text-muted-foreground font-medium mb-2 hidden lg:block">LIVE PREVIEW</p>
            <div className="rounded-lg overflow-hidden shadow-xl border border-border">
              <InvoicePreview
                ref={previewRef}
                company={company}
                invoiceNumber={invoiceNumber}
                invoiceDate={invoiceDate}
                clientName={clientName}
                clientAddress={clientAddress}
                clientGst={clientGst}
                items={items}
                headerAlignment={headerAlignment}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
