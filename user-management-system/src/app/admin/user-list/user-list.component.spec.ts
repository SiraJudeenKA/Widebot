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
import { Router } from '@angular/router';

interface userList {
  userList: string
};
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
    return of({})
  }
  currentlocalizationDetails: userList = {
    userList: "User List",
  }
}

class MockMatSnackBar {

}

class MockMatDialog {

}



fdescribe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService = new MockUserService();
  let router: Router;
  beforeEach(async () => {
    // const userServiceSpy = jasmine.createSpyObj('UserService', ['editUserDetails']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: UsersService, useClass: MockUserService },
        { provide: MatSnackBar, useClass: MockMatSnackBar },
        { provide: MatDialog, useClass: MockMatDialog },
        // { provide: Router, userValue: routerSpy }


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
    expect(router.navigate).toHaveBeenCalledWith(['/app/add']);
  });

  it('Should call a toNavigate profile', () => {
    spyOn(component, 'toNavigateProfile');
    spyOn(router, 'navigate');
    let details: userDetails = {
      id: 2,
      firstName: 'Sample first name',
      lastName: 'Sample last name',
      email: 'test@mailinator.com',
      address: 'Sample address',
      profileUrl: './assets/avatar1.png'
    }
    component.toNavigateProfile(details);
    expect(details.profileUrl).toBe('./assets/avatar.png');
    expect(router.navigate).toHaveBeenCalledWith(['/app/user'], { queryParams: { fromAdmin: true } });
  });

});
