import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlansComponent } from './form-plans.component';

describe('FormPlansComponent', () => {
  let component: FormPlansComponent;
  let fixture: ComponentFixture<FormPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPlansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
