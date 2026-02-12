import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatorComponent } from './regulator.component';

describe('RegulatorComponent', () => {
  let component: RegulatorComponent;
  let fixture: ComponentFixture<RegulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegulatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
