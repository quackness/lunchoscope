'use client';
import axios from 'axios';
import { useState } from 'react';
// import {Navbar} from 
import {AiFillCheckCircle} from 'react-icons/ai';
import { useAuth } from '@/Context/userAuth';
import Email from 'next-auth/providers/email';

//https://github.com/bwestwood11/stripe-checkout-nextjs13/blob/main/app/components/PricingCard.jsx
//test payments with the credit cards https://docs.stripe.com/testing#cards


const Success1 = () => {

  const { user } = useAuth();
  console.log(user)


console.log("Testing test")
  
  return (
    <div>
        You have paid!
    </div>

  )
}

export default Success1;

