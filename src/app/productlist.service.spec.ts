import { TestBed } from '@angular/core/testing';

import { ProductlistService } from './productlist.service';

describe('ProductlistService', () => {
  let service: ProductlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
