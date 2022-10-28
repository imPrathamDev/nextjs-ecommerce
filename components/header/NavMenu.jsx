import React from "react";
import Link from "next/link";

const colTypesName = ["Categories", "Colours", "Style", "Stones"];

function NavMenu({ router }) {
  const [collections, setCollections] = React.useState([]);
  React.useEffect(() => {
    async function fetchCollections() {
      const data = await fetch(
        "http://localhost:3000/api/collections/getCollections"
      ).then((response) => response.json());
      if (data.success) {
        setCollections(data.collections);
      }
    }
    fetchCollections();
  }, []);

  const links = [
    {
      name: "Collections",
      submenu: true,
      sublinks: colTypesName.map((item) => ({
        Head: item,
        sublink: collections
          .filter((p) => p.type.toLowerCase() === item.toLowerCase())
          .map((sublink) => ({
            _id: sublink?._id,
            type: sublink?.type,
            name: sublink?.name,
            slug: sublink?.slug,
          })),
      })),
    },
  ];

  return (
    <>
      {links.map((col, key) => (
        <div
          key={key}
          className={`flex items-center my-auto cursor-pointer md:h-full ${
            router.asPath === "/collections"
              ? "text-primary border-primary"
              : "text-gray-500"
          } hover:text-primary hover:border-current transition-all gap-1 group`}
        >
          <Link href={col?.name === "Collections" ? "/collections" : "/"}>
            <span
              className={`block w-fit leading-10 border-b-4 border-transparent`}
            >
              {col?.name}
            </span>
          </Link>
          {col?.submenu && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-4 hover:text-primary transition-all`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
          {col.submenu && (
            <div className="w-full md:absolute md:z-50 left-0 md:top-16 hidden group-hover:md:block hover:md:block mr-4 shadow-xl">
              <div className="w-full">
                <div className="border-2 border-primary bg-primary-white p-5 grid grid-cols-4 gap-10 group-hover:opacity-100 transition-all opacity-0">
                  {col.sublinks.map((mysublinks, key) => (
                    <div key={key}>
                      <h1 className="text-lg font-semibold font-Cinzel">
                        {mysublinks.Head}
                      </h1>
                      <ul>
                        {mysublinks.sublink.map((slink, key) => (
                          <li
                            key={key}
                            className="text-sm text-gray-600 my-2.5"
                          >
                            <Link
                              href={"/collections/${slink.slug}"}
                              as={`/collections/${slink.slug}`}
                            >
                              <span className="hover:text-primary hover:tracking-wider transition-all">
                                {slink.name}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default NavMenu;
