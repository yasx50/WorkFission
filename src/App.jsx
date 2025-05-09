import React from 'react'
import ItemShowcase from './components/ProductCard'
import photo from './assets/react.svg'
import { Routes, Route } from 'react-router-dom';
import Home from './components/AdditemForm';


const App = () => {
  return (
  
  
  <>
         <Routes>
         
            <Route path="/" element={ <Home/>} />
            <Route path="/products" element={<ItemShowcase  />} />
            {/* <Route path="/about" element={<About />} /> */}
         </Routes>
      </>

  )
}

export default App
