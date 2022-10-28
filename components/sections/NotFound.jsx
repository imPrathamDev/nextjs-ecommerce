import React from 'react'
import Image from 'next/image'
import notFoundImage from '../../public/not_found.svg'

function NotFound({ message }) {
  return (
    <div className='grid grid-cols-1 justify-center justify-items-center my-8 mx-auto'>
      <div className='relative h-42 w-64 bg-gray-200 rounded-md overflow-hidden'>
      <div className="tenor-gif-embed" data-postid="11943176" data-share-method="host" data-aspect-ratio="1.505" data-width="100%"></div>
      </div>
      <h3 className='text-xl font-medium font-mono my-2'>{message}</h3>
    </div>
  )
}

export default NotFound
