

export const ALPHA_VANTAGE_API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY as string;
export const ALPHA_VANTAGE_BASE_URL = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_BASE_URL as string;

if (!ALPHA_VANTAGE_API_KEY) {
  throw new Error('Missing Alpha Vantage API key. Please set NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY in your environment.');
}

if (!ALPHA_VANTAGE_BASE_URL) {
  throw new Error('Missing Alpha Vantage base URL. Please set NEXT_PUBLIC_ALPHA_VANTAGE_BASE_URL in your environment.');
}
