import React from 'react'
import Header from './Header'
import Details from './Details'

const ProductDetails = ({product, data}) => {
  return (
    <div className='flex flex-col gap-5'>
        <Header product={product} />
        <Details product={product} data={data} />
    </div>
  )
}

export default ProductDetails