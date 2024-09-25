import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-form-plans',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './form-plans.component.html',
  styleUrl: './form-plans.component.css'
})
export class FormPlansComponent {

}
