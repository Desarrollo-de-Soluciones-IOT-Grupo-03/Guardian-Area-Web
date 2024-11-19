import { Component, inject, OnInit } from '@angular/core';
import { SpinnerService } from '@shared/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent implements OnInit {
  private _spinnerService = inject(SpinnerService);
  showSpinner: boolean = false;
  spinnerSubscription!: Subscription;

  ngOnInit(): void {
    this.spinnerSubscription = this._spinnerService
      .onObservable()
      .subscribe((viewSpinner) => {
        this.showSpinner = viewSpinner;
      });
  }

  ngOnDestroy(): void {
    this.spinnerSubscription.unsubscribe();
  }
}
