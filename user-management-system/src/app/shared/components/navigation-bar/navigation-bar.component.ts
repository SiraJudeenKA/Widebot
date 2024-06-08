/**
 * Component used for the navigation bar
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { localization } from '../../model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  /**
   * Variable used to handle the loader
   */
  isLoader: boolean = true;
  /**
   * Variable used to handle the nav loader
   */
  isNavLoader: boolean = false
  /**
   * Variable used to store the subscription and undestroy it avoid memory leakage
   */
  subscriptionObject: Subscription = new Subscription();
  /**
   * Variable used to store the initial language code;
   */
  initialLanguageCode: string = 'en'
  /**
   * Constructor used to inject the service and used it in components
   * @param router has to navigate to login component
   * @param userService has the access the methods in user service
   * @param snackBar has display message in snackbar
   */
  constructor(private router: Router,
    public userService: UsersService, private snackBar: MatSnackBar) { }

  /**
   * Oninit life cycle hooks
   */
  ngOnInit(): void {
    this.translateValue();
  }

  /**
   * Method used to translate the language
   */
  translateValue(): void {
    this.subscriptionObject.add(this.userService.onTranslateValue().subscribe({
      next: (res: localization) => {
        this.userService.currentlocalizationDetails = res[this.initialLanguageCode === 'en' ? 'en' : 'arab'];
        this.isLoader = false;
        this.isNavLoader = true
      },
      error: (e) => {
        this.snackBar.open('Failed to fetch the localization details, please try again', 'Okay');
        this.onLogout();
      }
    }));
  }

  /**
   * Method used to navigate to sign in
   */
  onLogout(): void {
    this.router.navigate(['']);
  }
  /**
   * Method used to translate the language.
   * @param languageCode has the language code
   */
  onTranslate(languageCode: string): void {
    this.isLoader = true;
    this.initialLanguageCode = languageCode === 'en' ? 'arab' : 'en';
    this.translateValue();
  }
  /**
   * Method used to navigate to user or admin home page
   */
  onNavigateToHome(): void {
    if (this.userService?.currentUserDetails?.role === 'USER') {
      this.router.navigate(['/app/user']);
    } else {
      this.router.navigate(['/app/admin']);
    }
  }
  /**
   * On destroy life cycle hook
   */
  ngOnDestroy(): void {
    this.subscriptionObject.unsubscribe();
    this.userService.editUserDetails = null;
    this.userService.userListDetails.next([]);
    this.userService.userDetailsData = [];
    this.userService.currentUserDetails = null;
  }
}
