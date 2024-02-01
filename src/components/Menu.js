import React, { useState } from 'react';
import menu1 from '../assets/tiffinmenu1.jpg';
import menu2 from '../assets/tiffinmenu2.jpg';

export default function Menu() {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-3xl shadow-md p-6 text-center mb-28 mx-4">
        <h2 className="text-2xl text-gray-800 font-bold mb-4">Menu</h2>
        {loading && <div className="loader">Loading...</div>}
        <div className="flex flex-col">
          <img
            src={menu1}
            alt="Menu Item 1"
            className="w-full rounded-lg"
            onLoad={handleImageLoad}
          />
          <img
            src={menu2}
            alt="Menu Item 2"
            className="w-full rounded-lg"
            onLoad={handleImageLoad}
          />
        </div>
      </div>
    </div>
  );
}
