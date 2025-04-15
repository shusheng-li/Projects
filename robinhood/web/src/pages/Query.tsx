import { useState } from 'react';
import StockInfo from "../components/StockInfo";
import Navbar from "../components/Navbar";
import './Query.css';


export function Query() {
    const [symbol, setSymbol] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [isValidStock, setIsValidStock] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://35.197.105.100/api/query/${symbol}`);
            // const response = await fetch(`http://127.0.0.1:5001/api/query/${symbol}`);
            if (!response.ok) {
                throw new Error('Failed to fetch stock information');
            }
            const data = await response.json();
            setPrice(data["currentPrice"]);
            console.log(data["currentPrice"]);
            setIsValidStock(true);
            setErrorMessage('');
        } catch (error) {
            console.error(error);
            setIsValidStock(false);
            if (error instanceof Error) {
                setErrorMessage(error.message);
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="input-container">
                <input
                    className="input"
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="Enter stock symbol"
                />
                <button className='button' onClick={handleSearch}>Search</button>
            </div>
            {isValidStock && price > 0 &&
                <div className="stock-info-container"><StockInfo symbol={symbol.toUpperCase()} price={price} />
                </div>
            }
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </div>
    );

}

export default Query;

