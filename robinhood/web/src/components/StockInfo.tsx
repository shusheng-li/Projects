import React from 'react';

interface StockInfoProps {
    symbol: string;
    price: number;
}

const StockInfo: React.FC<StockInfoProps> = ({ symbol, price }) => {
    return (
        <div>
            <h2>{symbol}</h2>
            <p>Price: ${price}</p>
        </div>
    );
}

export default StockInfo;
