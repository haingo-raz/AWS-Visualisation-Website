import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
    return (
        <div className="topnav">
            <Link to='/'><h1 className='logo'>NBA STATS</h1></Link>
        </div>
    );
}

export default Header;