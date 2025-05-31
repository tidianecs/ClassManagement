import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSettingComponent } from './student-setting.component';

describe('StudentSettingComponent', () => {
  let component: StudentSettingComponent;
  let fixture: ComponentFixture<StudentSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentSettingComponent]
    });
    fixture = TestBed.createComponent(StudentSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
