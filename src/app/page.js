// "use client";
// import React, { useEffect, useState } from 'react';

// const ApiDataPage = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch data from the API
//     const fetchData = async () => {
//       try {
//         const res = await fetch(
// 'https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24?api-key=579b464db66ec23bdd00000188a4a515f9a84fb7743993fb436e1c44&format=json');
//         const result = await res.json();
        
//         setData(result);
//       } catch (err) {
//         setError('Failed to fetch data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h1>API Data</h1>
     
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

// export default ApiDataPage;



// "use client";

// import React, { useState,useEffect } from 'react';

// const stateOptions = [
//   { name: 'Assam', districts: ['Cachar', 'Dibrugarh', 'Kamrup', 'Tinsukia'] },
//   { name: 'Maharashtra', districts: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'] },
//   { name: 'Karnataka', districts: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'] },
//   // Add more states and their districts
// ];

// const commodityOptions = ['Rice', 'Wheat', 'Maize', 'Barley', 'Pulses', 'Oilseeds'];

// const ApiDataPage = () => {
//   const [state, setState] = useState('');
//   const [district, setDistrict] = useState('');
//   const [commodity, setCommodity] = useState('');
//   const [arrivalDate, setArrivalDate] = useState('');
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);


//   const [districtOptions, setDistrictOptions] = useState([]);

//   useEffect(() => {
//     // Update district options when the state changes
//     if (state) {
//       const selectedState = stateOptions.find(option => option.name === state);
//       if (selectedState) {
//         setDistrictOptions(selectedState.districts);
//         setDistrict(''); // Reset district when state changes
//       }
//     } else {
//       setDistrictOptions([]);
//     }
//   }, [state]);
//   // Function to handle form submission and fetch data
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Build the API URL dynamically based on the inputs
//     let apiUrl = 'https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24?api-key=579b464db66ec23bdd00000188a4a515f9a84fb7743993fb436e1c44&format=json';
    
//     // Add filters if they are provided
//     const filters = [];
//     if (state) filters.push(`filters%5BState.keyword%5D=${encodeURIComponent(state)}`);
//     if (district) filters.push(`filters%5BDistrict.keyword%5D=${encodeURIComponent(district)}`);
//     if (commodity) filters.push(`filters%5BCommodity.keyword%5D=${encodeURIComponent(commodity)}`);
//     if (arrivalDate) filters.push(`filters%5BArrival_Date%5D=${encodeURIComponent(arrivalDate)}`);

//     // If filters exist, append them to the URL
//     if (filters.length > 0) {
//       apiUrl += '&' + filters.join('&');
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch(apiUrl);
//       if (!res.ok) {
//         throw new Error('Failed to fetch data');
//       }
//       const result = await res.json();
//       setData(result);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Fetch Data from API</h1>
//       <form onSubmit={handleSubmit}>
//         {/* State Dropdown */}
//         <div>
//           <label>State: </label>
//           <select value={state} onChange={(e) => setState(e.target.value)}>
//             <option value="">Select State</option>
//             {stateOptions.map((option) => (
//               <option key={option.name} value={option.name}>
//                 {option.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* District Dropdown */}
//         <div>
//           <label>District: </label>
//           <select value={district} onChange={(e) => setDistrict(e.target.value)} disabled={!state}>
//             <option value="">Select District</option>
//             {districtOptions.map((district) => (
//               <option key={district} value={district}>
//                 {district}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Commodity Dropdown */}
//         <div>
//           <label>Commodity: </label>
//           <select value={commodity} onChange={(e) => setCommodity(e.target.value)}>
//             <option value="">Select Commodity</option>
//             {commodityOptions.map((commodity) => (
//               <option key={commodity} value={commodity}>
//                 {commodity}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Arrival Date */}
//         <div>
//           <label>Arrival Date: </label>
//           <input
//             type="date"
//             value={arrivalDate}
//             onChange={(e) => setArrivalDate(e.target.value)}
//           />
//         </div>

//         <button type="submit">Fetch Data</button>
//       </form>

//       {/* Loading state */}
//       {loading && <p>Loading...</p>}

//       {/* Error message */}
//       {error && <p>{error}</p>}

//       {/* Display the fetched data */}
//       {data && (
//         <pre>{JSON.stringify(data.records, null, 2)}</pre>
//       )}
//     </div>
//   );
// };

// export default ApiDataPage;

"use client"
import { push, ref } from 'firebase/database';
import { database } from './firebase/firebase';
import { useState, useEffect } from 'react';
export default function Home() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  return (
    <main>

    </main>
  )
}