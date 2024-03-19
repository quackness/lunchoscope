import axios from 'axios';
import Link from "next/link";
import {AiFillCheckCircle} from 'react-icons/ai';

const PricingCard = ({price}) => {

    const dynamicSubTitle = (price) => {
      if (price.nickname === "FREE Trial") {
        return <p className="text-[#f1592a] mt-1">5 Sentiment analysis per month</p>;
      } else if (price.nickname === "Lunchoscope Annual Subscription") {
        return (
          <div>
        <p className="text-[#f1592a] mt-1">Unlimited Sentiment Analysis</p>
        <p className="text-[#f1592a] mt-1">20% discount</p>
        <p className="text-[#f1592a] mt-1">24/7 Support</p>
        </div>
        );
      } else if (price.nickname === "Lunchoscope Monhtly Subscription") {
        return <p className="text-[#f1592a] mt-1">Unlimited Sentiment Analysis</p>;
      }
    }
  
  return (
    <div className="border-grey-100 shadow-2xl border-4 text-center mt-10 max-w-[1040px]">
      <div>
        <div className="bg-gray-100 h-28 items-center font-bold">
          <h4 className="text-3xl">{price.nickname}</h4>
          <p>{dynamicSubTitle(price)}</p>
          <div>
            <div className="flex flex-col items-center justify-center pt-4">
              <h1 className="text-5xl font-bold">
              {(price.unit_amount / 100).toLocaleString('en-CA',{ style: 'currency', currency: 'CAD'})}</h1>
            </div>
          </div>
          <button className="mt-8 flex w-full justify-center rounded-md border border-transparent bg-[#f1592a] py-2 px-4 text-sm font-medium text-white shadow-sm" onClick={()=> {}}>
             Subscribe
          </button>

        </div>
      </div>

    </div>

  )

}

export default PricingCard