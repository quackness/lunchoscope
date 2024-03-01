import { NextResponse } from "next/server";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer O3r0O9LGi-Ug-FUWsrT9VwV7PwZndrrhJnzJrjmqNFds2ZpoAnuU_iO5v-DwCTxqoN2HXgbHF-FFIYrF_baUfJJjch8gsXqxDuXqo7FM31NKv2hululT0gfPwf3dZXYx'
  }
};


export async function GET() {
  const response = await fetch(`https://api.yelp.com/v3/businesses/search?location=CANADA`, options);
  const result = await response.json()
  return NextResponse.json(result);
}




// const options = {
//   method: 'GET',
//   headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer O3r0O9LGi-Ug-FUWsrT9VwV7PwZndrrhJnzJrjmqNFds2ZpoAnuU_iO5v-DwCTxqoN2HXgbHF-FFIYrF_baUfJJjch8gsXqxDuXqo7FM31NKv2hululT0gfPwf3dZXYx'
//   }
// };

// const APIResponse = async () => {

//   try {
//       // const response = await fetch(`https://api.yelp.com/v3/businesses/search?latitude=44.651070&longitude=-63.582687&radius=40000`, options);

//       const response = await fetch(`https://api.yelp.com/v3/businesses/search?location=CANADA`, options);

//       const result = await response.json();

//       // console.log(result);

//       const uniqueCategories = [...new Set(result.businesses.map((restaurant) => {

//           return restaurant.categories[0].title

//       }))]

//       console.log(uniqueCategories);


//   } catch (error) {
//       console.error(error);
//   }
// }

// APIResponse();