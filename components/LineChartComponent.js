import { Chart } from 'primereact/chart';

export default function LineChartComponent({labels, valores, titulo}) {
 //console.log(labels)
  const data = {
    labels: labels,
    datasets: [
      {
        label: titulo,
        data: valores,
        fill: false,
        borderColor: '#4bc0c0'
      }
    ]
  };
  return (
      <Chart 
      type="line" 
      data={data}
      height={"300px"}
     options={{ maintainAspectRatio: false }}
  />
  );
}