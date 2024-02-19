import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryItemsSidebarComponent } from './grocery-items-sidebar.component';

describe('GroceryItemsSidebarComponent', () => {
  let component: GroceryItemsSidebarComponent;
  let fixture: ComponentFixture<GroceryItemsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroceryItemsSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroceryItemsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
