/**
 * component used for the user profile.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { userDetails } from 'src/app/shared/model';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  /**
   * Variable used to hide the edit button for admin
   */
  toHideEdit: boolean = false;
  /**
   * Variable used to load the animation variable
   */
  isLoader: boolean = false;
  /**
   * Variable used to store the user details
   */
  userDetails!: userDetails;
  /**
   * Variable used to store the subscription object
   */
  subscriptionObject: Subscription = new Subscription();
  /**
   * Constructor has the inject service to use in this component
   * @param userService has access the user service
   * @param route has the route to get the current route
   */
  constructor(public userService: UsersService,
    private route: ActivatedRoute, private router: Router) {
    this.userDetails = {
      id: null,
      firstName: 'Harry',
      lastName: 'Potter',
      email: 'Harry@mailinator.com',
      address: '54, Griffindor house, Hogwards, London -64302',
      profileUrl: './assets/avatar.png'
    };
  }
  /**
   * OnInit life cycle hooks
   */
  ngOnInit(): void {
    this.isLoader = true;
    this.subscriptionObject.add(this.route.queryParams.subscribe((resp: Params) => {
      if (resp && resp.hasOwnProperty('fromAdmin')) {
        this.toHideEdit = true;
      }
      this.userDetails.firstName = this.userService?.editUserDetails?.firstName ? this.userService?.editUserDetails?.firstName : 'Harry';
      this.userDetails.lastName = this.userService?.editUserDetails?.lastName ? this.userService?.editUserDetails?.lastName : 'Potter';
      this.userDetails.email = this.userService?.editUserDetails?.email ? this.userService?.editUserDetails?.email : 'harry@mailinator.com';
      this.userDetails.address = this.userService?.editUserDetails?.address ? this.userService?.editUserDetails?.address : '54, Griffindor house, Hogwards, London -64302';
      this.userDetails.profileUrl = this.userService?.editUserDetails?.profileUrl ? this.userService?.editUserDetails?.profileUrl : './assets/avatar.png';
      this.isLoader = false;
    }));
  }

  toNavigateToedit(): void {
    if (this.toHideEdit) {
      this.router.navigate(['/app/admin/'])
    } else {
      this.userService.editUserDetails = this.userDetails;
      this.router.navigate(['/app/add'], { queryParams: { fromuser: true } });
    }
  }
  /**
   * OnDestroy life cycle hook
   */
  ngOnDestroy(): void {
    if (this.toHideEdit)
      this.userService.editUserDetails = null;
    this.subscriptionObject.unsubscribe();
  }
}
