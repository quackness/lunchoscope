'use client'
import PricingCard from '@/components/Frontend/pricingCard';
import axios from 'axios';
import { useState, useEffect} from 'react';

export interface Price {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount: number | null;
  livemode: boolean;
  lookup_key: string | null;
  metadata: Record<string, any>;
  nickname: string | null;
  product: string;
  recurring: Recurring;
  tax_behavior: string;
  tiers_mode: string | null;
  transform_quantity: string | null;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

interface Recurring {
  aggregate_usage: string | null;
  interval: string;
  interval_count: number;
  trial_period_days: number | null;
  usage_type: string;
}

interface PricingCardProps {
  price: Price;
}


const Pricing = () => {
  const [prices, setPrices] = useState<Price[]>([]);
  useEffect(() => {
    fetchPrices();
  }, [])

  const fetchPrices = async () => {
    const priceList = await axios.get('http://localhost:3000/getProducts');
    // setPrices(data);
    const getPrices = priceList.data
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
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-[1040px] items-center mx-auto">
           {prices && prices.map(price => (
              // <div key={price.id}>
              // <p>ID: {price.id}</p>
              // <p>Object: {price.currency}</p>
              // <p>Active: {price.active.toString()}</p>
            // </div>
            // console.log(price)
            // return price
            // <p>{price.nickname}</p>
           <PricingCard price={price} key={price.id}/>
           ))}
         </div>
   </section>
  )
}

export default Pricing