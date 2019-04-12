import { CommonModule } from '@angular/common';
import { DropdrownDirective } from './dropdown.directive';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [DropdrownDirective],
  imports: [],
  exports: [
    CommonModule,
    DropdrownDirective
  ]
})
export class SharedModule {

}
