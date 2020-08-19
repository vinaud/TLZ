import React,  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/main.css';
import Header  from '../../components/Header';

function Landing() {

return(
    <div>
      <Header/>
      <div>
            <h1 className = 'text-4xl text-center m-8'>Welcome Survivor!</h1>
            <h1 className = 'text-3xl text-center m-8'>Register yourself NOW!!</h1>
            <h1 className = 'text-3xl text-center m-8'>See our live reports about infected people and
             resources inventory.</h1>
        </div>
    
    </div>
)
}

export default Landing;