'use client'
import axios from 'axios';
import { useState, useEffect} from 'react';

import React from 'react'

const Pricing = () => {
  const [prices, setPrices] = useState([]);
  useEffect(() => {
    fetchPrices();
  }, [])

  const fetchPrices = async () => {
    const prices = await axios.get('http://localhost:3000/getProducts');
    // setPrices(data);
    const getPrices = prices.data
    console.log(getPrices);
    setPrices(getPrices)
  }
  return (
<section className="w-full">
         <div className="mx-auto max-w-4xl text-center mt-10 items-center">
              <h2 className="text-3xl font-semibold leading-7 text-[#f1592a]">Pricing</h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Choose the subscription plan</p>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-center">Check out all the information below</p>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[1040px] items-center mx-auto">
           Prices
         </div>
   </section>
  )
}

export default Pricing