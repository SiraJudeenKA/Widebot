import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/shared/services/users.service';
import { MatPaginator } from '@angular/material/paginator';

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
  data!: MatTableDataSource<any>
  /**
   * View children of mat pagination.
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ELEMENT_DATA = [
    { profileUrl: './assets/avatar1.png', firstName: 'John', lastName: 'Doe', address: '54 kaja na' },
    { profileUrl: './assets/avatar1.png', firstName: 'Jane', lastName: 'Smith', address: 'Kajcd sd' },
    { profileUrl: './assets/avatar1.png', firstName: 'John', lastName: 'Doe', address: '54 kaja na' },
    { profileUrl: './assets/avatar1.png', firstName: 'Jane', lastName: 'Smith', address: 'Kajcd sd' },
    { profileUrl: './assets/avatar1.png', firstName: 'John', lastName: 'Doe', address: '54 kaja na' },
    { profileUrl: './assets/avatar1.png', firstName: 'Jane', lastName: 'Smith', address: 'Kajcd sd' },
    { profileUrl: './assets/avatar1.png', firstName: 'John', lastName: 'Doe', address: '54 kaja na' },
    { profileUrl: './assets/avatar1.png', firstName: 'Jane', lastName: 'Smith', address: 'Kajcd sd' },
    { profileUrl: './assets/avatar1.png', firstName: 'John', lastName: 'Doe', address: '54 kaja na' },
    { profileUrl: './assets/avatar1.png', firstName: 'Jane', lastName: 'Smith', address: 'Kajcd sd' },
    { profileUrl: './assets/avatar1.png', firstName: 'John', lastName: 'Doe', address: '54 kaja na' },
    { profileUrl: './assets/avatar1.png', firstName: 'Jane', lastName: 'Smith', address: 'Kajcd sd' },
    // Add more data as needed
  ];

  /**
   * Construction used for to inject the service
   * @param userService used the for access the method ins user service,
   */
  constructor(public userService: UsersService) { }

  /**
   * Oninit life cycle hook
   */
  ngOnInit(): void {
    this.data = new MatTableDataSource(this.ELEMENT_DATA);
    console.log(this.data);
    this.data.paginator = this.paginator;
    this.displayedColumns = ['profileUrl', 'firstName', 'lastName', 'address', 'actions']
  }

  /**
   * after init life cycle hook
   */
  ngAfterViewInit() {
    this.data.paginator = this.paginator;
  }

  /**
   * Method used to search functionality
   * @param event has the event of keyup value
   */
  searchText(event: Event) {
    console.log(this.data);
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }
}
