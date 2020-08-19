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
        <div >
            <h1>Recent Reports</h1>
            <h2>Infected Survival Percentage:{infected} %</h2>
            <h2>Non-Infected Survival Percentage: {nonInfected} %</h2>
            <h2>Total Lost points by infected survivals: { points } points</h2>
            <h1>Inventory Reports</h1>
            <h3>Average items quantity per person: {Math.round(avgItems)} items</h3>
            <h3>Average items quantity per healthy person: {Math.round(avgItemsHealthy)} items</h3>
            <h2>Average quantity by item:</h2>
            <h3>Fiji Water: { Math.round(water) }</h3>
            <h3>Campbell Soup: { Math.round(soup) }</h3>
            <h3>First Aid Pouch: { Math.round(medicine) }</h3>
            <h3>AK-47: {Math.round(gun)}</h3>
        </div>
    </div>
)
}

export default Landing;