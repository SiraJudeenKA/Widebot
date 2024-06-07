import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUserComponent } from './add-edit-user.component';
import { ReactiveFormsModule, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { userDetails } from '../../model';

interface userList {
  userList: string
};
let errorDialog: boolean = false, errorUpdate: boolean = false, errorSave: boolean = false;
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

  onUpdateUserData() {
    if (!errorUpdate) {
      return of({});
    } else {
      throw new Error();
    }
  }

  onSaveUserData() {
    if (!errorSave) {
      return of({});
    } else {
      throw new Error();
    }
  }
  currentlocalizationDetails: userList = {
    userList: "User List",
  }

  editUserDetails: userDetails | null = {
    id: null,
    firstName: 'Sample first name',
    lastName: 'Sample last name',
    email: 'test@mailinator.com',
    address: 'Sample address',
    profileUrl: './assets/avatar.png'
  };
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


describe('AddEditUserComponent', () => {
  let component: AddEditUserComponent;
  let fixture: ComponentFixture<AddEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditUserComponent],
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule, RouterModule],
      providers: [
        { provide: UsersService, useClass: MockUserService },
        { provide: MatSnackBar, useClass: MockMatSnackBar },
        { provide: MatDialog, useClass: MockMatDialog },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ fromuser: true }) // Mock query parameters
          }
        },
        { provide: Router, useClass: MockRouter }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call OnInit', () => {
    component.userService.editUserDetails = {
      id: null,
      firstName: 'Sample first name',
      lastName: 'Sample last name',
      email: 'test@mailinator.com',
      address: 'Sample address',
      profileUrl: './assets/avata22r.png'
    }
    component.ngOnInit();
    component.userService.editUserDetails = {
      id: 1,
      firstName: null,
      lastName: null,
      email: null,
      address: null,
      profileUrl: null
    }
    component.ngOnInit();
  });

  it('Should call checkProfileUrl', () => {
    component.userFormGroup = new UntypedFormGroup({
      profileUrl: new UntypedFormControl(null)
    });
    component.checkProfileUrl();
    component.userFormGroup = new UntypedFormGroup({
      profileUrl: new UntypedFormControl('./addd')
    });
    component.checkProfileUrl();
  })

  it('Should call onNavigateBack', () => {
    component.userFormGroup.markAsDirty();
    component.onNavigateBack();
    component.userFormGroup.markAsPristine();
    component.onNavigateBack();
  })

  it('Should call toRouteNavigation', () => {
    component.toNavigeBackForAdmin = true;
    component.toRouteNavigation();
  })

  it('Should call OnSave', () => {
    component.userFormGroup = new UntypedFormGroup({
      id: new UntypedFormControl(1),
      firstName: new UntypedFormControl('James'),
      lastName: new UntypedFormControl('dev'),
      email: new UntypedFormControl('james@mailinator.com'),
      address: new UntypedFormControl('James 13 street'),
      profileUrl: new UntypedFormControl('./addd')
    });
    component.userFormGroup.markAsDirty();
    component.onSave();
    component.userFormGroup.markAsPristine();
    component.onSave();
    component.userFormGroup = new UntypedFormGroup({
      id: new UntypedFormControl(null),
      firstName: new UntypedFormControl('James'),
      lastName: new UntypedFormControl('dev'),
      email: new UntypedFormControl('james@mailinator.com'),
      address: new UntypedFormControl('James 13 street'),
      profileUrl: new UntypedFormControl('./addd')
    });
    component.userFormGroup.markAsDirty();
    component.onSave();
  })

  it('Should call toSaveUserDetails', () => {
    errorUpdate = false;
    component.userFormGroup = new UntypedFormGroup({
      id: new UntypedFormControl(1),
      firstName: new UntypedFormControl('James'),
      lastName: new UntypedFormControl('dev'),
      email: new UntypedFormControl('james@mailinator.com'),
      address: new UntypedFormControl('James 13 street'),
      profileUrl: new UntypedFormControl('./addd')
    });
    const methodName: Observable<userDetails> =
      component.userService.onUpdateUserData(component.userFormGroup.get('id')?.value, component.userFormGroup.value);
    component.toNavigeBackForAdmin = true;
    component.userService.userDetailsData = [];
    component.toSaveUserDetails(methodName, 1);
    component.userService.userDetailsData = [{
      id: null,
      firstName: 'Sample first name',
      lastName: 'Sample last name',
      email: 'test@mailinator.com',
      address: 'Sample address',
      profileUrl: './assets/avata22r.png'
    }];
    component.toSaveUserDetails(methodName, 1);
  });

  // it('Should call toSaveUserDetails error case', () => {
  //   errorUpdate = true;
  //   component.userFormGroup = new UntypedFormGroup({
  //     id: new UntypedFormControl(1),
  //     firstName: new UntypedFormControl('James'),
  //     lastName: new UntypedFormControl('dev'),
  //     email: new UntypedFormControl('james@mailinator.com'),
  //     address: new UntypedFormControl('James 13 street'),
  //     profileUrl: new UntypedFormControl('./addd')
  //   });
  //   const methodName: Observable<userDetails> =
  //     component.userService.onUpdateUserData(component.userFormGroup.get('id')?.value, component.userFormGroup.value);
  //   component.toSaveUserDetails(methodName, 1);
  // });

});
