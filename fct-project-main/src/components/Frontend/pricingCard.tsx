'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
// import {Navbar} from 
import {AiFillCheckCircle} from 'react-icons/ai';
import { useAuth } from '@/Context/userAuth';
import Email from 'next-auth/providers/email';
import { jwtVerify } from 'jose';
import cookie from 'cookie-cutter';

//https://github.com/bwestwood11/stripe-checkout-nextjs13/blob/main/app/components/PricingCard.jsx
//test payments with the credit cards https://docs.stripe.com/testing#cards

interface Price {
  id: string;
  nickname: string;
  unit_amount: number;
}

interface PricingCardProps {
  price: Price;
}

const PricingCard = ({ price }: PricingCardProps) => {
  console.log(price)

  const { user } = useAuth();
  // console.log(user)


  const { addUser } = useAuth();

  const fetchDataOnLoad = async () => {
    const token = cookie.get('authToken');

    if (!token) {
      return;
    }

    const decode = await jwtVerify(token, new TextEncoder().encode('testpassword'))
    const user = decode.payload;
    if (decode.payload) {
      addUser(user);
    }
  }

  useEffect(() => {
    fetchDataOnLoad();
  }, [])

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

  return (
    <> { price ?
      <div className="border-grey-100 shadow-2xl border-4 text-center mt-10 max-w-[1040px]">
      <div>
        <div className="bg-gray-100 h-38 items-center font-bold pt-10">
          <h4 className="text-3xl">{price.nickname}</h4>
          <span>
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
            <span className="text-sm text-gray-500">100 Horoscope Sentiment Analysis</span>
          </div>
          <div className="flex space-x-3">
            <AiFillCheckCircle
              className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-500">Partner Discounts</span>
          </div>
        </div>
          </span>
          <div>
            <div className="flex flex-col items-center justify-center pt-4">
              <h1 className="text-5xl font-bold">
              {(price?.unit_amount / 100).toLocaleString('en-CA',{ style: 'currency', currency: 'CAD'})}</h1>
            </div>
          </div>
          <button className="mt-8 flex w-full justify-center rounded-md border border-transparent btn btn-accent py-2 px-4 text-sm font-medium text-white shadow-sm" onClick={handleSubscription}>
             Subscribe
          </button>
        </div>
      </div>
    </div>
    :
    <div className="flex justify-center items-center mt-10">
    <span className="loading loading-ring loading-lg"></span>
  </div>

    }
    
    </>
   
  )
}

export default PricingCard