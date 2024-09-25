// src/app/buyers/page.js
"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import styles from "./buyers.module.css"; // Import CSS module

const BuyersPage = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const cropsCollection = collection(db, "crops");
        const cropSnapshot = await getDocs(cropsCollection);
        const cropList = cropSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCrops(cropList);
      } catch (error) {
        console.error("Error fetching crops: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  if (loading) {
    return <p>Loading crops...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Available Crops for Sale</h1>
      <div className={styles.grid}>
        {crops.length > 0 ? (
          crops.map((crop) => (
            <div key={crop.id} className={styles.card}>
              <img src={crop.imageUrl} alt={crop.cropName} className={styles.image} />
              <h2 className={styles.title}>{crop.cropName}</h2>
              <p>Quantity: {crop.quantity} kg</p>
              <p>Price: ${crop.price} per kg</p>
              <p>Location: {crop.location}</p>
            </div>
          ))
        ) : (
          <p>No crops available for sale.</p>
        )}
      </div>
    </div>
  );
};

export default BuyersPage;
