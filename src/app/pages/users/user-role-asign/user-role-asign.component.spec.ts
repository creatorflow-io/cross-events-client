import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleAsignComponent } from './user-role-asign.component';

describe('UserRoleAsignComponent', () => {
  let component: UserRoleAsignComponent;
  let fixture: ComponentFixture<UserRoleAsignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleAsignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRoleAsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
