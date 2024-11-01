import { Component } from '@angular/core';
import { HeartRateMonitoringTabComponent } from "../../components/heart-rate-monitoring-tab/heart-rate-monitoring-tab.component";
import { OxygenationMonitoringTabComponent } from "../../components/oxygenation-monitoring-tab/oxygenation-monitoring-tab.component";
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-vital-functions',
  standalone: true,
  imports: [HeartRateMonitoringTabComponent, OxygenationMonitoringTabComponent, MatTabsModule],
  templateUrl: './vital-functions.component.html',
  styleUrl: './vital-functions.component.css'
})
export class VitalFunctionsComponent {

}
