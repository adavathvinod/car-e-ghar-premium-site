import { forwardRef } from "react";
import type { CompanyProfile, LineItem } from "@/lib/invoice-utils";
import { amountInWords, formatCurrency } from "@/lib/invoice-utils";

interface InvoicePreviewProps {
  company: CompanyProfile;
  invoiceNumber: string;
  invoiceDate: string;
  clientName: string;
  clientAddress: string;
  clientGst: string;
  items: LineItem[];
  headerAlignment?: "left" | "center" | "right";
}

export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
  ({ company, invoiceNumber, invoiceDate, clientName, clientAddress, clientGst, items, headerAlignment = "left" }, ref) => {
    const total = items.reduce((sum, i) => sum + i.amount, 0);
    const dateStr = invoiceDate ? new Date(invoiceDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase() : '';

    const alignClass = headerAlignment === "center" ? "justify-center text-center" : headerAlignment === "right" ? "justify-end text-right" : "justify-start text-left";

    return (
      <div ref={ref} className="invoice-preview max-w-[210mm] mx-auto p-0" style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* Header */}
        <div className={`invoice-header-bar px-6 py-5 flex items-center gap-4 ${alignClass}`}>
          {company.logo && (
            <img src={company.logo} alt="Logo" className="w-16 h-16 object-contain rounded bg-white/10 p-1" />
          )}
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">{company.name || "Your Company Name"}</h1>
            <p className="text-sm opacity-80 mt-0.5">{company.address}</p>
            {company.phone && <p className="text-xs opacity-70">Phone: {company.phone} {company.email && `| ${company.email}`}</p>}
          </div>
        </div>

        <div className="px-6 py-4">
          {/* Title & Meta */}
          <div className="flex justify-between items-start border-b border-border pb-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-foreground tracking-wide">BILL OF SUPPLY</h2>
            </div>
            <div className="text-right text-sm">
              <p><span className="text-muted-foreground">Invoice No:</span> <span className="font-semibold">{invoiceNumber}</span></p>
              <p><span className="text-muted-foreground">Date:</span> <span className="font-semibold">{dateStr}</span></p>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-4 p-3 rounded-md bg-muted/50">
            <p className="text-xs text-muted-foreground font-medium mb-1">BILL TO</p>
            <p className="font-bold text-foreground">{clientName || "Client Name"}</p>
            <p className="text-sm text-muted-foreground">{clientAddress}</p>
            {clientGst && <p className="text-xs text-muted-foreground mt-1">GST: {clientGst}</p>}
          </div>

          {/* Items Table */}
          <table className="invoice-table w-full mb-4">
            <thead>
              <tr>
                <th className="w-12 text-center">S.No</th>
                <th>Particulars</th>
                <th className="w-32 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? items.map((item, idx) => (
                <tr key={item.id}>
                  <td className="text-center">{idx + 1}</td>
                  <td>{item.particulars || <span className="text-muted-foreground italic">—</span>}</td>
                  <td className="text-right amount-highlight">{item.amount > 0 ? formatCurrency(item.amount) : '—'}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} className="text-center text-muted-foreground py-6">No items added</td>
                </tr>
              )}
              {/* Total Row */}
              <tr className="invoice-total-row">
                <td colSpan={2} className="text-right font-bold">Total</td>
                <td className="text-right amount-highlight text-base">{formatCurrency(total)}</td>
              </tr>
            </tbody>
          </table>

          {/* Amount in Words */}
          {total > 0 && (
            <div className="mb-4 p-3 rounded-md bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground font-medium">Amount in Words (INR)</p>
              <p className="font-semibold text-sm text-foreground">{amountInWords(total)} Only</p>
            </div>
          )}

          {/* Footer */}
          <div className="grid grid-cols-2 gap-4 text-xs border-t border-border pt-4">
            <div>
              {company.gstNumber && <p><span className="text-muted-foreground">GST:</span> {company.gstNumber}</p>}
              {company.phone && <p><span className="text-muted-foreground">Phone:</span> {company.phone}</p>}
            </div>
            <div>
              {company.bankName && <p><span className="text-muted-foreground">Bank:</span> {company.bankName}</p>}
              {company.accountNo && <p><span className="text-muted-foreground">A/C No:</span> {company.accountNo}</p>}
              {company.ifsc && <p><span className="text-muted-foreground">IFSC:</span> {company.ifsc}</p>}
            </div>
          </div>

          {/* Signature */}
          <div className="mt-8 text-right">
            <p className="text-sm font-semibold text-foreground">For {company.name || "Company Name"}</p>
            <p className="text-xs text-muted-foreground mt-1">Authorized Signatory</p>
            <div className="mt-6 border-t border-border w-40 ml-auto" />
          </div>
        </div>
      </div>
    );
  }
);

InvoicePreview.displayName = "InvoicePreview";
