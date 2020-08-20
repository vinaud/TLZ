import React,  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import '../../assets/main.css';
import Header  from '../../components/Header';

function Landing() {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [food, setFood] = useState('');
  const [water, setWater] = useState('');
  const [weapon, setWeapon] = useState('');
  const [medicine, setMedicine] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition( position  => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          })
        }
  }, []);

  

  const save = async() => {
    const lonlat = 'Point('+latitude +longitude+')'
    await api.post('/api/save-status',{
      name,
      age,
      gender,
      lonlat,
      items:{
        'Fiji Water': water,
        'Campbell Soup': food,
        'First-Aid Pouch': medicine,
        'AK-47': weapon
      }
    })

    .then(()=>{
        alert("You have been registered with succes");
        
    })

    
}


  
return(
    <div>
      <Header/>
      <div className='p-8 flex flex-col items-center  sm: bg-cover bg-center  text-center justify-between bg-fixed '   >
      <fieldset className=' rounded-lg p-8 bg-gray-300 bg-opacity-50'>
           
            <h1 className='text-3xl text-center m-8'>Register Yourself into our survivors database</h1>

            <label htmlFor={name}>Name:</label>
            <input type="text" id='name' value={name} onChange={e => setName(e.target.value)}/>
            <br/><br/>
            <label htmlFor={age}>Age:</label>
            <input type="text" id='age' value={age} onChange={e => setAge(e.target.value)}/>
            <br/><br/>
            <label htmlFor={gender}>Gender:</label>
            <input type="text" id='gender' value={gender} onChange={e => setGender(e.target.value)}/>
            <br/><br/>
            <p className='text-xl text-center m-8'>Current Position: {latitude}; {longitude} </p>

            <h1 className='text-xl text-center m-8'>Register your inventory</h1>
            <label htmlFor={food}>Campbell Soup:</label>
            <input type="text" id='food' value={food} onChange={e => setFood(e.target.value)}/>
            <br/><br/>
            <label htmlFor={water}>Fiji Water:</label>
            <input type="text" id='water' value={water} onChange={e => setWater(e.target.value)}/>
            <br/><br/>
            <label htmlFor={weapon}>AK-47:</label>
            <input type="text" id='weapon' value={weapon} onChange={e => setWeapon(e.target.value)}/>
            <br/><br/>
            <label htmlFor={medicine}>First-aid pouch:</label>
            <input type="text" id='medicine' value={medicine} onChange={e => setMedicine(e.target.value)}/>
            <br/><br/>


            <button className= 'py-4 px-2 rounded bg-gray-800 font-bold shadow-xl hover:shadow block w-1/4 text-center mx-auto text-white' onClick = { save }>Register</button>
        </fieldset>
        </div>
        
    
    </div>
)
}

export default Landing;