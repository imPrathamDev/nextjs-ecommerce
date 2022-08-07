import Head from 'next/head'
import CollectionsSection from '../components/sections/CollectionsSection';
import Features from "../components/sections/Features";
import HeroSection from "../components/sections/HeroSection";
import Secondary from "../components/sections/Secondary";
import TrendingSection from "../components/sections/TrendingSection";

export async function getStaticProps() {
  const products = await fetch('http://localhost:3000/api/products/getProducts').then((response) => response.json());
  const collections = await fetch('http://localhost:3000/api/collections/getCollections').then((response) => response.json());
  return {
    props: {
      products,
      collections
    },
  }
}

export default function Home({ products, collections }) {
  console.log(products)
  return (
    <>
    <Head>
      <title>Brand Name</title>
    </Head>
    <HeroSection />
    <CollectionsSection collections={collections} />
    <TrendingSection products={products} />
    <Secondary />
    </>
  )
}
