import Image from 'next/image'

import bgSecondary from '../../../public/bg-secondary.jpg'
import PrimaryButton from '../buttons/PrimaryButton'

function Secondary() {
  return (
<section>
  <div class="px-4 py-16 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 lg:h-screen">
      <div class="relative z-10 lg:py-16">
        <div class="relative h-64 sm:h-80 lg:h-full">
          <Image src={bgSecondary} layout="fill" className='rounded-sm' />
        </div>
      </div>

      <div class="relative flex items-center bg-gray-100">
        <span
          class="hidden lg:inset-y-0 lg:absolute lg:w-16 lg:bg-gray-100 lg:block lg:-left-16"
        ></span>

        <div class="p-8 sm:p-16 lg:p-24">
          <h2 class="text-2xl font-Cinzel font-bold sm:text-3xl text-primary">
           Explore Indian Jewellery Collection By Company Name
          </h2>

          <p class="mt-4 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid,
            molestiae! Quidem est esse numquam odio deleniti, beatae, magni
            dolores provident quaerat totam eos, aperiam architecto eius quis
            quibusdam fugiat dicta.
          </p>

          <div className='mt-4'>
          <PrimaryButton>
            Get In Touch
          </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default Secondary
