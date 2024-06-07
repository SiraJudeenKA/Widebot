import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { loginDetails } from '../model';


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should call logincredential check', () => {
    let credentialsValue: loginDetails = {
      username: 'admin',
      password: 'Admin@1234'
    };
    service.loginCredentialsCheck(credentialsValue);
    credentialsValue = {
      username: 'user',
      password: 'User@1234'
    };
    service.loginCredentialsCheck(credentialsValue);
    credentialsValue = {
      username: 'fake',
      password: 'fake@1234'
    };
    service.loginCredentialsCheck(credentialsValue);
  })
});
