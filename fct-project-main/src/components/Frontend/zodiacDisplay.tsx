import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Sentiment from 'sentiment';
import SkipHoroscopeRestaurantsList from './SkipHoroscopeRestaurantsList';
import CoordinatesDisplay from './CoordinatesDisplay';
import HoroscopeRestaurantsList from './HoroscopeRestaurantsList';

interface Props {
  latitude: number,
  longitude: number,
  sign: string
}




const ZodiacDisplay = (props: Props) => {

    const [selectSign, setSelectSign] = useState('');
    const [horoscope, setHoroscope] = useState('');
    const [skipHorscope, setSkipHorscope] = useState(false);
    const [sentiment, setSentiment] = useState({});

    let signChosen = false;


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


    const handleButtonClick = async (sign:any) => {
        setSelectSign(sign);
        
        console.log(sign)
      //logic here to get a horoscope
      const sentiment = new Sentiment();
      signChosen = true;
      const response = await fetch(`https://prog2700.onrender.com/get-horoscope/daily?sign=${sign}&day=today`) 
      console.log("response", response);
      const json = await response.json();
      console.log("json", json.data.horoscope_data)
      setHoroscope(json.data.horoscope_data);
      // // Get the sentiment result
      const result = await sentiment.analyze(json.data.horoscope_data);
      setSentiment(result);
      console.log("result", result);
    };

    const handleSkipHoroscopeButtonClick = () => {
        // change skipHorscope between true-false
        setSkipHorscope(!skipHorscope);
      };
      
    return (<div className="text-center mx-auto max-w-screen-xl px-4 pt-6 sm:px-6 ">
        {/* <CoordinatesDisplay longitude={props.latitude} latitude={props.longitude}/> */}
        <button className="btn px-8 mb-8" onClick={handleSkipHoroscopeButtonClick}>{skipHorscope? 'Get horoscope for the day' : 'Skip Horoscope'}</button>
        {skipHorscope? (<SkipHoroscopeRestaurantsList skipped={skipHorscope} longitude={longitude} latitude={latitude}  />) : (
            <>
            <div className="mx-auto p-12">
        <div className="flex flex-row md:flex-nowrap flex-wrap gap-6" >
            <label className="basis-1/6 swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn my-8 mx-2" onClick={() => handleButtonClick('aries')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/aries.webp' className="box-content h-28 w-28 mx-auto"></img>
                    <p className="">Aries</p> <p className="text-sm">March 21 - April 20</p></div>
            </label>

            <label className="basis-1/6 swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn my-8 mx-2" onClick={() => handleButtonClick('taurus')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/taurus.webp' className="box-content h-28 w-28 mx-auto"></img>
                    <p className="">Taurus</p> <p className="text-sm">April 21 - May 21</p></div>
            </label>

            <label className="basis-1/6 swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn my-8 mx-2" onClick={() => handleButtonClick('gemini')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/gemini.webp' className="box-content h-28 w-28 mx-auto"></img>
                    <p>Gemini</p> <p className="text-sm">May 22 – June 23</p></div>
            </label>

            <label className="basis-1/6 swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn my-8 mx-2" onClick={() => handleButtonClick('cancer')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/cancer.webp' className="box-content h-28 w-28 mx-auto"></img>
                    <p>Cancer</p> <p className="text-sm">June 23 – July 23</p></div>
            </label>

            <label className="basis-1/6 swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn my-8 mx-2" onClick={() => handleButtonClick('leo')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/leo.webp' className="box-content h-28 w-28 mx-auto"></img>
                    <p>Leo</p> <p className="text-sm">July 24 – August 23</p></div>
            </label>

            <label className="basis-1/6 swap swap-flip"> 
                <input type="checkbox" />
                <div className="swap-on"><button className="btn my-8 mx-2" onClick={() => handleButtonClick('virgo')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/virgo.webp' className="box-content h-28 w-28 mx-auto"></img>
                    <p>Virgo</p> <p className="text-sm">August 24 – September 23</p></div>
            </label>
        </div>

        <div className="flex flex-row md:flex-nowrap flex-wrap gap-6 mt-10">
        <label className="basis-1/6 swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn my-8 mx-2" onClick={() => handleButtonClick('libra')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/libra.png' className="box-content h-28 w-28 mx-auto"></img>
                    <p>Libra</p> <p className="text-sm">September 24 – October 23</p></div>
            </label>

            <label className="basis-1/6 swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn my-8 mx-2" onClick={() => handleButtonClick('scorpio')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/scorpio.webp' className="box-content h-28 w-28 mx-auto"></img>
                    <p>Scorpio</p> <p className="text-sm">October 24 – November 22</p></div>
            </label>

            <label className="basis-1/6 swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn my-8 mx-2" onClick={() => handleButtonClick('sagittarius')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/sagittarius.webp' className="box-content h-28 w-28 mx-auto"></img>
                    <p>Sagittarius</p> <p className="text-sm">November 23– December 22</p></div>
            </label>

            <label className="basis-1/6 swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn my-8 mx-2" onClick={() => handleButtonClick('capricorn')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/capricorn.webp' className="box-content h-28 w-28 mx-auto"></img>
                    <p>Capricorn</p> <p className="text-sm">December 23 – January 20</p></div>
            </label>

            <label className="basis-1/6 swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn my-8 mx-2" onClick={() => handleButtonClick('aquarius')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/aquarius.png' className="box-content h-28 w-28 mx-auto"></img>
                    <p>Aquarius</p> <p className="text-sm">January 21 – February 19</p></div>
            </label>

            <label className="basis-1/6 swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn my-8 mx-2" onClick={() => handleButtonClick('pisces')}>Generate Horoscope</button></div>
                <div className="swap-off "><img src='./img/pisces.webp' className="box-content h-28 w-28 mx-auto"></img>
                    <p>Pisces</p> <p className="text-sm">February 20– March 21</p></div>
            </label>
        </div>
        </div>

      
        {horoscope && (
        <div className="relative card w-3/4 h-1/6 card-side bg-base-100 mx-auto m-8 rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg">
          <div className="bg-white p-7 rounded-md">
            <h1 className="font-bold text-xl mb-2">{horoscope ? `${selectSign.toUpperCase()}` : ""}</h1>
            <p>{horoscope && horoscope}</p>
          </div>
        </div>
      )}
     
      <HoroscopeRestaurantsList sentiment={sentiment} longitude={longitude} latitude={latitude}/>

       
        </>
        
        )
      }
    </div>
    
    )

}

export default ZodiacDisplay