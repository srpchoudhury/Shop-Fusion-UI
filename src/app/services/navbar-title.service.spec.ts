import { TestBed } from '@angular/core/testing';

import { NavbarTitleService } from './navbar-title.service';

describe('NavbarTitleService', () => {
  let service: NavbarTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
