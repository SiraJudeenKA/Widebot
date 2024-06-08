/**
 * Login component used to login to user or admin components
 */
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthConstant } from '../constant/auth.constant';
import { AuthService } from '../service/auth.service';
import { credentialValue } from '../model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AuthConstant implements OnInit {

  /**
   * Variable used to declare the form group for the login page
   */
  loginFormGroup!: UntypedFormGroup;
  /**
   * Variable used to hide and unhide the password text
   */
  hide: boolean = true;
  /**
   * Constructor used to inject the service
   * @param authService used to check the email and password is correct
   * @param userService used to store the current role details
   * @param snackBar used to show the message.
   * @param router used for navigation.
   */
  constructor(private authService: AuthService, private userService: UsersService,
    private snackBar: MatSnackBar, private router: Router) {
    super()
  }

  /**
   * On init life cycle hook
   */
  ngOnInit(): void {
    this.loginFormGroup = new UntypedFormGroup({
      username: new UntypedFormControl(null, Validators.required),
      password: new UntypedFormControl(null, Validators.required)
    });
  }
  /**
   * Method used to check the credentials and navigate to the prespective pages.
   */
  onNavigate(): void {
    if (this.loginFormGroup?.valid && this.loginFormGroup?.value) {
      const correctCredentials: credentialValue = this.authService.loginCredentialsCheck(this.loginFormGroup.value);
      if (correctCredentials?.credentials) {
        if (correctCredentials?.role === 'USER') {
          this.router.navigate(['/app/user']);
        } else {
          this.router.navigate(['/app/admin']);
        }
        this.userService.currentUserDetails = correctCredentials;
      } else {
        this.snackBar.open(this.warningMessage?.incorrectField, 'Okay');
      }
    } else {
      this.snackBar.open(this.warningMessage?.validField, 'Okay');
    }
  }

}
