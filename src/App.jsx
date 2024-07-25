import { useState, useEffect } from 'react'
import InputBox from './components/InputBox'

function App() {

  const [amount, setAmount] = useState()
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("INR")
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [data, setData] = useState();

  async function fetchData(from) {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/3434b75d84f8201e096f24ff/latest/${from.toUpperCase()}`).then((res) => res.json());
    const result = await res.conversion_rates;
    await setData(result);
  }

  useEffect(() => {
    fetchData(from);
  }, [from]);

  const options = data && Object.keys(data);

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * data[to])
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-black"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-vector/digital-money-indian-rupee-circuit-technology-background_1017-45133.jpg?t=st=1721910856~exp=1721914456~hmac=df8d1aa4009c89682b6e93db21e918003aef3834326201fbcd706a38ac159a1d&w=1380')`,
    }}
      
    >
      <div className="w-full">
        <div className="w-full max-w-lg mx-auto border border-gray-60 rounded-lg p-10 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert()
            }}
          >
            <div className="w-full mb-2">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(from) => setFrom(from)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-amber-500 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button type="submit" className="w-full bg-amber-500 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App