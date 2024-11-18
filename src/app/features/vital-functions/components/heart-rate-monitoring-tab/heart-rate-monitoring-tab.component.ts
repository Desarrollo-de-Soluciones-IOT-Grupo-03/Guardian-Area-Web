import { TableActivitiesComponent } from '@activities/components';
import { AfterViewInit, Component, inject, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-heart-rate-monitoring-tab',
  standalone: true,
  imports: [],
  templateUrl: './heart-rate-monitoring-tab.component.html',
  styleUrl: './heart-rate-monitoring-tab.component.css',
})
export class HeartRateMonitoringTabComponent implements AfterViewInit {
  @Input({ required: true }) heartRateData: number[] = [];
  @Input({ required: true }) dates: string[] = [];
  @Input({ required: true }) chart: Chart | null = null;

  ngAfterViewInit(): void {
    this._setChart();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private _setChart(): void {
    const heartRateData = {
      labels: this.dates,
      datasets: [
        {
          data: this.heartRateData,
          label: 'Heart Rate (bpm)',
          color: '#3e95cd',
          fill: true,
        },
      ],
    };
    this.chart = new Chart('chart', {
      type: 'line',

      data: heartRateData,
      options: {
        responsive: true,
      },
    });
  }
}
