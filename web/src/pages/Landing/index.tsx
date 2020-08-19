import React,  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/main.css';
import Header  from '../../components/Header';

function Landing() {

return(
    <div>
      <Header/>
      
        <div className='p-8 flex flex-col items-center  sm: bg-cover bg-center  text-center justify-between bg-fixed '   >
              <div className='  rounded-lg p-8 bg-gray-300 bg-opacity-50'>
                <h1 className = 'text-4xl text-center m-8'>Welcome Survivor!</h1>
                <h1 className = 'text-3xl text-center m-8'>Register yourself NOW!!</h1>
                <h1 className = 'text-3xl text-center m-8'>See our live reports about infected people and
                   resources inventory.</h1>
                  
              </div>
              
          </div>
    
    </div>
)
}

export default Landing;