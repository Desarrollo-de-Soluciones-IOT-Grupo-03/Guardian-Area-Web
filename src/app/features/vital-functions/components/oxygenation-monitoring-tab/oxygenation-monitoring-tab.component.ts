import { TableActivitiesComponent } from '@activities/components';
import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-oxygenation-monitoring-tab',
  standalone: true,
  imports: [TableActivitiesComponent],
  templateUrl: './oxygenation-monitoring-tab.component.html',
  styleUrl: './oxygenation-monitoring-tab.component.css',
})
export class OxygenationMonitoringTabComponent
  implements AfterViewInit, OnDestroy
{
  @Input({ required: true }) oxygenSaturationData: number[] = [];
  @Input({ required: true }) dates: string[] = [];
  @Input({ required: true }) chart2: Chart | null = null;

  ngAfterViewInit(): void {
    this._setChart();
  }

  ngOnDestroy(): void {
    this.chart2?.destroy();
  }

  private _setChart(): void {
    const oxygenSaturation = {
      labels: this.dates,
      datasets: [
        {
          data: this.oxygenSaturationData,
          label: 'Oxygen saturation (%)',
          color: '#3e95cd',
          fill: true,
        },
      ],
    };
    this.chart2 = new Chart('chart2', {
      type: 'line',
      data: oxygenSaturation,
      options: {
        responsive: true,
      },
    });
  }
}
