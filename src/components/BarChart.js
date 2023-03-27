import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
  } from 'chart.js'

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
  )

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Vehicles belonging to particular country',
      },
    },
  };

export function BarChart({ data }) {
    const items = data.reduce((acc, curr) => {
        if(!acc[curr.address.country]) {
            acc[curr.address.country] = 1;
            return acc;
        }
        acc[curr.address.country] += 1;
        return acc;
    }, {})
    console.log({ items });
    return (
        <div>
            <Bar
            options={options}
                data={{
                    labels: Object.keys(items),
                    datasets: [{
                        label: 'Vehicles',
                        data: Object.values(items),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderWidth: 2,
                    }]
                }} 
            />
        </div>
    );
}