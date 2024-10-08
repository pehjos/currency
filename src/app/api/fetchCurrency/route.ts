import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import {
  ALPHA_VANTAGE_API_KEY,
  ALPHA_VANTAGE_BASE_URL,
} from "../../config/contants";
import { LRUCache } from "lru-cache";
import { LatestCurrencyData, HistoricalData } from "../../types/currencyTypes";

const cache = new LRUCache({
  max: 100,
  ttl: 1000 * 60 * 30,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const currencyCode = searchParams.get("currencyCode");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!currencyCode) {
    return NextResponse.json(
      { error: "Currency code is required" },
      { status: 400 }
    );
  }

  const cacheKey = `${currencyCode}_${startDate || "latest"}_${endDate || ""}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log(`[CACHE HIT] Returning cached data for key: ${cacheKey}`);
    return NextResponse.json(cachedData, { status: 200 });
  }

  try {
    if (!startDate && !endDate) {
      const response = await axios.get<LatestCurrencyData>(
        `${ALPHA_VANTAGE_BASE_URL}`,
        {
          params: {
            function: "CURRENCY_EXCHANGE_RATE",
            from_currency: currencyCode,
            to_currency: "USD",
            apikey: ALPHA_VANTAGE_API_KEY,
          },
        }
      );

      const data = response.data;

      if (!data["Realtime Currency Exchange Rate"]) {
        return NextResponse.json(
          { error: "Invalid currency code provided." },
          { status: 400 }
        );
      }

      cache.set(cacheKey, data);
      return NextResponse.json(data, { status: 200 });
    } else if (startDate && endDate) {
      const response = await axios.get<HistoricalData>(
        `${ALPHA_VANTAGE_BASE_URL}`,
        {
          params: {
            function: "FX_DAILY",
            from_symbol: currencyCode,
            to_symbol: "USD",
            apikey: ALPHA_VANTAGE_API_KEY,
          },
        }
      );

      const data = response.data["Time Series FX (Daily)"];
      if (!data) {
        return NextResponse.json(
          { error: "Invalid currency code provided." },
          { status: 400 }
        );
      }

      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([date]) => {
          const currentDate = new Date(date);
          const start = new Date(startDate);
          const end = new Date(endDate);
          return currentDate >= start && currentDate <= end;
        })
      );

      if (Object.keys(filteredData).length === 0) {
        return NextResponse.json(
          { error: "No data available for the selected date range." },
          { status: 404 }
        );
      }
      cache.set(cacheKey, filteredData);
      return NextResponse.json(filteredData, { status: 200 });
    }

    return NextResponse.json(
      { error: "Both startDate and endDate are required." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error fetching currency data:", error);
    return NextResponse.json(
      {
        error:
          "Invalid currency code or failed to fetch data from Alpha Vantage",
      },
      { status: 400 }
    );
  }
}
