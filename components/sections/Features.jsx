import React from 'react'

function Features() {

    const styleData = 'h-12 w-12 text-primary-light group-hover:text-primary transition-colors duration-300';
    const featuresList = [
        {title: 'FREE DILEVER', description: 'order above $100', icon: (<svg xmlns="http://www.w3.org/2000/svg" className={styleData} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>)},
        {title: 'GIFT VOUCHER', description: 'Enter Now', icon: (<svg xmlns="http://www.w3.org/2000/svg" className={styleData} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>)},
        {title: 'MONEY BACK', description: 'With in 30 days', icon: (<svg xmlns="http://www.w3.org/2000/svg" className={styleData} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>)},
        {title: 'ONLINE SUPPORT', description: 'Hours 8 am - 11 pm', icon: (<svg xmlns="http://www.w3.org/2000/svg" className={styleData} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>)},
    ]

  return (
    <div className='mx-10 py-8 grid grid-cols-2 xl:grid-cols-4 items-center gap-2 justify-center'>

    {featuresList.map((data, key) => (<div className='flex flex-col xl:flex-row lg:flex-row gap-2 items-center cursor-pointer group' key={key}>
            <div className='rounded-full bg-primary p-3 border-2 border-primary-white group-hover:border-primary group-hover:bg-primary-white transition-colors duration-300'>
            {data.icon}
            </div>
            <div className='flex flex-col text-center xl:text-left lg:text-left'>
                <h3 className='text-base font-semibold'>{data.title}</h3>
                <p className='text-sm'>{data.description}</p>
            </div>
        </div>
    ))}

    </div>
  )
}

export default Features
