'use client';
import axios from 'axios';
import { useState } from 'react';
// import {Navbar} from 
import {AiFillCheckCircle} from 'react-icons/ai';
import { useAuth } from '@/Context/userAuth';
import Email from 'next-auth/providers/email';

//https://github.com/bwestwood11/stripe-checkout-nextjs13/blob/main/app/components/PricingCard.jsx
//test payments with the credit cards https://docs.stripe.com/testing#cards

interface Price {
  id: string;
  nickname: string;
}

interface PricingCardProps {
  price: Price;
}

const PricingCard = ({ price }: PricingCardProps) => {

  const { user } = useAuth();
  console.log(user)

  const dynamicSubTitle = (price: { nickname: string; }) => {
    if (price.nickname === "FREE Trial") {
      return (
        <div className="mt-6 space-y-4">
          <div className="flex space-x-3">
            <AiFillCheckCircle
              className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-500">5 Sentiment analysis per month</span>
          </div>
        </div>
      );
    } else if (price.nickname === "Lunchoscope Annual Subscription") {
      return (
        <div className="mt-6 space-y-4">
          <div className="flex space-x-3">
            <AiFillCheckCircle
              className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-500">LiveChat Support</span>
          </div>
          <div className="flex space-x-3">
            <AiFillCheckCircle
              className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-500">100 Sentiment Analysis</span>
          </div>
          <div className="flex space-x-3">
            <AiFillCheckCircle
              className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-500">Partner Discounts</span>
          </div>
        </div>
      );
    } 
    // else if (price.nickname === "Lunchoscope Monthly Subscription") {
    //   return (
    //     <div className="mt-6 space-y-4">     
    //       <div className="flex space-x-3">
    //         <AiFillCheckCircle
    //           className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
    //           aria-hidden="true"
    //         />
    //         <span className="text-sm text-gray-500">Unlimited Sentiment Analysis</span>
    //       </div>
    //     </div>
    //   );
    // }
  }

// POST request 
const handleSubscription = async (e: any) => {
  e.preventDefault();
  const { data } = await axios.post('http://localhost:3000/payment',
  {
    priceId: price.id,
    email: user?.email
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
  );
  console.log("stripe data", data);
  window.location.assign(data)
}
console.log("Testing test")
  
  return (
    <div className="border-grey-100 shadow-2xl border-4 text-center mt-10 max-w-[1040px]">
      <div>
        <div className="bg-gray-100 h-38 items-center font-bold">
          <h4 className="text-3xl">{price.nickname}</h4>
          <span>{dynamicSubTitle(price)}</span>
          <div>
            <div className="flex flex-col items-center justify-center pt-4">
              <h1 className="text-5xl font-bold">
              {(price.unit_amount / 100).toLocaleString('en-CA',{ style: 'currency', currency: 'CAD'})}</h1>
            </div>
          </div>{
            price.nickname === "FREE Trial" ?
           <button className="mt-8 flex w-full justify-center rounded-md border border-transparent bg-[#f1592a] py-2 px-4 text-sm font-medium text-white shadow-sm">Create FREE trial</button>
          :
          <button className="mt-8 flex w-full justify-center rounded-md border border-transparent btn btn-accent py-2 px-4 text-sm font-medium text-white shadow-sm" onClick={handleSubscription}>
             Subscribe
          </button>
}
        </div>
      </div>
    </div>
  )
}

export default PricingCard