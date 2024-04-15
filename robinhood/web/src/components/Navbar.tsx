import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="navbar">
            <img src={require('../pictures/robin.png')} height={75} width={75} />
            <ul className="navbar-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/query">Query</Link></li>
                <li><Link to="/buy">Buy</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
            </ul>
        </div>
    )
}

export default Navbar