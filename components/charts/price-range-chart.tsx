"use client";

import {useEffect, useRef} from "react";

import {Chart, registerables} from "chart.js";

import {Product} from "@/lib/types";

Chart.register(...registerables);

interface PriceRangeChartProps {
  products: Product[];
}

export default function PriceRangeChart({products}: PriceRangeChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Clean up previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Define price ranges
    const priceRanges = [
      {min: 0, max: 25, label: "$0-$25"},
      {min: 25, max: 50, label: "$25-$50"},
      {min: 50, max: 100, label: "$50-$100"},
      {min: 100, max: 200, label: "$100-$200"},
      {min: 200, max: Number.POSITIVE_INFINITY, label: "$200+"},
    ];

    // Count products in each price range
    const rangeCounts = priceRanges.map(range => ({
      ...range,
      count: products.filter(p => p.price >= range.min && p.price < range.max).length,
    }));

    // Create chart
    const ctx = chartRef.current.getContext("2d");
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: rangeCounts.map(r => r.label),
          datasets: [
            {
              label: "Number of Products",
              data: rangeCounts.map(r => r.count),
              backgroundColor: "rgba(75, 192, 192, 0.7)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
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
