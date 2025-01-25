import React, { useState } from 'react';
import { Plus, Trash2, Phone } from 'lucide-react';
import type { CustomerDetails, InvoiceItem, Invoice } from '../types';

interface Props {
  onGenerateInvoice: (invoice: Invoice) => void;
}

let currentInvoiceNumber = 1;

export default function InvoiceForm({ onGenerateInvoice }: Props) {
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    address: '',
    phone: '',
    whatsapp: ''
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    { description: '', quantity: 1, rate: 0, amount: 0 },
  ]);

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSameAsPhone = () => {
    setCustomerDetails(prev => ({ ...prev, whatsapp: prev.phone }));
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    setItems(prev => {
      const newItems = [...prev];
      newItems[index] = {
        ...newItems[index],
        [field]: value,
        amount: field === 'quantity' || field === 'rate'
          ? Number(value) * (field === 'quantity' ? newItems[index].rate : newItems[index].quantity)
          : newItems[index].amount,
      };
      return newItems;
    });
  };

  const addItem = () => {
    setItems(prev => [...prev, { description: '', quantity: 1, rate: 0, amount: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const generateInvoiceNumber = () => {
    const paddedNumber = String(currentInvoiceNumber).padStart(6, '0');
    currentInvoiceNumber++;
    return `BH${paddedNumber}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = items.reduce((sum, item) => sum + item.amount, 0);

    const invoice: Invoice = {
      invoiceNumber: generateInvoiceNumber(),
      date: new Date().toLocaleDateString('en-IN'),
      customerDetails,
      items,
      total,
    };

    onGenerateInvoice(invoice);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-4xl mx-auto">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              required
              value={customerDetails.name}
              onChange={handleCustomerChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone </label>
            <input
              type="tel"
              name="phone"
              required
              value={customerDetails.phone}
              onChange={handleCustomerChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
            <div className="flex gap-2">
              <input
                type="tel"
                name="whatsapp"
                value={customerDetails.whatsapp}
                onChange={handleCustomerChange}
                placeholder="e.g., 9939963985"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleSameAsPhone}
                className="mt-1 px-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                 <Phone size={20} />
              </button>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              required
              value={customerDetails.address}
              onChange={handleCustomerChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Items</h2>
        <div className="space-y-4 min-w-[640px]">
          {items.map((item, index) => (
            <div key={index} className="flex gap-2 sm:gap-4 items-start">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Description"
                  required
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="w-20 sm:w-24">
                <input
                  type="number"
                  placeholder="Qty"
                  required
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="w-24 sm:w-32">
                <input
                  type="number"
                  placeholder="Rate"
                  required
                  min="0"
                  value={item.rate}
                  onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="w-24 sm:w-32">
                <input
                  type="number"
                  readOnly
                  value={item.amount}
                  className="w-full rounded-md border-gray-300 bg-gray-50"
                />
              </div>
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addItem}
          className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Plus size={20} className="mr-2" />
          Add Item
        </button>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Generate Invoice
        </button>
      </div>
    </form>
  );
}