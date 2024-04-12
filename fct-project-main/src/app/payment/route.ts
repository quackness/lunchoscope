import Stripe from 'stripe';
import { NextResponse, NextRequest } from 'next/server';


export async function POST(request: any) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: null
  });
  console.log(">>", stripe)
  let data = await request.json();
  let priceId = data.priceId
  let email = data.email
  console.log("email: ", email)
  console.log(email)
  const session = await stripe.checkout.sessions.create({
    line_items: [
        {
            price: priceId,
            quantity: 1,
        }
    ],
    customer_email: email,
  mode: 'subscription',
  //change those for production
  success_url: 'http://localhost:3000',
  cancel_url: 'http://localhost:3000'
})

return NextResponse.json(session.url)
}


//custom fields https://www.youtube.com/watch?v=d4sMYnenaU8