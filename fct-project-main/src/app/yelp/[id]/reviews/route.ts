import { NextResponse } from "next/server";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer O3r0O9LGi-Ug-FUWsrT9VwV7PwZndrrhJnzJrjmqNFds2ZpoAnuU_iO5v-DwCTxqoN2HXgbHF-FFIYrF_baUfJJjch8gsXqxDuXqo7FM31NKv2hululT0gfPwf3dZXYx'
  }
};

interface Review {
  id: string;
  text: string;
}

interface Request {
  url: string;
}

export async function GET(request: Request) {
  console.log(request.url);
  const address = request.url.split('/');
  const id = address[address.length - 2];
  console.log(id);

  const res = await fetch(`https://api.yelp.com/v3/businesses/${id}/reviews?limit=50&sort_by=yelp_sort`, options);
  const reviews: Review[] = await res.json();

  if (!reviews || reviews.length === 0) return NextResponse.json({ message: "No reviews found" });

  console.log(reviews);
  return NextResponse.json(reviews);
}