import React from 'react'
import Link from 'next/link';

function NavMenu({ router }) {
    const [collections, setCollections] = React.useState([]);
    React.useEffect(() => {
        async function fetchCollections() {
            const data = await fetch('http://localhost:3000/api/collections/getCollections').then((response) => response.json());
            if (data.success) {
                setCollections(data.collections);
            }
        }
        fetchCollections();
    }, []);
    const links = [
        {
            name: 'Collections', submenu: true, sublinks: [
                {
                    Head: 'Categories',
                    sublink: collections.filter((c) => c.type === 'category')
                },
                {
                    Head: 'Colours',
                    sublink: collections.filter((c) => c.type === 'color')
                },
                {
                    Head: 'Style',
                    sublink: collections.filter((c) => c.type === 'style')
                },
                {
                    Head: 'Stones',
                    sublink: collections.filter((c) => c.type === 'stone')
                }
            ]
        }
    ];
    return (
        <>
            {
                links.map((col, key) => (
                    <div key={key} className={`flex items-center my-auto cursor-pointer md:h-full ${router.asPath === '/collections' ? 'text-primary border-primary' : 'text-gray-500'} hover:text-primary hover:border-current transition-all gap-1 group`}>
                        <Link href={col?.name === 'Collections' ? '/collections' : '/'}>
                            <a className={`block w-fit leading-10 border-b-4 border-transparent`}>
                                {col?.name}
                            </a>
                        </Link>
                        {col?.submenu && (
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-4 hover:text-primary transition-all`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        )}
                        {col.submenu && (
                            <div className='md:absolute md:z-50 md:top-24 hidden group-hover:md:block hover:md:block mr-4 shadow-2xl'>
                                <div className="">
                                    <div className="py-3">
                                        <div
                                            className="w-4 h-4 left-3 absolute mt-1 border-t-2 border-l-2 border-primary bg-primary-white rotate-45"
                                        ></div>
                                    </div>
                                    <div className="border-2 border-primary bg-primary-white p-5 grid grid-cols-3 gap-10">
                                        {col.sublinks.map((mysublinks, key) => (
                                            <div key={key}>
                                                <h1 className="text-base font-semibold font-Cinzel">
                                                    {mysublinks.Head}
                                                </h1>
                                                {mysublinks.sublink.map((slink, key) => (
                                                    <li key={key} className="text-sm text-gray-600 my-2.5">
                                                        <Link
                                                            href={`/collections/${slink.slug}`}
                                                        >
                                                            <a className="hover:text-primary">
                                                            {slink.name}
                                                            </a>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            }
        </>
    )
}

export default NavMenu;
