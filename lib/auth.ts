import jwt from "jsonwebtoken";

export const verifyJWTToken = (token: string): boolean => {
  try {
    // Verify the token using the provided secret key
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);

    // If the token is valid, return the decoded payload
    if (decoded) return true;
    else return false;
  } catch (err) {
    // If verification fails (token expired, malformed, etc.), return null or handle the error as needed
    console.error("Token verification failed:", err);
    return false;
  }
};
