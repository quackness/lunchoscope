'use client'
import PricingCard from '@/components/Frontend/pricingCard';
import axios from 'axios';
import { useState, useEffect} from 'react';
import Layout from '@/components/Frontend/layout';

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

  console.log(prices[1])
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
    <Layout>
<section className="w-full">
         <div className="mx-auto max-w-4xl text-center mt-10 items-center">
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Exclusive Member Pricing</h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-center">Sign up today and never wonder where to eat out again!</p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-1 mb-12 gap-8 max-w-[600px] items-center mx-auto">
           {/* {prices && prices.map(price => (

           <PricingCard price={price} key={price.id}/>
           ))} */}
           <PricingCard price={prices[1]} />
         </div>
   </section>
   </Layout>
  )
}

export default Pricing