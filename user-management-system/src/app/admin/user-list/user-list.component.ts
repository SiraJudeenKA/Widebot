/**
 * Component for the user list
 */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/shared/services/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { userDetails } from 'src/app/shared/model';
import { Subscription, filter, mergeMap, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from 'src/app/shared/components/common-dialog/common-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  /**
   * Variable used for display the column
   */
  displayedColumns!: string[];
  /**
   * Variable used to store the user details and display in table
   */
  tableDataSource!: MatTableDataSource<any>
  /**
   * View children of mat pagination.
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  /**
   * Variable used to store the subscribe variable.
   */
  subscriptionObject: Subscription = new Subscription();
  /**
   * variable used to load the animation untill the details get fetched
   */
  isLoader: boolean = false;

  /**
   * Constructor used for to inject the service
   * @param userService used the for access the method ins user service,
   * @param router used to router to navigate the page.
   * @param matSnackBar used to display the message.
   * @param matDialog used to display the dialog message.
   */
  constructor(public userService: UsersService,
    private router: Router, private matSnackBar: MatSnackBar, private matDialog: MatDialog) { }

  /**
   * Oninit life cycle hook
   */
  ngOnInit(): void {
    this.isLoader = true;
    this.userService.userDetailsData = [];
    this.subscriptionObject.add(this.userService.userListDetails.subscribe({
      next: (res: userDetails[]) => {
        if (res?.length > 0) {
          this.tableDataSource = new MatTableDataSource(res);
          this.tableDataSource.paginator = this.paginator;
          this.userService.userDetailsData = res;
          this.isLoader = false;
        } else {
          this.isLoader = false;
          this.userService.userDetailsData = [];
        }
      },
      error: (e) => {
        this.matSnackBar.open(this.userService?.currentlocalizationDetails?.someThingWrong,
          this.userService?.currentlocalizationDetails?.okay);
        this.isLoader = false;
        this.userService.userDetailsData = [];
      }
    }));
    this.displayedColumns = ['profileUrl', 'firstName', 'lastName', 'email', 'address', 'actions'];
  }

  /**
   * after init life cycle hook
   */
  ngAfterViewInit(): void {
    if (this.userService?.userDetailsData?.length > 0)
      this.tableDataSource.paginator = this.paginator;
  }

  /**
   * Method used to search functionality
   * @param event has the event of keyup value
   */
  searchText(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.userService?.userDetailsData?.length > 0) {
      this.tableDataSource.filter = filterValue.trim().toLowerCase();

      if (this.tableDataSource.paginator) {
        this.tableDataSource.paginator.firstPage();
      }
    }
  }
  /**
   * Method used to navigate for create user component
   */
  onCreateUser(): void {
    this.router.navigate(['/app/add']);
  }
  /**
   * Method used to navigate to profile
   * @param details has the details of user.
   */
  toNavigateProfile(details: userDetails): void {
    details.profileUrl = details?.profileUrl === './assets/avatar1.png' ? './assets/avatar.png' : details?.profileUrl;
    this.userService.editUserDetails = details;
    this.router.navigate(['app/user'], { queryParams: { fromAdmin: true } });
  }
  /**
   * Method used to navigate to add edit page for users
   * @param details has the details of user data
   * @param index has the index of user details array
   */
  toNavigateAddEditPage(details: userDetails, index: number): void {
    details.id = index; /**Mocking the index value for fake api */
    this.userService.editUserDetails = details;
    this.router.navigate(['/app/add/', index])
  }
  /**
   * Method used to delete the data from the array list
   * @param index has the index of array
   * @param details has the details of user value.
   */
  toDeleteUser(index: number, details: userDetails): void {
    const dialog = this.matDialog.open(CommonDialogComponent, {
      width: '250px',
      disableClose: true,
      data: {
        heading: this.userService.currentlocalizationDetails.dialogHeading,
        description: this.userService.currentlocalizationDetails.deleteDialogDescription,
        no: this.userService.currentlocalizationDetails.no,
        yes: this.userService.currentlocalizationDetails.yes
      }
    });
    this.subscriptionObject.add(dialog.afterClosed().pipe(filter((res: boolean) => {
      return res;
    }), mergeMap((res: boolean) => {
      if (res) {
        this.isLoader = true;
        return this.userService.onDeleteUserData(details?.id);
      } else {
        return of(null);
      }
    })).subscribe({
      next: (res: userDetails | null) => {
        if (res && this.userService?.userDetailsData?.length > 0) {
          this.userService.userDetailsData.splice(index, 1);
          this.userService.userListDetails.next(this.userService.userDetailsData);
        }
        this.isLoader = false;
        this.matSnackBar.open(this.userService?.currentlocalizationDetails?.deleteSuccess, this.userService?.currentlocalizationDetails?.okay);
      },
      error: (e) => this.matSnackBar.open(this.userService?.currentlocalizationDetails?.deleteDetails, this.userService?.currentlocalizationDetails?.okay)
    }));
  }
  /**
   * OnDestroy life cycle hooks
   */
  ngOnDestroy(): void {
    this.subscriptionObject.unsubscribe();
  }
}
