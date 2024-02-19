import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryItemsMainpageComponent } from './grocery-items-mainpage.component';

describe('GroceryItemsMainpageComponent', () => {
  let component: GroceryItemsMainpageComponent;
  let fixture: ComponentFixture<GroceryItemsMainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroceryItemsMainpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroceryItemsMainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
