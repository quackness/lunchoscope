import axios from 'axios';
// import {Navbar} from 
import {AiFillCheckCircle} from 'react-icons/ai';

//https://github.com/bwestwood11/stripe-checkout-nextjs13/blob/main/app/components/PricingCard.jsx
//test payments with the credit cards https://docs.stripe.com/testing#cards


const PricingCard = ({price}) => {

    const dynamicSubTitle = (price) => {
      if (price.nickname === "FREE Trial") {
        return (
          <div className="mt-6 space-y-4">
         <div className="flex space-x-3">
         <AiFillCheckCircle
            className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
            aria-hidden="true"
          />
          <p className="text-sm text-gray-500">5 Sentiment analysis per month</p>
          </div>
        </div>
        )
      } else if (price.nickname === "Lunchoscope Annual Subscription") {
        return (
          <>
          <div className="mt-6 space-y-4">
            <div className="flex space-x-3">
            <AiFillCheckCircle
            className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
            aria-hidden="true"
          />
              <p className="text-sm text-gray-500">20% discount</p>
            </div>
            <div className="flex space-x-3">
            <AiFillCheckCircle
            className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
            aria-hidden="true"
          />
        <p className="text-sm text-gray-500">Unlimited Sentiment Analysis</p>
        </div>
          </div>
         </>

        );
      } else if (price.nickname === "Lunchoscope Monhtly Subscription") {
        return (
          <div className="mt-6 space-y-4">     
           <div className="flex space-x-3">
            <AiFillCheckCircle
            className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
            aria-hidden="true"
          />
        <p className="text-sm text-gray-500">Unlimited Sentiment Analysis</p>
        </div>
      </div>
        );
      }
    }

// POST request 
const handleSubscription = async (e: any) => {
  e.preventDefault();
  const { data } = await axios.post('http://localhost:3000/payment',
  {
    priceId: price.id
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
  );
  window.location.assign(data)
}

  
  return (
    <div className="border-grey-100 shadow-2xl border-4 text-center mt-10 max-w-[1040px]">
      <div>
        <div className="bg-gray-100 h-38 items-center font-bold">
          <h4 className="text-3xl">{price.nickname}</h4>
          <p>{dynamicSubTitle(price)}</p>
          <div>
            <div className="flex flex-col items-center justify-center pt-4">
              <h1 className="text-5xl font-bold">
              {(price.unit_amount / 100).toLocaleString('en-CA',{ style: 'currency', currency: 'CAD'})}</h1>
            </div>
          </div>{
            price.nickname === "FREE Trial" ?
           <button className="mt-8 flex w-full justify-center rounded-md border border-transparent bg-[#f1592a] py-2 px-4 text-sm font-medium text-white shadow-sm">Create FREE trial</button>
          :
          <button className="mt-8 flex w-full justify-center rounded-md border border-transparent bg-[#f1592a] py-2 px-4 text-sm font-medium text-white shadow-sm" onClick={handleSubscription}>
             Subscribe
          </button>
}
        </div>
      </div>
    </div>
  )
}

export default PricingCard