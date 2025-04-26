"use client";

import {useEffect, useRef} from "react";

import {Chart, registerables} from "chart.js";

import {Product} from "@/lib/types";

Chart.register(...registerables);

interface RatingDistributionChartProps {
  products: Product[];
}

export default function RatingDistributionChart({products}: RatingDistributionChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Clean up previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Define rating ranges
    const ratingRanges = [
      {min: 0, max: 1, label: "0-1"},
      {min: 1, max: 2, label: "1-2"},
      {min: 2, max: 3, label: "2-3"},
      {min: 3, max: 4, label: "3-4"},
      {min: 4, max: 5, label: "4-5"},
    ];

    // Count products in each rating range
    const rangeCounts = ratingRanges.map(range => ({
      ...range,
      count: products.filter(p => p.rating.rate >= range.min && p.rating.rate < range.max).length,
    }));

    // Create chart
    const ctx = chartRef.current.getContext("2d");
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: rangeCounts.map(r => r.label),
          datasets: [
            {
              label: "Number of Products",
              data: rangeCounts.map(r => r.count),
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "rgba(153, 102, 255, 1)",
              pointRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: context => {
                  const value = context.raw as number;
                  return `Products: ${value}`;
                },
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [products]);

  return (
    <div className="h-[300px]">
      <canvas ref={chartRef} />
    </div>
  );
}
