import React from 'react'
import MinimalProductCard from './components/ProductCard'
import photo from './assets/react.svg'

const App = () => {
  return (
  <>
  <MinimalProductCard name="yash" price="300" description="achha ladka" image={photo} />
  {/* <ProductCard name="yash" price="300" description="achha ladka" image/> */}
  </>
  )
}

export default App
