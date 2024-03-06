import { NextResponse } from "next/server";
import Sentiment from 'sentiment';

const sentiment = new Sentiment();

export async function POST(req: any) {
  const { astroSign } = await req.json();
  console.log(astroSign)
  const horoscope = `https://prog2700.onrender.com/get-horoscope/daily?sign=${astroSign}&day=today`;
  const res = await fetch(horoscope);
  const result = await res.json()
  const assessed = await sentiment.analyze(result.data.horoscope_data);
  console.log(assessed)
  //add the logic to do positive, negeative, neutral sentiment
  return NextResponse.json(assessed);




}


