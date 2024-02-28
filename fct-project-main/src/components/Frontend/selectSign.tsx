import React, { useState } from 'react'

const SelectSign = () => {

  const [selectSign, setSelectSign] = useState('');

  // function handleSelect() {
  //   console.loh
  // }

  
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
    </div>
  )
}

export default SelectSign