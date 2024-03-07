import React, { useState } from 'react'
import axios, { AxiosResponse } from 'axios';
import Sentiment from 'sentiment';

const SelectSign = () => {

  const [selectSign, setSelectSign] = useState('');
  const [horoscope, setHoroscope] = useState();



  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          axios.post('http://localhost:3000/yelp', {latitude, longitude})
        },
        (error) => {
          console.error(`Error: ${error.message}`);
        }
      );
    }
  }

  async function handleClick() {
  try {
    
    if(selectSign === ''){
      return;
    }

    const sentiment = new Sentiment();

    const response = await fetch(`https://prog2700.onrender.com/get-horoscope/daily?sign=${selectSign}&day=today`) 
    console.log(response);
    const json = await response.json();
    setHoroscope(json.data.horoscope_data);
    // // Get the sentiment result
    const result = await sentiment.analyze(json.data.horoscope_data);
    console.log(result);
    getUserLocation()
  } 
  catch (error) {
    console.log(error);
  }
  }

  
  return (
    <>
    {/* <button className="btn btn-wide mx-auto">Skip the horoscope</button> */}
    </>
    // <div>
    //   <label>Select a sign</label>
    //   <select name="" id="" onChange={(e)=> setSelectSign(e.target.value)}>
    //   <option value=""></option>
    //     <option value="aries">Aries: March 21- April 20</option>
    //     <option value="taurus">Taurus: April 21 – May 21</option>
    //     <option value="gemini">Gemini: May 22 – June 21</option>
    //     <option value="cancer">Cancer: June 22 – July 23</option>
    //     <option value="leo">Leo: July 24 – August 23</option>
    //     <option value="virgo">Virgo: August 24 – September 23</option>
    //     <option value="libra">Libra: September 24 – October 23</option>
    //     <option value="scorpio">Scorpio: October 24 – November 22</option>
    //     <option value="sagittarius">Sagittarius: November 23 – December 21</option>
    //     <option value="capricorn">Capricorn: December 22- January 20</option>
    //     <option value="aquarius">Aquarius: January 21 – February 19</option>
    //     <option value="pisces">Pisces: February 20 – March 20</option>
    //   </select>
    //   <button onClick={handleClick}>Generate horoscope</button>
    //   <div>{horoscope && horoscope}</div>
    // </div>
  )
}

export default SelectSign