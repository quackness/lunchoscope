import React, { useState } from 'react'
import axios, { AxiosResponse } from 'axios';

const SelectSign = () => {

  const [selectSign, setSelectSign] = useState('');

  async function handleClick() {
  //   fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${selectSign}&day=TODAY`)
  // .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.error(error));
    const response = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${selectSign}&day=TODAY`, {
      mode: 'no-cors'
    });
    console.log(response);
    const json = await response.json();
    console.log(json)

    // const headers = {
    //   'Content-Type': 'application/json',
    // }
    // console.log("Click");
    // console.log(selectSign);
    // const response = await axios.get(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${selectSign}&day=TODAY`);
    // console.log(response.data);
    // const response: AxiosResponse = await axios.get(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${selectSign}&day=TODAY`);

    // const responseData: YourResponseType = response.data;
  }

  
  return (
    <div>
      <label>Select a sign</label>
      <select name="" id="" onChange={(e)=> setSelectSign(e.target.value)}>
      <option value=""></option>
        <option value="aries">Aries: March 21- April 20</option>
        <option value="taurus">Taurus: April 21 – May 21</option>
        <option value="gemini">Gemini: May 22 – June 21</option>
        <option value="cancer">Cancer: June 22 – July 23</option>
        <option value="leo">Leo: July 24 – August 23</option>
        <option value="virgo">Virgo: August 24 – September 23</option>
        <option value="libra">Libra: September 24 – October 23</option>
        <option value="scorpio">Scorpio: October 24 – November 22</option>
        <option value="sagittarius">Sagittarius: November 23 – December 21</option>
        <option value="capricorn">Capricorn: December 22- January 20</option>
        <option value="aquarius">Aquarius: January 21 – February 19</option>
        <option value="pisces">Pisces: February 20 – March 20</option>
      </select>
      <button onClick={handleClick}>Generate horoscope</button>
    </div>
  )
}

export default SelectSign