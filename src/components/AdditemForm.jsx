import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const response = await fetch('http://localhost:3000/api/v1/add-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('✅ Item added!');
        setFormData({ name: '', description: '', price: '', image: '' });
      } else {
        setStatus('❌ Failed to add item.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('❌ Server error.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white">
      
      {/* Navbar */}
      <nav className="w-full px-6 py-4 bg-white shadow flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-700">WorkFission</div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/YashProjects" target="_blank" rel="noreferrer">
            <FaGithub className="text-xl text-gray-700 hover:text-black" />
          </a>
          <a href="https://linkedin.com/in/yashdeveloper" target="_blank" rel="noreferrer">
            <FaLinkedin className="text-xl text-blue-600 hover:text-blue-800" />
          </a>
          <a href="https://yashportfolio.com" target="_blank" rel="noreferrer">
            <FaGlobe className="text-xl text-green-600 hover:text-green-800" />
          </a>
          <button
            onClick={() => navigate('/products')}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View Products
          </button>
        </div>
      </nav>

      {/* Form Card */}
      <div className="w-full max-w-2xl mx-auto mt-12 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Add New Item</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={formData.price}
            onChange={handleChange}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="col-span-1 md:col-span-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          ></textarea>
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
        {status && <p className="mt-4 text-center text-sm text-gray-700">{status}</p>}
      </div>
    </div>
  );
};

export default Home;
