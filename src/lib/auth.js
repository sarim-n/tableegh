import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function verifyAdminRequest() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("admin_token");

    if (!tokenCookie || !tokenCookie.value) {
      return null;
    }

    const decoded = jwt.verify(
      tokenCookie.value,
      process.env.JWT_SECRET || "fallback-secret-key-123"
    );

    return decoded;
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return null;
  }
}
