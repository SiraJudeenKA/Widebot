/**
 * Component used to add and edit the user details.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CommonDialogComponent } from 'src/app/shared/components/common-dialog/common-dialog.component';
import { UsersService } from '../../services/users.service';
import { userDetails } from '../../model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit, OnDestroy {

  /**
   * Variable used for the user form group variable.
   */
  userFormGroup!: UntypedFormGroup;
  /**
   * Variable used to store the default avatar.
   */
  emptyUrl!: string | null;
  /**
   * Variable used to subscription object.
   */
  subscriptionObject: Subscription = new Subscription();
  /**
   * Variable used to load the animation untill the save get load
   */
  isLoader: boolean = false;
  /**
   * Variable used to navigate back to admin or users.
   */
  toNavigeBackForAdmin: boolean = true;
  /**
   * Constructor used to inject the service to use in this component
   * @param userService has the userservice to access method is user service
   * @param router has the router to navigate another component
   * @param matDialog has display the dialog.
   * @param matSnackBar has display the snackbar message
   * @param route has get the activated route.
   */
  constructor(public userService: UsersService, private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog, private matSnackBar: MatSnackBar) { }

  /**
   * Life cycle hook
   */
  ngOnInit() {
    this.isLoader = true;
    this.subscriptionObject.add(this.route.queryParams.subscribe((resp: Params) => {
      if (resp && resp.hasOwnProperty('fromuser')) {
        this.toNavigeBackForAdmin = false;
      }
      this.emptyUrl = this.userService?.editUserDetails?.profileUrl ?
        this.userService?.editUserDetails?.profileUrl === './assets/avatar.png' ? './assets/avatar.png' : this.userService?.editUserDetails?.profileUrl : './assets/avatar.png';
      this.userFormGroup = new UntypedFormGroup({
        id: new UntypedFormControl(this.userService?.editUserDetails?.id || this.userService?.editUserDetails?.id === 0 ?
          this.userService?.editUserDetails?.id : null),
        firstName: new UntypedFormControl(this.userService?.editUserDetails?.firstName ?
          this.userService?.editUserDetails?.firstName : null, [Validators.required, Validators.maxLength(25)]),
        lastName: new UntypedFormControl(this.userService?.editUserDetails?.lastName ?
          this.userService?.editUserDetails?.lastName : null, [Validators.required, Validators.maxLength(25)]),
        email: new UntypedFormControl(this.userService?.editUserDetails?.email ?
          this.userService?.editUserDetails?.email : null, [Validators.required, Validators.email]),
        profileUrl: new UntypedFormControl(this.userService?.editUserDetails?.profileUrl ?
          this.userService?.editUserDetails?.profileUrl === './assets/avatar.png' ? null : this.userService?.editUserDetails?.profileUrl : null),
        address: new UntypedFormControl(this.userService?.editUserDetails?.address ?
          this.userService?.editUserDetails?.address : null, [Validators.required, Validators.maxLength(150)]),
      });
      this.isLoader = false;
    }));
  }

  /**
   * Method used to verify the url.
   */
  checkProfileUrl(): void {
    const url = String(this.userFormGroup?.get('profileUrl')?.value ? this.userFormGroup?.get('profileUrl')?.value : '').trim();
    this.emptyUrl = url ? url : './assets/avatar.png'
    this.userFormGroup.get('profileUrl')?.setValue(url ? url : null);
  }
  /**
   * Method used to navigate back to user list page.
   */
  onNavigateBack(): void {
    if (this.userFormGroup?.dirty) {
      const dialog = this.matDialog.open(CommonDialogComponent, {
        width: '350px',
        disableClose: true,
        data: {
          heading: this.userService.currentlocalizationDetails.dialogHeading,
          description: this.userService.currentlocalizationDetails.dialogHeadingDescription,
          no: this.userService.currentlocalizationDetails.no,
          yes: this.userService.currentlocalizationDetails.yes
        }
      });
      this.subscriptionObject.add(dialog.afterClosed().subscribe((res: boolean) => {
        if (res) {
          this.toRouteNavigation();
        }
      }));
    } else {
      this.toRouteNavigation();
    }
  }
  /**
   * Method used to navigation back to admin and user.
   */
  toRouteNavigation(): void {
    if (this.toNavigeBackForAdmin) {
      this.router.navigate(['/app/admin/']);
    } else {
      this.router.navigate(['/app/user/']);
    }
  }

  /**
   * Method used to save the user details.
   */
  onSave(): void {
    if (this.userFormGroup.valid && this.userFormGroup.dirty) {
      this.isLoader = true;
      this.userFormGroup.get('profileUrl')?.setValue(this.emptyUrl);
      let methodName: Observable<userDetails>;
      if (this.userFormGroup.get('id')?.value) {
        methodName = this.userService.onUpdateUserData(this.userFormGroup.get('id')?.value, this.userFormGroup.value)
      } else {
        methodName = this.userService.onSaveUserData(this.userFormGroup.value);
      }
      this.toSaveUserDetails(methodName, this.userFormGroup.get('id')?.value);
    } else {
      this.matSnackBar.open(this.userService?.currentlocalizationDetails?.invalidDetails
        , this.userService?.currentlocalizationDetails?.okay);
    }
  }
  /**
   * Method used to save the user details by fake api call
   * @param methodName has the methodname of update or post.
   * @param index has the index of user details
   */
  toSaveUserDetails(methodName: Observable<userDetails>, index: number): void {
    this.subscriptionObject.add(methodName.subscribe({
      next: ((res: userDetails) => {
        if (res) {
          if (this.toNavigeBackForAdmin) {
            if (index !== null) {
              this.userService.userDetailsData.splice(index, 1);
            }
            this.userService.userDetailsData.push(res);
            this.userService.userListDetails.next(this.userService.userDetailsData);
            this.router.navigate(['/app/admin']);
          } else {
            this.userService.editUserDetails = res;
            this.router.navigate(['/app/user']);
          }
          this.matSnackBar.open(this.userService?.currentlocalizationDetails?.savedDetails,
            this.userService?.currentlocalizationDetails?.okay
          );
          this.isLoader = false;
        }
      }),
      error: (e) => {
        this.isLoader = false;
        this.matSnackBar.open(this.userService?.currentlocalizationDetails?.failedTosave,
          this.userService?.currentlocalizationDetails?.okay)
      }
    }));
  }
  /**
   * OnDestroy life cycle hook
   */
  ngOnDestroy(): void {
    if (this.toNavigeBackForAdmin)
      this.userService.editUserDetails = null;
    this.subscriptionObject.unsubscribe();
  }

}
