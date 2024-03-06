import React, { useState } from 'react';

const ZodiacDisplay = () => {

    const [selectZodiac, setSelectZodiac] = useState('')

    return <div>
        <div className="flex">
            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn">Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/aries.webp' className="box-content h-32 w-32"></img>
                    <p>Aries</p> <p>March 21 - April 20</p></div>
            </label>

            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn">Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/taurus.webp' className="box-content h-32 w-32"></img>
                    <p>Taurus</p> <p>April 21 - May 21</p></div>
            </label>

            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn">Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/gemini.webp' className="box-content h-32 w-32"></img>
                    <p>Gemini</p> <p>May 22 – June 23</p></div>
            </label>

            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn">Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/cancer.webp' className="box-content h-32 w-32"></img>
                    <p>Cancer</p> <p>June 23 – July 23</p></div>
            </label>

            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn">Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/leo.webp' className="box-content h-32 w-32"></img>
                    <p>Leo</p> <p>July 24 – August 23</p></div>
            </label>

            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn">Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/virgo.webp' className="box-content h-32 w-32"></img>
                    <p>Virgo</p> <p>August 24 – September 23</p></div>
            </label>
        </div>

        <div className="flex">
        <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn">Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/libra.png' className="box-content h-32 w-32"></img>
                    <p>Libra</p> <p>September 24 – October 23</p></div>
            </label>

            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn">Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/scorpio.webp' className="box-content h-32 w-32"></img>
                    <p>Scorpio</p> <p>October 24 – November 22</p></div>
            </label>

            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn">Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/sagittarius.webp' className="box-content h-32 w-32"></img>
                    <p>Sagittarius</p> <p>November 23– December 22</p></div>
            </label>

            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn">Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/capricorn.webp' className="box-content h-32 w-32"></img>
                    <p>Capricorn</p> <p>December 23 – January 20</p></div>
            </label>

            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn">Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/aquarius.png' className="box-content h-32 w-32"></img>
                    <p>Aquarius</p> <p>January 21 – February 19</p></div>
            </label>

            <label className="swap swap-flip">
                <input type="checkbox" />
                <div className="swap-on"><button className="btn">Generate Horoscope</button></div>
                <div className="swap-off"><img src='./img/pisces.webp' className="box-content h-32 w-32"></img>
                    <p>Pisces</p> <p>February 20– March 21</p></div>
            </label>
        </div>
    </div>

}

export default ZodiacDisplay