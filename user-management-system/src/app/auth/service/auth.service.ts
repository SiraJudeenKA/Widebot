import { Injectable } from '@angular/core';
import { loginDetails } from '../model';
import { credentialValue } from '../model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userCredentials: loginDetails = {
    email: 'user@mailinator.com',
    password: 'User@1234'
  };

  adminCredentials: loginDetails = {
    email: 'admin@mailinator.com',
    password: 'Admin@1234'
  }

  constructor() { }


  loginCredentialsCheck(credentialValue: loginDetails): credentialValue {
    if (JSON.stringify(credentialValue) === JSON.stringify(this.userCredentials)) {
      return {
        role: 'USER',
        credentials: true
      };
    } else if (JSON.stringify(credentialValue) === JSON.stringify(this.adminCredentials)) {
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
