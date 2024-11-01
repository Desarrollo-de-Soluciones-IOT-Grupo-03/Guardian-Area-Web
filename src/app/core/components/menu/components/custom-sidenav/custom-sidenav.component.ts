import { Component, computed, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem } from '../models/menu-item';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterLink],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css'
})
export class CustomSidenavComponent implements OnInit{
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _id!: string;

  sideNavCollapsed = signal<boolean>(false);
  @Input({ required: true }) set collapse(value: boolean) {
    this.sideNavCollapsed.set(value);
  }

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');

  ngOnInit(): void {
    this._id = this._activatedRoute.snapshot.paramMap.get('userId')!;
  }

  menuItem = signal<MenuItem[]>([
    {
      icon: 'images/panel-principal.svg',
      label: 'Main Panel',
      route: 'home'
    },
    {
      icon: 'images/notificacion.svg',
      label: 'Activity History',
      route: 'activity-history'
    },
    {
      icon: 'images/microfono.svg',
      label: 'Speak on Device',
      route: 'speak-on-device'
    },
    {
      icon: 'images/latidos.svg',
      label: 'Vital Functions',
      route: 'vital-functions'
    },
    {
      icon: 'images/geocerca.svg',
      label: 'Geofences',
      route: 'geofences'
    }
  ]);

  goToMenuOption(route: string): void {
    this._router.navigate([`${this._id}/${route}`]);
  }

}
