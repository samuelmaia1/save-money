import { NextResponse , NextRequest } from "next/server";
import { getToken } from "./app/lib/auth";

export async function middleware(request: NextRequest) {
    const token = await getToken();
    const pathname = request.nextUrl.pathname;

    if (!token && pathname.startsWith('/home')) {
        return NextResponse.redirect(new URL('/' , request.url));
    }

    if (token && pathname === '/') {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/home'],
};