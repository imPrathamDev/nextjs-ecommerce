import React from 'react'
import Image from 'next/image'
import notFoundImage from '../../public/not_found.svg'

function NotFound({ message }) {
  return (
    <div className='flex flex-col justify-center w-full my-8'>
      <Image src={notFoundImage} width={'260px'} height={'200px'} className='' />
      <h3 className='text-2xl font-semibold'>{message}</h3>
    </div>
  )
}

export default NotFound
