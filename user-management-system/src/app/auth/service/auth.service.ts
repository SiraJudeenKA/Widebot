/**
 * login service used to check the credentials
 */
import { Injectable } from '@angular/core';
import { loginDetails } from '../model';
import { credentialValue } from '../model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * Object used to check the user credentials;
   */
  userCredentials: loginDetails = {
    username: 'user',
    password: 'User@1234'
  };
  /**
   * Object used to check the admin credentials
   */
  adminCredentials: loginDetails = {
    username: 'admin',
    password: 'Admin@1234'
  };

  /**
   * Method used to check the login credentials with admin and user
   * @param credentialValue has the credential value of login
   * @returns reponse of access role and correct credentials
   */
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
