import { Component, computed, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem } from '../models/menu-item';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterLink],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css'
})
export class CustomSidenavComponent {
  sideNavCollapsed = signal<boolean>(false);
  @Input({ required: true }) set collapse(value: boolean) {
    this.sideNavCollapsed.set(value);
  }

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');

  menuItem = signal<MenuItem[]>([
    {
      icon: 'images/panel-principal.svg',
      label: 'Panel Principal',
      route: '/guardian-area/home'
    },
    {
      icon: 'images/notificacion.svg',
      label: 'Historial de Actividades',
      route: '/guardian-area/activity-history'
    },
    {
      icon: 'images/microfono.svg',
      label: 'Hablar con el Dispositivo',
      route: '/talk'
    },
    {
      icon: 'images/latidos.svg',
      label: 'Funciones Vitales',
      route: '/vital-signs'
    },
    {
      icon: 'images/geocerca.svg',
      label: 'Geocercas',
      route: '/geofences'
    }
  ]);

}
