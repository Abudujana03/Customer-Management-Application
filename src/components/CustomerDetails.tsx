import React from 'react';
import PhotoGrid from './PhotoGrid';

interface CustomerDetailsProps {
  name: string;
  title: string;
  address: string;
  description: string;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ name, title, address, description }) => {
  return (
    <div >
      <h2 className="text-3xl font-bold  pt-2"><span className='pr-2'>{title}</span> {name}</h2>
      <div className="text-md text-black pt-2 font-semibold ">{address}</div>
      <div className="text-lg py-2 text-wrap leading-relaxed">{description}</div>
      <PhotoGrid />
    </div>
  );
};

export default CustomerDetails;


