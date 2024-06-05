import { Component, OnInit } from '@angular/core';
import { userDetails } from 'src/app/shared/model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userDetails: userDetails = {
    firstName: 'Harry',
    lastName: 'Potter',
    email: 'Harry@mailinator.com',
    address: '54, Griffindor house, Hogwards, London -64302',
    profileUrl: './assets/avatar.png'
  };
  constructor(public userService: UsersService) { }

  ngOnInit() {

  }
}
