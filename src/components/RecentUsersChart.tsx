"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

// Define user type
interface User {
  created_at: string;
}

// Define chart dataset type
interface Dataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  pointBackgroundColor: string;
  tension: number;
}

const RecentUsersChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/getusers");
      if (!response.ok) throw new Error("Failed to fetch users");

      const data: User[] = (await response.json()).users;
      if (!data) return;

      // Process data for the chart
      const groupedData: Record<string, number> = data.reduce(
        (acc: Record<string, number>, user) => {
          const date = new Date(user.created_at).toLocaleDateString();
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      setChartData({
        labels: Object.keys(groupedData),
        datasets: [
          {
            label: "New Users",
            data: Object.values(groupedData),
            borderColor: "rgba(54, 162, 235, 1)", // Line color
            backgroundColor: "rgba(54, 162, 235, 0.2)", // Fill under the line
            pointBackgroundColor: "rgba(54, 162, 235, 1)", // Point color
            tension: 0.3, // Smooth curve
          } as Dataset,
        ],
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Chart options with Y-axis limit
  const options: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      y: {
        suggestedMin: 0, // Minimum Y value
        suggestedMax: 10, // Maximum Y value
        ticks: {
          stepSize: 1, // Controls step interval (0, 1, 2, ..., 10)
        },
      },
    },
  };

  return (
    <div style={{ width: "900px", height: "400px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RecentUsersChart;
