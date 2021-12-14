import React from 'react';
import { Link } from 'react-router-dom';
const Nav = () => {
    return (
        <div className="container-fluid">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                   <Link className="nav-link active" aria-current="page"  to="/a"> homepage</Link> 
                </li>
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page"  to="/heroes"> Liste de Heros</Link> 
                </li>
                {/* <li className="nav-item">
                <Link className="nav-link active" aria-current="page"  to="/heroes/iron-man"> un seul heros</Link> 
                </li> */}
                {/* <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">okok</a>
                </li> */}
            </ul>
        </div>
    );
};

export default Nav;