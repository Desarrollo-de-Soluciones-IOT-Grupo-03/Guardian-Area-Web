import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { CustomSidenavComponent } from "../menu/components/custom-sidenav/custom-sidenav.component";
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '@app/features/auth/services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, RouterOutlet, CustomSidenavComponent,
    MatMenuModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  private _router = inject(Router);
  private _authService = inject(AuthService);

  public username = computed(() => this._authService.currentUserName());

  collapse = signal<boolean>(false);
  sidenavWidth = computed(() => this.collapse() ? '0px' : '250px');
  showFiller = false;

  goToDevices(): void {
    this._router.navigate(['guardian-area/devices']);
  }

  goToProfile(): void {
    this._router.navigate(['guardian-area/profile']);
  }
}
