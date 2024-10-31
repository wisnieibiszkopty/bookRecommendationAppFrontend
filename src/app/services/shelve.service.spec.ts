import { TestBed } from '@angular/core/testing';

import { ShelveService } from './shelve.service';

describe('ShelveService', () => {
  let service: ShelveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShelveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
