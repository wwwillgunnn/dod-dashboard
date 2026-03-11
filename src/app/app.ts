import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BaseChartDirective],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angularDashboard');

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        data: [30, 18, 42],
        backgroundColor: '#22c55e',
        borderRadius: 4,
        barThickness: 18,
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
      x: { display: false },
      y: { display: false },
    },
  };

  // Line chart for Threat Activity (last 24hrs)
  threatActivityData: ChartConfiguration<'line'>['data'] = {
    labels: ['0-4h', '4-8h', '8-12h', '12-16h', '16-20h', '20-24h'],
    datasets: [
      {
        label: 'Threat Level',
        data: [25, 50, 75, 100, 60, 40],
        borderColor: '#22c55e', // green line
        backgroundColor: 'rgba(34, 197, 94, 0.2)', // green fill under line
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
      x: { display: false }, // hide x-axis
      y: { display: false }, // hide y-axis
    },
  };
}
