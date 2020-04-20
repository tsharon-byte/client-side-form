import React from 'react';
import './App.css'
import {Link} from 'react-router-dom';

function Nav() {
    const style={
        color:"white"
    };
    return (
        <nav>
            <h1>Logo</h1>
            <ul className="nav-links">
                <Link to='/form' style={style}>
                    <li>Add person</li>
                </Link>
                <Link to='/list' style={style}>
                    <li>List of persons</li>
                </Link>
                <Link to='/delete' style={style}>
                    <li>Delete the person</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;