import React from 'react'

function BookImage({ image, className, style }) {
  return (
    <img src={image} alt='product' className={className} style={style} />
  )
}

export default BookImage