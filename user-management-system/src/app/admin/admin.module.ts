/**
 * Module used for the import related module, components for admin.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/material.module';
import { AdminRoutingModule } from './admin.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';



@NgModule({
  declarations: [
    UserListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
