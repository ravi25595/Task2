import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNestedTablesComponent } from './new-nested-tables.component';

describe('NewNestedTablesComponent', () => {
  let component: NewNestedTablesComponent;
  let fixture: ComponentFixture<NewNestedTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewNestedTablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewNestedTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
