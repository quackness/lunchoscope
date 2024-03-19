import axios from 'axios'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const HoroscopeRestaurantsList = ({sentiment, longitude, latitude}) => {
  const [positiveCategories, setPositiveCategories] = useState([]);
  const [negativeCategories, setNegativeCategories] = useState([]);
  const [neutralCategories, setNeutralCategories] = useState([]);

  const [restaurants, setRestaurants] = useState([]);
  const [data, setData] = useState([]);


  
  
  
  const fetchData = async () =>{
      const positive = [];
      const negative = [];
      const neutral = [];

      const res = await axios.post('http://localhost:3000/yelp', {longitude, latitude})
      console.log("res", res.data);
      
      
      setRestaurants(res.data.businesses);
      const uniqueCategories = [...new Set<string>(res?.data?.businesses?.map((restaurant) => restaurant.categories[0].title))];
      

      
  
      for(let i=0;i<uniqueCategories?.length;i++){
         if(i<4){
             negative.push(uniqueCategories[i]);
         }
         else if(i>=4 && i<8){
             positive.push(uniqueCategories[i]);
         }
         else{
             neutral.push(uniqueCategories[i]);
         }
      }
  
      setPositiveCategories(positive);
      setNegativeCategories(negative);
      setNeutralCategories(neutral);
    }

    const filterRestaurants = () =>{
        setData([]);
        
        if(sentiment?.positive?.length > sentiment?.negative?.length){
            // positiveCategories of i can't be reached since i is 0,1,2,3 but when the restaurants loop reaches i it becomes greater than 3
            for(let i=0;i<positiveCategories.length;i++){
                restaurants.map((restaurant)=>{
                     if(restaurant.categories[0].title == positiveCategories[i]){
                         setData((prev)=> [...prev, restaurant]);

                     }
                })
            }
        }
        else if(sentiment?.positive?.length < sentiment?.negative?.length){
            for(let i=0;i<negativeCategories.length;i++){
                restaurants.map((restaurant)=>{
                     if(restaurant.categories[0].title == negativeCategories[i]){
                         setData((prev)=> [...prev, restaurant]);

                     }
                })
            }
            
        }
        else if(sentiment?.negative?.length > 0 && sentiment?.negative?.length == sentiment?.positive?.length){
            for(let i=0;i<neutralCategories.length;i++){
                restaurants.map((restaurant)=>{
                     if(restaurant.categories[0].title == neutralCategories[i]){
                         setData((prev)=> [...prev, restaurant]);
                     }
                })
            }
        }
    }
    
    
    


useEffect(()=>{
    fetchData();
}, [longitude, latitude])

useEffect(()=>{
    filterRestaurants();
    
}, [sentiment, positiveCategories, negativeCategories, neutralCategories])

  return (
    <div>
  {data.map(restaurant => (
  <div key={restaurant.name} className="card w-3/4 h-1/6 card-side bg-base-100 shadow-xl mx-auto m-8">
    <figure><img className="w-96 h-96" alt="Album" src={restaurant.image_url} /></figure>
    <div className="card-body">
      <h2 className="card-title">
        {restaurant.name}
        <div className="badge badge-primary">Rating: {restaurant.rating}</div>
        {restaurant.price? <div className="badge badge-secondary"> Price range: {restaurant.price}</div> : ""}
        {restaurant.is_closed? <div className="badge">Closed</div> : <div className="badge badge-accent">Open</div>}
      </h2>
      <p>📍 {restaurant.location.display_address.join(', ')} </p>
      <p>Description....</p>
      <div className="card-actions justify-start">
      <div>
        {restaurant.categories.map((category) => (
          <span key={category.alias} className="badge badge-outline">
            {category.title}
          </span>
        ))}
      </div>
    </div>
    <div className="card-actions justify-end">
      <button className="btn btn-primary btn-wide"><Link href={`/restaurant/${restaurant.id}`}>See more details</Link></button>
    </div>
    </div>
  </div>
))}
    </div>
  )
}

export default HoroscopeRestaurantsList
