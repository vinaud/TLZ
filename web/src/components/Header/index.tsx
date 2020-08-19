import React from 'react';
import Logo from '../Logo';

const Header = () => {
    return(
        <div>
            <header className = 'p-4 bg-indigo-800 sm:flex justify-between items-center'>

            <Logo />

            <h1 className= 'text-white font-bold text-5xl'> The Resident Zombie</h1>
            

            </header>
        </div>
    )
}

export default Header;