import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { Device } from '@devices/models';

@Component({
  selector: 'app-dialog-edit-device',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSelectModule,
  ],
  templateUrl: './dialog-edit-device.component.html',
  styleUrl: './dialog-edit-device.component.css',
})
export class DialogEditDeviceComponent implements OnInit {
  public dialogRef = inject(MatDialogRef<DialogEditDeviceComponent>);

  private _fb = inject(FormBuilder);

  device: Device = inject(MAT_DIALOG_DATA);

  form = this._fb.group({
    deviceNickname: new FormControl<string>('', Validators.required),
    deviceCareModes: new FormControl<string>('INFANT', Validators.required),
    deviceStatuses: new FormControl<string>('CONNECTED', Validators.required),
  });

  ngOnInit(): void {
    this.form.controls.deviceNickname.setValue(this.device.nickname);
    this.form.controls.deviceCareModes.setValue(this.device.careMode);
    this.form.controls.deviceStatuses.setValue(this.device.status);
  }

  closeDialog(): void {
    this.dialogRef.close(this.form.getRawValue());
  }
}
