import { Component } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  selector: 'app-finances',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './finances.html',
  styleUrl: './finances.css',
})
export class Finances {
  public defenseSpendingData: ChartConfiguration<'line'>['data'] = {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
    datasets: [
      {
        label: 'Defense Spending ($B)',
        data: [45, 48, 52, 55, 58, 60, 62],
        borderColor: 'rgb(59, 246, 65)',
        backgroundColor: 'rgba(118, 246, 59, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  public defenseSpendingOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        title: { display: true, text: 'Fiscal Year' },
      },
      y: {
        title: { display: true, text: 'Billions USD' },
      },
    },
  };

  public defenseAllocationData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Personnel', 'Equipment', 'Operations', 'R&D'],
    datasets: [
      {
        data: [35, 30, 20, 15],
        backgroundColor: [
          '#22c55e', // green
          '#3b82f6', // blue
          '#f97316', // orange
          '#a855f7', // purple
        ],
        borderColor: '#020617',
        borderWidth: 2,
      },
    ],
  };

  public defenseAllocationOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#e5e7eb' } },
      tooltip: { enabled: true },
    },
  };
}
