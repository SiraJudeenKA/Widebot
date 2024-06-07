import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
import { userDetails } from '../model';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UsersService]
    });

    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save users', () => {
    const mockUsers: userDetails = {
      id: null,
      firstName: 'Sample first name',
      lastName: 'Sample last name',
      email: 'test@mailinator.com',
      address: 'Sample address',
      profileUrl: './assets/avata22r.png'
    };

    service.onSaveUserData(mockUsers);
  });

  it('should update users', () => {
    const mockUsers: userDetails = {
      id: 1,
      firstName: 'Sample first name',
      lastName: 'Sample last name',
      email: 'test@mailinator.com',
      address: 'Sample address',
      profileUrl: './assets/avata22r.png'
    };

    service.onUpdateUserData(1, mockUsers);
  });

  it('should call delete', () => {
    service.onDeleteUserData(1);
  });

  it('should call translate value', () => {
    service.onTranslateValue();
  });
});
