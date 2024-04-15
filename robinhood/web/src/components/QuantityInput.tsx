import React, { useState } from 'react';

interface QuantityInputProps {
    onSubmit: (quantity: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ onSubmit }) => {
    const [quantity, setQuantity] = useState<number>(0);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        setQuantity(value);
    };

    const handleSubmit = () => {
        onSubmit(quantity);
    };

    return (
        <div>
            <input type="number" value={quantity} onChange={handleInputChange} />
            <button onClick={handleSubmit}>Buy</button>
        </div>
    );
}

export default QuantityInput;
