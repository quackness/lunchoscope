import { NextResponse } from "next/server";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer O3r0O9LGi-Ug-FUWsrT9VwV7PwZndrrhJnzJrjmqNFds2ZpoAnuU_iO5v-DwCTxqoN2HXgbHF-FFIYrF_baUfJJjch8gsXqxDuXqo7FM31NKv2hululT0gfPwf3dZXYx'
  }
};

interface Restaurant {
  // name: string;
  id: string;
}

export async function GET(request: Request) {
  console.log(request)
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);
  console.log(id)
  const res = await fetch(`https://api.yelp.com/v3/businesses/${id}`, options);
  const restaurant: Restaurant = await res.json();
  if (!restaurant.id) return NextResponse.json({ message: "Inavlid" })
  console.log(restaurant)
  return NextResponse.json(restaurant);
}

