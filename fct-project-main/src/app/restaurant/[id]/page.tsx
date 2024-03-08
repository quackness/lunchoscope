'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Frontend/navbar';
import ZodiacDisplay from '@/components/Frontend/zodiacDisplay';
import Test from '@/components/Frontend/test';


interface PageProps {
  params: {id: string}
}

interface Restaurant {
  name: string;
  id: string;
  image_url: string;
  rating: number;
  location: Location;
  phone: string;
  hours: Hours[];
  price: string
}

interface Location {
  display_address: string[];
}

type OpenHour = {
  is_overnight: boolean;
  start: string;
  end: string;
  day: number;
};

type Hours = {
  open: OpenHour[];
  hours_type: string;
  is_open_now: boolean;
};







function Page({ params }: PageProps) {
  console.log(params.id)

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
      axios.get(`http://localhost:3000/yelp/${params.id}`)
      .then(response => {
        setRestaurant(response.data);
      })
      .catch(error => {
        console.error(`Error: ${error.message}`);
      })
   }, [params.id]);

  return (
    <>
    <Test />
  

    <nav>Navbar will be here </nav>
    <p>ID: {params.id}</p>
    <p>{restaurant?.name}</p>
    <div className="card w-96 glass">
  <figure><img src={`${restaurant?.image_url}`} alt="car!"/></figure>
  <div className="card-body">
    <h2 className="card-title">{`${restaurant?.name}`}</h2>
    <p>Address: {`${restaurant?.location.display_address.join(', ')}`}</p>
    <p>Phone: {`${restaurant?.phone}`}</p>
    <p>Rating: {`${restaurant?.rating}`}</p>
    <p>Price: {`${restaurant?.price}`}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Go to the website</button>
    </div>
  </div>
</div>







  </>
  )
}

export default Page;