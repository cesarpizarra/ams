import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useFetchStudent } from '../../hooks/useFetchStudent';
import Loader from '../../common/Loader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const { data: students, isLoading, error } = useFetchStudent();
  const grades = ['7', '8', '9', '10', '11', '12'];
  const gradeCounts = grades.map(
    (grade) => students?.filter((student) => student.grade === grade).length
  );

  const data = {
    labels: [
      'Grade 7',
      'Grade 8',
      'Grade 9',
      'Grade 10',
      'Grade 11',
      'Grade 12',
    ],
    datasets: [
      {
        label: 'Students',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: gradeCounts,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (isLoading) return <Loader />;
  if (error) return <p>{(error as Error).message}</p>;
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Chart;
