import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizacaobycityComponent } from './localizacaobycity.component';

describe('LocalizacaobycityComponent', () => {
  let component: LocalizacaobycityComponent;
  let fixture: ComponentFixture<LocalizacaobycityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalizacaobycityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocalizacaobycityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
