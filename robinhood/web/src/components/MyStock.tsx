import React from 'react';

interface MyStock {
    symbol: string;
    quantity: number;
}

const MyStock: React.FC<MyStock> = ({ symbol, quantity }) => {
    return (
        <div>
            {symbol}: ${quantity}
        </div>
    );
}

export default MyStock;
