import React, { Children } from 'react';
import { useLocation, Link } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';


const MenuBar = () =>{
    
    return (
        <div className='bg-gray-500 py-4 text-center'>

            <Link to='/' >
            <a className = 'p-2 hover:underline hover:text-red-800'>Home</a>
            </Link>

            <Link to='/reports' >
            <a className = 'p-2 hover:underline hover:text-red-800'>Reports</a>
            </Link>

            <Link to='/register' >
            <a className = 'p-2 hover:underline hover:text-red-800'>Register</a>
            </Link>

            
       </div>
    )
}

export default MenuBar;