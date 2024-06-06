import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonDialogComponent } from 'src/app/shared/components/common-dialog/common-dialog.component';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {

  /**
   * Used for the user form group variable
   */
  userFormGroup!: UntypedFormGroup;
  /**
   * used to store the default avatar
   */
  emptyUrl: string = './assets/avatar.png';

  subscriptionObject: Subscription = new Subscription();

  constructor(public userService: UsersService, private router: Router, private matDialog: MatDialog) { }

  /**
   * Life cycle hook
   */
  ngOnInit() {
    this.userFormGroup = new UntypedFormGroup({
      firstName: new UntypedFormControl(null, [Validators.required, Validators.maxLength(25)]),
      lastName: new UntypedFormControl(null, [Validators.required, Validators.maxLength(25)]),
      email: new UntypedFormControl(null, [Validators.required, Validators.email]),
      profileUrl: new UntypedFormControl(null),
      address: new UntypedFormControl(null),
    });

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
        width: '250px',
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
          this.router.navigate(['/app/admin/'])
        }
      }));
    }
  }

  onSave() {

  }

}
