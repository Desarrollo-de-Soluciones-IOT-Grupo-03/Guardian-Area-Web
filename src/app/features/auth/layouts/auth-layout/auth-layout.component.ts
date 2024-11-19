import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from '@shared/components';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
})
export class AuthLayoutComponent {}
