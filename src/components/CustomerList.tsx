import React from 'react';
import { FixedSizeList as List } from 'react-window';

interface Customer {
    id: number;
    name: string;
    title: string;
    description: string;
}

interface CustomerListProps {
    customers: Customer[];
    onSelect: (id: number) => void;
    selectedCustomerId: number | null;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onSelect, selectedCustomerId }) => {
    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const customer = customers[index];
        const isSelected = selectedCustomerId === customer.id;
        return (
            <div
                style={style}
                role="button"
                tabIndex={0}
                className={`pb-2 pl-8 cursor-pointer ${isSelected ? 'bg-gray-200' : 'bg-white'} hover:bg-gray-100`}
                onClick={() => onSelect(customer.id)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        onSelect(customer.id);
                    }
                }}
            >
                <div className='flex flex-col'>
                    <div className="flex gap-2 font-bold text-lg">
                        <span className="text-gray-900">{index + 1}. </span>
                        <p>{customer.title}</p>
                        <h4>{customer.name}</h4>
                    </div>
                    <div>
                        <p className='truncate max-w-52'>{customer.description}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <List
            height={600}
            itemCount={customers.length}
            itemSize={60}
            width={300}
        >
            {Row}
        </List>
    );
};

export default CustomerList;
