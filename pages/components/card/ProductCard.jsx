import Image from 'next/image'

import placeholder from '../../../public/placeholder.webp'
import PrimaryButton from '../buttons/PrimaryButton'

function ProductCard() {
  return (
    <div className="w-fit px-4 p-6  block text-left group cursor-pointer transition-all transform hover:scale-105">
          <div className="aspect-w-1 aspect-h-1">
            <Image src={placeholder} className="object-cover rounded-md" width={'250px'} height={'230px'} />
          </div>

          <div className="mt-2">
            <h5 className="text-primary-black font-Cinzel font-medium transition-all group-hover:text-primary">
            Anushka Sharma Classic Silver Zircon Set
            </h5>

            <p className=" text-sm text-gray-700">
              <small className='text-xs'>$</small> 
              150
            </p>
          </div>
          <div className='mt-1 opacity-0 transform translate-y-14 transition group-hover:opacity-100 group-hover:translate-y-0 duration-300'>
          <PrimaryButton>
                Add to Cart
            </PrimaryButton>
          </div>
        </div>
  )
}

export default ProductCard
