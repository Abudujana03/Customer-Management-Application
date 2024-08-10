import React, { useState, useEffect } from 'react';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';

interface Customer {
  id: number;
  name: string;
  title: string;
  description: string;
  address: string;
  photos: string[];
}

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    fetch('/customers.json')
      .then(response => response.json())
      .then(data => setCustomers(data));
  }, []);

  useEffect(() => {
    if (selectedCustomerId !== null) {
      const customer = customers.find(c => c.id === selectedCustomerId);
      setSelectedCustomer(customer || null);
    }
  }, [selectedCustomerId, customers]);

  return (
    <div className="flex">
      <div className="mt-6 border-r">
        <CustomerList
          customers={customers}
          onSelect={setSelectedCustomerId}
          selectedCustomerId={selectedCustomerId}
        />
      </div>
      <div className="w-auto p-4 ">
        {selectedCustomer && (
          <CustomerDetails
            name={selectedCustomer.name}
            title={selectedCustomer.title}
            description={selectedCustomer.description}
            address={selectedCustomer.address}
          />
        )}
      </div>
    </div>
  );
};

export default App;
