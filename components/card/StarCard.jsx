import React from 'react'
import { StarIcon } from '@heroicons/react/outline'

const StarCard = ({ rating }) => {
    return (
        <>
            {rating < 2 ? (
                <>
                    <StarIcon className='w-5 h-5 text-primary' fill="currentColor" />
                    <StarIcon className='w-5 h-5 text-primary' />
                    <StarIcon className='w-5 h-5 text-primary' />
                    <StarIcon className='w-5 h-5 text-primary' />
                    <StarIcon className='w-5 h-5 text-primary' />
                </>
            ) : rating < 3 ? (
                <>
                    <StarIcon className='w-5 h-5 text-primary' fill="currentColor" />
                    <StarIcon className='w-5 h-5 text-primary' fill="currentColor" />
                    <StarIcon className='w-5 h-5 text-primary' />
                    <StarIcon className='w-5 h-5 text-primary' />
                    <StarIcon className='w-5 h-5 text-primary' />
                </>
            ) : rating < 4 ? (
                <>
                    <StarIcon className='w-5 h-5 text-primary' fill="currentColor" />
                    <StarIcon className='w-5 h-5 text-primary' fill="currentColor" />
                    <StarIcon className='w-5 h-5 text-primary' fill="currentColor" />
                    <StarIcon className='w-5 h-5 text-primary' />
                    <StarIcon className='w-5 h-5 text-primary' />
                </>
            ) : rating < 5 ? (
                <>
                    <StarIcon className='w-5 h-5 text-primary' fill="currentColor" />
                    <StarIcon className='w-5 h-5 text-primary' fill="currentColor" />
                    <StarIcon className='w-5 h-5 text-primary' fill="currentColor" />
                    <StarIcon className='w-5 h-5 text-primary' fill="currentColor" />
                    <StarIcon className='w-5 h-5 text-primary' />
                </>
            ) : (
                <>
                    <StarIcon className='w-5 h-5 text-primary' fill="currentColor" />
                    <StarIcon className='w-5 h-5 text-primary' fill="currentColor" />
                    <StarIcon className='w-5 h-5 text-primary' fill="currentColor" />
                    <StarIcon className='w-5 h-5 text-primary' fill="currentColor" />
                    <StarIcon className='w-5 h-5 text-primary' fill="currentColor" />
                </>
            )}
        </>
    )
}

export default StarCard
