import { TestBed } from '@angular/core/testing';

import { MassageService } from './massage.service';

describe('MassageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MassageService = TestBed.get(MassageService);
    expect(service).toBeTruthy();
  });
});
