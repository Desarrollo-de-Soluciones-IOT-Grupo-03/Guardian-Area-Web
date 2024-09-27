import { Component, inject, OnInit } from '@angular/core';
import { HeartRateService } from '../../services/heart-rate.service';
import { Chart, registerables } from 'chart.js';
import { HeartRate } from '../../models/heart-rate';
import { TableActivitiesComponent } from "../../../activities/components/table-activities/table-activities.component";

Chart.register(...registerables);
@Component({
  selector: 'app-heart-rate-monitoring-tab',
  standalone: true,
  imports: [TableActivitiesComponent],
  templateUrl: './heart-rate-monitoring-tab.component.html',
  styleUrl: './heart-rate-monitoring-tab.component.css'
})
export class HeartRateMonitoringTabComponent implements OnInit {
  private _heartRateService: HeartRateService = inject(HeartRateService);

  chart: Chart | null = null;
  labels: string[] = [];
  data: number[] = [];

  ngOnInit(): void {
    this._heartRateService.getAllHeartRateRegisters().subscribe(
      {
        next: (heartRates: HeartRate[]) => {
          this.labels = heartRates.map((heartRate) => {
            const date = new Date(heartRate.date);
            return date.getDate().toString();
          });
          this.data = heartRates.map((heartRate) => parseInt(heartRate.avg_bpm))!;
          this._setChart();
        },
      }
    );
  }

  private _setChart(): void {
    const heartRateData = {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
          color: '#3e95cd',
          fill: true,
        },
      ],
    }
    this.chart = new Chart('chart', {
      type: 'line',

      data: heartRateData,
      options: {
        responsive: true,
      }
    });
  }
}
