import React,  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/main.css';
import Header  from '../../components/Header';

function Landing() {

return(
    <div>
      <Header/>
      <h1>Hello Survivor !</h1>
    <div className="buttons-container">
          <Link to="/reports" className="reports">
            Reports
          </Link>

          <Link to="/register" className="register">
           Register
          </Link>
        </div>
    </div>
)
}

export default Landing;