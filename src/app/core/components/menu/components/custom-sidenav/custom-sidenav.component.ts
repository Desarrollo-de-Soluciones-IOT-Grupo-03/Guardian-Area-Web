import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MenuItem } from '../../models/menu-item';
import { AuthService } from '@auth/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceService, SocketService } from '@devices/services';
@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css',
})
export class CustomSidenavComponent implements OnInit {
  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _matSnackBar = inject(MatSnackBar);
  private _socketService = inject(SocketService);
  private _deviceService = inject(DeviceService);
  private _snackBar = inject(MatSnackBar);

  bpm: number = 0;
  spo2: number = 0;

  ngOnInit(): void {
    this._socketService.getSensorsData(this._deviceService.apiKey!).subscribe({
      next: (data) => {
        this.bpm = data.bpm;
        this.spo2 = data.spo2;
      },
      error: (error) => {
        this._snackBar.open('There are some problems', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }

  sideNavCollapsed = signal<boolean>(false);
  @Input({ required: true }) set collapse(value: boolean) {
    this.sideNavCollapsed.set(value);
  }

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'));

  menuItem = signal<MenuItem[]>([
    {
      icon: 'images/panel-principal.svg',
      label: 'Main Panel',
      route: 'home',
    },
    {
      icon: 'images/notification.svg',
      label: 'Activity Hiistory',
      route: 'activity-history',
    },
    {
      icon: 'images/microfono.svg',
      label: 'Speak on Device',
      route: 'speak-device',
    },
    {
      icon: 'images/latidos.svg',
      label: 'Vital Functions',
      route: 'vital-functions',
    },
    {
      icon: 'images/geocerca.svg',
      label: 'Geofences',
      route: 'geofences',
    },
  ]);

  goToMenuOption(route: string): void {
    if (this._authService.devideRecordId) {
      this._router.navigate([`${route}`]);
    } else {
      this._matSnackBar.open('You must select a device to continue', 'Close', {
        duration: 5000,
      });
    }
  }
}
