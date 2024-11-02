import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-add-device',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, FormsModule,
    MatInputModule, MatFormFieldModule, ReactiveFormsModule
  ],
  templateUrl: './dialog-add-device.component.html',
  styleUrl: './dialog-add-device.component.css'
})
export class DialogAddDeviceComponent {
  public dialogRef = inject(MatDialogRef<DialogAddDeviceComponent>);
  public deviceId: string | null = null;
}
