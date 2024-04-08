// pages/api/stripe/webhook.js

import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: null,
});

 export async function POST(req: Request) {
    
  try {
    const event = stripe.webhooks.constructEvent(
      await req.text(),
      req.headers.get('stripe-signature'),
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log(event)
    switch (event.type) {
      case 'invoice.payment_succeeded':
   
        const paymentIntent = event.data.object;
        const customerEmail = paymentIntent.customer_email;
        

        const user = await prisma.user.findUnique({
          where: { email: customerEmail ?? "test" },
        });

        if (user) {
     
          await prisma.user.update({
            where: { email: customerEmail },
            data: { 
              sentimentLeft: 100,
              subscribed: true
             }, 
          });

          console.log(`Updated payment status for user with email ${customerEmail}`);
        } else {
          console.log(`User with email ${customerEmail} not found`);
        }
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return Response.json({ received: true, user: user });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new Response(`Webhook Error: ${error.message}`, {status: 400});
  }
}