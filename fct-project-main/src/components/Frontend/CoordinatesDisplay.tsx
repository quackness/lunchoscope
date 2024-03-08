import React from 'react'
import { useState } from 'react';
import axios from 'axios';

interface Props {
  latitude: number,
  longitude: number
}

const Coordinates = (props: Props) => {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          axios.post('http://localhost:3000/yelp', {latitude, longitude})
        },
        (error) => {
          console.error(`Error: ${error.message}`);
        }
      );
    }
  }
  React.useEffect(() => {
    getUserLocation();
  }, []); 
  return (
    <div>Coordinates: {longitude} {latitude}</div>
  )
}

export default Coordinates