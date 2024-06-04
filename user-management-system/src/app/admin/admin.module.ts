import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/material.module';
import { AdminRoutingModule } from './admin.routing.module';



@NgModule({
  declarations: [
    UserListComponent,
    AddEditUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
