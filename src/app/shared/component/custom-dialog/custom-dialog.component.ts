import { Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogData } from '@app/shared/models/dialog-data';

@Component({
  selector: 'app-custom-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule],
  templateUrl: './custom-dialog.component.html',
  styleUrl: './custom-dialog.component.css'
})
export class CustomDialogComponent {
  public dialogRef = inject(MatDialogRef<CustomDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly title = model(this.data.title);
  readonly message = model(this.data.message);
  readonly primaryButton = model(this.data.primaryButton);
  readonly secondaryButton = model(this.data.secondaryButton);

}
