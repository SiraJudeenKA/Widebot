import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
interface welcome {
  welcome: string
};
describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  class MockUserService {
    currentlocalizationDetails: welcome = {
      welcome: "welcome",
    }
  }
  class MockRouter {
    navigate() {
      return 'app/add';
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [{
        provide: UsersService, useClass: MockUserService
      },
      {
        provide: ActivatedRoute,
        useValue: {
          queryParams: of({ fromAdmin: true }) // Mock query parameters
        }
      },
      { provide: Router, useClass: MockRouter }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should be welcome toNavigateToedit', () => {
    component.toHideEdit = true;
    component.toNavigateToedit();
    component.toHideEdit = false;
    component.toNavigateToedit();
  });

  it('Should call oninit', () => {
    component.userService.editUserDetails = {
      id: null,
      firstName: 'Sample first name',
      lastName: 'Sample last name',
      email: 'test@mailinator.com',
      address: 'Sample address',
      profileUrl: './assets/avata22r.png'
    }
    component.ngOnInit();
  })
});
