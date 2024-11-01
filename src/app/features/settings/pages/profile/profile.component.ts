import { Component } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  public user: User = {
    name: 'Niki Espinoza',
    email: 'niki@gmail.com',
    names: 'Niki',
    lastname: 'Espinoza',
    address: 'Av. Los Pinos 123',
  };

}
