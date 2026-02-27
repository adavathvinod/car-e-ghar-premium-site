import { useInvoiceHistory } from "@/hooks/useInvoiceHistory";
import { formatCurrency } from "@/lib/invoice-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Trash2, ArrowLeft, ReceiptText, IndianRupee, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { history, deleteInvoice } = useInvoiceHistory();
  const navigate = useNavigate();

  const totalRevenue = history.reduce((sum, inv) => sum + inv.total, 0);
  const uniqueClients = new Set(history.map(i => i.clientName.toLowerCase().trim()).filter(Boolean)).size;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-accent" />
          <h1 className="text-xl font-bold text-foreground">Invoice Dashboard</h1>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4 mr-1" /> New Invoice
        </Button>
      </header>

      <div className="max-w-5xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Invoices</CardTitle>
              <ReceiptText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{history.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(totalRevenue)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Unique Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{uniqueClients}</p>
            </CardContent>
          </Card>
        </div>

        {/* History Table */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ReceiptText className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p className="text-lg font-medium">No invoices yet</p>
                <p className="text-sm mt-1">Create your first invoice to see it here.</p>
                <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => navigate("/")}>
                  Create Invoice
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.map(inv => (
                      <TableRow key={inv.id}>
                        <TableCell className="font-mono font-medium">{inv.invoiceNumber}</TableCell>
                        <TableCell>{new Date(inv.invoiceDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</TableCell>
                        <TableCell>{inv.clientName || <span className="text-muted-foreground italic">—</span>}</TableCell>
                        <TableCell>{inv.items.length}</TableCell>
                        <TableCell className="text-right font-mono font-semibold">{formatCurrency(inv.total)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => deleteInvoice(inv.id)} title="Delete">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
