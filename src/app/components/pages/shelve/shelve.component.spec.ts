import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelveComponent } from './shelve.component';

describe('ShelveComponent', () => {
  let component: ShelveComponent;
  let fixture: ComponentFixture<ShelveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShelveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShelveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
