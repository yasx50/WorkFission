import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ItemShowcase = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderMessage, setOrderMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [useSemanticSearch, setUseSemanticSearch] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/all-items`)
      .then(res => res.json())
      .then(data => {
        const reversedData = [...data].reverse();
        setItems(reversedData);
        setFilteredItems(reversedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Keyword search on frontend
    if (!useSemanticSearch) {
      const keywordFiltered = items.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
      );
      setFilteredItems(keywordFiltered);
    }
  };

  const handleSemanticSearch = async () => {
    if (searchTerm.trim() === '') {
      setFilteredItems(items);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchTerm }),
      });

      const data = await response.json();
      setFilteredItems(data.matches || []);
    } catch (error) {
      console.error('Error fetching semantic results:', error);
      setFilteredItems([]);
    }
  };

  const handleBuy = (itemName) => {
    setOrderMessage(`Order placed successfully for ${itemName}!`);
    setTimeout(() => {
      setOrderMessage('');
    }, 3000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-gray-800 hover:text-blue-600 mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
              <h1 className="font-bold text-xl text-gray-800">My Products</h1>
            </div>

            <div className="mt-3 md:mt-0 w-full md:w-[400px] flex flex-col gap-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" 
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <label className="flex items-center text-sm gap-2">
                  <input
                    type="checkbox"
                    checked={useSemanticSearch}
                    onChange={() => setUseSemanticSearch(!useSemanticSearch)}
                  />
                  Use Semantic Search
                </label>
                <button
                  onClick={handleSemanticSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm"
                  disabled={!useSemanticSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {orderMessage && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center">
            {orderMessage}
          </div>
        )}

        <div className="mb-6">
          <p className="text-gray-600">
            {searchTerm ? 
              `${filteredItems.length} result${filteredItems.length !== 1 ? 's' : ''} found for "${searchTerm}"` : 
              `Showing all ${filteredItems.length} products`
            }
          </p>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-500">No products found matching your search.</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredItems.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {index === 0 && filteredItems === items && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 m-2 rounded-full">
                      New
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">{item.name}</h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-green-600">₹{item.price}</p>
                    <button 
                      onClick={() => handleBuy(item.name)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemShowcase;
