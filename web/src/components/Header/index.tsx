import React from 'react';
import Logo from '../Logo';
import MenuBar from '../MenuBar'

const Header = () => {
    return(
        <div>
            <header className = 'p-4 bg-gray-600 sm:flex justify-between items-center'>

            <Logo />

            <h1 className= 'text-white font-bold text-5xl'> The Resident Zombie</h1>
            

            </header>
            <MenuBar/>
        </div>
    )
}

export default Header;