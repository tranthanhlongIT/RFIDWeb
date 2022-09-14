import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from '@app/_helpers/auth.guard';
import { ThunghiemComponent } from './thunghiem/thunghiem.component';
import { Thunghiem1Component } from './thunghiem1/thunghiem1.component';
import { TrangchuComponent } from './trangchu/trangchu.component';
import { LayoutComponent } from '@app/_components/layout/layout.component';
import { HethongComponent } from './hethong/hethong.component';
const routes: Routes = [
  { path: '', component: TrangchuComponent },
  { path: '*', redirectTo: '' },
  {
    path: 'hethong',
    component: LayoutComponent,
    children: [
      { path: 'nhanvien0', component: ThunghiemComponent},
      { path: 'nhanvien1', component: Thunghiem1Component},
      { path: '', component: HethongComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
