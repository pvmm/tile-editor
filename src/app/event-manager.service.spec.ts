import { TestBed } from '@angular/core/testing';

import { EventManagerService } from './event-manager.service';

describe('EventManagerService', () => {
  let service: EventManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
