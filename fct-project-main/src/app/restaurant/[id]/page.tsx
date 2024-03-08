'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';


interface PageProps {
  params: {id: string}
}

interface Restaurant {
  name: string;
  id: string;
}

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
    
    <div>
    <h1>Page</h1>
    <p>ID: {params.id}</p>
    <p>{restaurant?.name}</p>
  </div>
  )
}

export default Page;