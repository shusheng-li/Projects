import { useState } from 'react';
import Navbar from "../components/Navbar";
import './Buy.css';
import { abort } from 'process';



export function Buy() {
    const [symbol, setSymbol] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleBuy = async () => {
        // Handle buy action here, e.g., send buy request to backend
        try {
            const response = await fetch(`http://35.197.105.100/api/buy/${symbol}/${quantity}`, {
                // const response = await fetch(`http://127.0.0.1:5001/api/buy/${symbol}/${quantity}`, {
                method: "POST",
            });
            if (!response.ok) {
                throw new Error('Failed to buy');
            }
            const data = await response.json();
            setSuccessMessage(`Successfully bought ${quantity} stocks of ${symbol.toUpperCase()}`);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                setErrorMessage(error.message);
            }
        }
        console.log(`Buying ${quantity} stocks`);
    };

    return (
        <div>
            <Navbar></Navbar>
            <div className='container'>
                <input
                    className='input'
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="Enter stock symbol"
                />
                <input
                    className='input'
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.valueAsNumber)}
                    placeholder="Enter quantity"
                />
                <button className='button' onClick={handleBuy}>Buy</button>
                {successMessage && <p className='success-message'>{successMessage}</p>}
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
            </div>

        </div >
    );
}

export default Buy;
