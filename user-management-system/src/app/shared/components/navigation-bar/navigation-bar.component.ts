import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { localization } from '../../model';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  /**
   * used to handle the loader
   */
  isLoader: boolean = true;
  /**
   * Used to store the subscription and undestroy it avoid memory leakage
   */
  subscriptionObject: Subscription = new Subscription();
  /**
   * Used to store the initial language code;
   */
  initialLanguageCode: string = 'en'

  constructor(private router: Router, private userService: UsersService) { }

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
    this.subscriptionObject.add(this.userService.onTranslateValue().subscribe((res: localization) => {
      this.userService.currentlocalizationDetails = res[this.initialLanguageCode === 'en' ? 'en' : 'arab'];
      console.log(this.userService.currentlocalizationDetails);
      this.isLoader = false;
    }));
  }

  /**
   * Method used to navigate to sign in
   */
  onLogout(): void {
    this.router.navigate([''])
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
   * On destroy life cycle hook
   */
  ngOnDestroy(): void {
    this.subscriptionObject.unsubscribe();
  }
}
