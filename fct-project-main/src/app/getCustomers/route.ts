import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// https://www.youtube.com/watch?v=d4sMYnenaU8


// const apiKey = 
// console.log(`apiKey: ${apiKey}`);
export async function GET(request: any) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: null
  });

  const customers = await stripe.customers.list({
    limit: 100,
  });
  console.log(customers)
  return NextResponse.json(customers.data)

}
