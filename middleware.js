import { NextResponse } from 'next/server'
export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  const isPublicPath = path === '/login' || path === '/register';
  const token = request.cookies.get("token")?.value || "";

  console.log(isPublicPath, token);

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL(`${path}`, request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}
 

export const config = {
  matcher: ['/', '/login', '/register', '/dashboard'],
}