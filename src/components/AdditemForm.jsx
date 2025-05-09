import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
      const response = await fetch(`${API_BASE_URL}/api/v1/add-items`, {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        setStatus('Item added successfully!');
        setFormData({ name: '', description: '', price: '' });
        setImageFile(null);
        // Reset file input
        document.querySelector('input[type="file"]').value = '';
      } else {
        setStatus('Failed to add item. Try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error occurred.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="font-bold text-2xl">
                  <span className="text-gray-800">Work</span>
                  <span className="text-blue-600">Fission</span>
                </h1>
              </div>
              <div className="md:hidden">
                {/* Mobile menu button if needed */}
              </div>
            </div>
            
            <div className="mt-3 md:mt-0 flex items-center space-x-4">
              <Link 
                to="/products" 
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium flex items-center transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                View Products
              </Link>
              <div className="flex space-x-3">
                <a href="https://yash50.me" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </a>
                <a href="https://github.com/yasx50" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md my-10 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Add New Item</h2>
        
        {status && (
          <div className={`mb-6 p-3 rounded-md text-center ${
            status === 'Submitting...' ? 'bg-gray-100 text-gray-700' :
            status === 'Item added successfully!' ? 'bg-green-100 text-green-700' :
            'bg-red-100 text-red-700'
          }`}>
            {status}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Item Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter item name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter item description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-600 mb-1">Price (₹)</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
            />
          </div>
          
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-600 mb-1">Item Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors duration-200">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex justify-center text-sm text-gray-500">
                  <label htmlFor="image" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                    <span>Upload a file</span>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                      required
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Item
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>
            Created by <a href="https://yash50.me" className="text-blue-600 hover:text-blue-700 transition-colors duration-200" target="_blank" rel="noopener noreferrer">Yash</a> | 
            <a href="https://github.com/yasx50" className="text-blue-600 hover:text-blue-700 transition-colors duration-200 ml-1" target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddItemForm;