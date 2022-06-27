import Head from 'next/head'
import Cookies from "js-cookie";
import { useEffect } from "react";
import Features from "../components/sections/Features";
import HeroSection from "../components/sections/HeroSection";
import Secondary from "../components/sections/Secondary";
import TrendingSection from "../components/sections/TrendingSection";
import { CartState } from "../context/Context";

export default function Home() {
  const {state: { cartItems }} = CartState();
  useEffect(()=>{
    Cookies.set('cartItemsData',JSON.stringify(cartItems))
  },[cartItems])
  return (
    <>
    <Head>
      <title>Brand Name</title>
    </Head>
    <HeroSection />
    <Features />
    <TrendingSection />
    <Secondary />
    </>
  )
}
