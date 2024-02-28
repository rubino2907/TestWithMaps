import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmarkerdialogComponent } from './addmarkerdialog.component';

describe('AddmarkerdialogComponent', () => {
  let component: AddmarkerdialogComponent;
  let fixture: ComponentFixture<AddmarkerdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddmarkerdialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddmarkerdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
