export interface CustomerDetails {
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  invoiceNumber: string;
  date: string;
  customerDetails: CustomerDetails;
  items: InvoiceItem[];
  total: number;
}