import React, { useState } from 'react';

const AddItemForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('image', imageFile); // The backend expects 'image'

    try {
      const response = await fetch('http://localhost:3000/api/v1/add-items', {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        setStatus('Item added successfully!');
        setFormData({ name: '', description: '', price: '' });
        setImageFile(null);
      } else {
        setStatus('Failed to add item. Try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error occurred.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Item Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      {status && <p className="text-center mt-4 text-sm text-gray-700">{status}</p>}
    </div>
  );
};

export default AddItemForm;
