import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { UsersService } from 'src/app/shared/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, of } from 'rxjs';
import { userDetails } from 'src/app/shared/model';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { CommonDialogComponent } from 'src/app/shared/components/common-dialog/common-dialog.component';

interface userList {
  userList: string
};
let errorDialog: boolean = false, errorDelete: boolean = false;
class MockUserService {
  userListDetails = new BehaviorSubject<userDetails[]>([
    {
      id: null,
      firstName: 'Sample first name',
      lastName: 'Sample last name',
      email: 'test@mailinator.com',
      address: 'Sample address',
      profileUrl: 'sample url'
    }
  ]);

  onDeleteUserData() {
    if (!errorDelete) {
      return of({});
    } else {
      throw new Error();
    }
  }
  currentlocalizationDetails: userList = {
    userList: "User List",
  }
}

class MockMatSnackBar {
  open() {

  }
}

class MockMatDialog {
  open() {
    if (!errorDialog) {
      return {
        afterClosed: () => of(true)
      };
    } else {
      return {
        afterClosed: () => of(null)
      };
    }

  }
}

class MockRouter {
  navigate() {
    return 'app/add';
  }
}


describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService = new MockUserService();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent, CommonDialogComponent],
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule, RouterModule],
      providers: [
        { provide: UsersService, useClass: MockUserService },
        { provide: MatSnackBar, useClass: MockMatSnackBar },
        { provide: MatDialog, useClass: MockMatDialog },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    // userService = fixture.debugElement.injector.get(userService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call on userlist details else', () => {
    component.userService.userListDetails.next([]);
    component.ngOnInit()
  });

  it('Should call on userlist details error', () => {
    component.userService.userListDetails.error('error');
    component.ngOnInit()
  });

  it('Should call on search text', () => {
    const mockEvent = {
      target: {
        value: 'test filter'
      }
    } as any;
    component.searchText(mockEvent as Event);
  });

  it('Should call a createUser', () => {
    component.onCreateUser();
  });

  it('Should call a toNavigate profile', () => {
    let details: userDetails = {
      id: 2,
      firstName: 'Sample first name',
      lastName: 'Sample last name',
      email: 'test@mailinator.com',
      address: 'Sample address',
      profileUrl: './assets/avatar1.png'
    };
    component.toNavigateProfile(details);
    details = {
      id: 2,
      firstName: 'Sample first name',
      lastName: 'Sample last name',
      email: 'test@mailinator.com',
      address: 'Sample address',
      profileUrl: './assets/avata.png'
    };
    component.toNavigateProfile(details);
  });

  it('Should call a toNavigateAddEditPage', () => {
    let details: userDetails = {
      id: 2,
      firstName: 'Sample first name',
      lastName: 'Sample last name',
      email: 'test@mailinator.com',
      address: 'Sample address',
      profileUrl: './assets/avatar1.png'
    };
    component.toNavigateAddEditPage(details, 1);
  });

  it('Should call a toDeleteUser', () => {
    errorDialog = false;
    errorDelete = false;
    let details: userDetails = {
      id: 2,
      firstName: 'Sample first name',
      lastName: 'Sample last name',
      email: 'test@mailinator.com',
      address: 'Sample address',
      profileUrl: './assets/avatar1.png'
    };
    component.toDeleteUser(1, details);
  });

  it('Should call a toDeleteUser else ', () => {
    errorDelete = true;
    let details: userDetails = {
      id: 2,
      firstName: 'Sample first name',
      lastName: 'Sample last name',
      email: 'test@mailinator.com',
      address: 'Sample address',
      profileUrl: './assets/avatar1.png'
    };
    component.toDeleteUser(1, details);
  });
});
