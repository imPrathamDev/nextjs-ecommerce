import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;

export async function middleware(req) {
  if (
    req.nextUrl.pathname.startsWith("/account") ||
    req.nextUrl.pathname.startsWith("/checkout")
  ) {
    const token = await getToken({ req, secret });
    if (token) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/adminDashboard")) {
    const token = await getToken({ req, secret });
    if (token?.type === "admin") {
      return NextResponse.next();
    } else if (token?.type === "user") {
      return NextResponse.redirect(new URL("/account", req.url));
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/api/test")) {
    const token = await getToken({ req, secret });
    console.log("Token =>", token);
    if (!token) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", req.url));
  }
}
