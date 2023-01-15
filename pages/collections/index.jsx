import React from "react";
import Image from "next/image";
import Link from "next/link";
import HeroHeader from "../../components/sections/HeroHeader";
import banner from "../../public/collections.jpg";
import Layouts from "../../components/layouts/Layouts";

export async function getStaticProps() {
  const getCollections = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/collections/getCollections`
  ).then((res) => res.json());
  return {
    props: {
      collections: getCollections?.collections,
    },
  };
}

const CollectionPage = ({ collections }) => {
  const data = collections.filter(
    (c) => c.placeholder.toLowerCase() !== "NA".toLowerCase()
  );
  return (
    <Layouts>
      <div className="flex flex-col justify-center">
        <HeroHeader
          title="Explore Our Collections"
          description="Check our collections you will see we provide many diffrent colllections of jewelleries."
          image={banner}
        />
        <div className="mx-auto my-8">
          <div className="grid grid-cols-3 gap-x-4 gap-y-6">
            {data.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative w-60 h-60 bg-white rounded-lg overflow-hidden transition-all group-hover:border-2 group-hover:border-primary group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <Image
                    src={callout.placeholder}
                    layout="fill"
                    className="object-center object-cover"
                  />
                </div>
                <h3 className="mt-2 text-sm text-gray-500">
                  <Link href={`/collections/${callout?.slug}`}>
                    <a>{callout.name}</a>
                  </Link>
                </h3>
                {/* <p className="text-base font-semibold text-gray-900">{callout.description}</p> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default CollectionPage;
