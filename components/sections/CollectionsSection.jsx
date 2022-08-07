import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

function CollectionsSection({ collections }) {
    const data = collections?.collections.filter(c => c.type === 'category')
    return (
        <div className="">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none text-center">
                    <h2 className='text-4xl font-Cinzel font-semibold text-primary-dark'>Explore Collections</h2>
                    <p>Explore some product types which provide.</p>

                    <div className="mt-10 space-y-12 flex gap-4 lg:space-y-0 overflow-x-scroll custom-scrollbar">
                        {data.map((callout) => (
                            <div key={callout.name} className="group relative">
                                <div className="relative w-60 h-60 bg-white rounded-lg overflow-hidden transition-all group-hover:border-2 group-hover:border-primary group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                    <Image
                                        src={callout.placeholder}
                                        layout="fill"
                                        className="object-center object-cover"
                                    />
                                </div>
                                <h3 className="mt-6 text-sm text-gray-500">
                                    <Link href={`/collections/${callout?.slug}`}>
                                    <a>
                                        <span className="absolute inset-0" />
                                        {callout.name}
                                    </a>
                                    </Link>
                                </h3>
                                {/* <p className="text-base font-semibold text-gray-900">{callout.description}</p> */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollectionsSection
