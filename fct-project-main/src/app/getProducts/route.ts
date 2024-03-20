import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// https://www.youtube.com/watch?v=d4sMYnenaU8


// const apiKey = 
// console.log(`apiKey: ${apiKey}`);
export async function GET(request: any) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: null
  });

  const prices = await stripe.prices.list({
    limit: 4
  })
  return NextResponse.json(prices.data)

}
