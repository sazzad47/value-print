import React from 'react'
import Header from './Header'

const ProductDetails = ({product}) => {
  return (
    <div className='flex flex-col gap-5'>
        <Header product={product} />
    </div>
  )
}

export default ProductDetails