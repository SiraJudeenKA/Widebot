import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationLoaderComponent } from './components/animation-loader/animation-loader.component';
import { CommonDialogComponent } from './components/common-dialog/common-dialog.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    AnimationLoaderComponent,
    CommonDialogComponent,
    NavigationBarComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    RouterModule
  ],
  exports: [
    AnimationLoaderComponent,
    NavigationBarComponent
  ]
})
export class SharedModule { }
