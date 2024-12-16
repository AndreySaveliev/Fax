import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: { userId: number }) {
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (e) {
    console.log(e);
    console.log("Failed to verify session");
  }
}

export async function createSession(userId: number) {
  const session = await encrypt({ userId });
  const store = await cookies();
  store.set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}
