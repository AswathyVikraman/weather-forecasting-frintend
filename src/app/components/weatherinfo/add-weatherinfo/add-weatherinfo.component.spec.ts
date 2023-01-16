import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeatherinfoComponent } from './add-weatherinfo.component';

describe('AddWeatherinfoComponent', () => {
  let component: AddWeatherinfoComponent;
  let fixture: ComponentFixture<AddWeatherinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWeatherinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWeatherinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
