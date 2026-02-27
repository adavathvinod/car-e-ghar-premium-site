export interface CompanyProfile {
  name: string;
  address: string;
  gstNumber: string;
  phone: string;
  email: string;
  bankName: string;
  accountNo: string;
  ifsc: string;
  logo?: string;
}

export interface LineItem {
  id: string;
  particulars: string;
  amount: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: Date;
  company: CompanyProfile;
  clientName: string;
  clientAddress: string;
  clientGst: string;
  items: LineItem[];
}

const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function convertNumberToWords(num: number): string {
  if (num === 0) return 'Zero';
  
  const intPart = Math.floor(num);
  const decPart = Math.round((num - intPart) * 100);
  
  let result = convertIntToWords(intPart);
  if (decPart > 0) {
    result += ' and ' + convertIntToWords(decPart) + ' Paise';
  }
  
  return result;
}

function convertIntToWords(num: number): string {
  if (num === 0) return '';
  if (num < 20) return ones[num];
  if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
  if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' and ' + convertIntToWords(num % 100) : '');
  if (num < 100000) return convertIntToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + convertIntToWords(num % 1000) : '');
  if (num < 10000000) return convertIntToWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 ? ' ' + convertIntToWords(num % 100000) : '');
  return convertIntToWords(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 ? ' ' + convertIntToWords(num % 10000000) : '');
}

export function amountInWords(amount: number): string {
  return convertNumberToWords(amount);
}

export function generateInvoiceNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const rand = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
  return `INV-${year}${month}/${rand}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
}
