import React, { useState, useEffect } from "react";
import { CalendarRange } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SearchFormProps, Currency } from "../types/currencyTypes";
import { currencies } from "../data/currencies";
import ErrorAlert from "./ErrorAlert";

const SearchForm: React.FC<SearchFormProps> = ({
  onSearchLatest,
  onSearchHistorical,
}) => {
  const [currencyCode, setCurrencyCode] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>([]); // Set Currency[] as the type
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCurrencyInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = e.target.value.toUpperCase();
    setCurrencyCode(input);

    if (input) {
      const filtered = currencies.filter(
        (currency: Currency) =>
          currency.name.toUpperCase().includes(input) ||
          currency.code.toUpperCase().includes(input) ||
          currency.country.toUpperCase().includes(input)
      );
      setFilteredCurrencies(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleCurrencySelect = (currency: Currency) => {
    // Correctly typed now as Currency
    setCurrencyCode(currency.code);
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSearchLatest = () => {
    if (!currencyCode) {
      setError("Please enter a currency code.");
    } else {
      setError(null);
      onSearchLatest(currencyCode);
    }
  };

  const handleSearchHistorical = () => {
    if (!currencyCode || !startDate || !endDate) {
      setError("Please fill in all fields.");
    } else {
      setError(null);
      onSearchHistorical({
        currencyCode,
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
      });
    }
  };

  return (
    <div className="bg-opacity-30 bg-gray-800 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-indigo-500 mb-4">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-300">
        Find Exchange Rate Against USD
      </h2>

      {/* Error Alert */}
      {error && <ErrorAlert message={error} />}

      <div className="relative mb-6">
        <label
          htmlFor="currencyCode"
          className="block text-indigo-300 font-semibold mb-2"
        >
          Currency Code
        </label>
        <input
          type="text"
          value={currencyCode}
          onChange={handleCurrencyInputChange}
          id="currencyCode"
          className="w-full px-4 py-3 bg-gray-700 bg-opacity-40 text-indigo-200 rounded-lg shadow-inner border border-gray-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500 hover:bg-gray-600"
          placeholder="Enter Currency Code (e.g., USD)"
        />
        {showSuggestions && (
          <div className="absolute z-10 w-full bg-white border rounded shadow-md max-h-60 overflow-y-auto">
            {filteredCurrencies.map((currency: Currency) => (
              <div
                key={currency.code}
                onClick={() => handleCurrencySelect(currency)}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              >
                <img
                  src={currency.flag}
                  alt={currency.name}
                  className="w-6 h-4 mr-2"
                />
                <span>
                  {currency.name} ({currency.code})
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Date Range Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {/* Start Date Picker */}
        <div
          className="relative"
          onClick={() => setIsStartDatePickerOpen(true)}
        >
          <label
            htmlFor="startDate"
            className="block text-indigo-300 font-semibold mb-2"
          >
            Start Date
          </label>
          <input
            type="text"
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            onChange={() => {}}
            id="startDate"
            placeholder="Select Date"
            className="w-full px-4 py-3 bg-gray-700 bg-opacity-40 text-indigo-200 rounded-lg shadow-inner pl-10 border border-gray-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500 hover:bg-gray-600 pointer-events-none"
            readOnly
          />
          <CalendarRange
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 pointer-events-none"
            size={20}
          />
          {isStartDatePickerOpen && (
            <div className="absolute z-50 top-14 left-0 right-0 mx-auto w-72 bg-gray-800 bg-opacity-80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-indigo-500">
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => {
                  setStartDate(date); // Accepting null here
                  setIsStartDatePickerOpen(false);
                }}
                inline
                onClickOutside={() => setIsStartDatePickerOpen(false)}
              />
            </div>
          )}
        </div>

        {/* End Date Picker */}
        <div className="relative" onClick={() => setIsEndDatePickerOpen(true)}>
          <label
            htmlFor="endDate"
            className="block text-indigo-300 font-semibold mb-2"
          >
            End Date
          </label>
          <input
            type="text"
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            onChange={() => {}}
            id="endDate"
            placeholder="Select Date"
            className="w-full px-4 py-3 bg-gray-700 bg-opacity-40 text-indigo-200 rounded-lg shadow-inner pl-10 border border-gray-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500 hover:bg-gray-600 pointer-events-none"
            readOnly
          />
          <CalendarRange
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 pointer-events-none"
            size={20}
          />
          {isEndDatePickerOpen && (
            <div className="absolute z-50 top-14 left-0 right-0 mx-auto w-72 bg-gray-800 bg-opacity-80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-indigo-500">
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => {
                  setEndDate(date);
                  setIsEndDatePickerOpen(false);
                }}
                inline
                onClickOutside={() => setIsEndDatePickerOpen(false)}
              />
            </div>
          )}
        </div>
      </div>

    
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={handleSearchLatest}
          className="w-full py-3 bg-indigo-600 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-xl transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 focus:outline-none"
        >
          Fetch Latest Exchange Rate
        </button>
        <button
          onClick={handleSearchHistorical}
          className="w-full py-3 bg-indigo-600 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-xl transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 focus:outline-none"
        >
          Fetch Historical Data
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
