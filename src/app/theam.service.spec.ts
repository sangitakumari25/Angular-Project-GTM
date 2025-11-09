import { TestBed } from '@angular/core/testing';

import { TheamService } from './theam.service';

describe('TheamService', () => {
  let service: TheamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
