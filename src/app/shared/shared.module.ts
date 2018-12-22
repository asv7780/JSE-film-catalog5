import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowMoreComponent } from './show-more/show-more.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ShowMoreComponent,
    SpinnerComponent,
    FooterComponent
  ],
  exports: [
    ShowMoreComponent,
    SpinnerComponent,
    FooterComponent
  ]
})
export class SharedModule { }
