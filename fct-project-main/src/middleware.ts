import { NextResponse, type NextRequest } from 'next/server';
// import JWT from 'jsonwebtoken';
import { jwtVerify } from 'jose';


export async function middleware(request: NextRequest) {

  const token = request.cookies.get('authToken')?.value
  

  // If token comes undefined means there is no logged in user so redirect the user to login page 
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // const decode = await JWT.verify(currentUser, "testpassword");

  // Used jose library because JWT wasn't working in middleware.ts
  const decode = await jwtVerify(token, new TextEncoder().encode('testpassword'))

  console.log("request", request.url);
  
  const {isAdmin} = decode.payload;

  // If the user is admin then only allow the user to access the routes mentioned in matcher
  if(isAdmin){
    return NextResponse.next();
  }
 
    // If the user is a normal user and tries to access admin route, redirect to home page
    return NextResponse.redirect(new URL('/', request.url))
}
 
// In config file we can define on which routes we want to run the middleware inside matcher: ['/profile', '/dashboard'] etc
export const config = {
  matcher: ['/admin/users'],
}