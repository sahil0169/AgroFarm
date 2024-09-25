"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

// Sample states with image URLs (you can replace the URLs with actual images)
const stateImages = [
  { name: 'West Bengal', img: 'kolkata.png' },
  { name: 'Gujarat', img: 'Ahmedabad.png' },
  { name: 'Karnataka', img: 'banglore.png' },
  { name: 'Kerala', img: 'kochi.png' },
  { name: 'Maharashtra', img: 'mumbai.png' },
  { name: 'Punjab', img: 'chandigarh.png' },
  { name: 'Tamil Nadu', img: 'Chennai.png' },
    { name: 'Andhra Pradesh', img: 'delhi.png' },
  { name: 'Assam', img: 'hydrabad.png' },
  { name: 'Arunachal Pradesh', img: 'state.png' },
    { name: 'Bihar', img: 'state.png' },
    { name: 'Chhattisgarh', img: 'state.png' },
    { name: 'Goa', img: 'state.png' },
    { name: 'Haryana', img: 'state.png' },
    { name: 'Himachal Pradesh', img: 'state.png' },
    { name: 'Jharkhand', img: 'state.png' },
    { name: 'Madhya Pradesh', img: 'state.png' },
    { name: 'Manipur', img: 'state.png' },
    { name: 'Meghalaya', img: 'state.png' },
    { name: 'Mizoram', img: 'state.png' },
    { name: 'Nagaland', img: 'state.png' },
    { name: 'Odisha', img: 'state.png' },
    { name: 'Rajasthan', img: 'state.png' },
    { name: 'Sikkim', img: 'state.png' },
    { name: 'Telangana', img: 'state.png' },
    { name: 'Tripura', img: 'state.png' },
    { name: 'Uttar Pradesh', img: 'state.png' },
    { name: 'Uttarakhand', img: 'state.png' },
   
];

const ApiDataPage = () => {
  const router = useRouter();

  // Function to navigate to the specific state's page
  const handleStateClick = (state) => {
    router.push(`/state/${state}`);
  };

  return (
    <div>
      <h1>Select a State</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {stateImages.map((state) => (
          <div
            key={state.name}
            onClick={() => handleStateClick(state.name)}
            style={{ cursor: 'pointer', margin: '20px', textAlign: 'center' }}
          >
            <img
              src={state.img}
              alt={state.name}
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            <p>{state.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiDataPage;
