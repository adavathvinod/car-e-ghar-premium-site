import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, FileText } from "lucide-react";
import type { LineItem } from "@/lib/invoice-utils";

interface InvoiceFormProps {
  invoiceNumber: string;
  invoiceDate: string;
  clientName: string;
  clientAddress: string;
  clientGst: string;
  items: LineItem[];
  onDateChange: (date: string) => void;
  onClientNameChange: (v: string) => void;
  onClientAddressChange: (v: string) => void;
  onClientGstChange: (v: string) => void;
  onItemsChange: (items: LineItem[]) => void;
}

export function InvoiceForm({
  invoiceNumber, invoiceDate, clientName, clientAddress, clientGst,
  items, onDateChange, onClientNameChange, onClientAddressChange, onClientGstChange, onItemsChange
}: InvoiceFormProps) {
  const addItem = () => {
    onItemsChange([...items, { id: crypto.randomUUID(), particulars: "", amount: 0 }]);
  };

  const removeItem = (id: string) => {
    onItemsChange(items.filter(i => i.id !== id));
  };

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    onItemsChange(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-semibold text-foreground">Invoice Details</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label>Invoice Number</Label>
          <Input value={invoiceNumber} readOnly className="bg-muted font-mono" />
        </div>
        <div>
          <Label>Invoice Date</Label>
          <Input type="date" value={invoiceDate} onChange={e => onDateChange(e.target.value)} />
        </div>
      </div>

      <div className="pt-2 border-t border-border">
        <p className="text-sm font-medium text-muted-foreground mb-2">Bill To</p>
        <div className="space-y-3">
          <div>
            <Label>Client Name</Label>
            <Input value={clientName} onChange={e => onClientNameChange(e.target.value)} placeholder="Wimira Digital Technology Pvt Ltd" />
          </div>
          <div>
            <Label>Client Address</Label>
            <Textarea value={clientAddress} onChange={e => onClientAddressChange(e.target.value)} placeholder="1-32/2/3, Ganesh Nagar, Hyderabad" rows={2} />
          </div>
          <div>
            <Label>Client GST (optional)</Label>
            <Input value={clientGst} onChange={e => onClientGstChange(e.target.value)} placeholder="36XXXXX1234X1ZX" />
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-muted-foreground">Line Items</p>
          <Button size="sm" variant="outline" onClick={addItem}>
            <Plus className="h-4 w-4 mr-1" /> Add Item
          </Button>
        </div>
        <div className="space-y-2">
          {items.map((item, idx) => (
            <div key={item.id} className="flex gap-2 items-start">
              <span className="text-xs text-muted-foreground mt-3 w-6 shrink-0">{idx + 1}.</span>
              <Input
                className="flex-1"
                value={item.particulars}
                onChange={e => updateItem(item.id, "particulars", e.target.value)}
                placeholder="Service description"
              />
              <Input
                className="w-28 font-mono"
                type="number"
                value={item.amount || ""}
                onChange={e => updateItem(item.id, "amount", parseFloat(e.target.value) || 0)}
                placeholder="₹ 0"
              />
              <Button size="icon" variant="ghost" onClick={() => removeItem(item.id)} className="shrink-0 text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No items yet. Click "Add Item" to start.</p>
          )}
        </div>
      </div>
    </div>
  );
}
