import React from 'react'
import Image from 'next/image'
const HeroHeader = ({ title, description, image }) => {
    return (
        <section className="relative bg-primary-white">
            <Image
                className="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full opacity-25 sm:opacity-100"
                src={image}
                alt="Couple on a bed with a dog"
                layout="fill"
            />

            <div className="hidden sm:block sm:inset-0 sm:absolute sm:bg-gradient-to-r sm:from-primary-white sm:to-transparent"></div>

            <div className="relative px-4 py-24 lg:h-1/2 lg:items-center lg:flex lg:justify-center mx-6">
                <div className="text-center">
                    <h1 className="text-3xl mx-auto font-extrabold font-Cinzel text-primary-dark sm:block sm:text-5xl">
                            {title}
                    </h1>
                    <p className="max-w-lg mx-auto mt-4 sm:leading-relaxed sm:text-xl">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default HeroHeader