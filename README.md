Currency Viewer Application
This is a Next.js project bootstrapped with create-next-app.

Getting Started
First, run the development server:


npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project integrates with the Alpha Vantage API to fetch real-time and historical currency exchange rates. It also uses caching mechanisms for optimized performance, including server-side caching with LRU Cache and client-side caching using localStorage.

Features
Fetch real-time currency exchange rates
Fetch historical currency exchange rates within a date range
Server-side caching using LRU Cache (30 minutes)
Client-side caching using localStorage
Error handling for invalid currency codes or date ranges
Responsive UI using TailwindCSS
API Configuration
You need to configure your environment variables to use the Alpha Vantage API. In the root directory, create a .env.local file and add the following variables:


ALPHA_VANTAGE_API_KEY=your-alpha-vantage-api-key
ALPHA_VANTAGE_BASE_URL=https://www.alphavantage.co/query
You can get your API key by signing up at Alpha Vantage.

Learn More
To learn more about Next.js, take a look at the following resources:

Next.js Documentation - learn about Next.js features and API.
Learn Next.js - an interactive Next.js tutorial.
You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.