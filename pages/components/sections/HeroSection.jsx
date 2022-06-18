import Image from 'next/image'
import React from 'react'

import banner from '../../../public/banner.png'
import PrimaryButton from '../buttons/PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'

function HeroSection() {
  return (
<section className="relative bg-white">
  <Image
    className="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full opacity-25 sm:opacity-100"
    src={banner}
    alt="Couple on a bed with a dog"
    layout="fill"
  />

  <div className="hidden sm:block sm:inset-0 sm:absolute sm:bg-gradient-to-r sm:from-white sm:to-transparent"></div>

  <div className="relative max-w-screen-xl px-4 py-24 lg:h-1/2 lg:items-center lg:flex mx-6">
    <div className="max-w-xl text-center sm:text-left">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Let us find your
        <strong className="font-Cinzel text-primary-dark sm:block truncate">
        personalized Jewellery.
        </strong>
      </h1>

      <p className="max-w-lg mt-4 sm:leading-relaxed sm:text-xl">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus numquam ea!
      </p>

      <div className="flex flex-wrap gap-4 mt-8 text-center">

        <PrimaryButton>
            Shop Toady
        </PrimaryButton>

        <SecondaryButton>
            Contact Us
        </SecondaryButton>

      </div>
    </div>
  </div>
</section>
  )
}

export default HeroSection
