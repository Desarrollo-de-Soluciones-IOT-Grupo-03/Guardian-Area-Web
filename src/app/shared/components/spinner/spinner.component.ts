import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '@app/shared/services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent implements OnInit {
  showSpinner: boolean = false;
  spinnerSubscription!: Subscription;
  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.spinnerSubscription = this.spinnerService.onObservable().subscribe(viewSpinner => {
      this.showSpinner = viewSpinner;
    });
  }

  ngOnDestroy(): void {
    this.spinnerSubscription.unsubscribe();
  }
}
