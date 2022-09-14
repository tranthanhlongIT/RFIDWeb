import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavbartopComponent } from '@app/_components/navbartop/navbartop.component';
import { SidebarmenuComponent } from '@app/_components/sidebarmenu/sidebarmenu.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { FormModalDeleteComponent } from './form-modal-delete/form-modal-delete.component';
import { MatTableModule } from '@angular/material/table';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer'
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { LayoutBlankComponent } from './layout-blank/layout-blank.component';

@NgModule({
  declarations: [
    SidebarmenuComponent,
    NavbartopComponent,
    PaginationComponent,
    ToolbarComponent,
    FormModalDeleteComponent,
    NavbarUserComponent,
    LayoutBlankComponent,
    DatepickerComponent,
  ],
  exports: [
    SidebarmenuComponent,
    NavbartopComponent,
    PaginationComponent,
    ToolbarComponent,
    FormModalDeleteComponent,
    DatepickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    NgMultiSelectDropDownModule,
    PdfJsViewerModule,
    NgbDatepickerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentModule { }
