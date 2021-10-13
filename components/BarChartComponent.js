import { Chart } from 'primereact/chart';

export default function BarChartComponent({labels, valores, titulo}) {

const options = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  plugins: {
    title: {
        display: false
    },
 },
}
  const data = {
    labels: labels,
    datasets: [
      {
        label: titulo,
        data: valores,
        fill: false,
        backgroundColor: '#3c8dbc',
      }
    ]
  };
  return (
      <Chart 
      type="bar" 
      data={data}
      height={"300px"}
      options={options}
  />
  );
}