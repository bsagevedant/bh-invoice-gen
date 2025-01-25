import React, { useState } from 'react';
import { Share2, Phone, Globe, MessageCircle, Send } from 'lucide-react';
import type { Invoice } from '../types';

interface Props {
  invoice: Invoice;
}

export default function InvoicePrint({ invoice }: Props) {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);

  const formatInvoiceForWhatsApp = () => {
    const message = `*भारत मत्स्य बीज केन्द्र*\n\n` +
      `Invoice #: ${invoice.invoiceNumber}\n` +
      `Date: ${invoice.date}\n\n` +
      `*Bill To:*\n` +
      `${invoice.customerDetails.name}\n` +
      `${invoice.customerDetails.address}\n` +
      `${invoice.customerDetails.phone}\n\n` +
      `*Items:*\n${invoice.items.map(item => 
        `- ${item.description}: ${item.quantity} x ₹${item.rate.toFixed(2)} = ₹${item.amount.toFixed(2)}`
      ).join('\n')}\n\n` +
      `*Total Amount: ₹${invoice.total.toFixed(2)}*\n\n` +
      `Thank you for your business!\n` +
      `Arga-Usari, Baheri, Bihar - 847105\n` +
      `Phone: 9939963985\n` +
      `UPI: 9939963985@upi`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppShare = () => {
    const formattedNumber = whatsappNumber.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${formatInvoiceForWhatsApp()}`;
    window.open(whatsappUrl, '_blank');
    setShowWhatsappModal(false);
    setWhatsappNumber('');
  };

  return (
    <div className="print-content bg-white p-4 sm:p-8 max-w-4xl mx-auto relative">
      <div className="mb-12 relative min-h-[160px]">
        {/* Swastika Symbol */}
        
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">भारत मत्स्य बीज केन्द्र</h1>
          <p className="text-gray-600 mb-2">Arga-Usari, Baheri, Darbhanga, Bihar - 847105</p>
          <div className="flex items-center justify-center gap-1">
            <Phone size={16} className="text-gray-600" />
            <p className="text-gray-600">9939963985</p>
          </div>
        </div>
        
        {/* UPI QR Code - top right */}
        <div className="absolute top-0 right-0 w-36 text-center">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=9939963985@upi`}
            alt="UPI QR Code"
            className="w-32 h-32 mx-auto"
          />
          <p className="text-sm text-gray-600 mt-2">Pay via UPI - 9939963985@upi</p>
        </div>
      </div>

      <div className="border-t-2 border-b-2 border-gray-200 py-4 mb-8">
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
          <div>
            <h2 className="font-bold text-gray-700">Bill To:</h2>
            <p className="text-gray-600">{invoice.customerDetails.name}</p>
            <p className="text-gray-600">{invoice.customerDetails.address}</p>
            <p className="text-gray-600">{invoice.customerDetails.phone}</p>
            {invoice.customerDetails.whatsapp && (
              <p className="text-gray-600">WhatsApp: {invoice.customerDetails.whatsapp}</p>
            )}
          </div>
          <div className="sm:text-right">
            <h2 className="font-bold text-gray-700">Invoice Details:</h2>
            <p className="text-gray-600">Invoice #: {invoice.invoiceNumber}</p>
            <p className="text-gray-600">Date: {invoice.date}</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full mb-8 min-w-[640px]">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-2">Description</th>
              <th className="text-right py-2">Quantity</th>
              <th className="text-right py-2">Rate</th>
              <th className="text-right py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-2">{item.description}</td>
                <td className="text-right py-2">{item.quantity}</td>
                <td className="text-right py-2">₹{item.rate.toFixed(2)}</td>
                <td className="text-right py-2">₹{item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t-2 border-gray-200 pt-4">
        <div className="flex justify-end">
          <div className="w-48 sm:w-64">
            <div className="flex justify-between font-bold text-lg pt-2">
              <span>Total:</span>
              <span>₹{invoice.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Links Section - Bottom Left */}
      <div className="absolute bottom-8 left-8 space-y-2">
        <a 
          href="https://bharathatchery.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <Globe size={16} className="mr-2" />
          Visit our website
        </a>
        <a 
          href="https://chat.whatsapp.com/FRcDhvMs9iE47jj68drpWc" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-green-600 hover:text-green-800"
        >
          <MessageCircle size={16} className="mr-2" />
          Join our WhatsApp group
        </a>
        <a 
          href="https://wa.me/917903716957" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-green-600 hover:text-green-800"
        >
          <Send size={16} className="mr-2" />
          Place order via WhatsApp
        </a>
      </div>

      {/* Signature Section */}
      <div className="mt-12 flex justify-end">
        <div className="text-center w-40">
          <div className="border-b-2 border-gray-300 w-full mb-2"></div>
          <p className="text-sm text-gray-600">Authorized Signature</p>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-600 text-sm">
        <p>हमारे उत्पाद/सेवा को चुनने के लिए धन्यवाद!</p>
      </div>

      {/* Share Buttons - Only visible on screen */}
      <div className="mt-8 flex justify-center gap-4 no-print">
        <button
          onClick={() => setShowWhatsappModal(true)}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <Share2 size={20} className="mr-2" />
          Share via WhatsApp
        </button>
      </div>

      {/* WhatsApp Modal */}
      {showWhatsappModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 no-print">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Share Invoice Text </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter WhatsApp Number (with country code)
              </label>
              <input
                type="tel"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="e.g., 919939963985"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-sm text-gray-500 mt-1">Include country code (e.g., 91 for India)</p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowWhatsappModal(false);
                  setWhatsappNumber('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleWhatsAppShare}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}