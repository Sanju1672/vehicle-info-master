import { Pie } from "react-chartjs-2";
import { useCallback, useState } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js'

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  )

const ageRange = ['All', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50', '50-55', '55-60'];

export function PieChart({ data }) {
    const [range, setRange] = useState('All')

    const checkIsWithinRange = useCallback((user) => {
      if(range !== 'All') {
        const split = range.split('-');
        return user.age > Number(split[0]) && user.age < Number(split[1]);
      }
      return true;
    }, [range]);

    const items = data.reduce((acc, curr) => {
      if(checkIsWithinRange(curr)) {
        if(!acc[curr.vehicle.age]) {
          acc[curr.vehicle.age] = 1;
          return acc;
        }
        acc[curr.vehicle.age] += 1;
        return acc;
      }
      return acc;
    }, {})

    const onChange = useCallback((e) => {
      setRange(e.target.value);
    }, []);


    return (
        <div className="pie">
          <div className="dropdownWrapper">
            <h3>Select user's age range</h3>
            <select defaultValue={'All'} value={range} onChange={onChange}>
              {ageRange.map((range) => <option>{range}</option>)}
            </select>
          </div>
            <Pie
            data={{
                labels: Object.keys(items).map((i) => `Age: ${i}`),
                datasets: [{
                    label: 'No. of verhicles',
                    data: Object.values(items),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                      ],
                }]
            }}  
             />
        </div>
    );
}