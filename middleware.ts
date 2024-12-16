import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function Middleware(req: NextRequest, res: NextResponse) {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  if (session?.userId == undefined && req.nextUrl.pathname != "/signup") {
    return NextResponse.redirect(new URL("/signup", req.nextUrl));
  }
  return NextResponse.next({ request: {} });
}

export const config = {
  matcher: ["/((?!api|_next/static|manifest.webmanifest|_next/image|.*\\.png$).*)"],
};
