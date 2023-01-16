import { TestBed } from '@angular/core/testing';

import { WeatherinfonewService } from './weatherinfonew.service';

describe('WeatherinfonewService', () => {
  let service: WeatherinfonewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherinfonewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
