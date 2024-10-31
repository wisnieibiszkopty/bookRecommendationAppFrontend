import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecommendationComponent } from './edit-recommendation.component';

describe('EditRecommendationComponent', () => {
  let component: EditRecommendationComponent;
  let fixture: ComponentFixture<EditRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRecommendationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
