import { useEffect, useState } from "react";
import CurrencyDropdown from "./dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const API_KEY = "9345653790ab576bf1055dad"; // Your API key
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  const [animate, setAnimate] = useState(false);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || ["PKR", "EUR"]
  );

  // Fetch list of currencies (keys from conversion_rates for USD base)
  const fetchCurrencies = async () => {
    try {
      const res = await fetch(`${BASE_URL}/latest/USD`);
      const data = await res.json();

      if (data.result === "success") {
        setCurrencies(Object.keys(data.conversion_rates));
      } else {
        console.error("Failed to fetch currencies:", data["error-type"]);
      }
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };
  useEffect(() => {
    setAnimate(true);
  }, []);
  useEffect(() => {
    fetchCurrencies();
  }, []);

  // Convert currency by fetching rates for fromCurrency
  const convertCurrency = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(`${BASE_URL}/latest/${fromCurrency}`);
      const data = await res.json();

      if (data.result === "success") {
        const rate = data.conversion_rates[toCurrency];
        if (rate) {
          const result = (amount * rate).toFixed(4);
          setConvertedAmount(`${result} ${toCurrency}`);
        } else {
          setConvertedAmount("Conversion rate not available");
        }
      } else {
        console.error("Conversion failed:", data["error-type"]);
        setConvertedAmount("Error during conversion");
      }
    } catch (error) {
      console.error("Error fetching conversion rate:", error);
      setConvertedAmount("Error during conversion");
    } finally {
      setConverting(false);
    }
  };

  const handleFavorite = (currency) => {
    let updatedFavorites = [...favorites];

    if (favorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
    } else {
      updatedFavorites.push(currency);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className={`max-w-xl mx-auto my-10 p-5 rounded-lg shadow-md bg-white/80 backdrop-blur-md transition-all duration-700 ease-in-out transform ${
    animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
  }`}
>
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        Currency Converter
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencyDropdown
          favorites={favorites}
          currencies={currencies}
          title="From:"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          handleFavorite={handleFavorite}
        />
        {/* swap currency button */}
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>
        <CurrencyDropdown
          favorites={favorites}
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
          title="To:"
          handleFavorite={handleFavorite}
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount:
        </label>
        <input
          value={amount}
          onChange={(e) => {
            if (e.target.value < 1) {
              setAmount(1);
            } else setAmount(e.target.value);
          }}
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={convertCurrency}
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          ${converting ? "animate-pulse" : ""}`}
        >
          Convert
        </button>
      </div>

      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-green-600">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
