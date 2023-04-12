import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	console.log(request);
}

export const config = { matcher: ['/', '/settings/:path*'] };
