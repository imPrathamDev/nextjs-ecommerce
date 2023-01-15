import CollectionsSection from "../components/sections/CollectionsSection";
// import Features from "../components/sections/Features";
import Secondary from "../components/sections/Secondary";
import TrendingSection from "../components/sections/TrendingSection";
// import FeatureCategories from "../components/sections/FeatureCategories";
import { motion } from "framer-motion";
import FeatureCategory from "../components/sections/FeatureCategory";
import ProductSlider from "../components/sections/ProductSlider";
import Testimonials from "../components/sections/Testimonials";
import HeroSlider from "../components/sections/HeroSection/HeroSlider";
import Layouts from "../components/layouts/Layouts";
import Contact from "../components/sections/ContactSection/Contact";
import PageTitle from "../components/PageTitle";

export async function getStaticProps() {
  const products = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/products/getProducts`
  ).then((response) => response.json());
  const collections = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/collections/getCollections`
  ).then((response) => response.json());
  const newestProducts = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/products/getProducts?sort=new`
  ).then((res) => res.json());
  return {
    props: {
      products,
      collections,
      newestProducts,
    },
  };
}

export default function Home({ products, collections, newestProducts }) {
  const easing = [0.6, -0.05, 0.01, 0.99];
  const fadeInUp = {
    initial: {
      y: 60,
      opacity: 0,
    },
    annimate: {
      y: 0,
      opacity: 1,
      tranistion: {
        duration: 0.6,
        ease: easing,
      },
    },
  };
  return (
    <Layouts>
      <motion.section exit={{ opacity: 0 }} initial="initial" animate="animate">
        <PageTitle />
        <HeroSlider />
        <CollectionsSection collections={collections} />
        <TrendingSection products={products} />
        <Secondary />
        <FeatureCategory products={products} />
        <ProductSlider products={newestProducts} />
        <Testimonials />
        <Contact />
        <div className="absolute bottom-4 right-4"></div>
      </motion.section>
    </Layouts>
  );
}
