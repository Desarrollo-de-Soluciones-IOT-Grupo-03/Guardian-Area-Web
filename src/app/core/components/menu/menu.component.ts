import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
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
export class MenuComponent implements OnInit{
  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _activatedRoute = inject(ActivatedRoute);

  public username = computed(() => this._authService.username);
  private _id: string | null = null;
  collapse = signal<boolean>(false);
  sidenavWidth = computed(() => this.collapse() ? '0px' : '250px');
  showFiller = false;

  ngOnInit(): void {
    this._id = this._activatedRoute.snapshot.paramMap.get('userId')!;
  }

  goToDevices(): void {
    this._router.navigate([this._id, 'devices']);
  }

  goToProfile(): void {
    this._router.navigate([this._id, 'profile']);
  }

  logOut(): void {
    this._authService.logOut();
    this._router.navigate(['auth/sign-in']);
  }
}
