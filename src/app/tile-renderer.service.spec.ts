import { TestBed } from '@angular/core/testing';

import { TileRendererService } from './tile-renderer.service';

describe('TileRendererService', () => {
  let service: TileRendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TileRendererService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
