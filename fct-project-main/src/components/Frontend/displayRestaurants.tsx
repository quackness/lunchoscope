import React, { useState } from 'react'

const DisplayRestaurants = () => {
  return (
<>
{/* <div className="card card-side bg-base-100 shadow-xl">
  <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure>
  <div className="card-body">
    <h2 className="card-title">New movie is released!</h2>
    <p>Click the button to watch on Jetflix app.</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Watch</button>
    </div>
  </div>
</div> */}
<div className="card w-3/4 h-1/6 card-side bg-base-100 shadow-xl mx-auto">
  <figure><img className="w-96 h-96" src="https://s3-media3.fl.yelpcdn.com/bphoto/tEyuycX5hsAaiPSugzewIw/o.jpg" alt="Album"/></figure>
  <div className="card-body">
    <h2 className="card-title">Studio East Food+Drink
    <div className="badge badge-primary">Rating 4.2</div>
    <div className="badge badge-secondary">Price range here</div>
    </h2>
    <p>Location: 1533 Barrington Street Halifax, NS </p>
    <p>Description....</p>
    <div className="card-actions justify-start">
      <div className="badge badge-outline">Chineese</div> 
      <div className="badge badge-outline">Asian Fusion</div>
    </div>
    <div className="card-actions justify-end">
      <button className="btn btn-primary btn-wide">See more details</button>
    </div>
  </div>
</div>
{/* <div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src="https://s3-media2.fl.yelpcdn.com/bphoto/PeU-oyzSBGdYQiDDN2Dedw/o.jpg" alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">Another Restaurant </h2>
      <div className="badge badge-primary">Rating 4.2</div>
    <div className="badge badge-secondary">Price range</div>
    <p>1533 Barrington Street Halifax, NS </p>
    <p>Description of the restaurant...</p>
    <div className="card-actions justify-end">
      <div className="badge badge-outline">Chineese</div> 
      <div className="badge badge-outline">Asian Fusions</div>
    </div>
  </div>
  <div className="card-actions justify-end">
      <button className="btn btn-primary">Explore</button>
    </div>
</div> */}
</>
  )
}

export default DisplayRestaurants