import { Component, inject, OnInit } from '@angular/core';
import { OxygenSaturationService } from '../../services/oxygen-saturation.service';
import { OxygenSaturation } from '../../models/oxygen-saturation';
import { TableActivitiesComponent } from '@app/features/activities/components/table-activities/table-activities.component';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-oxygenation-monitoring-tab',
  standalone: true,
  imports: [TableActivitiesComponent],
  templateUrl: './oxygenation-monitoring-tab.component.html',
  styleUrl: './oxygenation-monitoring-tab.component.css'
})
export class OxygenationMonitoringTabComponent implements OnInit {
  private _service: OxygenSaturationService = inject(OxygenSaturationService);

  chart: Chart | null = null;
  labels: string[] = [];
  data: number[] = [];

  ngOnInit(): void {
    this._service.getAllOxygenSaturationRegisters().subscribe(
      {
        next: (oxygenSaturation: OxygenSaturation[]) => {
          this.labels = oxygenSaturation.map((oxygenSaturation) => {
            const date = new Date(oxygenSaturation.date);
            return date.getDate().toString();
          });
          this.data = oxygenSaturation.map((oxygenSaturation) => parseInt(oxygenSaturation.avg_SpO2))!;
          this._setChart();
        },
      }
    );
  }

  private _setChart(): void {
    const oxygenSaturation = {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
          color: '#3e95cd',
          fill: true,
        },
      ],
    }
    this.chart = new Chart('chartOxygen', {
      type: 'line',
      data: oxygenSaturation,
      options: {
        responsive: true,
      }
    });
  }
}
