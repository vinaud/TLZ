import React from 'react';
import img from '../../assets/images/logo.png';


const Logo = () => {
    return (
      <div className =' text-white '>
        <img className="my-4 object-scale-down h-40 w-40" src={img} alt="Logo"/>
      </div>
    )
}


export default Logo;