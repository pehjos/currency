'use client';

import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ResultsTable from './components/ResultsTable';
import ErrorAlert from './components/ErrorAlert';
import { LatestCurrencyData, HistoricalData, SearchParams } from './types/currencyTypes';

function isLatestCurrencyData(data: LatestCurrencyData | HistoricalData): data is LatestCurrencyData {
  return 'Realtime Currency Exchange Rate' in data;
}

export default function Home() {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [cachedData, setCachedData] = useState<LatestCurrencyData | HistoricalData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load cached data from localStorage if available
    const cachedCurrencyData = localStorage.getItem('currencyData');
    if (cachedCurrencyData) {
      setCachedData(JSON.parse(cachedCurrencyData));
    }
  }, []);

  // Error timeout: clears the error after 2 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 2000);
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [error]);

  const handleSearchLatest = (currencyCode: string) => {
    const cacheKey = `${currencyCode}_latest`;
    const cachedResult = localStorage.getItem(cacheKey);

    if (cachedResult) {
      setCachedData(JSON.parse(cachedResult));
    } else {
      setIsLoading(true);
      setError(null);
      setSearchParams({ currencyCode });
      fetchLatestCurrencyRate(currencyCode, cacheKey);
    }
  };

  const handleSearchHistorical = (params: SearchParams) => {
    const { currencyCode, startDate, endDate } = params;
    if (!currencyCode || !startDate || !endDate) {
      setError('Please enter both start and end dates.');
      return;
    }

    const cacheKey = `${currencyCode}_${startDate}_${endDate}`;
    const cachedResult = localStorage.getItem(cacheKey);

    if (cachedResult) {
      setCachedData(JSON.parse(cachedResult));
    } else {
      setIsLoading(true);
      setError(null);
      setSearchParams(params);
      fetchHistoricalCurrencyRate(params, cacheKey);
    }
  };

  const fetchLatestCurrencyRate = async (currencyCode: string, cacheKey: string) => {
    try {
      const response = await fetch(`/api/fetchCurrency?currencyCode=${currencyCode}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch data.');
      }

      const data: LatestCurrencyData = await response.json();
      setCachedData(data);
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem('currencyData', JSON.stringify(data));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Invalid currency code or failed to fetch data.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHistoricalCurrencyRate = async (params: SearchParams, cacheKey: string) => {
    try {
      const { currencyCode, startDate, endDate } = params;
      const response = await fetch(
        `/api/fetchCurrency?currencyCode=${currencyCode}&startDate=${startDate}&endDate=${endDate}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch historical data.');
      }

      const data: HistoricalData = await response.json();
      if (Object.keys(data).length === 0) {
        localStorage.setItem('currencyData', '');
        throw new Error('No historical data found for the provided date range.');
      }

      setCachedData(data);
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem('currencyData', JSON.stringify(data));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch data.');
    } finally {
      setIsLoading(false);
    }
  };

  const isLatestRate = cachedData && isLatestCurrencyData(cachedData);

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center">
        <main className="w-full max-w-4xl p-8 rounded shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6">Currency Viewer</h1>

          <SearchForm onSearchLatest={handleSearchLatest} onSearchHistorical={handleSearchHistorical} />

          {error && <ErrorAlert message={error} />}

          {isLoading && searchParams && (
            <div className="text-center mt-4 text-blue-500 font-semibold">Loading data...</div>
          )}

          {!isLoading && cachedData && (
            <>
              {isLatestRate && (
                <div className="text-center mt-4 text-green-500 font-semibold">
                  {cachedData['Realtime Currency Exchange Rate']['1. From_Currency Code']} rates in{' '}
                  {cachedData['Realtime Currency Exchange Rate']['3. To_Currency Code']} - Latest: {cachedData['Realtime Currency Exchange Rate']['5. Exchange Rate']}
                </div>
              )}

              {!isLatestRate && <ResultsTable data={cachedData as HistoricalData} />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
