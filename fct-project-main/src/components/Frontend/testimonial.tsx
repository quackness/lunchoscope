import Star from "./star";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from 'axios';

//https://stackoverflow.com/questions/49373125/how-to-get-more-than-3-reviews-from-yelp-api-request
//https://docs.developer.yelp.com/reference/v3_business_reviews
//api returns only 3 reviews 

interface Review {
  id: string;
  text: string;
  user: User;
}

interface User {
  name: string;
  profile_url: string;
}

interface Restaurant {
params: string
}


export default function Testimonial(props: Restaurant) {

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // TODO: add reviews, then map through them and output 
    axios.get(`http://localhost:3000/yelp/${props.params}/reviews`)
    .then(response => setReviews(response.data.reviews))
    .catch(error => console.error("Error fetching reviews:", error))
  },[props.params]);

  return (
    <section>
      <div className="mx-auto max-w-screen-xl sm:p-14 p-4">
        <h5 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
         Reviews from the customers
        </h5>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          {reviews && reviews.map(review => (
                      <blockquote key={review.id} className="rounded-lg bg-gray-100 p-8">
                      <div className="flex items-center gap-4">
                        <Image
                          alt="testimonialUser"
                          src="/img/user.png"
                          className="h-16 w-16 rounded-full object-cover"
                          height={64}
                          width={64}
                        />
                        <div>
                          <Star />
                          <p className="mt-1 text-lg font-medium text-gray-700"> {review.user.name}</p>
                        </div>
                      </div>
          
                      <p className="line-clamp-2 sm:line-clamp-none mt-4 text-gray-500">
                      {review.text}
                      </p>
                    </blockquote>))
          }
        </div>
      </div>
    </section>
  );
}
