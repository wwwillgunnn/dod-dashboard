import { Component } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  // Bar chart
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Medium', 'High', 'Critical'],
    datasets: [
      {
        data: [60, 32, 84],
        backgroundColor: '#22c55e',
        borderRadius: 4,
        barThickness: 60,
      },
    ],
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { display: true },
      y: { display: true },
    },
  };

  // Line chart
  threatActivityData: ChartConfiguration<'line'>['data'] = {
    labels: ['0-4h', '4-8h', '8-12h', '12-16h', '16-20h', '20-24h'],
    datasets: [
      {
        label: 'Threat number',
        data: [25, 50, 75, 100, 60, 40],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        fill: true,
        tension: 0.4, // smooth curve
        pointRadius: 4,
        pointBackgroundColor: '#22c55e',
      },
    ],
  };

  threatActivityOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { display: true },
      y: { display: true },
    },
  };
}
