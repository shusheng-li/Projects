import React, { useEffect, useMemo, useState } from 'react';
import Navbar from "../components/Navbar"
import './Portfolio.css';


interface PortfolioItem {
    _id: string;
    quantity: number;
}

export function Portfolio() {
    const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://35.212.230.76/api/portfolio');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setPortfolioData(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const columns = useMemo(() => [
        {
            Header: 'Symbol',
            accessor: '_id',
        },
        {
            Header: 'Quantity',
            accessor: 'quantity',
        }
    ], []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <table>
                    <thead>
                        <tr>
                            {columns.map(column => (
                                <th key={column.accessor}>{column.Header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {portfolioData.map((row, index) => (
                            <tr key={index}>
                                <td>{row._id}</td>
                                <td>{row.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Portfolio;
