import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationLoaderComponent } from './components/animation-loader/animation-loader.component';
import { CommonDialogComponent } from './components/common-dialog/common-dialog.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/material.module';


@NgModule({
  declarations: [
    AnimationLoaderComponent,
    CommonDialogComponent,
    NavigationBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    AnimationLoaderComponent,
    NavigationBarComponent
  ]
})
export class SharedModule { }
