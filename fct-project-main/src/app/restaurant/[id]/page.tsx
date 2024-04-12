'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Testimonial from '@/components/Frontend/testimonial';
import Layout from '@/components/Frontend/layout';

interface PageProps {
  params: { id: string };
}

interface OpenHour {
  is_overnight: boolean;
  start: string;
  end: string;
  day: number;
}

interface Hours {
  open: OpenHour[];
  hours_type: string;
  is_open_now: boolean;
}

interface Location {
  display_address: string[];
}

interface Restaurant {
  name: string;
  id: string;
  image_url: string;
  rating: number;
  location: Location;
  display_phone: string;
  hours: Hours[];
  price: string;
  photos: string[];
  url: string;
}

interface Review {
  id: string;
  text: string;
}

function Page({ params }: PageProps) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/yelp/${params.id}`)
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
      });
      axios
      .get(`http://localhost:3000/yelp/${params.id}/reviews`)
      .then((response) => {
        console.log(response.data)
        setReviews(response.data);
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
      });
  }, [params.id]);

  const processOpeningHours = () => {
    const processedHours: Record<string, { start: string; end: string }> = {};

    if (restaurant?.hours) {
      restaurant.hours.forEach((dayHours) => {
        dayHours.open.forEach((openHour) => {
          const { day, start, end } = openHour;
          const key = `${day}-${dayHours.hours_type}`;

          if (!processedHours[key] || start < processedHours[key].start) {
            processedHours[key] = { start, end };
          }
        });
      });
    }

    return processedHours;
  };

  const displayOpeningHours = () => {
    const processedHours = processOpeningHours();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return Object.keys(processedHours).map((key) => {
      const [dayIndex, hoursType] = key.split('-');
      const dayName = daysOfWeek[parseInt(dayIndex)];
      const { start, end } = processedHours[key];

      return (
        
        <p key={key}>
        {dayName}: {start.slice(0,2) + ':' + start.slice(2,4)} - {end.slice(0,2)+ ':' + end.slice(2,4)}
        </p>
      );
    });
  };

  return (
    
      <Layout>

      <div className="text-lg breadcrumbs ml-5">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <a>Restaurant</a>
          </li>
          <li>
            {restaurant?.name ? restaurant.name : <span className="loading loading-dots loading-md"></span>}
          </li>
        </ul>
      </div>

<div className="mx-auto max-w-screen-xl sm:p-14 p-4 sm:text-base">
      <div className="card lg:card-side bg-base-100 shadow-xl ">
      {restaurant?.image_url ?<figure><img className="w-96" src={`${restaurant?.image_url}`} alt={`${restaurant}`}/></figure>: ''}
  <div className="card-body">
  {restaurant?.name ? <h2 className="card-title">{`${restaurant?.name}`}</h2> : ''}
          {restaurant?.location.display_address ? <p>Address: 📍 {`${restaurant?.location.display_address.join(', ')}`}</p> : ''}
          {restaurant?.display_phone ? <p>Phone: {`${restaurant?.display_phone}`}</p> : ''}
          {restaurant?.rating ? <p>Rating: {`${restaurant?.rating}`}</p> : ''}
          {restaurant?.price ? <p>Price: {`${restaurant.price}`}</p> : ''}

          {restaurant?.hours ?
          <div className="opening-hours ">
        <h3 className="badge badge-warning badge-lg my-3 text-lg">Opening Hours</h3>
        
        {displayOpeningHours()}
      </div> : ''}
      <div className="card-actions justify-end">
            {restaurant?.url ? (
              <button className="btn btn-primary">
                <Link href={`${restaurant?.url}`}>Go to the website</Link>
              </button>
            ) : (
              ''
            )}
          </div>
  </div>
</div>
</div>

      
{restaurant?.id && <Testimonial params={params.id}/>}
</Layout>
  );
}

export default Page;
