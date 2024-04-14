import React from 'react'
import { Link } from 'react-router-dom';


export default function Homepage() {
return (
    <div className='home'>
    <h1 style={{marginBottom:"40px"}}>Test VAS/NDD Functionalities</h1>
    <Link to="/vas">
        <button className="green-button">VAS</button>
    </Link>
    <Link to="/ndd">
        <button className="green-button">NDD</button>
    </Link>
    </div>
)
}
