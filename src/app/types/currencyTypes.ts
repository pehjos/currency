export interface Currency {
    code: string;
    name: string;
    country: string;
    flag: string;
  }
  
export interface LatestCurrencyData {
    'Realtime Currency Exchange Rate': {
      '1. From_Currency Code': string;
      '3. To_Currency Code': string;
      '5. Exchange Rate': string;
    };
  }
  
  export interface HistoricalData {
    [date: string]: {
      '1. open': string;
      '2. high': string;
      '3. low': string;
      '4. close': string;
    };
  }
  
  export interface SearchParams {
    currencyCode: string;
    startDate?: string;
    endDate?: string;
  }

  export interface SearchFormProps {
    onSearchLatest: (currencyCode: string) => void;
    onSearchHistorical: (params: { currencyCode: string; startDate: string; endDate: string }) => void;
  }
  
  export interface ErrorAlertProps {
    message: string;
  }