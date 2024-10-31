import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecommendationComponent } from './create-recommendation.component';

describe('CreateRecommendationComponent', () => {
  let component: CreateRecommendationComponent;
  let fixture: ComponentFixture<CreateRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRecommendationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
