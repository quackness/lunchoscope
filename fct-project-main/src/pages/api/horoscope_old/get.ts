import { NextResponse } from "next/server";
import { useState } from "react";

// const [horoscope, setHoroscope] = useState();

export async function GET() {
  try {
    const response = await fetch('https://prog2700.onrender.com/get-horoscope/daily?sign=aries&day=today')
    console.log(response);
    const json = await response.json();
    return NextResponse.json(json);
  } catch (err) {
    console.log(err);
  }
}


// import type { NextApiRequest, NextApiResponse } from 'next'

// type ResponseData = {
//   message: string
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   res.status(200).json({ message: 'Hello from Next.js!' })
// }





import { NextApiRequest, NextApiResponse } from "next";
import { error } from "console";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === "GET") {
    try {
      const hor = await fetch('https://prog2700.onrender.com/get-horoscope/daily?sign=aries&day=today')
      res.status(200).json(hor);
    } catch (error) {
      res.status(500).json({ error: "error" });
    }
  } else {
    res.status(405).json({ error: "error" });
  }
}

// // import type { NextApiRequest, NextApiResponse } from 'next'

// // type ResponseData = {
// //   message: string
// // }

// // export default function handler(
// //   req: NextApiRequest,
// //   res: NextApiResponse<ResponseData>
// // ) {
// //   res.status(200).json({ message: 'Hello from Next.js!' })
// // }

// // import { NextResponse } from "next/server";
// // const DATA = "https://jsonplaceholder.typicode.com/todos";

// // type Todo = {
// //   userId: number,
// //   id: number,
// //   title: string,
// //   completed: boolean,
// // }

// // export async function GET() {
// //   const res = await fetch(DATA);
// //   const todos: Todo[] = await res.json();
// //   return NextResponse.json(todos);
// // }


// import type { NextApiRequest, NextApiResponse } from 'next'

// type ResponseData = {
//   message: string
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   res.status(200).json({ message: 'Hello from Next.js!' })
// }
