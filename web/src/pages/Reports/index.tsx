import React,  { useState, useEffect } from 'react';
import api from '../../services/api';
import Header  from '../../components/Header';

function Landing() {

    const [infected, setInfected] = useState(0);
    const [nonInfected, setNonInfected] = useState(0);
    const [avgItems, setAvgItems] = useState(0);
    const [avgItemsHealthy, setAvgItemsHealthy] = useState(0);
    const [water, setWater] = useState(0);
    const [soup, setSoup] = useState(0);
    const [gun, setGun] = useState(0);
    const [medicine, setMedicine] = useState(0);
    const [points, setPoints] = useState(0);

    useEffect(() => {
      api.get('report/infected').then(response => {
        const { report } = response.data;
        setInfected(report.average_infected * 100);
      });

      api.get('report/non_infected').then(response => {
        const { report } = response.data;
        setNonInfected(report.average_healthy * 100);
      });

      api.get('report/infected_points').then(response => {
        const { report } = response.data;
        setPoints(report.total_points_lost);
      });

      api.get('report/people_inventory').then(response => {
        const { report } = response.data;
        console.log(report);

        setAvgItems(report.average_items_quantity_per_person);
        setAvgItemsHealthy(report.average_items_quantity_per_healthy_person);

        setWater(report.average_quantity_of_each_item_per_person['Fiji Water'])
        setSoup(report.average_quantity_of_each_item_per_person['Campbell Soup'])
        setMedicine(report.average_quantity_of_each_item_per_person['First Aid Pouch'])
        setGun(report.average_quantity_of_each_item_per_person.AK47)

      });

    }, []);

    

return(
    <div>
      <Header/>
        

        <div className='p-8 flex flex-col items-center  sm: bg-cover bg-center  text-center justify-between bg-fixed '   >
          <div className='  rounded-lg p-8 bg-gray-200 bg-opacity-50'>
          <h1 className = 'text-4xl text-center m-8'>Recent Reports</h1>
           
            <table className="table-auto">
              <tbody>
                <tr className="bg-gray-500">
                  <td className="border px-4 py-2">Infected Survival Percentage</td>
                  <td className="border px-4 py-2">{Math.round(infected)}%</td>
     
                </tr>
                <tr className="bg-gray-300">
                  <td className="border px-4 py-2">Non-Infected Survival Percentage</td>
                  <td className="border px-4 py-2">{Math.round(nonInfected)}%</td>
      
                </tr>
                <tr className="bg-gray-500" >
                  <td className="border px-4 py-2">Total Lost points by infected survivals</td>
                  <td className="border px-4 py-2">{ points } points</td>
     
                </tr>
             </tbody>
           </table>

            <h1 className = 'text-4xl text-center m-8'>Inventory Reports</h1>
            
            <table className="table-fixed">
              <tbody>
                <tr className="bg-gray-500">
                  <td className="border px-4 py-2">Average items quantity per person</td>
                  <td className="border px-4 py-2">{Math.round(avgItems)} items</td>
     
                </tr>
                <tr className="bg-gray-300">
                  <td className="border px-4 py-2">Average items quantity per healthy person</td>
                  <td className="border px-4 py-2">{Math.round(avgItemsHealthy)} items</td>
      
                </tr>

                <tr className="bg-gray-500 text-xl text-center " >
                  <td className="border px-4 py-2">Average quantity by item:</td>
                </tr>

                
                <tr className="bg-gray-300">
                  <td className="border px-4 py-2">Fiji Water</td>
                  <td className="border px-4 py-2">{ Math.round(water) } </td>
      
                </tr>

                <tr className="bg-gray-500">
                  <td className="border px-4 py-2">Campbell Soup</td>
                  <td className="border px-4 py-2">{ Math.round(soup) } </td>
      
                </tr>

                <tr className="bg-gray-300">
                  <td className="border px-4 py-2">First-Aid Pouch</td>
                  <td className="border px-4 py-2">{ Math.round(medicine) } </td>
      
                </tr>

                <tr className="bg-gray-500">
                  <td className="border px-4 py-2">AK-47</td>
                  <td className="border px-4 py-2">{Math.round(gun)}</td>
      
                </tr>
                
             </tbody>
           </table>
          </div>
              
        </div>
    
    </div>
    
)
}

export default Landing;