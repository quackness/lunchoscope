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


    return (<div>
        {/* <CoordinatesDisplay longitude={props.latitude} latitude={props.longitude}/> */}
        <button className="btn btn-wide mx-auto" onClick={() => setSkipHorscope(true)}>{skipHorscope? 'Get horoscope for the day' : 'Skip Horoscope'}</button>
        {skipHorscope? (<SkipHoroscopeRestaurantsList skipped={skipHorscope} longitude={longitude} latitude={latitude}  />) : (
            <>
        <div className="flex" >
            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn" onClick={() => handleButtonClick('aries')}>Generate Horoscope</button></div>
                {/* <div className="swap-off"><img src='./img/aries.webp' className="box-content h-32 w-32"></img>
                    <p>Aries</p> <p>March 21 - April 20</p></div> */}
                    <div className="swap-off">
                        {horoscope ? (
                            <>
                                <img src='./img/aries.webp' className="box-content h-32 w-32" alt={selectSign}></img>
                                <p>{selectSign}</p>
                            </>
                        ) : (
                            <>
                                <img src='./img/aries.webp' className="box-content h-32 w-32" alt={selectSign}></img>
                                <p>{selectSign}</p>
                                <p>March 21 - April 20</p>
                            </>
                        )}
                    </div>
            </label>

            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn" onClick={() => handleButtonClick('taurus')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/taurus.webp' className="box-content h-32 w-32"></img>
                    <p>Taurus</p> <p>April 21 - May 21</p></div>
            </label>

            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn" onClick={() => handleButtonClick('gemini')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/gemini.webp' className="box-content h-32 w-32"></img>
                    <p>Gemini</p> <p>May 22 – June 23</p></div>
            </label>

            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn" onClick={() => handleButtonClick('cancer')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/cancer.webp' className="box-content h-32 w-32"></img>
                    <p>Cancer</p> <p>June 23 – July 23</p></div>
            </label>

            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn" onClick={() => handleButtonClick('leo')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/leo.webp' className="box-content h-32 w-32"></img>
                    <p>Leo</p> <p>July 24 – August 23</p></div>
            </label>

            <label className="swap swap-flip"> 
                <input type="checkbox" />
                <div className="swap-on"><button className="btn" onClick={() => handleButtonClick('virgo')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/virgo.webp' className="box-content h-32 w-32"></img>
                    <p>Virgo</p> <p>August 24 – September 23</p></div>
            </label>
        </div>

        <div className="flex">
        <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn" onClick={() => handleButtonClick('libra')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/libra.png' className="box-content h-32 w-32"></img>
                    <p>Libra</p> <p>September 24 – October 23</p></div>
            </label>

            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn" onClick={() => handleButtonClick('scorpio')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/scorpio.webp' className="box-content h-32 w-32"></img>
                    <p>Scorpio</p> <p>October 24 – November 22</p></div>
            </label>

            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn" onClick={() => handleButtonClick('sagittarius')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/sagittarius.webp' className="box-content h-32 w-32"></img>
                    <p>Sagittarius</p> <p>November 23– December 22</p></div>
            </label>

            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn" onClick={() => handleButtonClick('capricorn')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/capricorn.webp' className="box-content h-32 w-32"></img>
                    <p>Capricorn</p> <p>December 23 – January 20</p></div>
            </label>

            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn" onClick={() => handleButtonClick('aquarius')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/aquarius.png' className="box-content h-32 w-32"></img>
                    <p>Aquarius</p> <p>January 21 – February 19</p></div>
            </label>

            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn" onClick={() => handleButtonClick('pisces')}>Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/pisces.webp' className="box-content h-32 w-32"></img>
                    <p>Pisces</p> <p>February 20– March 21</p></div>
            </label>
        </div>
        <div className="m-10">
            <p>{horoscope? `${selectSign.toUpperCase()}` : ""}</p>
        <div>{horoscope && horoscope}</div>
        </div>
        <HoroscopeRestaurantsList sentiment={sentiment} longitude={longitude} latitude={latitude}/>
        </>)
      }
    </div>)

}

export default ZodiacDisplay