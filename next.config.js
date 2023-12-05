/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    NEXT_PUBLIC_BASE_LOCAL: process.env.NEXT_PUBLIC_BASE_LOCAL,
    NEXT_PUBLIC_BASE_STAGING: process.env.NEXT_PUBLIC_BASE_STAGING,
    NEXT_PUBLIC_CIPHER_KEY: process.env.NEXT_PUBLIC_CIPHER_KEY,
    NEXT_PUBLIC_PUBLIC_KEY: process.env.NEXT_PUBLIC_PUBLIC_KEY,
    NEXT_PUBLIC_PRIVATE_KEY: process.env.NEXT_PUBLIC_PRIVATE_KEY,
    OKTA_CLIENTID: process.env.OKTA_CLIENTID,
    OKTA_CLIENTSECRET: process.env.OKTA_CLIENTSECRET,
    OKTA_DOMAIN: process.env.OKTA_DOMAIN,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_REDIRECT: process.env.NEXT_PUBLIC_REDIRECT,
  },
};

module.exports = nextConfig;