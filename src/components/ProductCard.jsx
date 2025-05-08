import React from 'react';

const MinimalProductCard = ({ name, price, description, image }) => {
  return (
    <div className="max-w-sm w-full bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-lg transition duration-300 ease-in-out">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-base font-bold text-indigo-600">{price}</span>
          <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinimalProductCard;
