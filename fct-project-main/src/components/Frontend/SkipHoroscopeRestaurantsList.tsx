import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';


interface Restaurant {
  id: string;
  name: string;
  image_url: string;
  rating: number;
  price: number
 categories: { alias: string; title: string }[];
 location: Location;
 is_closed: boolean;
}

interface Location {
  address1: string;
  address2?: string;
  address3?: string;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
  cross_streets?: string;
}

interface Props {
  latitude: number,
  longitude: number,
  skipped: boolean,
}
const SkipHoroscopeRestaurantsList = (props: Props) => {
  const [restaurantNoSentiment, setRestaurantNoSentiment] = useState<Restaurant[]>([]);
  useEffect(() => {
    if (props.latitude !== 0 && props.longitude !== 0) {
      axios.post('http://localhost:3000/yelp', {latitude: props.latitude, longitude: props.longitude})
      .then(response => {
        setRestaurantNoSentiment(response.data.businesses)
        console.log(response.data)
      });
    }
   }, [props.latitude, props.longitude]);

   console.log('restaurantNoSentiment', restaurantNoSentiment)

  return (
    <>
    <div>{props.skipped? "Skipped horoscope!!" : ""}</div>
    <div>Lat: {props.longitude}</div>
    <div>Lat: {props.latitude}</div>
    {restaurantNoSentiment.length === 0 ? <progress className="progress w-56"></progress> : ""}
    {restaurantNoSentiment.map(restaurant => (
  <div key={restaurant.name} className="card w-3/4 h-1/6 card-side bg-base-100 shadow-xl mx-auto m-8">
    <figure><img className="w-96 h-96" alt="Album" src={restaurant.image_url} /></figure>
    <div className="card-body">
      <h2 className="card-title">
        {restaurant.name}
        <div className="badge badge-primary">Rating: {restaurant.rating}</div>
        {restaurant.price? <div className="badge badge-secondary"> Price range: {restaurant.price}</div> : ""}
        {restaurant.is_closed? <div className="badge">Closed</div> : <div className="badge badge-accent">Open</div>}
      </h2>
      <p>📍 {restaurant.location.display_address.join(', ')} </p>
      <p>Description....</p>
      <div className="card-actions justify-start">
      <div>
        {restaurant.categories.map((category) => (
          <span key={category.alias} className="badge badge-outline">
            {category.title}
          </span>
        ))}
      </div>
    </div>
    <div className="card-actions justify-end">
      <button className="btn btn-primary btn-wide"><Link href={`/restaurant/${restaurant.id}`}>See more details</Link></button>
    </div>
    </div>
  </div>
))}
   
    </>
  )
};

export default SkipHoroscopeRestaurantsList;