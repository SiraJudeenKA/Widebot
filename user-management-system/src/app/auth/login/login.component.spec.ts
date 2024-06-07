import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/material.module';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../service/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let isUser: boolean | null = false
  class MockMatSnackBar {
    open() {

    }
  }

  class MockRouter {
    navigate() {
      return 'app/user';
    }
  }

  class MockAuthService {
    loginCredentialsCheck() {
      if (isUser) {
        return {
          role: 'USER',
          credentials: true
        };
      } else if (isUser === false) {
        return {
          role: 'ADMIN',
          credentials: true
        };
      } else {
        return {
          role: 'NO ROLE',
          credentials: false
        };
      }

    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [MaterialModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        { provide: MatSnackBar, useClass: MockMatSnackBar },
        { provide: Router, useClass: MockRouter },
        { provide: AuthService, useClass: MockAuthService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be create', () => {
    component.loginFormGroup = new UntypedFormGroup({
      username: new UntypedFormControl(null, Validators.required),
      password: new UntypedFormControl(null, Validators.required)
    });
    component.onNavigate();
    isUser = false;
    component.loginFormGroup = new UntypedFormGroup({
      username: new UntypedFormControl('Harrry', Validators.required),
      password: new UntypedFormControl('Potter', Validators.required)
    });
    component.onNavigate();
    isUser = true;
    component.loginFormGroup = new UntypedFormGroup({
      username: new UntypedFormControl('Harrry', Validators.required),
      password: new UntypedFormControl('Potter', Validators.required)
    });
    component.onNavigate();
    isUser = null;
    component.loginFormGroup = new UntypedFormGroup({
      username: new UntypedFormControl('Harrry', Validators.required),
      password: new UntypedFormControl('Potter', Validators.required)
    });
    component.onNavigate();
  })
});
