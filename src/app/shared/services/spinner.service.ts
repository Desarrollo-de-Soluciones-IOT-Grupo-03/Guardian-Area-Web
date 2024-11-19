import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private subject = new Subject<boolean>();

  showSpinner(): void {
    this.subject.next(true);
  }

  hiddenSpinner(): void {
    this.subject.next(false);
  }

  onObservable(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
