import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getAllStudents } from "../services/student";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const [studentsPerGrade, setStudentsPerGrade] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { students } = await getAllStudents();
        const grades = ["7", "8", "9", "10", "11", "12"];
        const gradeCounts = grades.map(
          (grade) =>
            students.filter((student) => student.grade === grade).length
        );
        setStudentsPerGrade(gradeCounts);
      } catch (error) {
        console.log("Error fetching students", error);
      }
    };
    fetchStudents();
  }, []);

  const data = {
    labels: [
      "Grade 7",
      "Grade 8",
      "Grade 9",
      "Grade 10",
      "Grade 11",
      "Grade 12",
    ],
    datasets: [
      {
        label: "Students",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: studentsPerGrade,
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

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Chart;
