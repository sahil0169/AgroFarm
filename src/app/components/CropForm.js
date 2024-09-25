"use client";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import storage functions

const CropForm = () => {
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null); // Image state
  const [message, setMessage] = useState("");

  // Handle image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setMessage("Please upload an image of the crop.");
      return;
    }
    try {
      // 1. Upload image to Firebase Storage
      const imageRef = ref(storage, `cropImages/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      // 2. Save crop details along with image URL to Firestore
      await addDoc(collection(db, "crops"), {
        cropName,
        quantity,
        price,
        location,
        imageUrl, // Store image URL in Firestore
        createdAt: new Date(),
      });

      setMessage("Crop details submitted successfully!");
      // Clear form
      setCropName("");
      setQuantity("");
      setPrice("");
      setLocation("");
      setImage(null);
    } catch (error) {
      console.error("Error adding document: ", error);
      setMessage(`Failed to submit crop: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Sell Your Crop</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Crop Name"
          value={cropName}
          onChange={(e) => setCropName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity (in kg)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price per kg"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CropForm;
