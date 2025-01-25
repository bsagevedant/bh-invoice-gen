import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePrint from './components/InvoicePrint';
import type { Invoice } from './types';
import { FileText } from 'lucide-react';

function App() {
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleNewInvoice = () => {
    setInvoice(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center">
             
          </div>
          {invoice && (
            <div className="flex gap-4">
              <button
                onClick={handleNewInvoice}
                className="no-print px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                New Invoice
              </button>
              <button
                onClick={handlePrint}
                className="no-print px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Print Invoice
              </button>
            </div>
          )}
        </div>

        {!invoice ? (
          <InvoiceForm onGenerateInvoice={setInvoice} />
        ) : (
          <InvoicePrint invoice={invoice} />
        )}
      </div>
    </div>
  );
}

export default App;