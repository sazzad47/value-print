import React from 'react'
import Header from './Header'
import Details from './Details'

const ProductDetails = ({product}) => {
  return (
    <div className='flex flex-col gap-5'>
        <Header product={product} />
        <Details product={product} />
    </div>
  )
}

export default ProductDetails