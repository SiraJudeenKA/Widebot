import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarComponent } from './navigation-bar.component';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, of } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { userDetails } from '../../model';

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;

  let errorTranslate: boolean = false;
  class MockUserService {
    userListDetails = new BehaviorSubject<userDetails[]>([]);
    onTranslateValue() {
      if (!errorTranslate) {
        return of({
          en: {
            localizationButton: 'button'

          }
        })
      } else {
        throw new Error()
      }

    }

    currentlocalizationDetails = {
    }
  }
  class MockMatSnackBar {
    open() {

    }
  }

  class MockRouter {
    navigate() {
      return '/app/user'
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationBarComponent],
      imports: [RouterModule],
      providers: [{
        provide: UsersService, useClass: MockUserService
      },
      { provide: MatSnackBar, useClass: MockMatSnackBar },
      { provide: Router, useClass: MockRouter },

      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should should call ngOnDestroy', () => {
    component.ngOnDestroy();
  });

  it('should call onLogout', () => {
    component.onLogout();
  })

  // it('should call onInit', () => {
  //   errorTranslate = true;
  //   component.ngOnInit();
  // })

  it('should call onTranslate', () => {
    component.onTranslate('en');
    component.onTranslate('arb');

  });

  it('should call onNavigateToHome', () => {
    component.userService.currentUserDetails = {
      role: 'USER',
      credentials: true
    };
    component.onNavigateToHome();
    component.userService.currentUserDetails = {
      role: 'ADMIN',
      credentials: true
    };
    component.onNavigateToHome();
  })
});
