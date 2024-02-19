import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartdetailsComponent } from './cartdetails.component';

describe('CartdetailsComponent', () => {
  let component: CartdetailsComponent;
  let fixture: ComponentFixture<CartdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
